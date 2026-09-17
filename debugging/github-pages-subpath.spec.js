import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

/**
 * Playwright Audit Script: Subpath & Data Cascade Inspection
 */

test.describe("GitHub Pages Subpath & Data Cascade Audit", () => {
  test("Audit 1: Detect Root-Relative Asset Links that Fail on GitHub Pages Subpaths", async () => {
    const htmlFiles = ["src/index.njk", "src/news.njk", "src/research.njk", "src/trends.njk", "src/privacy.njk"];
    const unhandledRootAssets = [];

    for (const relPath of htmlFiles) {
      const fullPath = path.resolve(relPath);
      if (!fs.existsSync(fullPath)) continue;
      const content = fs.readFileSync(fullPath, "utf-8");

      // Check for hardcoded "/assets/" without "| url" filter
      if (content.includes('href="/assets/') || content.includes('src="/assets/')) {
        unhandledRootAssets.push(relPath);
      }
    }

    expect(unhandledRootAssets, `Found hardcoded root-relative asset URLs in: ${unhandledRootAssets.join(", ")}`).toEqual([]);
  });

  test("Audit 2: Verify Data Cascade Key Mismatch (linkPreviews vs link-previews.json)", async () => {
    const jsonExists = fs.existsSync(path.resolve("src/_data/link-previews.json"));
    const camelCaseExists = fs.existsSync(path.resolve("src/_data/linkPreviews.json"));

    // If link-previews.json exists, it causes linkPreviews to be undefined in index.njk
    expect(jsonExists && !camelCaseExists, "src/_data/link-previews.json must be renamed to linkPreviews.json for Nunjucks camelCase mapping").toBe(false);
  });
});
