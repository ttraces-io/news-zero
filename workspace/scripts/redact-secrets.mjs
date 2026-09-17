import fs from "node:fs";

const SECRET_PATTERNS = [
  /ghp_[A-Za-z0-9_]{36}/g,                      // GitHub Personal Access Tokens
  /gho_[A-Za-z0-9_]{36}/g,                      // GitHub OAuth Tokens
  /github_pat_[A-Za-z0-9_]{82}/g,               // GitHub Fine-Grained PATs
  /sk-[A-Za-z0-9]{32,48}/g,                     // Generic API Secret Keys
  /bearer\s+[A-Za-z0-9\-._~+/]+=*/gi,           // Authorization Bearer Header Tokens
  /BEGIN\s+PRIVATE\s+KEY/gi,                    // Private Keys
  /password["']?\s*[:=]\s*["']?[^"'\s,]+/gi,    // Password Fields
];

export function redactSecretsFromText(text) {
  if (typeof text !== "string") return text;
  let cleanText = text;
  for (const pattern of SECRET_PATTERNS) {
    cleanText = cleanText.replace(pattern, "[REDACTED_SECRET]");
  }
  return cleanText;
}

export function scanAndRedactFile(filePath) {
  if (!fs.existsSync(filePath)) return false;
  const original = fs.readFileSync(filePath, "utf-8");
  const cleaned = redactSecretsFromText(original);
  if (original !== cleaned) {
    fs.writeFileSync(filePath, cleaned, "utf-8");
    return true; // Secret was detected and redacted
  }
  return false;
}

if (process.argv[1] && process.argv[1].endsWith("redact-secrets.mjs")) {
  const target = process.argv[2];
  if (target && fs.existsSync(target)) {
    const redacted = scanAndRedactFile(target);
    console.log(`[redact] File ${target} scanned. Redacted: ${redacted}`);
  } else {
    console.log("[redact] Usage: node scripts/redact-secrets.mjs <file-path>");
  }
}
