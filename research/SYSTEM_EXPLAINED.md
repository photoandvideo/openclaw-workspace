# 🏗️ Nexcom AI System — What Each Part Does
_Plain English explanation of the full stack_

---

## The Big Picture

When a customer texts your number, here's what happens in seconds:

```
Customer texts your number
        ↓
Twilio receives it
        ↓
Sends it to your bot on Render
        ↓
Bot responds instantly (AI conversation)
        ↓
Customer books a call
        ↓
Discord alerts your phone 📲
Calendar gets an event 📅
Lead is captured forever 💾
```

---

## Each Piece Explained

### 📱 SMS Bot
**What it is:** A small program that runs 24/7 on the internet
**What it does:** Receives texts, has a smart conversation, captures leads, books calls
**Why it matters:** This IS the product you're selling to clients
**Cost:** Free to build, ~$1-5/mo to run

---

### 🌐 Render (Hosting)
**What it is:** A free server on the internet
**What it does:** Keeps the SMS bot alive 24/7 even when your computer is off
**Why it matters:** Without it, the bot only works when your computer is on
**Cost:** Free forever for small apps

---

### 📞 Twilio (Phone Number)
**What it is:** A service that gives you a real phone number
**What it does:** Receives texts → sends to bot → delivers replies back as SMS
**Your number:** +1 (844) 314-6777
**Why it matters:** Real texts from real customers to a real number
**Cost:** ~$1/mo for number + ~$0.01 per message

---

### 🔔 Discord Notifications
**What it is:** Instant alerts to your phone
**What it does:** When someone books → Discord buzzes your phone with their info
**Why it matters:** Real-time awareness. During demos, prospect texts and your phone buzzes instantly — that's the wow moment
**Cost:** Free

---

### 📅 Google Calendar API
**What it is:** Automatic calendar booking
**What it does:** When someone books a call → calendar event created automatically
**Why it matters:** Zero manual work, never miss a booked call
**Cost:** Free (1M requests/day free tier)

---

### 💾 GitHub (Backup & Deployment)
**What it is:** Where all code and files live in the cloud
**What it does:** Stores everything safely + when you push changes, Render auto-updates the live bot
**Repo:** github.com/photoandvideo/finn-workspace
**Why it matters:** Nothing is ever lost, easy to update
**Cost:** Free

---

### 🤖 OpenClaw + Finn
**What it is:** Your personal AI assistant (me!)
**What it does:** Manages everything, builds the product, keeps memory, runs automations
**Why it matters:** The brain behind the operation
**Cost:** ~$5-15/mo in API usage

---

## Full Monthly Cost Breakdown

| Service | Cost |
|---|---|
| Render (hosting) | Free |
| GitHub | Free |
| Google Calendar API | Free |
| Discord | Free |
| Twilio number | ~$1/mo |
| Twilio SMS usage | ~$1-5/mo |
| OpenClaw/Claude API | ~$5-15/mo |
| **Total** | **~$7-21/month** |

**What you charge clients: $300-500/month**
**Your margin: 95%+** 🎉

---

## What to Tell Clients

> "The whole system runs on about $5-10 a month in infrastructure.
> You pay us for the setup, customization, maintenance, and expertise —
> not for the raw technology cost. The AI itself is nearly free.
> What's not free is knowing how to build it, configure it, and make it
> work perfectly for your specific business."

---

## The Demo Flow (how to close deals)

1. You're on a call with a prospect
2. Say: *"Text my business number right now — +1 (844) 314-6777"*
3. They text it
4. AI responds in seconds
5. YOUR phone buzzes with Discord notification
6. Show them: *"See that? That's your lead, captured instantly"*
7. Show them the dashboard
8. They say: *"I need this"*
9. Close the deal ✅

---

*Nexcom AI · nexcomai.ai · hello@nexcomai.ai · Tampa Bay, FL*
*Last updated: 2026-04-04*
