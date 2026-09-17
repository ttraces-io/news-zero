import fs from "node:fs";
import path from "node:path";

export function createStaticRedirectHtml(destinationUrl, title) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=${destinationUrl}">
  <link rel="canonical" href="${destinationUrl}">
  <title>Redirecting to ${title || "Destination"}...</title>
</head>
<body>
  <p>Redirecting to <a href="${destinationUrl}">${title || destinationUrl}</a>...</p>
</body>
</html>`;
}

export function generateShortLinksForItems(items, outputRootDir) {
  let createdCount = 0;
  for (const item of items) {
    if (!item.shortId || !item.url) continue;
    const redirectDir = path.join(outputRootDir, "s", item.shortId);
    fs.mkdirSync(redirectDir, { recursive: true });
    const htmlContent = createStaticRedirectHtml(item.url, item.title);
    fs.writeFileSync(path.join(redirectDir, "index.html"), htmlContent, "utf-8");
    createdCount++;
  }
  return createdCount;
}

if (process.argv[1] && process.argv[1].endsWith("generate-short-links.mjs")) {
  const newsPath = path.resolve("registry/news-platforms.json");
  if (fs.existsSync(newsPath)) {
    const news = JSON.parse(fs.readFileSync(newsPath, "utf-8"));
    const count = generateShortLinksForItems(news, path.resolve("_site"));
    console.log(`[shortlinks] Generated ${count} static shortlink redirect pages.`);
  }
}
