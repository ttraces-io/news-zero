# Contradictions Register (P1 §4 / Gate G3 Reconciliation)
Run: 2026-09-17-cybersecurity-news-platform

> **INVARIANT:** Gate G3 requires **zero unresolved 🔴 (critical) contradictions** to proceed to Technical Feasibility (Gate G4).

| ID | Class | Constraint / Commitment A | Constraint / Commitment B | Severity | Status | Resolution Options | Selected Resolution |
|---|---|---|---|---|---|---|---|
| **CTR-001** | **C1 (Price ↔ COGS)** | $499/mo Enterprise Tier price point | GitHub Actions compute & webhook distribution costs ($40/mo) | 🟢 Minor | RESOLVED | 1. Charge per seats<br>2. Flat $499/mo per org | **Option 2** (Yields 92% gross margin; COGS < 10% of revenue) |
| **CTR-002** | **C2 (Promise ↔ Maturity)** | Automated MITRE ATT&CK technique extraction commitment | Open-source rule-based regex dictionary limitations on novel descriptions | 🟡 Moderate | RESOLVED | 1. Allow community PR mappings<br>2. Auto-sync MITRE ATT&CK v16 JSON weekly | **Option 2** (Weekly automated ATT&CK JSON sync + community PR overrides) |
| **CTR-003** | **C3 (NFR ↔ Architecture)** | Hourly sync frequency requirement (< 60 min latency) | GitHub Actions cron scheduling jitter (5–15 min delay during peak loads) | 🟡 Moderate | RESOLVED | 1. Accept cron jitter<br>2. Add external webhook trigger | **Option 1** (5–15 min cron jitter is fully acceptable for hourly threat digests) |
| **CTR-004** | **C4 (Timeline ↔ Build)** | Phase 1 MVP launch in 30 days | Deterministic parser + static page builder + webhook engine | 🟢 Minor | RESOLVED | 1. Cut webhooks<br>2. Use Python stdlib + Jinja2 static site build | **Option 2** (Standard Python stack enables 30-day MVP delivery) |
| **CTR-005** | **C5 (CAC ↔ Motion)** | $1,200 buffered CAC ($800 raw) target | Developer-led growth via GitHub Marketplace | 🟢 Minor | RESOLVED | 1. Paid ads<br>2. Viral README badges & GitHub Marketplace listing | **Option 2** (PLG motion fits within $800 raw CAC budget) |
| **CTR-006** | **C6 (Licence ↔ Rev Model)** | Open-core community core + $499/mo Enterprise tier | Open-source repository distribution | 🟢 Minor | RESOLVED | 1. Pure MIT license<br>2. Dual AGPLv3 / Apache 2.0 core + Enterprise Commercial | **Option 2** (Dual licensing protects enterprise webhook monetisation) |

---

## Reconciliation Summary
- **Critical (🔴) Contradictions:** **0**
- **Moderate (🟡) Contradictions:** **2** (All resolved via automated MITRE JSON sync & cron jitter acceptance)
- **Minor (🟢) Contradictions:** **4** (All resolved)
