import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const MAX_AGE_DAYS = 60;
const CUTOFF_DATE = new Date(Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000);

export function isWithin60Days(dateInput) {
  if (!dateInput) return false;
  const pubDate = new Date(dateInput);
  if (isNaN(pubDate.getTime())) return false;
  return pubDate >= CUTOFF_DATE;
}

export function generateContentHash(title, url) {
  return crypto.createHash("sha256").update(`${title || ""}|${url || ""}`).digest("hex").slice(0, 16);
}

export function generateShortId(contentHash) {
  return contentHash.slice(0, 8);
}

export async function processFeeds(newsPath, papersPath, tempOutputDir) {
  fs.mkdirSync(tempOutputDir, { recursive: true });

  const newsData = JSON.parse(fs.readFileSync(newsPath, "utf-8"));
  const papersData = JSON.parse(fs.readFileSync(papersPath, "utf-8"));

  const acceptedNews = [];
  const rejectedNews = [];

  for (const item of newsData) {
    if (isWithin60Days(item.lastValidatedAt || item.publicationDate || new Date().toISOString())) {
      const hash = generateContentHash(item.name, item.homepage);
      acceptedNews.push({
        id: item.id,
        title: item.name,
        url: item.homepage,
        publisher: item.name,
        publicationDate: item.lastValidatedAt || new Date().toISOString().slice(0, 10),
        category: item.topics[0] || "cybersecurity",
        topics: item.topics,
        country: item.country || "Global",
        contentHash: hash,
        shortId: generateShortId(hash),
      });
    } else {
      rejectedNews.push({ id: item.id, reason: "Older than 60 days" });
    }
  }

  const acceptedPapers = [];
  for (const paper of papersData) {
    if (isWithin60Days(paper.publicationDate)) {
      const hash = generateContentHash(paper.title, paper.url);
      acceptedPapers.push({
        ...paper,
        contentHash: hash,
        shortId: generateShortId(hash),
      });
    }
  }

  fs.writeFileSync(path.join(tempOutputDir, "news.jsonl"), acceptedNews.map(n => JSON.stringify(n)).join("\n"));
  fs.writeFileSync(path.join(tempOutputDir, "papers.jsonl"), acceptedPapers.map(p => JSON.stringify(p)).join("\n"));
  fs.writeFileSync(path.join(tempOutputDir, "summary.json"), JSON.stringify({
    timestamp: new Date().toISOString(),
    acceptedNewsCount: acceptedNews.length,
    acceptedPapersCount: acceptedPapers.length,
    rejectedCount: rejectedNews.length,
  }, null, 2));

  return { acceptedNews, acceptedPapers, rejectedNews };
}

if (process.argv[1] && process.argv[1].endsWith("fetch-feeds.mjs")) {
  const newsFile = path.resolve("registry/news-platforms.json");
  const papersFile = path.resolve("registry/research-papers.json");
  const outDir = path.resolve("temp-flow/run-" + new Date().toISOString().replace(/[:.]/g, "-").slice(0, 16) + "/scout-001");
  processFeeds(newsFile, papersFile, outDir).then(() => {
    console.log(`[scout] Feeds processed successfully into ${outDir}`);
  }).catch(err => {
    console.error("[scout] Error processing feeds:", err);
    process.exit(1);
  });
}
