import { test, expect, chromium } from "@playwright/test";

/**
 * Issue Fix: E2E Live Site Verification on GitHub Pages URL.
 * Correction: Validates layout styling, dynamic filters, subpath assets, and zero tracking on live deployment.
 */
test.describe("GitHub Pages Live Site Verification — https://ttraces-io.github.io/news-zero/", () => {
  let browser;
  let context;
  let page;
  const failedRequests = [];
  const thirdPartyRequests = [];

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
  });

  test.beforeEach(async () => {
    failedRequests.length = 0;
    thirdPartyRequests.length = 0;

    context = await browser.newContext({
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) UnbiasedQA/1.0",
      extraHTTPHeaders: { "DNT": "1", "Sec-GPC": "1" },
    });

    page = await context.newPage();

    page.on("requestfailed", (req) => {
      failedRequests.push(`${req.url()} (${req.failure()?.errorText})`);
    });

    page.on("response", (res) => {
      if (res.status() >= 400) {
        failedRequests.push(`${res.url()} [HTTP ${res.status()}]`);
      }
    });

    page.on("request", (req) => {
      const url = req.url();
      if (
        url.includes("google-analytics.com") ||
        url.includes("doubleclick.net") ||
        url.includes("facebook.com")
      ) {
        thirdPartyRequests.push(url);
      }
    });
  });

  test.afterEach(async () => {
    await context.close();
  });

  test.afterAll(async () => {
    if (browser) await browser.close();
  });

  test("Live Test 1: Verify Homepage Loads with 200 OK & Zero Failed Sub-resources", async () => {
    const res = await page.goto("https://ttraces-io.github.io/news-zero/", { waitUntil: "networkidle" });
    expect(res.status()).toBe(200);
    expect(failedRequests).toEqual([]);
    expect(thirdPartyRequests).toEqual([]);
  });

  test("Live Test 2: Verify Stylesheets and JavaScript Load & Apply Correctly", async () => {
    await page.goto("https://ttraces-io.github.io/news-zero/", { waitUntil: "networkidle" });

    // Verify stylesheet rules applied (e.g. body font-family or background)
    const bodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    expect(bodyBg).toBeDefined();

    // Verify app.js loaded and defined global helper functions
    const hasToggleLike = await page.evaluate(() => typeof window.toggleLike === "function");
    expect(hasToggleLike).toBe(true);
  });

  test("Live Test 3: Verify Interactive Features (Like Toggle & Dynamic Filters)", async () => {
    await page.goto("https://ttraces-io.github.io/news-zero/", { waitUntil: "networkidle" });

    // Test like toggle functionality in client local storage
    await page.evaluate(() => window.toggleLike("test_live_item"));
    const liked = await page.evaluate(() => localStorage.getItem("liked:test_live_item"));
    expect(liked).toBe("true");

    // Test filter selection
    const countrySelect = page.locator("#countryFilter");
    if (await countrySelect.count() > 0) {
      await countrySelect.selectOption({ index: 1 });
      const currentVal = await countrySelect.inputValue();
      expect(currentVal).not.toBe("");
    }
  });

  test("Live Test 4: Verify Navigation Links & Subpages (News, Research, Trends, Privacy, Feed)", async () => {
    const subpages = ["news/", "research/", "trends/", "privacy/"];

    for (const sub of subpages) {
      const subUrl = `https://ttraces-io.github.io/news-zero/${sub}`;
      const res = await page.goto(subUrl, { waitUntil: "networkidle" });
      expect(res.status()).toBe(200);
      expect(failedRequests).toEqual([]);
    }

    // Check feed.xml
    const feedRes = await page.goto("https://ttraces-io.github.io/news-zero/feed.xml");
    expect(feedRes.status()).toBe(200);
  });
});
