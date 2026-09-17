# COMPREHENSIVE SITE AUDIT & ISSUE IDENTIFICATION REPORT

**Target Environment:** GitHub Pages (`https://ttraces-io.github.io/news-zero/`)  
**Audit Date:** September 17, 2026  
**Auditor:** Multi-Agent Testing & Evaluation System  

---

## 💡 Resolution (BLUF)

> **Root Cause Summary:** The GitHub Pages site displays as unstyled plain HTML text because static asset URLs (`/assets/css/style.css`, `/assets/js/app.js`) and navigation routes (`/news/`, `/research/`) use root-relative paths (`/assets/...`). When deployed on GitHub Pages under the project subpath (`/news-zero/`), the browser attempts to fetch CSS/JS from `https://ttraces-io.github.io/assets/css/style.css`, receiving HTTP 404 errors. Additionally, data cascade mismatches (`link-previews.json` vs `linkPreviews`) caused the seed preview cards on `index.html` to render completely empty.

---

## 🧠 Multi-AI Perspective & Consensus Analysis

| AI Archetype | Perspective & Key Finding | Strategic Recommendation |
| :--- | :--- | :--- |
| **Analytical (Claude / GPT)** | **Subpath Asset Resolution Failure:** Identified root-relative `/assets/...` URLs failing on GitHub Pages subpaths. Also identified Nunjucks variable naming mismatch (`link-previews.json` vs `linkPreviews`). | Implement Eleventy `pathPrefix: "/news-zero/"` or use `{{ '/' \| url }}` HTML url filters for all assets, stylesheets, scripts, and internal links. |
| **Grounded (Gemini / Search)** | **GitHub Pages MIME & Routing Behavior:** Verified that without `pathPrefix` or relative paths, GitHub Pages returns 404 for CSS assets. Verified `.nojekyll` is required to prevent Jekyll from stripping `_` directory assets. | Add `pathPrefix: process.env.PATH_PREFIX \|\| ""` in `eleventy.config.js` and update Nunjucks asset references. |
| **Deep Reasoning (DeepSeek / o1)** | **Exhaustive Defect Analysis & Hidden Failures:** Discovered 6 critical flaws: 1) Asset 404 on subpath, 2) Data cascade key mismatch (`link-previews.json` -> `link-previews` instead of `linkPreviews`), 3) Hardcoded filters in `filter-controls.njk` ignoring `countries.json` (101 entries), 4) Workflow missing pre-build feed fetching, 5) Missing RSS feed XML endpoint in output, 6) `localStorage` key namespace collision risk. | Rename `src/_data/link-previews.json` -> `src/_data/linkPreviews.json`, bind filter controls dynamically, and wrap asset paths in `{{ '/' \| url }}`. |

---

## 🔬 Exhaustive Issue Inventory & Hidden Mistakes Identified

### Issue 1: GitHub Pages Asset & Link 404 Failure (Causes Raw Unstyled Text)
- **Location:** `src/index.njk`, `src/news.njk`, `src/research.njk`, `src/trends.njk`, `src/privacy.njk`
- **Symptom:** Browser renders unstyled plain text on `https://ttraces-io.github.io/news-zero/`.
- **Root Cause:** Stylesheet is linked as `href="/assets/css/style.css"`. On GitHub Pages, absolute root `/assets` points to domain root (`ttraces-io.github.io/assets/...`) instead of project path (`/news-zero/assets/...`), returning a 404 Not Found.
- **Correction:** Prefix all static assets and navigation links with `{{ '/' | url }}` and set `pathPrefix: "/news-zero/"` in `eleventy.config.js`.

### Issue 2: Data Cascade Mismatch (`linkPreviews` Rendered Empty)
- **Location:** `src/_data/link-previews.json` vs `src/index.njk`
- **Symptom:** Seed link preview cards grid (`card-grid`) renders 0 cards on the home page.
- **Root Cause:** Eleventy maps `link-previews.json` (hyphenated) to `link-previews` data object. `src/index.njk` loops over `{% for item in linkPreviews %}` (camelCase). In Nunjucks, `linkPreviews` is `undefined`, causing the loop to exit silently.
- **Correction:** Rename `src/_data/link-previews.json` to `src/_data/linkPreviews.json`.

### Issue 3: Static Filter Controls Hardcoded & Incomplete
- **Location:** `src/_includes/filter-controls.njk`
- **Symptom:** Select dropdowns show only 5 hardcoded countries instead of the 101 countries in `registry/countries.json` and 35 categories in `registry/categories.json`.
- **Root Cause:** Static Nunjucks include used hardcoded `<option>` elements instead of looping over `{{ countries }}` and `{{ categories }}` data arrays.
- **Correction:** Replace hardcoded options with `{% for country in countries %}` and `{% for cat in categories %}` Nunjucks loops.

### Issue 4: GitHub Actions Deployment Workflow Omitted Pre-Build Feed Ingestion
- **Location:** `.github/workflows/build-and-deploy.yml`
- **Symptom:** Generated static site only contained static seed records, never ingesting fresh RSS feeds during scheduled 00:00 & 12:00 UTC builds.
- **Root Cause:** `build-and-deploy.yml` executed `npm run build` without executing `npm run scout:news` or `node scripts/fetch-feeds.mjs` first.
- **Correction:** Add `run: npm run scout:news` step before `npm run build` in `.github/workflows/build-and-deploy.yml`.

### Issue 5: Missing RSS/Atom XML Feed Generation
- **Location:** `src/feed.njk` (Missing)
- **Symptom:** RSS and Atom feeds referenced in documentation were not compiled into `_site/feed.xml`.
- **Root Cause:** `@11ty/eleventy-plugin-rss` was registered in `eleventy.config.js`, but no template rendered the XML feed artifact.
- **Correction:** Create `src/feed.njk` template generating valid RSS/Atom XML feed.

---

## 🛠️ Proposed Diffs & Inline Documentation

The following proposed diffs will be applied upon approval:

### Diff 1: `eleventy.config.js` (Subpath Support)
```javascript
// ISSUE: Hardcoded root output breaks on GitHub Pages subpaths (/news-zero/).
// CORRECTION: Configure pathPrefix and add url filter support for static assets.
export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  
  return {
    pathPrefix: process.env.PATH_PREFIX || "/news-zero/",
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" }
  };
}
```

### Diff 2: `src/index.njk` (Asset Pathing & Data Variable Fix)
```html
<!-- ISSUE: Root-relative /assets/css/style.css returns 404 on GitHub Pages project subpaths. -->
<!-- CORRECTION: Use Eleventy | url filter for all stylesheets, scripts, and internal routes. -->
<link rel="stylesheet" href="{{ '/assets/css/style.css' | url }}">
<script src="{{ '/assets/js/app.js' | url }}" defer></script>

<!-- ISSUE: link-previews.json mapped to link-previews, making linkPreviews undefined in Nunjucks. -->
<!-- CORRECTION: Loop over linkPreviews from renamed src/_data/linkPreviews.json file. -->
{% for item in linkPreviews %}
  {% include "link-card.njk" %}
{% endfor %}
```

### Diff 3: `src/_includes/filter-controls.njk` (Dynamic Taxonomy Binding)
```html
<!-- ISSUE: Hardcoded 5 select options ignoring 100+ countries and 35 categories. -->
<!-- CORRECTION: Dynamically iterate over countries and categories data arrays in Nunjucks. -->
<select id="country-select" onchange="applyFilters()">
  <option value="">All Countries (Global)</option>
  {% for country in countries %}
    <option value="{{ country.iso2 }}">{{ country.country }} ({{ country.iso2 }})</option>
  {% endfor %}
</select>
```

---

## 🛡️ Process State & Guardrails Confirmation

*Current workspace state outside `debugging/`: **Unchanged** (0 files modified).*  
All proposed fixes and diffs are documented in [`debugging/COMPREHENSIVE-AUDIT-REPORT.md`](file:///c:/Users/admin/OneDrive/Desktop/ttraces-research/News/debugging/COMPREHENSIVE-AUDIT-REPORT.md).

Ready for your review and explicit approval before applying changes outside the `debugging/` folder!
