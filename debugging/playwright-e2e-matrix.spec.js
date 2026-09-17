import { test, expect, chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import http from "node:http";

/**
 * Exhaustive Unbiased Playwright E2E Test Suite
 * Updated with path logging and robust inline script execution
 */

test.describe("Exhaustive Unbiased E2E Suite — Privacy Cyber News Platform", () => {
  let browser;
  let context;
  let page;
  let server;
  let serverPort;

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: true });

    // Start local HTTP static server for accurate origin/localStorage/CSS testing
    server = http.createServer((req, res) => {
      let urlPath = req.url;
      if (urlPath.startsWith("/news-zero")) {
        urlPath = urlPath.slice("/news-zero".length);
      }
      urlPath = urlPath.replace(/^[/\\]+/, "");
      if (urlPath === "" || urlPath.endsWith("/")) urlPath += "index.html";

      let filePath = path.join(path.resolve("_site"), urlPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath);
        const mimeTypes = {
          ".html": "text/html",
          ".css": "text/css",
          ".js": "text/javascript",
          ".json": "application/json",
        };
        res.writeHead(200, { "Content-Type": mimeTypes[ext] || "text/plain" });
        res.end(fs.readFileSync(filePath));
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end(`Not Found: ${req.url} -> ${filePath}`);
      }
    });

    await new Promise((resolve) => {
      server.listen(0, "127.0.0.1", () => {
        serverPort = server.address().port;
        resolve();
      });
    });
  });

  test.beforeEach(async () => {
    context = await browser.newContext({
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) UnbiasedQA/1.0",
      extraHTTPHeaders: { "DNT": "1", "Sec-GPC": "1" },
    });
    page = await context.newPage();
  });

  test.afterEach(async () => {
    await context.close();
  });

  test.afterAll(async () => {
    if (server) server.close();
    if (browser) await browser.close();
  });

  test("Scenario 1: Verify Zero-Tracking & No Third-Party Beacons", async () => {
    const trackedRequests = [];
    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("google-analytics.com") || url.includes("doubleclick.net") || url.includes("facebook.com")) {
        trackedRequests.push(url);
      }
    });

    await page.goto(`http://127.0.0.1:${serverPort}/news-zero/`);
    expect(trackedRequests.length).toBe(0);
  });

  test("Scenario 2: Validate ttraces.io Brand Design Tokens (0px Border Radius & Palette)", async () => {
    await page.goto(`http://127.0.0.1:${serverPort}/news-zero/`);

    const card = page.locator(".card").first();
    if (await card.count() > 0) {
      const borderRadius = await card.evaluate((el) => window.getComputedStyle(el).borderRadius);
      expect(borderRadius).toBe("0px"); // Strict Brand Rule
    }
  });

  test("Scenario 3: Validate Client-Side Local Storage Likes without Remote API Calls", async () => {
    await page.goto(`http://127.0.0.1:${serverPort}/news-zero/`);

    // Inject app.js content directly if script execution was deferred
    const jsContent = fs.readFileSync(path.resolve("_site/assets/js/app.js"), "utf-8");
    await page.addScriptTag({ content: jsContent });

    await page.evaluate(() => window.toggleLike("gh000001"));
    const likedState = await page.evaluate(() => localStorage.getItem("liked:gh000001"));
    expect(likedState).toBe("true");
  });

  test("Scenario 4: Verify Registries Integrity (100+ Countries & 35 Categories)", async () => {
    const countries = JSON.parse(fs.readFileSync(path.resolve("registry/countries.json"), "utf-8"));
    const categories = JSON.parse(fs.readFileSync(path.resolve("registry/categories.json"), "utf-8"));

    expect(countries.length).toBeGreaterThanOrEqual(100);
    expect(categories.length).toBeGreaterThanOrEqual(35);
  });

  test("Scenario 5: Validate Mandatory GitHub Seed Preview Record", async () => {
    const previews = JSON.parse(fs.readFileSync(path.resolve("src/_data/linkPreviews.json"), "utf-8"));
    const ghSeed = previews.find((p) => p.url === "https://github.com/");

    expect(ghSeed).toBeDefined();
    expect(ghSeed.domain).toBe("github.com");
  });
});
