# 💰 Nexcom AI — True Cost Per Client
_Every tool, every tier, what's free vs paid, and exactly what you spend per client_

---

## 🛠️ TOOL-BY-TOOL BREAKDOWN

---

### 1. 🌐 RENDER (Bot Hosting)

| Tier | Cost | Limitation | When to Use |
|---|---|---|---|
| Free | $0/mo | Sleeps after 15min, 30s wake time | Testing only |
| Starter | $7/mo | Always on, 512MB RAM | 1-5 clients |
| Standard | $25/mo | Always on, 2GB RAM | 5-20 clients |
| Pro | $85/mo | Always on, 4GB RAM | 20+ clients |

**Current:** Free (with UptimeRobot ping to keep awake)
**Upgrade trigger:** When first client pays → upgrade to Starter ($7/mo)
**Per client cost:** $7 ÷ 5 clients = **$1.40/client** (shared server)

---

### 2. 📞 TWILIO (SMS/Phone)

| Item | Cost | Notes |
|---|---|---|
| Trial account | $15.50 credit | Max 160 chars, verified numbers only |
| Upgrade (production) | $20 deposit | Removes all restrictions |
| Toll-free number (844) | $2.00/mo | Your main business number |
| Local number (727) | $1.15/mo | For outreach calls |
| SMS inbound | $0.0075/msg | ~1 cent per incoming text |
| SMS outbound | $0.0079/msg | ~1 cent per outgoing text |
| WhatsApp messages | $0.005–0.08/conversation | Meta pricing |

**Per client estimate (500 msgs/mo):**
- Number: $1.15/mo
- SMS: ~$4.00/mo
- **Total: ~$5.15/client/mo**

**Trial → Production trigger:** Now (need to upgrade to fix SMS)

---

### 3. 🤖 ANTHROPIC/CLAUDE (AI Brain)

| Model | Input cost | Output cost | Best for |
|---|---|---|---|
| Claude Haiku | $0.25/1M tokens | $1.25/1M tokens | Daily chat — cheapest |
| Claude Sonnet | $3/1M tokens | $15/1M tokens | Complex tasks |
| Claude Opus | $15/1M tokens | $75/1M tokens | Critical analysis |

**What is a token?** ~0.75 words. A typical conversation = 500-2,000 tokens.

**Per client estimate (1,000 conversations/mo):**
- Average 1,000 tokens per conversation
- Using Haiku: 1M tokens × $0.25 = **$0.25/mo per client** ← almost free!
- Using Sonnet: 1M tokens × $3 = **$3/mo per client**

**Recommendation:** Haiku for client bots (cheap, fast, good enough)

---

### 4. 🌍 GOOGLE CALENDAR API

| Tier | Cost | Limit |
|---|---|---|
| Free | $0 | 1,000,000 requests/day |
| Paid | $6/1M requests | Only if you exceed free tier |

**Per client cost: $0** — free forever for our use case
**Setup time:** 30 min per client

---

### 5. 📧 EMAIL (Notifications)

| Service | Free Tier | Paid | Notes |
|---|---|---|---|
| Gmail SMTP | 500 emails/day | Free | What we use now |
| SendGrid | 100 emails/day | $19.95/mo (50K emails) | Better deliverability |
| Resend | 3,000 emails/mo | $20/mo (50K) | Modern, easy |
| Mailgun | 100 emails/day | $35/mo (50K) | Good alternative |

**Current:** Gmail SMTP — free
**Upgrade trigger:** When sending >500 emails/day (not anytime soon)
**Per client cost: $0**

---

### 6. 💬 DISCORD (Notifications to you)

| Tier | Cost | Notes |
|---|---|---|
| Free | $0 | Unlimited webhooks, unlimited messages |
| Nitro | $9.99/mo | Not needed for business use |

**Per client cost: $0** — free forever

---

### 7. 📱 META (Facebook/Instagram/WhatsApp)

| Platform | Cost | Notes |
|---|---|---|
| Facebook Messenger | $0 | Free after App Review approval |
| Instagram DMs | $0 | Free after App Review approval |
| WhatsApp Business API | $0.005–0.08/conversation | Meta charges per 24hr window |

**WhatsApp cost per client (100 conversations/mo):**
- ~$0.50–$8.00/mo depending on message type

**App Review:** Free, takes 1-7 days
**Per client cost:** $0 (FB/IG) or ~$2-5/mo (WhatsApp)

---

### 8. 🍓 RASPBERRY PI (Nexcom AI Box)

| Item | One-time | Monthly |
|---|---|---|
| Hardware (Pi 5 + accessories) | ~$122 | — |
| Ollama AI (local model) | $0 | $0 |
| OpenClaw software | $0 | $0 |
| Claude fallback (optional) | — | $1-2/mo |
| **Total** | **$122** | **$1-2/mo** |

**Sell at:** $299 hardware + $50/mo service
**Margin:** $177 one-time + $48/mo

---

### 9. 🔒 GITHUB (Code Backup)

| Tier | Cost | Notes |
|---|---|---|
| Free | $0 | Unlimited private repos |
| Team | $4/user/mo | Not needed |

**Per client cost: $0**

---

### 10. 📊 UPTIMEROBOT (Bot Monitoring)

| Tier | Cost | Monitors | Notes |
|---|---|---|---|
| Free | $0 | 50 monitors | 5-min intervals |
| Pro | $7/mo | Unlimited | 1-min intervals |

**Current:** Free — plenty for now
**Per client cost: $0**

---

## 📊 TOTAL COST PER CLIENT (Summary)

### Starter Client ($300/mo)
| Tool | Monthly Cost |
|---|---|
| Render (shared) | $1.40 |
| Twilio number + SMS | $5.15 |
| Claude API (Haiku) | $0.50 |
| Google Calendar | $0 |
| Email | $0 |
| Discord | $0 |
| Facebook/Instagram | $0 |
| GitHub | $0 |
| UptimeRobot | $0 |
| **TOTAL COST** | **$7.05/mo** |
| **Revenue** | **$300/mo** |
| **Profit** | **$292.95/mo** |
| **Margin** | **97.7%** |

### Growth Client ($500/mo)
| Tool | Monthly Cost |
|---|---|
| Render (shared) | $1.40 |
| Twilio (more msgs) | $8.00 |
| Claude API | $2.00 |
| WhatsApp | $3.00 |
| **TOTAL COST** | **$14.40/mo** |
| **Revenue** | **$500/mo** |
| **Profit** | **$485.60/mo** |
| **Margin** | **97.1%** |

---

## 🎯 TRIAL → PAID UPGRADE SCHEDULE

| Tool | Upgrade When | Cost |
|---|---|---|
| Twilio | NOW (fix SMS) | $20 deposit |
| Render | First client pays | $7/mo |
| SendGrid | >500 emails/day | $20/mo |
| UptimeRobot Pro | Need 1-min checks | $7/mo |
| Render Standard | 5+ clients | $25/mo |

**Next action: Upgrade Twilio ($20) → SMS starts working**

---

## 💡 KEY INSIGHT

Your **true cost per client is ~$7-15/mo**.

You charge **$300-500/mo**.

That's **95-97% gross margin** — one of the highest margin businesses possible.

The main cost is your TIME, not the technology.

---

*Last updated: 2026-04-06 · Nexcom AI LLC · nexcomai.ai*
