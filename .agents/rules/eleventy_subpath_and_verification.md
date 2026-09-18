# Eleventy 3 Subpath & Deployment Verification Guidelines

## 1. Subpath URL Handling (Eleventy 3)
- In Eleventy 3, when `pathPrefix` (e.g., `/news-zero/`) is set in `eleventy.config.js`, Eleventy's HTML transformer automatically prepends `pathPrefix` to root-relative links in HTML output.
- **DO NOT** use the `| url` filter on root-relative links in Nunjucks templates (e.g. avoid `{{ '/assets/css/style.css' | url }}`).
- **DO** write standard root-relative links (e.g. `<link rel="stylesheet" href="/assets/css/style.css">`, `<a href="/news/">`). Eleventy 3 will automatically transform them to `/news-zero/assets/css/style.css`.

## 2. 2-Line Inline Documentation
- Every code modification or template edit MUST include a 2-line inline comment explaining the issue and the correction:
  ```html
  <!-- ISSUE: Double pathPrefix bug where Eleventy 3 HTML transformer and | url filter both prepended /news-zero/. -->
  <!-- CORRECTION: Use root-relative URLs so Eleventy pathPrefix transforms them once to /news-zero/assets/... -->
  ```

## 3. Live Deployment Verification Policy
- After pushing code and workflow completion, run Playwright live site E2E tests against `https://ttraces-io.github.io/news-zero/` to verify:
  1. HTTP 200 OK for all HTML, CSS, JS, and XML sub-resources.
  2. Zero third-party analytics/tracking calls.
  3. Interactive features (client-side likes, dynamic filters) function correctly.
