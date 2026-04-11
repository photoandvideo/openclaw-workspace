# SETUP.md - System Architecture & Build Log

> Living document. Updated as we build.

---

## Agent Stack

**Name:** Finn 🦊  
**Platform:** OpenClaw  
**Host:** WSL2 (Windows) — Linux 6.6.87.2  
**Workspace:** `/home/fiber/.openclaw/workspace`  
**Channel:** Telegram (@hugodjordan)  
**Model:** claude-sonnet-4-6  

---

## Skills Installed

| Skill | Purpose | Status | Source Reviewed |
|-------|---------|--------|-----------------|
| skill-guard | Pre-install security scanner | ✅ Active | ✅ Yes |
| playwright-scraper-skill | Anti-bot web scraping (Chromium) | ✅ Active | ✅ Yes |
| smart-file-manager | File organization & archiving | ✅ Active | ✅ Yes |
| google-calendar | Google Calendar CRUD via API | ✅ Active | ✅ Yes |
| email-assistant | Gmail + Outlook management | ✅ Active | ✅ Yes |
| flexible-database-design | SQLite knowledge base | ✅ Active | ✅ Yes |
| github | GitHub via gh CLI | ✅ Active | ✅ Instruction-only |
| task-automation-workflows | Task & cron automation | ✅ Active | ✅ Instruction-only |

---

## Tools & Integrations

| Tool | Status | Notes |
|------|--------|-------|
| Brave Search API | ✅ Configured | Web search live |
| web_fetch | ✅ Enabled | Page fetching live |
| Playwright + Chromium | ✅ Installed | Anti-bot scraping ready |
| Git | ✅ Available | v2.43.0 |
| SQLite | ⚠️ Pending | Need: `sudo apt-get install -y sqlite3` |
| gh CLI | ⚠️ Pending | Need: `sudo apt-get install -y gh` |
| Docker | ⚠️ Pending | Install Docker Desktop on Windows |
| Cognee | ⚠️ Pending | Waiting on Docker |
| Google Calendar OAuth | ⚠️ Pending | OAuth setup needed |
| Gmail OAuth | ⚠️ Pending | OAuth setup needed |
| GitHub auth | ⚠️ Pending | `gh auth login` needed |
| Workspace git backup | ⚠️ Pending | Critical — do ASAP |

---

## Security Hardening Applied

- `gateway.controlUi.allowInsecureAuth` → **false** (disabled)
- `tools.fs.workspaceOnly` → **true** (file access locked to workspace)
- skill-guard installed for pre-install scanning
- All installed skills manually source-reviewed

---

## Memory Architecture

### Current (Phase 1)
- `MEMORY.md` — curated long-term facts
- `memory/YYYY-MM-DD.md` — daily raw logs
- Text-based, manual, flat

### Planned (Phase 2) — Cognee Integration
- Knowledge graph over all memory files
- Auto-index on startup + after each agent run
- Auto-recall: relevant memories injected before each prompt
- Graph traversal search (not just keyword)
- Runs locally via Docker — zero ongoing cost

### Long-term (Phase 3) — Custom Build
- Evaluate Cognee's gaps
- Build lightweight custom version tailored to Hugo's needs
- Potential business product

---

## Cognee Setup (Pending Docker)

**Install steps:**
1. ✅ Reviewed docs: docs.cognee.ai/integrations/openclaw-integration
2. ⏳ Install Docker Desktop for Windows (docker.com/products/docker-desktop)
3. ⏳ Enable WSL2 integration in Docker Desktop settings
4. ⏳ Run Cognee via Docker Compose
5. ⏳ Install plugin: `openclaw plugins install @cognee/cognee-openclaw`
6. ⏳ Configure plugin in `~/.openclaw/openclaw.json`
7. ⏳ Verify memory sync working

**Docker Compose file:** https://github.com/topoteretes/cognee-integrations/blob/main/integrations/openclaw/cognee-docker-compose.yaml

---

## Pending Actions (Priority Order)

1. 🔴 **Workspace git backup** — protects everything built so far
2. 🔴 **Docker Desktop** — required for Cognee
3. 🟡 `sudo apt-get install -y sqlite3 gh` — enables DB + GitHub
4. 🟡 **Cognee setup** — smart memory layer
5. 🟡 **Google OAuth** — Gmail + Calendar live
6. 🟡 **GitHub auth** — `gh auth login`
7. 🟢 **Business ideas** — research & analysis workflows

---

## Design Principles

- **Local first** — data stays on the machine
- **Open source first** — understand before trusting
- **Security first** — scan everything, review source code
- **Build to understand** — use tools to learn, then build our own
- **Document everything** — no tribal knowledge

---

*Last updated: 2026-04-10*
