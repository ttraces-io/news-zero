# Gate G0 — Scoping & Initial Brief
Run: 2026-09-17-cybersecurity-news-platform · Date: 2026-09-17 · Judge rounds used: 0/10 · Ledger coverage: N/A (G0 Pre-Research)

## Recommendation
**PROCEED TO GATE G1 (DISCOVERY)**

## What Changed Since Last Gate
- Initialized framework run environment at `run/2026-09-17-cybersecurity-news-platform/`.
- Conducted Gate G0 Scoping interrogation with user directives incorporated verbatim.
- Enforced strict **GitHub-Native, Zero 3rd-Party SaaS, Zero LLM API** architecture constraint.
- Generated 7-pillar [`00-PRODUCT-SCOPE.md`](../deliverables/00-PRODUCT-SCOPE.md) and immutable [`KILL-CRITERIA.md`](../KILL-CRITERIA.md).

## Kill Criteria Status
| Criterion (set at G0) | Threshold | Current Reading | Status |
|---|---|---|---|
| **K1: Payback Failure** | Blended CAC × 1.5 > 12mo | N/A (Evaluated at G2) | 🟢 Clear |
| **K2: Processing Cost Inflation** | Processing cost > $0.05 / article | $0.00 / article (GitHub Actions local parser) | 🟢 Clear |
| **K3: Insufficient Pain (CPI)** | Highest CPI < 55 | N/A (Evaluated at G2) | 🟢 Clear |
| **K4: 3rd-Party SaaS / LLM Breach** | Any paid API dependency | 0 external APIs required | 🟢 Clear |
| **K5: Incumbent GA Equivalent** | Competitor ships identical tool | N/A (Evaluated at G1) | 🟢 Clear |

## Decisions You Are Approving
1. **Scope Boundary**: 100% GitHub-Native platform (GitHub Actions, GitHub Pages, Webhooks) with **zero 3rd-party LLM APIs or cloud SaaS dependencies**.
2. **Dual Target Personas**: Primary = SecOps / SOC Tier 1–2 Analysts; Secondary = CISOs & Security Executives.
3. **Ingestion & Sync Frequency**: Hourly batch processing via scheduled GitHub Actions cron (`0 * * * *`).
4. **Deterministic NLP Processing**: Rule-based regex extraction, TF-IDF sentence selection, and MITRE ATT&CK / CVSS dictionary mapping.
5. **Research Questions (W1 Dispatch)**: Approval of RQ-1 through RQ-4 for Wave 1 discovery workers.

## Open Questions For You
*None for Gate G0 — all scoping parameters confirmed by user.*

## Known Gaps Carried Forward
*None at Gate G0.*

## Behind This Packet
- [`deliverables/00-PRODUCT-SCOPE.md`](../deliverables/00-PRODUCT-SCOPE.md) (7 pillars)
- [`KILL-CRITERIA.md`](../KILL-CRITERIA.md) (5 immutable falsifiable criteria)
- [`ledger/EVIDENCE.md`](../ledger/EVIDENCE.md)
- [`ledger/QUERIES.md`](../ledger/QUERIES.md)
- [`ledger/CPI.md`](../ledger/CPI.md)
- [`ledger/JUDGE-LOG.md`](../ledger/JUDGE-LOG.md)
- [`ledger/CONTRADICTIONS.md`](../ledger/CONTRADICTIONS.md)
