# TODO.md - Open Items & Follow-ups

> Everything here stays open until done or explicitly postponed by Hugo.
> Finn reviews this every session and follows up on overdue items.

---

## 🔴 In Progress

### Switch primary model to Claude Haiku
- Change default from claude-sonnet-4-6 to claude-haiku
- Keep Sonnet available for complex/research tasks
- **Do tomorrow**

---

### Docker Desktop Install
- Hugo is downloading Docker Desktop for Windows
- **Next:** Run installer → enable WSL2 integration → confirm `docker --version` in WSL
- **Then:** Continue with guide: `guides/docker-cognee-setup.md` Part 3+
- **Blocked by:** Hugo completing install

---

## 🟡 Pending (not started)

### Cognee Setup
- Waiting on Docker to be ready
- Full steps in `guides/docker-cognee-setup.md`
- Covers: Docker Compose, plugin install, OpenClaw config, gateway restart

### Google OAuth — Gmail + Google Calendar
- Need to set up OAuth credentials in Google Cloud Console
- Connect Gmail to email-assistant skill
- Connect Google Calendar to google-calendar skill
- **Note:** Hugo uses both Gmail and Outlook

### GitHub Auth — gh CLI
- `gh auth login` done ✅
- Still need: GitHub Actions/workflows if we go that route

### Security — denyCommands cleanup
- Unknown command names in config flagged by security audit
- Low priority but should clean up
- Postponed — ask Hugo when to revisit

### Snyk Token for skill-guard
- skill-guard's scanner (mcp-scan renamed to snyk-agent-scan) requires SNYK_TOKEN
- Without it, scanner fails and falls back to manual review
- Get free token at: snyk.io/account
- Postponed — ask Hugo when to revisit

---

## 🟢 Completed

- [x] Named Finn, identity set up (2026-04-08)
- [x] USER.md filled in
- [x] skill-guard installed + source reviewed
- [x] playwright-scraper-skill installed + source reviewed + Chromium ready
- [x] smart-file-manager installed + source reviewed
- [x] google-calendar installed + source reviewed
- [x] email-assistant installed + source reviewed
- [x] flexible-database-design installed + source reviewed
- [x] github skill installed
- [x] task-automation-workflows installed
- [x] Brave Search API configured — web search live
- [x] web_fetch enabled
- [x] Security hardening: allowInsecureAuth=false, workspaceOnly=true
- [x] SQLite3 installed (v3.45.1)
- [x] gh CLI installed + authenticated (photoandvideo)
- [x] Workspace git init + first commit
- [x] Private GitHub backup repo created (photoandvideo/openclaw-workspace)
- [x] .gitignore — node_modules + secrets excluded
- [x] SETUP.md — living architecture document
- [x] guides/docker-cognee-setup.md — step-by-step install guide

---

## ⏸️ Postponed

*(nothing postponed yet)*

---

## 🟡 Pending (not started)

### Market Research — Parking Lot Services
- **Services:** Striping, resurfacing/recovering, patching
- **Research needed:**
  - Local demand (New York/New Jersey area)
  - Competitor landscape (who's doing it, how many, reviews)
  - Pricing benchmarks for each service type
  - Startup costs, equipment needed
  - Licensing/insurance requirements
- **Tools:** Brave Search + web scraping
- **Deliverable:** Full research report with actionable insights
- **Priority:** High — potential income replacement

### Lead Generation — Pinellas County FL
- Search for demand signals: Craigslist, Facebook Groups, Nextdoor, HomeAdvisor, Thumbtack, Angi
- Find people/businesses actively asking for parking lot striping, patching, resurfacing
- Pull contact info / leads where possible
- Goal: test market appetite before committing to startup
- **Do alongside market research**

---

## 💡 Future / Ideas

- Business ideas research (Hugo refining — will bring when ready)
- Daily brief automation (weather, calendar, email, news)
- Cognee custom build (Phase 3 — after evaluating stock Cognee)
- Outlook integration (alongside Gmail)
- Workflow automation design (after Cognee is live)

---

*Updated: 2026-04-10 | Reviewed by: Finn 🦊*
