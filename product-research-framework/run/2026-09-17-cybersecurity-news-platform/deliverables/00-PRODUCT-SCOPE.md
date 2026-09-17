# Product Scope Document: news-zero (GitHub-Native Cybersecurity Intelligence Platform)

## 1. Executive Summary & Problem Space
- **Problem Statement:** Security analysts and CISOs face extreme information overload from fragmented vulnerability advisories (CVE/NVD, CISA KEV), security blogs, arXiv preprints, and GitHub security advisories. Existing commercial tools rely on costly 3rd-party SaaS APIs and black-box LLM summarization. **`news-zero`** solves this by establishing a **100% GitHub-native, zero-LLM, open-source intelligence pipeline** that uses deterministic regex/rule-based NLP to parse, enrich (MITRE ATT&CK mapping, CVSS scoring), and publish threat updates directly via GitHub Actions, GitHub Pages, and Webhooks.
- **Value Proposition:** Zero 3rd-party cloud costs, zero LLM API dependency, 100% reproducible deterministic processing, version-controlled threat intelligence stored in open Git/JSON repositories.
- **Target Audience & Core Personas:**
  - *Primary Persona (SecOps / SOC Tier 1–2 Analyst):* Needs real-time technical triage, verified CVE exploitability data, MITRE ATT&CK mapping, and GitHub PoC repository links.
  - *Secondary Persona (CISO & Security Executive):* Needs high-level hourly threat trend digests, risk severity summaries, and zero-day exposure reports.
- **Strategic Goals & Success Metrics:**

  | Metric Name | Baseline | Target (Post-GA) | Measurement Window |
  | :--- | :--- | :--- | :--- |
  | **Ingestion Sync Frequency** | Manual / Unscheduled | Hourly Batch (60 mins) | Continuous GitHub Action trigger |
  | **3rd-Party API SaaS Spend** | High / Dependent | **$0.00 / mo** (100% GitHub Native) | Immediate & Permanent |
  | **CVE MITRE ATT&CK Auto-Mapping Rate** | 0% | ≥ 85% verified deterministic matches | Phase 1 MVP |
  | **Processing Cost Per Article** | ~$0.02 (LLM API) | **$0.00** (Deterministic Local Runner) | Phase 1 MVP |

---

## 2. Boundaries & Scoping Matrix
*Clarity on exclusions is as critical as inclusions.*

| Capability / Module | In Scope (Current Scope) | Explicitly Out of Scope | Deferred to Phase 2+ |
| :--- | :--- | :--- | :--- |
| **Ingestion Engine** | GitHub Actions runners fetching RSS, NVD/CVE JSON API, CISA KEV, GitHub Security Advisories | Paid 3rd-party threat feed APIs, proprietary news scrapers | Custom RSS feed submission portal |
| **Text Summarization & Processing** | **Deterministic Rule-Based NLP**, Regex pattern matching, TF-IDF keyphrase extraction | **3rd-Party LLM Summarization APIs** (OpenAI, Anthropic, Gemini, etc.) | Local offline small model (SLM) runners |
| **Threat Enrichment** | MITRE ATT&CK tactic/technique lookup, CVSS v3/v4 score parsing, GitHub PoC link correlation | Active penetration testing, automated exploit payload generation | Automated patch recommendation engine |
| **Storage & Presentation** | Git repo storage (JSON/Markdown), GitHub Pages static dashboard, Webhook alerts | Enterprise SIEM log warehouse, long-term log storage | GraphQL query interface |

---

## 3. Functional Requirements & User Journeys

### Epic 1: GitHub-Native Ingestion & Deterministic Parsing
- **Objective:** Ingest multi-source cybersecurity feeds every hour using GitHub Actions and parse threat metadata deterministically without 3rd-party APIs.
- **User Flow:** Scheduled Cron Job -> Fetch Feed Data -> Run Deterministic Python Parser -> Enrich MITRE/CVE Metadata -> Commit JSON/Markdown to Git Repository.

#### Detailed Capabilities:
1. **FR-1.1: Automated Hourly Ingestion Workflow**
   - **Description:** System must run a scheduled GitHub Action every 60 minutes to pull feeds from NVD, CISA KEV, GitHub Security Advisories, and curated security blogs.
   - **Preconditions:** GitHub Repository configured with Actions runner enabled.
   - **Acceptance Criteria (Gherkin/Scenario-Based):**
     - *Scenario:* Successful hourly execution
       - **Given** scheduled GitHub Action cron trigger `0 * * * *`
       - **When** the workflow executes
       - **Then** all upstream feeds are fetched with HTTP 200 and saved to transient processing directory.
     - *Scenario:* Upstream feed failure / rate-limit
       - **Given** NVD API rate limits or network timeout
       - **When** the ingestion script encounters a non-200 status
       - **Then** the workflow logs the failure to `QUERIES.md`, retries with exponential backoff (max 3 retries), and continues processing remaining healthy feeds without crashing.

2. **FR-1.2: Deterministic Rule-Based Summarization & MITRE Mapping**
   - **Description:** System must extract key sentences, CVE IDs, CVSS scores, and MITRE ATT&CK techniques using regex, regex keyword dictionaries, and TF-IDF sentence scoring (zero LLM calls).
   - **Preconditions:** Raw feed payload downloaded.
   - **Acceptance Criteria (Gherkin/Scenario-Based):**
     - *Scenario:* Deterministic extraction from security advisory
       - **Given** raw advisory text containing `CVE-2026-1234` and `RCE vulnerability in Apache`
       - **When** the deterministic parser evaluates the text
       - **Then** it extracts `CVE-2026-1234`, assigns MITRE ATT&CK Technique `T1210 (Exploitation of Remote Services)`, and selects top 3 summary sentences based on keyword density.

### Epic 2: GitHub Pages Dashboard & Notification Publishing
- **Objective:** Publish structured threat intelligence to a static GitHub Pages site and trigger webhook notifications for SecOps & CISOs.

#### Detailed Capabilities:
1. **FR-2.1: Static Site & JSON Feed Generator**
   - **Description:** System must generate static HTML pages for GitHub Pages and structured `feed.json` / `rss.xml` outputs.
   - **Preconditions:** Deterministic parsing completed.
   - **Acceptance Criteria (Gherkin/Scenario-Based):**
     - *Scenario:* Deployment of static threat dashboard
       - **Given** updated threat JSON records in Git
       - **When** GitHub Pages build step runs
       - **Then** an updated, zero-latency static dashboard is published at `https://ttraces-io.github.io/news-zero`.

---

## 4. Non-Functional Requirements (NFRs) & Constraints

- **Performance & Latency:**
  - GitHub Actions execution runtime < **3 minutes** per hourly run.
  - GitHub Pages static dashboard load time < **500 ms** (p95).
- **Cost & Dependencies:**
  - **$0.00 3rd-party SaaS / LLM API costs**. 100% free-tier GitHub infrastructure compliant.
- **Reliability & Idempotency:**
  - Ingestion workflow must be 100% idempotent (duplicate feed entries filtered out by hash/CVE ID).
- **Security & Compliance:**
  - No secret keys required for core execution (public APIs only).
  - Open-source, transparent, deterministic audit log for all parsed threat records.

---

## 5. Technical Dependencies & Architecture Touchpoints
- **Upstream Data Sources:** NVD REST API v2, CISA Known Exploited Vulnerabilities (KEV) JSON, GitHub Advisory Database, arXiv RSS, Open Security Blogs.
- **Runtime Environment:** GitHub Actions (Ubuntu Latest), Python 3.11 (Standard Library + BeautifulSoup4 + Regex + NLTK/TF-IDF).
- **Storage Tier:** GitHub Repository Git History, JSON Flat Files (`data/threats.json`), GitHub Releases.
- **Presentation Tier:** GitHub Pages (HTML/CSS/Vanilla JS), GitHub Webhook Triggers, Discord/Slack Webhook integrations.

---

## 6. Assumptions, Risks & Mitigations

| Risk / Unknown | Impact (H/M/L) | Probability (H/M/L) | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| NVD API rate limits without API Key | High | Medium | Request free NVD API key & store in GitHub Secrets; fallback to CISA KEV |
| Accuracy loss from removing LLM summarization | Medium | Low | Use structured heuristic template extraction (CVE summary + CVSS + MITRE mapping) |
| GitHub Actions minute quota limits | High | Low | Hourly run takes < 2 mins (~1,440 mins/mo), well within GitHub free tier (2,000 mins/mo) |

---

## 7. Phasing & Milestone Breakdown
- **Phase 0 (Technical Spike):** Validate GitHub Actions hourly cron trigger and rule-based regex/MITRE mapping logic.
- **Phase 1 (MVP):** Deploy full GitHub-native ingestion pipeline, static GitHub Pages dashboard, and Webhook dispatch.
- **Phase 2 (GA & Hardening):** Add automated GitHub Issue generation for High/Critical CVEs and community RSS feed contribution.

---

## 8. Kill Criteria *(G0 Output — Immutable)*

| # | Criterion | Threshold | How Measured | Phase That Tests It |
| :--- | :--- | :--- | :--- | :--- |
| **K1** | **Cost Payback Period Failure** | Blended CAC × 1.5 buffer > 12 months | Investment Analyst unit economics | Gate G2 |
| **K2** | **Processing Cost Inflation** | Processing cost > $0.05 per processed article | Measured GitHub Action runner compute cost | Gate G2, re-checked G4 |
| **K3** | **Insufficient Customer Pain (CPI)** | Highest CPI score across all feature VPs < 55 | CPI Ledger evaluation | Gate G2 |
| **K4** | **3rd-Party SaaS / LLM Dependency Breach** | Any feature requires a paid 3rd-party LLM API to operate | Architectural audit in Technical Feasibility | Gate G4 |

---

## 9. Research Question List *(Dispatches Wave 1)*

| # | Question | Scout Type | Why It Matters | Gates |
| :--- | :--- | :--- | :--- | :--- |
| **RQ-1** | What open-source deterministic NLP and rule-based summarization libraries exist that run efficiently in standard Python without 3rd-party LLMs? | `oss-scout` | Core architecture for FR-1.2 | Gate G1 |
| **RQ-2** | What public RSS, NVD, CISA KEV, and GitHub Advisory APIs are available without authentication limits for hourly ingestion? | `oss-scout` | Feed ingestion reliability for FR-1.1 | Gate G1 |
| **RQ-3** | What academic research exists on rule-based cybersecurity threat classification and MITRE ATT&CK automated extraction? | `academic-scout` | Accuracy benchmarks for deterministic mapping | Gate G1 |
| **RQ-4** | What are SecOps Tier 1-2 analysts and CISOs paying for commercial threat intelligence feeds, and what are the exact pain points with existing tools? | `market-scout` | Validates Customer Pain Index (CPI) & WTP | Gate G1, Gate G2 |
