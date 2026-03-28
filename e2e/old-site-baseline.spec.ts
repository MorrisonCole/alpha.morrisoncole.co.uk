import { test } from "@playwright/test";

const BASE_URL = "https://morrisoncole.co.uk";

const screenshotDir = "./e2e/screenshots/baseline";

test.describe("Old site baseline screenshots", () => {
  test("homepage - light mode (desktop)", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${screenshotDir}/homepage-light-desktop.png`,
      fullPage: true,
    });
  });

  test("homepage - dark mode (desktop)", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${screenshotDir}/homepage-dark-desktop.png`,
      fullPage: true,
    });
  });

  test("homepage - filter Life", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    await page.getByText("Life", { exact: true }).click();
    await page.screenshot({
      path: `${screenshotDir}/homepage-filter-life.png`,
      fullPage: true,
    });
  });

  test("homepage - filter Music", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    await page.getByText("Music", { exact: true }).click();
    await page.screenshot({
      path: `${screenshotDir}/homepage-filter-music.png`,
      fullPage: true,
    });
  });

  test("homepage - filter Software", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    await page.getByText("Software", { exact: true }).click();
    await page.screenshot({
      path: `${screenshotDir}/homepage-filter-software.png`,
      fullPage: true,
    });
  });

  test("blog index", async ({ page }) => {
    await page.goto(`${BASE_URL}/blog/`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${screenshotDir}/blog-index.png`,
      fullPage: true,
    });
  });

  test("blog post - one year in japan", async ({ page }) => {
    await page.goto(`${BASE_URL}/blog/one-year-in-japan/`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${screenshotDir}/blog-post-one-year-in-japan.png`,
      fullPage: true,
    });
  });

  test("header close-up", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    const header = page.locator("header");
    await header.screenshot({
      path: `${screenshotDir}/header.png`,
    });
  });

  test("footer close-up", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState("networkidle");
    const footer = page.locator("footer");
    await footer.screenshot({
      path: `${screenshotDir}/footer.png`,
    });
  });
});
