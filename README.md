# Privacy-Preserving Cybersecurity News and Research Feed

A GitHub-native, zero-tracking, deterministic cybersecurity news and open research paper aggregation platform.

Built with **Eleventy**, **Nunjucks**, **GitHub Pages**, **Playwright**, and **GitHub Actions**.

---

## 🎯 Platform Features

- **Privacy-First & Zero Tracking**: 0 cookies, 0 analytics scripts, 0 IP logging, 0 user profiling.
- **60-Day Freshness Window**: Strictly filters out stale or outdated news and research (>60 days old).
- **100+ Countries & 35+ Categories**: Rich country ISO taxonomy and cybersecurity topic mapping.
- **200-Scout Matrix & Deterministic Judge**: GitHub Actions matrix scout runners with an automated scoring judge.
- **Unauthenticated Playwright Validation**: Headless validation without persistent browser contexts or stored cookies.
- **Local Browser Preferences & Likes**: Preferences and liked articles stored in browser `localStorage`.
- **Static Link Previews**: Pre-rendered preview cards including seed preview for `https://github.com/`.

---

## 🏗️ Repository Architecture

```text
.
├── src/
│   ├── posts/
│   ├── papers/
│   ├── _data/
│   │   ├── countries.json
│   │   ├── categories.json
│   │   └── link-previews.json
│   ├── _includes/
│   │   ├── link-card.njk
│   │   ├── filter-controls.njk
│   │   └── share-controls.njk
│   ├── index.njk
│   ├── news.njk
│   ├── research.njk
│   ├── trends.njk
│   └── privacy.njk
├── registry/
│   ├── countries.json
│   ├── news-platforms.json
│   ├── research-papers.json
│   └── rejected-sources.json
├── scripts/
│   ├── fetch-feeds.mjs
│   ├── validate-sources.mjs
│   ├── score-content.mjs
│   ├── generate-short-links.mjs
│   └── redact-secrets.mjs
├── snapshots/
├── .github/workflows/
├── eleventy.config.js
└── package.json
```

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Run static site server
npm start

# Execute test suite
npm test

# Run manual scout ingestion
npm run scout:news
npm run judge
```

---

## 📊 Trending Digests

Twice daily at 00:00 & 12:00 UTC, the `update-trends.yml` workflow selects the Top 10 News Articles and Top 5 Research Papers using an objective recency, source reputation, and relevance score, updating the static `trends.njk` page, RSS feed, and GitHub Wiki.
