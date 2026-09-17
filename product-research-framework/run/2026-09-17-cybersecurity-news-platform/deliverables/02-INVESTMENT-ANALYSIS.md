# Investment Analysis Report — news-zero

Run: `2026-09-17-cybersecurity-news-platform` · Date: `2026-09-17` · Judge rounds: `1/10` · Ledger coverage: `1.00`

---

## 1. Executive Summary & Investment Verdict

- **Verdict:** **CONVICTION (PASS TO DILIGENCE)**
- **Thesis:** news-zero attacks the $2.4B threat intelligence market with a zero-LLM, GitHub-native architecture that achieves 90%+ gross margins and $0 3rd-party SaaS infrastructure overhead, capturing mid-market SOC teams overwhelmed by expensive commercial feed noise.
- **Headline Valuation (Pre-Money):** **$3.5M – $5.0M** (Scorecard & Comps Multiples).
- **Key Underwriting Lever:** Net Revenue Retention (NRR) and Enterprise attach rate for compliance webhooks.

---

## 2. Product-Specific KPI Architecture

| Layer | Metric | Category Benchmark | news-zero Target / Model | Investor Significance | Ledger ID |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Acquisition** | **Buffered CAC** | $2,500 – $5,000 | **$1,200** (Raw: $800 × 1.5) | Developer-led growth via GitHub lowers acquisition cost | E-MKT-004 |
| **Acquisition** | **Payback Period** | 14 – 18 months | **2.4 months** | Extremely fast capital recovery cycle | E-MKT-001 |
| **Value Delivery** | **Aha Metric** | First auto-mapped MITRE CVE alert | < 1 hour post-install | Validates immediate operational utility | E-ACA-001 |
| **Value Delivery** | **COGS / Article** | $0.02 (LLM API) | **$0.00** (GitHub Actions local) | Zero marginal compute cost per processed update | E-OSS-003 |
| **Retention** | **Logo Retention** | 85% annual | **92% annual** | High workflow lock-in once integrated into GitHub | E-OSS-004 |
| **Retention** | **NRR / NDR** | 110% | **125%** | Driven by expanding webhooks across SOC tiers | E-MKT-001 |
| **Efficiency** | **Gross Margin** | 70% (SaaS avg) | **92%** | Eliminates LLM API and server hosting overhead | E-OSS-001 |

---

## 3. Unit Economics & Breakeven Modeling

### Unit Economics (Scenario A: Open-Core Enterprise Tier)

```
ARPA (Enterprise Tier)      = $499 / month ($5,988 / year)
COGS per account            = $40 / month (GitHub runner allocation + support)
Gross Margin ($)            = $499 - $40 = $459 / month (92.0% Gross Margin)

CAC (Raw)                   = $800 (Content, community management, founder time)
CAC (Buffered x1.5)         = $800 x 1.5 = $1,200 (MANDATORY BUFFER APPLIED)

LTV                         = ($459 x 12) / 0.08 annual churn = $68,850
LTV : CAC Ratio             = $68,850 / $1,200 = 57.38x
Payback Period (Buffered)   = $1,200 / $459 = 2.6 months
```

### Breakeven Analysis (Monthly Fixed Overhead: $15,000)
*Fixed Monthly Costs: 2 core engineers/maintainers + legal/admin + infrastructure buffers.*

| Acquisition Pace | Monthly New Customers | Contribution / Acc | Customers to Breakeven | Months to Breakeven | Cumulative Cash to Breakeven |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Slow Ramp** | 3 / month | $459 | 33 customers | **11 months** | $95,000 |
| **Base Case** | 6 / month | $459 | 33 customers | **6 months** | $48,000 |
| **Fast Ramp** | 12 / month | $459 | 33 customers | **3 months** | $22,000 |

> **Headline Underwriting Requirement:** **33 enterprise customers by Month 6** and **<$50k cash burn** to reach self-sustaining profitability.

---

## 4. 5-Year DCF Revenue Model

```
Discount Rate: 25.0% (Early-Stage Venture Risk Premia)
Terminal Growth Rate: 3.5% | Exit Multiple: 8.0x Year-5 ARR
```

| Line Item | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Enterprise Customers** | 45 | 180 | 480 | 1,100 | 2,200 |
| **ARPA** | $5,988 | $6,287 | $6,601 | $6,931 | $7,278 |
| **Annual Recurring Revenue (ARR)**| **$269,460** | **$1,131,660** | **$3,168,480** | **$7,624,100** | **$16,011,600** |
| **Gross Profit (92%)** | $247,903 | $1,041,127 | $2,915,000 | $7,014,172 | $14,730,672 |
| **Operating Expenses** | $210,000 | $550,000 | $1,400,000 | $3,200,000 | $6,500,000 |
| **EBITDA** | **$37,903** | **$491,127** | **$1,515,000** | **$3,814,172** | **$8,230,672** |
| **Free Cash Flow (FCF)** | $30,322 | $392,901 | $1,212,000 | $3,051,337 | $6,584,537 |

### DCF Valuation Output
- **Present Value of FCF (5-Yr):** $4,850,000
- **Terminal Value (Exit Multiple 8x Year-5 ARR):** $128,092,800
- **PV of Terminal Value:** $41,973,000
- **Implied Net Present Value (NPV):** **$4.85M (Pre-Money Stage-Adjusted)**

---

## 5. Valuation Analysis (Multiples & Scorecard Method)

### A. Multiples Method
- **Comparable Deals:** Early-stage open-core developer tools trade at **6.0x – 10.0x ARR**.
- **Year-2 ARR Projection:** $1.13M.
- **Stage Discount:** 50% illiquidity and execution discount.
- **Implied Valuation Range:** **$3.4M – $5.6M**.

### B. Scorecard Method (Target Baseline: $4.0M Pre-Money)

| Factor | Weight | Assessment | Multiplier | Weighted Value |
| :--- | :--- | :--- | :--- | :--- |
| **Team & Execution** | 25% | Strong open-source engineering background | 1.10 | $1.10M |
| **Opportunity Size ($2.4B SAM)** | 25% | Large threat intelligence noise market | 1.15 | $1.15M |
| **Product & Zero-LLM Tech** | 15% | High defensibility, zero API cost | 1.20 | $0.72M |
| **Competitive Environment** | 10% | Expensive incumbents create pricing umbrella | 1.10 | $0.44M |
| **Marketing & GTM Channel** | 10% | GitHub Marketplace viral loop | 1.05 | $0.42M |
| **Capital Requirement** | 15% | <$50k to breakeven (Very Low Risk) | 1.25 | $0.75M |
| **Total Scorecard Valuation** | 100% | — | — | **$4.58M** |

> **Recommended Valuation Anchor:** **$4.25M Pre-Money Valuation** ($3.5M Floor / $5.0M Ceiling).

---

## 6. KPI → Valuation Linkage & Sensitivity

| Headline KPI | Conservative | Base Case | Optimistic | Valuation Impact | Primary Execution Lever |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Gross Margin** | 75% | **92%** | 95% | $3.2M → **$4.25M** → $5.1M | Keep ingestion processing local & zero-LLM |
| **Buffered CAC Payback** | 8 months | **2.6 months** | 1.5 months | $3.5M → **$4.25M** → $5.4M | Optimize GitHub Marketplace conversion |
| **Net Revenue Retention** | 100% | **125%** | 140% | $2.8M → **$4.25M** → $6.2M | Expand enterprise compliance webhook add-ons |

---

## 7. Investment Memo & Final Verdict

### Thesis (3 Sentences)
1. **`news-zero`** disrupts the $2.4B cybersecurity threat intelligence market by delivering a zero-LLM, GitHub-native platform that eliminates 3rd-party SaaS API overhead.
2. The product addresses acute SecOps pain (CPI 66.7) by converting raw CVE/NVD noise into structured MITRE ATT&CK mapping directly within developer workflows.
3. With 92% gross margins, a 2.6-month buffered CAC payback, and a breakeven requirement of just 33 enterprise customers, news-zero represents an exceptional asymmetric risk/reward investment.

### Load-Bearing Assumptions
1. GitHub Actions free-tier runner minutes remain sufficient for hourly ingestion (<2 min execution).
2. Deterministic rule-based NLP matches or exceeds 85% precision on MITRE ATT&CK technique extraction.
3. Mid-market SOC teams adopt open-core GitHub webhooks over legacy $50k/yr commercial feeds.

### Kill Criteria Mapping
- **K1 (Payback > 12mo):** Model yields **2.6mo payback** (🟢 Pass).
- **K2 (Processing Cost > $0.05/article):** Model yields **$0.00/article** (🟢 Pass).
- **K3 (Max CPI < 55):** Highest CPI is **66.7** (🟢 Pass).

### Final Verdict
**CONVICTION (PASS TO DILIGENCE)** — Proceed to Gate G3 Reconciliation.
