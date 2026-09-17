import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

async function debugUnbiasedValidation() {
  console.log("=== STARTING UNBIASED PLAYWRIGHT DEBUGGING RUN ===");

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) UnbiasedSecurityAuditor/1.0",
    extraHTTPHeaders: { "DNT": "1" },
  });

  const page = await context.newPage();

  const testUrls = [
    "https://github.com/",
    "https://www.cisa.gov/news-events/cybersecurity-advisories",
    "https://www.ncsc.gov.uk/",
  ];

  for (const url of testUrls) {
    console.log(`\n[DEBUG] Testing URL in clean context: ${url}`);
    try {
      const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      const status = response ? response.status() : "No Response";
      const title = await page.title();
      console.log(` -> Status: ${status}`);
      console.log(` -> Title: ${title}`);
      console.log(` -> Verification: PASSED`);
    } catch (err) {
      console.error(` -> Verification FAILED: ${err.message}`);
    }
  }

  await context.close();
  await browser.close();
  console.log("\n=== UNBIASED PLAYWRIGHT DEBUGGING RUN COMPLETE ===");
}

debugUnbiasedValidation().catch(console.error);
