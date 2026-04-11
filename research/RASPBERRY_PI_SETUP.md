# 🍓 Nexcom AI Box — Raspberry Pi Setup Guide
### Local AI + OpenClaw on a Pi — Zero API costs

---

## What you'll have when done
- Raspberry Pi running a local AI model (no internet needed for AI)
- OpenClaw connected to Telegram
- Plug into power + WiFi → works instantly
- Cost: ~$80 hardware + $0/month ongoing

---

## Hardware needed
- **Raspberry Pi 5** (4GB or 8GB RAM) — ~$60-80
  - Buy at: raspberrypi.com or Amazon
- **MicroSD card** (32GB+, fast) — ~$10
- **Power supply** (USB-C 27W) — ~$12
- **Case** (optional but recommended) — ~$10
- **MicroSD card reader** — to flash the OS from your PC

**Total: ~$80-100**

---

## STEP 1 — Flash the OS

On your regular computer:

1. Download **Raspberry Pi Imager**:
   🔗 https://www.raspberrypi.com/software/

2. Insert MicroSD card into your computer

3. Open Imager → click **Choose OS**
   → Raspberry Pi OS (64-bit) — the full desktop version

4. Click **Choose Storage** → select your MicroSD

5. Click the ⚙️ gear icon (Advanced options):
   - ✅ Set hostname: `nexcomai-box`
   - ✅ Enable SSH
   - ✅ Set username: `finn`
   - ✅ Set password: (something you'll remember)
   - ✅ Configure WiFi: enter your network name + password

6. Click **Write** → wait ~5 minutes

---

## STEP 2 — First boot

1. Insert MicroSD into Pi
2. Plug in power
3. Wait 2 minutes for first boot

**Connect via SSH** (from your computer terminal):
```bash
ssh finn@nexcomai-box.local
```

Enter your password. You're in! ✅

---

## STEP 3 — Update the system

```bash
sudo apt update && sudo apt upgrade -y
```

Takes 5-10 minutes. Let it run.

---

## STEP 4 — Install Ollama

Ollama is the tool that runs AI models locally:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Verify it installed:
```bash
ollama --version
```

---

## STEP 5 — Download an AI model

**Best models for Pi 5 (4GB RAM):**

```bash
# Recommended — fast, smart, speaks Spanish too
ollama pull llama3.2:3b

# Lighter option — even faster
ollama pull phi3:mini

# Smarter but slower on Pi
ollama pull mistral:7b
```

Wait for download (1-3GB). Then test it:
```bash
ollama run llama3.2:3b
```

Type "Hello! Can you speak Spanish?" — it should respond. Type `/bye` to exit.

---

## STEP 6 — Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node --version
```

Should show `v22.x.x` ✅

---

## STEP 7 — Install OpenClaw

```bash
npm install -g openclaw@latest
openclaw --version
```

---

## STEP 8 — Configure OpenClaw to use Ollama

Run the setup wizard:
```bash
openclaw onboard
```

When asked for AI provider:
- Choose **Ollama**
- Model: `llama3.2:3b`
- Channel: **Telegram**
- Bot token: (create a new bot in BotFather for this Pi)
- Install as service: **Yes**

---

## STEP 9 — Make it start on boot

```bash
openclaw gateway start
sudo systemctl enable openclaw
```

Now every time the Pi powers on, OpenClaw starts automatically.

---

## STEP 10 — Test it

Open Telegram → message the bot → it should respond!

The AI is running 100% on the Pi. No internet needed for the AI itself (only for Telegram messages).

---

## Performance expectations on Pi 5

| Model | Speed | Quality | RAM used |
|---|---|---|---|
| llama3.2:3b | ~3-5 sec/response | Good | ~2GB |
| phi3:mini | ~2-3 sec/response | OK | ~1.5GB |
| mistral:7b | ~15-30 sec/response | Great | ~4GB |

**Tip:** For the Bolivia box, use `llama3.2:3b` — best balance of speed and quality on 4GB Pi.

---

## HYBRID MODE (Best of both worlds)

Use Ollama for casual chat (free) + Claude for complex tasks (paid):

In `~/.openclaw/openclaw.json`:
```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "ollama/llama3.2:3b",
        "failover": ["anthropic/claude-haiku-3-5-20241022"]
      }
    }
  }
}
```

This way:
- 90% of messages → Ollama (free, local)
- Complex tasks → Claude Haiku (cheap fallback)
- Building/coding → Claude Sonnet (when needed)

**Monthly cost: ~$1-2 instead of $15-30** 🎉

---

## Making it a product (Nexcom AI Box)

To ship to Bolivia or sell to customers:

1. **Build it here** — set up everything, test fully
2. **Create a setup script** — one command that configures everything
3. **Label it** — print a Nexcom AI sticker 😄
4. **Ship it** — flat rate USPS box to Bolivia ~$40-60
5. **Plug & play** — they plug into power + ethernet, done

**Box contents:**
- Raspberry Pi 5 (configured)
- MicroSD (with everything installed)
- Power supply
- Short ethernet cable
- Simple instruction card: "1. Plug in power. 2. Plug in ethernet. 3. Open Telegram."

---

## Troubleshooting

**Can't connect via SSH:**
```bash
# Try IP address instead
ssh finn@192.168.x.x
# Find IP: check your router's device list
```

**Ollama slow:**
- Use smaller model (`phi3:mini`)
- Make sure Pi 5, not Pi 4

**OpenClaw not starting:**
```bash
openclaw gateway status
openclaw doctor --repair
```

---

## Cost summary

| Item | Cost |
|---|---|
| Raspberry Pi 5 (4GB) | ~$60 |
| MicroSD 32GB | ~$10 |
| Power supply | ~$12 |
| Case | ~$8 |
| **Hardware total** | **~$90** |
| Ollama AI | $0/month |
| OpenClaw | $0/month |
| Claude fallback (optional) | ~$1-2/month |
| **Monthly total** | **$0-2/month** |

---

*Nexcom AI Box · nexcomai.ai · Built by Hugo & Finn 🦊*
