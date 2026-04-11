# Recovery Guide — Getting Finn Back

> If something breaks and Finn is gone or misbehaving, follow this guide.
> Written before Cognee memory slot change on 2026-04-10.

---

## Scenario 1 — Gateway is down (Finn not responding)

### Step 1: Check gateway status
```bash
openclaw gateway status
```

### Step 2: Restart the gateway
```bash
openclaw gateway restart
```

### Step 3: Check for errors in logs
```bash
openclaw logs --follow
```

If it starts — you're done. If not, continue to Scenario 2.

---

## Scenario 2 — Config is broken (gateway won't start)

### Step 1: Restore the config backup
OpenClaw auto-backs up config on every change:
```bash
cp ~/.openclaw/openclaw.json.bak ~/.openclaw/openclaw.json
```

### Step 2: Restart the gateway
```bash
openclaw gateway restart
```

### Step 3: If still broken — reset Cognee memory slot to safe default
```bash
openclaw config set plugins.slots.memory "memory-core"
openclaw gateway restart
```

This falls back to the original flat-file memory system. Finn still works, just without Cognee's knowledge graph.

---

## Scenario 3 — Workspace files are corrupted or lost

### Step 1: Check what's in the workspace
```bash
ls ~/.openclaw/workspace/
```

### Step 2: Pull from GitHub backup
```bash
cd ~/.openclaw/workspace
git status
git log --oneline
```

### Step 3: Restore a specific file from GitHub
```bash
git checkout origin/master -- FILENAME.md
```
Example:
```bash
git checkout origin/master -- MEMORY.md
git checkout origin/master -- USER.md
git checkout origin/master -- SOUL.md
```

### Step 4: Restore the entire workspace from GitHub
```bash
cd ~
git clone https://github.com/photoandvideo/openclaw-workspace.git workspace-restore
```
Then manually copy what you need from `workspace-restore/` into `~/.openclaw/workspace/`.

---

## Scenario 4 — Complete fresh reinstall

If everything is gone and you need to start from scratch:

### Step 1: Reinstall OpenClaw
```bash
npm install -g openclaw
```

### Step 2: Restore workspace from GitHub
```bash
cd ~/.openclaw
git clone https://github.com/photoandvideo/openclaw-workspace.git workspace
```

### Step 3: Reconfigure Telegram
```bash
openclaw configure --section telegram
```

### Step 4: Restore secrets (manually — not in GitHub)
- Brave API key → `openclaw configure --section web`
- OpenAI key → `echo 'LLM_API_KEY=your-key' > ~/.openclaw/cognee/.env`
- Google OAuth → reconfigure via Google Cloud Console

### Step 5: Start Cognee
```bash
cd ~/.openclaw/cognee && docker compose up -d
```

### Step 6: Start gateway
```bash
openclaw gateway start
```

---

## Scenario 5 — Finn has wrong memory / acting confused

### Option A: Rollback config
```bash
cp ~/.openclaw/openclaw.json.bak ~/.openclaw/openclaw.json
openclaw gateway restart
```

### Option B: Reset memory slot
```bash
openclaw config set plugins.slots.memory "memory-core"
openclaw gateway restart
```

### Option C: Clear Cognee data and re-index
```bash
cd ~/.openclaw/cognee
docker compose down
docker volume rm cognee_cognee_data
docker compose up -d
```
This wipes Cognee's knowledge graph and starts fresh. Memory files (MEMORY.md etc.) are safe — they're in the workspace, not in Docker.

---

## Key File Locations

| What | Where |
|------|-------|
| OpenClaw config | `~/.openclaw/openclaw.json` |
| Config backup | `~/.openclaw/openclaw.json.bak` |
| Workspace | `~/.openclaw/workspace/` |
| GitHub backup | `https://github.com/photoandvideo/openclaw-workspace` |
| Cognee Docker | `~/.openclaw/cognee/docker-compose.yml` |
| Cognee secrets | `~/.openclaw/cognee/.env` |
| OpenClaw logs | `openclaw logs --follow` |
| Gateway status | `openclaw gateway status` |

---

## Quick Reference — Most Common Fix

```bash
# Gateway down? Try this first:
openclaw gateway restart

# Config broken? Restore backup:
cp ~/.openclaw/openclaw.json.bak ~/.openclaw/openclaw.json && openclaw gateway restart

# Cognee issue? Fall back to file memory:
openclaw config set plugins.slots.memory "memory-core" && openclaw gateway restart
```

---

*Created: 2026-04-10 | By: Finn 🦊*
*Keep this file safe — it's your emergency manual.*
