# Contributing Guidelines

Thank you for contributing to the Privacy-Preserving Cybersecurity News and Research Feed!

## Key Submission Guidelines

1. **Adding News Sources (`registry/news-platforms.json`)**:
   - Must have a clear, demonstrable focus on cybersecurity, cyber risk, vulnerability disclosures, or incident response.
   - Must provide a valid public RSS or Atom feed.
   - Scraper farms, link farms, paywalled sites, and unverified blogs will be rejected.

2. **Adding Categories (`registry/categories.json`)**:
   - Must include keyword tagging rules and maintain a clean taxonomy hierarchy.

3. **Deterministic Rules & Testing**:
   - Do not add LLM/AI dependency calls.
   - Run `npm test` before opening a pull request.
