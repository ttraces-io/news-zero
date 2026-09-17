import test from "node:test";
import assert from "node:assert";
import { isWithin60Days, generateContentHash, generateShortId } from "../scripts/fetch-feeds.mjs";

test("Enforces strict 60-day freshness boundary", () => {
  const recentDate = new Date().toISOString();
  const oldDate = new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString();

  assert.strictEqual(isWithin60Days(recentDate), true, "Recent article must be accepted");
  assert.strictEqual(isWithin60Days(oldDate), false, "Article older than 60 days must be rejected");
});

test("Generates stable content hash and 8-char short ID", () => {
  const title = "Zero-Day Vulnerability Disclosure";
  const url = "https://example.org/advisory-001";

  const hash = generateContentHash(title, url);
  const shortId = generateShortId(hash);

  assert.strictEqual(typeof hash, "string");
  assert.strictEqual(hash.length, 16);
  assert.strictEqual(shortId.length, 8);
});
