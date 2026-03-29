import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const GOODREADS_USER_ID = "6320986";
const SHELVES = ["2019", "2020", "2021", "2022", "2023"] as const;

interface Book {
  rating: number;
  title: string;
  author: string;
  link: string;
  imageUrl: string;
}

function decodeXmlEntities(text: string): string {
  return text
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&amp;", "&");
}

function getTextContent(xml: string, tag: string): string {
  const match = xml.match(
    new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`),
  );
  if (match) return match[1].trim();
  const simpleMatch = xml.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
  return simpleMatch ? decodeXmlEntities(simpleMatch[1].trim()) : "";
}

function parseReviews(xml: string): Book[] {
  const books: Book[] = [];
  const reviewRegex = /<review>([\s\S]*?)<\/review>/g;
  let reviewMatch;

  while ((reviewMatch = reviewRegex.exec(xml)) !== null) {
    const reviewXml = reviewMatch[1];
    const rating = parseInt(getTextContent(reviewXml, "rating"), 10);

    const bookMatch = reviewXml.match(/<book>([\s\S]*?)<\/book>/);
    if (!bookMatch) continue;
    const bookXml = bookMatch[1];

    const title = getTextContent(bookXml, "title");
    // Strip <authors> section before matching <link> to avoid picking up author links
    const bookXmlWithoutAuthors = bookXml.replace(
      /<authors>[\s\S]*?<\/authors>/,
      "",
    );
    const link = getTextContent(bookXmlWithoutAuthors, "link");
    const imageUrl = getTextContent(bookXml, "image_url");

    const authorMatch = bookXml.match(/<author>([\s\S]*?)<\/author>/);
    const author = authorMatch
      ? getTextContent(authorMatch[1], "name")
      : "Unknown";

    if (title) {
      books.push({ rating, title, author, link, imageUrl });
    }
  }

  return books;
}

async function fetchShelf(shelf: string, apiKey: string): Promise<Book[]> {
  const url = new URL("https://www.goodreads.com/review/list.xml");
  url.searchParams.set("v", "2");
  url.searchParams.set("id", GOODREADS_USER_ID);
  url.searchParams.set("shelf", shelf);
  url.searchParams.set("key", apiKey);
  url.searchParams.set("per_page", "200");
  url.searchParams.set("sort", "rating");
  url.searchParams.set("order", "d");

  console.log(`Fetching shelf "${shelf}"...`);
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(
      `Failed to fetch shelf "${shelf}": ${String(response.status)} ${response.statusText}`,
    );
  }

  const xml = await response.text();
  const books = parseReviews(xml);
  console.log(`  Found ${String(books.length)} books on shelf "${shelf}"`);
  return books;
}

async function main(): Promise<void> {
  const apiKey = process.env["GOODREADS_KEY"];
  if (!apiKey) {
    console.error("Error: GOODREADS_KEY environment variable is required");
    process.exit(1);
  }

  for (const shelf of SHELVES) {
    const books = await fetchShelf(shelf, apiKey);

    const outDir = join(
      ROOT,
      "src",
      "content",
      "blog",
      `${shelf}-reading-list`,
    );
    mkdirSync(outDir, { recursive: true });

    const outPath = join(outDir, "books.json");
    writeFileSync(outPath, JSON.stringify(books, null, 2) + "\n");
    console.log(`  Wrote ${outPath}`);
  }

  console.log("Done.");
}

void main();
