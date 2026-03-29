import { test } from "@playwright/test";

test("debug blog post structure", async ({ page }) => {
  await page.goto(
    "http://localhost:5173/en/blog/japanese-government-gender-breakdown",
  );
  await page.waitForLoadState("networkidle");

  // Check h3 outer HTML for classes
  const h3Html = await page
    .locator("article h3")
    .first()
    .evaluate((el) => el.outerHTML.slice(0, 300));
  console.log("=== H3 outerHTML ===");
  console.log(h3Html);

  // Check first image outer HTML for classes
  const imgHtml = await page
    .locator("article img")
    .first()
    .evaluate((el) => el.outerHTML.slice(0, 300));
  console.log("=== IMG outerHTML ===");
  console.log(imgHtml);

  // Check image computed styles
  const imgStyles = await page
    .locator("article img")
    .first()
    .evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        gridColumn: cs.gridColumn,
        width: cs.width,
        maxWidth: cs.maxWidth,
        display: cs.display,
        justifySelf: cs.justifySelf,
        alignSelf: cs.alignSelf,
        gridColumnStart: cs.gridColumnStart,
        gridColumnEnd: cs.gridColumnEnd,
      };
    });
  console.log("=== IMG computed styles ===");
  console.log(JSON.stringify(imgStyles, null, 2));

  // Check if image is a direct child of the grid
  const parentInfo = await page
    .locator("article img")
    .first()
    .evaluate((el) => {
      const parent = el.parentElement;
      return {
        parentTag: parent?.tagName,
        parentClass: parent?.className,
        parentDisplay: parent ? window.getComputedStyle(parent).display : null,
        parentGridColumn: parent
          ? window.getComputedStyle(parent).gridColumn
          : null,
        isDirectChildOfSection: parent?.tagName === "SECTION",
      };
    });
  console.log("=== IMG parent info ===");
  console.log(JSON.stringify(parentInfo, null, 2));

  // Check the blog body grid computed styles
  const bodyStyles = await page
    .locator("article section")
    .first()
    .evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        display: cs.display,
        gridTemplateColumns: cs.gridTemplateColumns,
        width: cs.width,
      };
    });
  console.log("=== Section (body) styles ===");
  console.log(JSON.stringify(bodyStyles, null, 2));

  // Get bounding boxes
  const pBox = await page.locator("article section p").first().boundingBox();
  const imgBox = await page.locator("article img").first().boundingBox();
  console.log("=== Bounding boxes ===");
  console.log("paragraph:", JSON.stringify(pBox));
  console.log("image:", JSON.stringify(imgBox));
});
