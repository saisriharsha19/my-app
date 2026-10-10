# Current profile and content

Reviewed: October 9, 2026.

The career summary was reconciled against the owner's October 2026 résumé and the owner's corrections in this project. Older résumé variants and the previous site differed on role titles, education status, project implementations, and platform metrics.

- Current role: Infrastructure Platform Engineer IV, University of Florida Information Technology.
- UF IT tenure: May 2025–present. This dates the tenure, not a claim that the current title was held throughout it.
- Current impact: maintaining and extending a LiteLLM gateway on a **shared platform processing 9B+ tokens/day**. Preserve the shared-platform qualification.
- Real-time work: 2,000+ concurrent token streams across 12+ generative AI workflows.
- Operations: 10+ Kubernetes microservices, Terraform, F5 load balancing, and GitLab CI/CD.
- TCS role: Systems Engineer, August 2022–December 2023.
- Education: M.S. Computer Science, University of Florida, completed December 2025; B.Tech Computer Science, JNTU Kakinada, completed June 2022.
- IntentGuard: the current alpha implementation is Python + LiteLLM. Do not reuse an older Rust implementation description.
- The public résumé is refreshed, and its portfolio link points to the canonical website domain.

Edit `src/data/profile.json` for career facts, impact, education, and curated projects. `profile.js` exports the JSON to the homepage, experience page, portfolio, and structured metadata. The original 15 public project records are preserved in `portfolio-archive.json`; their older wording does not override current curated descriptions.

Do not restore the earlier intern title, rounded GPA, 800→480 ms headline, or 10M-document TCS claim from historical versions. P95 remains a secondary detail in the current résumé, rather than the homepage’s headline impact.

Project diagrams are conceptual illustrations of each project's purpose. They show no fabricated usage counters or live operational data.

The 27 new engineering journals in `src/data/journals.json` were published October 9, 2026. At the owner's request, their displayed journal dates (`created_at`) are distributed from January 9 through October 8, 2026. Actual publication dates remain in `published_at`, and revision dates in `updated_at`; these fields drive publication metadata and sitemap modification dates. The three imported archive articles retain their original July 2025 dates and numeric URLs.

All 30 articles are repository-managed JSON content. They use grounded profile facts, original commentary, clearly illustrative scenarios, and primary documentation links for specific technical behavior. Hypothetical incidents are not represented as events at UF or TCS. The build prerenders every article, adds exact Azure routes, and generates the sitemap. Keep public slugs stable when editing and update `updated_at` for substantive revisions.

Project engineering details live in `src/data/engineering.json`, joined to the profile projects by ID. Each of the 16 projects has a stable `/portfolio/<slug>` page containing its architecture, interfaces, decisions, scope, and source-file links. Update these details from implementation code rather than README performance claims. The homepage and experience page use résumé-grounded platform component maps from `profile.json`; public NavigatorPrompt code is not asserted to be the internal UF IT deployment.

The October 2026 code review corrected several earlier descriptions: WebLMS uses local extractive Q&A and an ONNX placeholder, not a FastAPI/Redis backend; the incident projects use PDF extraction, SQLite, and batch charts; the name predictor reconstructs redacted names; the job scraper is a single-run script; the Delphi interpreter visits an ANTLR parse tree. IntentGuard's API-unavailable path is permissive, and Vision AI's random-vector fallback is explicitly scoped as a prototype limitation. Do not replace these implementation facts with generic production or safety claims.

The portfolio, journals, profile, and contact page have no backend dependency. Contact is direct email. The old `/thank-you` route redirects to contact because the website no longer submits or stores messages. See [database retirement](database-retirement.md) for the infrastructure scope and recovery procedure.
