import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";

test("Validates 100+ ISO country entries in registry", () => {
  const countries = JSON.parse(fs.readFileSync("registry/countries.json", "utf-8"));
  assert.ok(Array.isArray(countries));
  assert.ok(countries.length >= 100, `Expected at least 100 countries, found ${countries.length}`);
});

test("Validates 35 cybersecurity categories in registry", () => {
  const categories = JSON.parse(fs.readFileSync("registry/categories.json", "utf-8"));
  assert.ok(Array.isArray(categories));
  assert.ok(categories.length >= 35, `Expected at least 35 categories, found ${categories.length}`);
});
