# 🤖 Your Personal AI Assistant — Setup Guide
### Get your own AI like Finn running in under 30 minutes

---

## What you'll have when done
- Your own AI assistant connected to Telegram
- It remembers your conversations and learns about you
- Available 24/7 from your phone
- Works in English and Spanish
- Costs ~$5-10/month in API usage

---

## What you need
- A computer (Windows, Mac, or Linux)
- Internet connection
- A Telegram account (free)
- A credit/debit card for the API key ($5-10/mo)

---

## STEP 1 — Install Node.js
Node.js is the engine that runs OpenClaw.

**Windows/Mac:**
1. Go to: **https://nodejs.org**
2. Download the **LTS version** (the green button)
3. Install it — click Next, Next, Finish
4. Open Terminal (Mac) or Command Prompt (Windows)
5. Type: `node --version`
6. You should see something like `v24.x.x` ✅

---

## STEP 2 — Install OpenClaw
Open Terminal/Command Prompt and paste this:

```bash
npm install -g openclaw@latest
```

Wait for it to finish (1-2 minutes). Then check it worked:

```bash
openclaw --version
```

You should see a version number ✅

---

## STEP 3 — Get your AI API key
This is what powers the AI brain.

1. Go to: **https://console.anthropic.com**
2. Sign up with your email
3. Go to **API Keys** → click **Create Key**
4. Copy the key (starts with `sk-ant-...`)
5. Keep it safe — don't share it with anyone

💡 Add $10 credit to start — will last 1-2 months for personal use

---

## STEP 4 — Create your Telegram bot
This gives you a private bot to chat with.

1. Open Telegram and search for **@BotFather**
2. Send: `/newbot`
3. Choose a name (e.g. "My AI Assistant")
4. Choose a username (e.g. `myai_hugo_bot`) — must end in `bot`
5. BotFather gives you a token — copy it (looks like `123456:ABCdef...`)

---

## STEP 5 — Run the setup wizard

In your Terminal, run:

```bash
openclaw onboard
```

It will ask you:
- **API provider:** Choose `Anthropic`
- **API key:** Paste your key from Step 3
- **Channel:** Choose `Telegram`
- **Bot token:** Paste your token from Step 4
- **Install as service:** Yes (so it starts automatically)

Follow the prompts — takes about 3 minutes.

---

## STEP 6 — Pair your Telegram

After setup, in Terminal run:

```bash
openclaw gateway start
```

Then open Telegram and message your new bot. It will ask for a pairing code.

In Terminal, run:
```bash
openclaw pairing list telegram
openclaw pairing approve telegram <CODE>
```

Replace `<CODE>` with the code shown.

**You're connected!** 🎉

---

## STEP 7 — Make it yours

Now chat with your bot and introduce yourself:

> "Hi! My name is [your name]. I'm based in [city], Bolivia. I work in [your job]. I want you to help me with [what you need]."

Your AI will remember this and get smarter about you over time.

---

## Daily use tips

**From Telegram:**
- Just chat naturally — ask anything
- Send voice messages — it transcribes them
- Send photos — it can analyze them
- Send documents/PDFs — it can read them

**Useful commands:**
- `/status` — see current settings
- `/model` — switch AI model
- `/reasoning` — deeper thinking mode

---

## Keeping it running

Your AI runs on your computer. To keep it available 24/7:
- Leave your computer on (or on sleep, not shutdown)
- It starts automatically when you boot up

**For 24/7 without leaving your computer on:**
Ask Hugo — he can set you up on a small cloud server for ~$5/mo.

---

## Costs summary

| Item | Cost |
|---|---|
| OpenClaw | Free (open source) |
| Anthropic API | ~$5-10/month |
| Telegram | Free |
| **Total** | **~$5-10/month** |

---

## Need help?

Contact Hugo:
- Telegram: @hugodjordan
- Email: hello@nexcomai.ai
- Website: nexcomai.ai

---

## Bonus: Make it speak Spanish

Just tell your AI:

> "Please respond to me in Spanish from now on."

It will switch languages immediately. You can switch back anytime.

---

*Setup guide by Nexcom AI · nexcomai.ai · Tampa Bay, FL*
*¿Necesitas ayuda en español? ¡Con gusto!*
