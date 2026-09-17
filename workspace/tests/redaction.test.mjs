import test from "node:test";
import assert from "node:assert";
import { redactSecretsFromText } from "../scripts/redact-secrets.mjs";

test("Redacts sensitive personal access tokens and secrets", () => {
  const sampleWithSecret = "Found token: ghp_1234567890abcdefghijklmnopqrstuvwxyz and key: sk-abcdef1234567890abcdef1234567890";
  const cleaned = redactSecretsFromText(sampleWithSecret);

  assert.ok(!cleaned.includes("ghp_1234567890abcdefghijklmnopqrstuvwxyz"));
  assert.ok(!cleaned.includes("sk-abcdef1234567890abcdef1234567890"));
  assert.ok(cleaned.includes("[REDACTED_SECRET]"));
});
