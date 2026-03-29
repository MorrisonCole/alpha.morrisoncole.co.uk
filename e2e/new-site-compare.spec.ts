import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5173";

const screenshotDir = "./e2e/screenshots/new";

test.describe("New site screenshots for comparison", () => {
  test("homepage - light mode (desktop)", async ({ page }) => {
    await page.goto(`${BASE_URL}/en`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${screenshotDir}/homepage-light-desktop.png`,
      fullPage: true,
    });
  });

  test("homepage - dark mode (desktop)", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto(`${BASE_URL}/en`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${screenshotDir}/homepage-dark-desktop.png`,
      fullPage: true,
    });
  });

  test("homepage - filter Life", async ({ page }) => {
    await page.goto(`${BASE_URL}/en`);
    await page.waitForLoadState("networkidle");
    await page.getByText("Life", { exact: true }).click();
    await page.screenshot({
      path: `${screenshotDir}/homepage-filter-life.png`,
      fullPage: true,
    });
  });

  test("homepage - filter Music", async ({ page }) => {
    await page.goto(`${BASE_URL}/en`);
    await page.waitForLoadState("networkidle");
    await page.getByText("Music", { exact: true }).click();
    await page.screenshot({
      path: `${screenshotDir}/homepage-filter-music.png`,
      fullPage: true,
    });
  });

  test("homepage - filter Software", async ({ page }) => {
    await page.goto(`${BASE_URL}/en`);
    await page.waitForLoadState("networkidle");
    await page.getByText("Software", { exact: true }).click();
    await page.screenshot({
      path: `${screenshotDir}/homepage-filter-software.png`,
      fullPage: true,
    });
  });

  test("blog index", async ({ page }) => {
    await page.goto(`${BASE_URL}/en/blog`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${screenshotDir}/blog-index.png`,
      fullPage: true,
    });
  });

  test("blog post - one year in japan", async ({ page }) => {
    await page.goto(`${BASE_URL}/en/blog/one-year-in-japan`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${screenshotDir}/blog-post-one-year-in-japan.png`,
      fullPage: true,
    });
  });

  test("header close-up", async ({ page }) => {
    await page.goto(`${BASE_URL}/en`);
    await page.waitForLoadState("networkidle");
    const header = page.locator("header");
    await header.screenshot({
      path: `${screenshotDir}/header.png`,
    });
  });

  test("footer close-up", async ({ page }) => {
    await page.goto(`${BASE_URL}/en`);
    await page.waitForLoadState("networkidle");
    const footer = page.locator("footer");
    await footer.screenshot({
      path: `${screenshotDir}/footer.png`,
    });
  });
});

test.describe("Blog post layout verification", () => {
  test("japanese-government-gender - all images render", async ({ page }) => {
    await page.goto(`${BASE_URL}/en/blog/japanese-government-gender-breakdown`);
    await page.waitForLoadState("networkidle");

    const images = page.locator("article img");
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(2);

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      const naturalWidth = await img.evaluate(
        (el: HTMLImageElement) => el.naturalWidth,
      );
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test("japanese-government-gender - heading anchor links", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/en/blog/japanese-government-gender-breakdown`);
    await page.waitForLoadState("networkidle");

    // All h3 headings should have an id (from rehype-slug)
    const headings = page.locator("article h3[id]");
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThanOrEqual(5);

    // Each heading should contain an anchor link (from rehype-autolink-headings)
    for (let i = 0; i < headingCount; i++) {
      const anchor = headings.nth(i).locator("a.anchor-link");
      await expect(anchor).toBeAttached();
    }

    // Hover to reveal, then click anchor link and verify URL hash
    const firstHeading = headings.first();
    const id = await firstHeading.getAttribute("id");
    await firstHeading.hover();
    await firstHeading.locator("a.anchor-link").click({ force: true });
    expect(page.url()).toContain(`#${id}`);
  });

  test("japanese-government-gender - images bleed wider than text", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/en/blog/japanese-government-gender-breakdown`);
    await page.waitForLoadState("networkidle");

    // Get width of a text paragraph (center column) and an image
    const paragraph = page.locator("article section p").first();
    const image = page.locator("article img").first();

    const pBox = await paragraph.boundingBox();
    const imgBox = await image.boundingBox();

    expect(pBox).not.toBeNull();
    expect(imgBox).not.toBeNull();

    // Image should be wider than or equal to the paragraph
    expect(imgBox!.width).toBeGreaterThanOrEqual(pBox!.width);
  });

  test("japanese-government-gender - full page screenshot (desktop)", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/en/blog/japanese-government-gender-breakdown`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${screenshotDir}/blog-post-japanese-gov-gender-desktop.png`,
      fullPage: true,
    });
  });

  test("japanese-government-gender - dark mode screenshot", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto(`${BASE_URL}/en/blog/japanese-government-gender-breakdown`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${screenshotDir}/blog-post-japanese-gov-gender-dark.png`,
      fullPage: true,
    });
  });

  test("antidepressants-in-japan - all images render", async ({ page }) => {
    await page.goto(`${BASE_URL}/en/blog/antidepressants-in-japan`);
    await page.waitForLoadState("networkidle");

    const images = page.locator("article img");
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(1);

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      const naturalWidth = await img.evaluate(
        (el: HTMLImageElement) => el.naturalWidth,
      );
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test("antidepressants-in-japan - full page screenshot", async ({ page }) => {
    await page.goto(`${BASE_URL}/en/blog/antidepressants-in-japan`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${screenshotDir}/blog-post-antidepressants-desktop.png`,
      fullPage: true,
    });
  });

  test("blog post header renders title and date", async ({ page }) => {
    await page.goto(`${BASE_URL}/en/blog/japanese-government-gender-breakdown`);
    await page.waitForLoadState("networkidle");

    await expect(page.locator("article header h1")).toHaveText(
      "Visualising the Gender Breakdown of the Japanese Government",
    );
    await expect(page.locator("article header time")).toBeVisible();
  });
});
