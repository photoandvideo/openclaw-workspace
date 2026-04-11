# 💰 Nexcom AI — Costs & Alternatives Sheet
_Know your stack inside out. Use this to explain, upsell, and make decisions._

---

## 🌐 HOSTING (Running the SMS Bot)

| Option | Cost | Pros | Cons | Best For |
|---|---|---|---|---|
| **Render (Free)** | $0/mo | Free, easy, auto-deploy | Sleeps after 15min inactivity (30s wake) | Testing, demos, early clients |
| **Render (Starter)** | $7/mo | Always on, fast | Small cost | Production clients |
| **Railway** | $5 credit then ~$5/mo | Easy to use | Not truly free | Alternative to Render |
| **DigitalOcean** | $6/mo | Reliable, full control | Slightly technical | Multiple clients on one server |
| **Your own PC** | $0 | Free | Must be always on | Testing only |

**Recommendation:** Start with Render Free → upgrade to Render Starter ($7/mo) when first client pays.

---

## 📞 PHONE / SMS (Twilio)

| Item | Cost | Notes |
|---|---|---|
| Local number (727) | $1.15/mo | Best for cold calls — local trust |
| Toll-free (844) | $2/mo | Good for business credibility |
| SMS outbound | $0.0079/msg | Less than 1 cent per message |
| SMS inbound | $0.0075/msg | Less than 1 cent per message |
| Voice calls | $0.014/min | Very cheap |

**Example:** 1,000 SMS messages/month = ~$8 total
**Recommendation:** Get both a local 727 AND toll-free 844 number. Use 727 for outreach, 844 for the business.

**Alternatives to Twilio:**
| Service | Cost | Notes |
|---|---|---|
| **Vonage** | Similar | Good alternative |
| **Plivo** | Cheaper | Less features |
| **Bandwidth** | Enterprise | For high volume |

---

## 🤖 AI BRAIN (Language Model)

| Model | Cost | Speed | Quality | Best For |
|---|---|---|---|---|
| **Claude Haiku** | ~$0.25/1M tokens | Fast | Good | Daily chat, simple tasks |
| **Claude Sonnet** | ~$3/1M tokens | Medium | Excellent | Building, complex tasks |
| **Claude Opus** | ~$15/1M tokens | Slow | Best | Critical analysis |
| **GPT-4o Mini** | ~$0.15/1M tokens | Fast | Good | Budget alternative |
| **Gemini Flash** | ~$0.075/1M tokens | Very fast | Good | Cheapest cloud option |
| **Ollama (local)** | $0 | Depends on PC | Good | Zero cost, privacy |
| **Llama 3.2 (Pi)** | $0 | 3-5 sec | Good | Raspberry Pi box |

**Your current setup:** Claude Haiku (default) + Sonnet (fallback)
**Monthly estimate:** $5-15/mo for personal use

---

## 📅 CALENDAR

| Option | Cost | Notes |
|---|---|---|
| **Google Calendar API** | Free | 1M requests/day free tier |
| **Calendly** | Free-$16/mo | Easy but less control |
| **Cal.com** | Free (self-hosted) | Open source Calendly alternative |

**Recommendation:** Google Calendar API — free, integrates with everyone's existing calendar.

---

## 📧 EMAIL NOTIFICATIONS

| Option | Cost | Notes |
|---|---|---|
| **Gmail SMTP** | Free | Up to 500 emails/day |
| **SendGrid** | Free (100/day) | Better deliverability |
| **Resend** | Free (3000/mo) | Modern, easy API |
| **Mailgun** | Free (100/day) | Good alternative |

**Recommendation:** Gmail SMTP for now, SendGrid when scaling.

---

## 🔔 NOTIFICATIONS (Discord/Slack)

| Option | Cost | Notes |
|---|---|---|
| **Discord Webhooks** | Free | What we use — instant, free forever |
| **Slack Webhooks** | Free | Good for business clients who use Slack |
| **Telegram Bot** | Free | Works great too |
| **Push notifications** | Free | Via Pushover app ($5 one-time) |

---

## 💾 CODE BACKUP (GitHub)

| Option | Cost | Notes |
|---|---|---|
| **GitHub (private)** | Free | What we use — unlimited private repos |
| **GitLab** | Free | Good alternative |
| **Bitbucket** | Free | Another alternative |

---

## 🍓 HARDWARE (Raspberry Pi Box)

| Item | Cost | Notes |
|---|---|---|
| Raspberry Pi 5 (8GB) | ~$80 | The brain |
| MicroSD 64GB | ~$12 | Storage |
| Power supply (27W) | ~$12 | Official Pi supply |
| Case with fan | ~$10 | Cooling — important! |
| MicroSD reader | ~$8 | For setup from PC |
| **Total hardware** | **~$122** | One-time cost |
| Ollama AI (local model) | $0/mo | Runs on the Pi |
| OpenClaw | $0/mo | Free software |
| Claude fallback (optional) | ~$1-2/mo | For complex questions |
| **Monthly ongoing** | **~$1-2/mo** | Near zero |

**Sell price:** $299 box + $50/mo service
**Your margin:** ~$177 on hardware + $48/mo ongoing

---

## 📊 PRICING TIERS FOR CLIENTS

### Starter — $500 setup + $300/mo
Your cost to deliver:
- Render Starter: $7/mo
- Twilio: ~$3/mo
- Claude API: ~$5/mo
- Your time: 2-3 hrs setup
- **Total cost: ~$15/mo + setup time**
- **Margin: ~$285/mo (95%)**

### Growth — $1,000 setup + $500/mo
Your cost to deliver:
- Everything above +
- Multiple channels (FB, IG, WhatsApp)
- Email integration
- Calendar booking
- **Total cost: ~$25/mo + setup time**
- **Margin: ~$475/mo (95%)**

### Nexcom AI Box — $299 one-time + $50/mo
Your cost to deliver:
- Hardware: ~$122
- Monthly: ~$2/mo
- **Margin: ~$177 one-time + $48/mo**

---

## 💡 WHAT TO TELL CLIENTS ABOUT COSTS

> "The technology itself costs about $5-15 a month to run.
> What you're paying for is our expertise — setting it up correctly,
> training it on your specific business, maintaining it, and making
> sure it always works. Just like you pay a plumber for their knowledge,
> not just the pipe they install."

---

---

## 📱 PLATFORM INTEGRATIONS

| Platform | Setup Time | Monthly Cost | Notes |
|---|---|---|---|
| Website Chat | Done ✅ | $0 | Embed on any site |
| SMS (Twilio) | Done ✅ | ~$3-5/client | Per message fees |
| WhatsApp | 2-3 hrs | ~$0.005-0.08/conversation | Via Twilio |
| Facebook Messenger | 3-5 hrs + Meta review | $0 | Free but approval needed |
| Instagram DMs | 3-5 hrs + Meta review | $0 | Needs 1000 followers |
| Google Business | 2-3 hrs | $0 | Free, underused by competitors |

### What to Charge Per Platform Add-on

| Add-on | Charge | Your Cost | Margin |
|---|---|---|---|
| WhatsApp | +$100 setup + $50/mo | ~$2/mo | ~$48/mo |
| Facebook Messenger | +$150 setup | ~$0 | ~$150 |
| Instagram | +$150 setup | ~$0 | ~$150 |
| Google Business | +$100 setup | ~$0 | ~$100 |
| All platforms bundle | +$400 setup + $100/mo | ~$5/mo | ~$95/mo |

---

*Last updated: 2026-04-04 · Nexcom AI · nexcomai.ai*
