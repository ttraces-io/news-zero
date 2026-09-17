# Security Policy & Non-Negotiable Rules

## Zero-Credential & Secret Redaction Guarantee

This project enforces strict zero-credential collection, storage, and transmission policies:

1. **No Credentials Saved**: Never store, email, print, or export passwords, API keys, tokens, session cookies, SSH keys, or recovery codes.
2. **Deterministic Secret Scanning**: All workflow runs execute `scripts/redact-secrets.mjs` before writing logs or artifacts. Detected secrets trigger execution failure and automatic redaction (`[REDACTED_SECRET]`).
3. **Unauthenticated Playwright Testing**: Playwright runs strictly with clean temporary contexts (`incognito: true`, no saved cookies, no storage state, no personal profile).
4. **Least Privilege Workflows**: GitHub Actions workflows run with `permissions: contents: read` by default. Only the deployment step grants `contents: write` or `pages: write`.

## Reporting a Vulnerability

If you discover a potential secret disclosure or security flaw, please open an issue or notify the security team. Do not attempt to exploit or harvest credentials.
