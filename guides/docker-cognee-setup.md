# Docker + Cognee Setup Guide

> Follow these steps in order. Each section has a checkpoint so you know it worked.

---

## Part 1 — Install Docker Desktop (Windows)

### Step 1 — Download Docker Desktop

1. Open your browser and go to: **https://docker.com/products/docker-desktop**
2. Click **"Download for Windows"**
3. Run the installer (`Docker Desktop Installer.exe`)
4. During install, make sure **"Use WSL 2 instead of Hyper-V"** is checked ✅
5. Click **OK / Finish**
6. Restart your computer when prompted

### Step 2 — Configure Docker Desktop for WSL2

1. Open **Docker Desktop** from the Start menu
2. Go to ⚙️ **Settings** (top right gear icon)
3. Click **Resources → WSL Integration**
4. Toggle **ON** your WSL distro (should show something like `Ubuntu` or `Debian`)
5. Click **Apply & Restart**

### ✅ Checkpoint 1

Open your WSL terminal and run:
```bash
docker --version
```
You should see something like: `Docker version 26.x.x`

If you see that — Docker is ready. Move to Part 2.

---

## Part 2 — Install Missing System Tools

In your WSL terminal, run:

```bash
sudo apt-get update && sudo apt-get install -y sqlite3 gh
```

### ✅ Checkpoint 2

```bash
sqlite3 --version
gh --version
```
Both should print version numbers.

---

## Part 3 — Run Cognee with Docker

### Step 1 — Download the Cognee Docker Compose file

In your WSL terminal, run:

```bash
mkdir -p ~/.openclaw/cognee && cd ~/.openclaw/cognee
curl -o docker-compose.yml https://raw.githubusercontent.com/topoteretes/cognee-integrations/main/integrations/openclaw/cognee-docker-compose.yaml
```

### Step 2 — Start Cognee

```bash
cd ~/.openclaw/cognee
docker compose up -d
```

This will pull the Cognee image and start it in the background. First run may take a few minutes.

### ✅ Checkpoint 3

```bash
curl http://localhost:8000/api/v1/health
```

You should see something like: `{"status": "ok"}`

If you see that — Cognee is running. Move to Part 4.

---

## Part 4 — Install Cognee Plugin for OpenClaw

In your WSL terminal, run:

```bash
openclaw plugins install @cognee/cognee-openclaw
```

### ✅ Checkpoint 4

```bash
openclaw plugins list
```

You should see `cognee-openclaw` in the list.

---

## Part 5 — Configure the Plugin

In your WSL terminal, run:

```bash
openclaw config set plugins.entries.cognee-openclaw.enabled true
openclaw config set plugins.entries.cognee-openclaw.config.baseUrl "http://localhost:8000"
openclaw config set plugins.entries.cognee-openclaw.config.datasetName "finn-memory"
openclaw config set plugins.entries.cognee-openclaw.config.searchType "GRAPH_COMPLETION"
openclaw config set plugins.entries.cognee-openclaw.config.autoRecall true
openclaw config set plugins.entries.cognee-openclaw.config.autoIndex true
```

Then restart the gateway:

```bash
openclaw gateway restart
```

### ✅ Checkpoint 5

```bash
openclaw status
```

Look for `cognee-openclaw` in the plugins section showing as **enabled**.

---

## Part 6 — Set Up Workspace Git Backup

In your WSL terminal, run:

```bash
cd ~/.openclaw/workspace
git init
git add -A
git commit -m "Initial commit — Finn workspace setup"
```

### Step 2 — Create a private GitHub repo (optional but recommended)

1. Go to **github.com/new**
2. Create a **private** repo named `finn-workspace`
3. Copy the repo URL (e.g. `https://github.com/yourusername/finn-workspace.git`)
4. Run:

```bash
git remote add origin https://github.com/yourusername/finn-workspace.git
git push -u origin main
```

### ✅ Checkpoint 6

```bash
git log --oneline
```

Should show your first commit.

---

## Summary — What You'll Have When Done

| Item | Status |
|------|--------|
| Docker Desktop | ✅ Installed |
| WSL2 Docker integration | ✅ Enabled |
| sqlite3 + gh CLI | ✅ Installed |
| Cognee running locally | ✅ Running |
| Cognee OpenClaw plugin | ✅ Connected |
| Smart memory (knowledge graph) | ✅ Active |
| Workspace git backup | ✅ Protected |

---

## Troubleshooting

**Docker not found in WSL after install:**
Close and reopen your WSL terminal. If still missing, restart Docker Desktop.

**Cognee health check fails:**
Wait 30 seconds and try again — it takes a moment to fully start.

**Plugin install fails:**
Make sure the gateway is running: `openclaw gateway status`

**Permission denied errors:**
Add `sudo` before the command.

---

## ⚠️ Important: Cognee Docker Auto-Start

Cognee runs in Docker. Docker Desktop must be running for Cognee to work.

**To start Cognee after a reboot:**
```bash
cd ~/.openclaw/cognee && docker compose up -d
```

**To make it start automatically with Docker Desktop:**
In Docker Desktop → Settings → General → enable "Start Docker Desktop when you log in"
The `restart: unless-stopped` in docker-compose.yml means Cognee auto-starts when Docker starts.

**Verify it's running:**
```bash
curl http://localhost:8000/
```
Should return: `{"message":"Hello, World, I am alive!"}`

**OpenClaw memory slot config (set once, survives reboots):**
```bash
openclaw config set plugins.slots.memory "cognee-openclaw"
```

**The .env file with OpenAI key lives at:**
`~/.openclaw/cognee/.env`
Never commit this file. It's in .gitignore.

---

*Created: 2026-04-10 | By: Finn 🦊*
