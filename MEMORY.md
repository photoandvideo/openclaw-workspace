# MEMORY.md — Finn's Long-Term Memory

## WHO I AM
- **Name:** Finn 🦊
- **Role:** AI assistant + business co-builder for NexcomAI
- **Relationship:** Loyal friend + strategic partner to Hugo
- **Base:** `/home/fiber/.openclaw/workspace` (portable across machines)

---

## WHO HUGO IS
- **Name:** Hugo
- **Location:** Tampa Bay area (Pinellas County, FL)
- **Background:** Fiber optics installer (injured, career pivot)
- **Skills:** Trilingual (EN/ES/PT), entrepreneurial, analytical
- **Equipment:** Pro camera gear (Blackmagic, Canon R7, Aputure lights)
- **Goal:** Launch NexcomAI SaaS, get to $300k+ annual recurring revenue

---

## NEXCOMAI — THE BUSINESS

### What It Is
**AI SMS/Web/WhatsApp chatbot for local service businesses**
- Answers customer questions 24/7
- Books appointments automatically
- Captures leads
- Qualifies prospects
- Multi-channel (SMS, website, WhatsApp, Facebook, Telegram)

### Why It Works
- Market demand validated ($10-29B market, 25%+ CAGR)
- Code already built (we rebuilt it clean in `/research/nexcom-ai-production/`)
- Financial model solid (95% margins, $280-480 profit per customer/mo)
- Hugo has sales contacts + cold call list ready
- First prospects already interested in Facebook/WhatsApp demos

### Current Status
- ✅ SMS system deployed to Render (live)
- ✅ Voice IVR working (redirects calls to SMS)
- ✅ Minimax AI integrated (M2.7 model)
- ✅ Website live (nexcomai.ai)
- ✅ Twilio upgraded to paid
- ✅ Facebook + WhatsApp handlers built & deployed
- ⏳ A2P SMS approval (waiting for EIN verification, 24-48h)
- 📋 Cold calling script ready + prospect list prepared

### Pricing
- **SMS Only:** $200 setup + $300/mo (profit: $267/mo)
- **SMS + Web Chat:** $300 setup + $500/mo (profit: $452/mo)
- **Full Suite (5 platforms):** $500 setup + $1,000/mo (profit: $937/mo)

### Revenue Target
- **Year 1:** 40 customers × avg $375/mo = $180k recurring + $8k setup = **$188k**
- **Year 2:** 100+ customers = $300k-500k recurring
- **Profit margin:** 95% (after infrastructure costs)

---

## TECHNOLOGY STACK

### Backend
- **Framework:** Node.js + Express
- **Hosting:** Render (auto-deploys from GitHub)
- **Database:** SQLite (persistent, on Render)
- **AI:** Minimax M2.7 (via Anthropic-compatible API)
- **SMS:** Twilio
- **Email:** SendGrid
- **Code URL:** `https://openclaw-workspace-zoq0.onrender.com`

### Frontend
- **Website:** Netlify (nexcomai.ai)
- **Chat Widget:** Custom JavaScript (pops after 3 seconds)
- **Dashboard:** HTML/JS (shows all conversations)

### APIs Configured
- Twilio SID/Token (SMS provider)
- Minimax API key (AI engine)
- SendGrid key (email notifications)
- Telegram bot token (optional)
- Meta/Facebook credentials (being set up)
- WhatsApp Business API (being set up)

### Live URLs
- **Production API:** https://openclaw-workspace-zoq0.onrender.com
- **Website:** https://nexcomai.ai
- **SMS webhook:** /sms
- **Voice webhook:** /voice
- **Facebook webhook:** /webhook/facebook
- **WhatsApp webhook:** /webhook/whatsapp

---

## IMMEDIATE TIMELINE

### Today (Wednesday April 15)
- ✅ OpenClaw setup on mini PC
- ✅ Facebook + WhatsApp handlers built & deployed
- 📋 Meta account setup (next step)
- 📋 Cold calls with working demos

### Thursday April 16
- A2P SMS approval expected
- First customer SMS test
- Begin cold calling (10+ calls/day)

### Friday April 18
- A2P fully approved
- SMS system fully live + tested
- First demo with real customer

### Week 2 (April 21-25)
- 10+ cold calls
- 2-3 demos booked
- First paying customer signed
- Revenue flowing

---

## KEY DECISIONS MADE

1. **NexcomAI is the focus** — parking lot striping & other ideas on hold
2. **Minimax AI is the engine** — cheaper than Claude, fast enough for MVP
3. **Render for hosting** — simple, auto-deploys from GitHub
4. **SMS-first launch** — other channels added after
5. **Cold calling for sales** — personal touch, relationship-based
6. **25-day launch target** — by April 18 (A2P approval + first test)

---

## RISKS & BLOCKERS

### Currently Blocked By
- **A2P SMS approval** — EIN verification in progress (24-48h)
- **Meta integration** — need to set up Business Account + verify

### After Launch
- **Twilio A2P reputation** — need to maintain good sending practices
- **Customer quality** — need good onboarding to prevent churn
- **AI quality** — Minimax responses good, but may need Claude upgrade later
- **Support load** — need systems to handle customer support as we scale

---

## COLD CALLING STRATEGY

### Target Customers
- Plumbers & HVAC (Pinellas County)
- Real estate agents
- Electricians
- Cleaning services
- Lawn care / pest control

### Conversation Flow
1. **Hook:** "We built an AI that answers your customer texts 24/7"
2. **Problem:** "How many leads do you lose when you're on the job?"
3. **Solution:** "Our AI books appointments, answers FAQs, qualifies leads"
4. **Demo:** Show live demo (SMS or website chat)
5. **Close:** "First month is $500 setup + $300-500/mo depending on channels"

### Script
- Location: `/research/CALL_SCRIPT.md` (English)
- Spanish version: `/research/CALL_SCRIPT_SPANISH.md`
- Prospect list: `/research/PROSPECTS.md` (Pinellas County)

---

## WHAT WORKS

### Proven
- ✅ Minimax AI responds correctly (tested locally & on Render)
- ✅ SMS webhook receives messages from Twilio
- ✅ Database saves leads + conversations
- ✅ Dashboard displays all conversations
- ✅ Voice greeting plays when customers call
- ✅ Website chat widget pops up after 3 seconds
- ✅ Facebook + WhatsApp handlers built & deployed

### Not Yet Tested
- SMS full end-to-end (blocked by A2P)
- Meta webhook integration
- Lead capture quality
- Customer satisfaction

---

## WORKSPACE SETUP

### File Structure
```
~/.openclaw/workspace/
├── MEMORY.md (this file)
├── SOUL.md (who I am)
├── USER.md (who Hugo is)
├── AGENTS.md (workspace rules)
├── research/
│   ├── nexcom-ai-production/ (production code)
│   ├── CALL_SCRIPT.md
│   ├── NEXCOM_CLIENT_ONBOARDING_COMPLETE.md
│   └── [40+ business docs]
├── memory/
│   ├── 2026-04-08.md
│   ├── 2026-04-10.md
│   ├── 2026-04-11.md
│   ├── 2026-04-13-nexcom-production-live.md
│   ├── 2026-04-14-deployment-complete.md
│   └── [daily notes]
├── guides/
│   ├── PROBLEM_DISCOVERY_ROADMAP.md
│   ├── YOUTUBE_VIDEO_PRODUCTION_PLAN.md
│   └── [setup guides]
└── skills/
    ├── playwright-scraper-skill
    ├── email-assistant
    └── [other tools]
```

### Git Repo
- **Repo:** https://github.com/photoandvideo/openclaw-workspace
- **Status:** Public (for Render to access)
- **Protected:** .env file (credentials safe)
- **Auto-deploy:** Render redeploys on every push

---

## NOTES FOR FUTURE ME

1. **This is portable** — Move workspace to any machine, I come with it
2. **Memory is everything** — Update MEMORY.md daily with important decisions
3. **Code lives on GitHub** — Always push changes so they're backed up
4. **Credentials are safe** — Never commit .env, only push code
5. **Hugo's goal is real** — $300k/year is achievable in Year 2
6. **Time is the constraint** — 25 days to A2P approval + first customer
7. **Cold calling is the bottleneck** — Everything else is built; now it's about sales

---

## WHAT'S NEXT (AS OF APRIL 15, 4:50 PM)

1. **Meta Account Setup** (1-2 hours)
   - Create Facebook Business Account (if needed)
   - Register app in Meta Developer console
   - Get API credentials for Facebook Messenger + WhatsApp
   - Configure webhooks in our Render backend

2. **Test Webhooks** (30 min)
   - Send test message via Facebook Messenger
   - Send test message via WhatsApp
   - Verify responses in our system

3. **Cold Calling** (ongoing)
   - Hugo to call 10+ prospects
   - Show working demos (SMS + Facebook + WhatsApp)
   - Book 2-3 demos for next week

4. **Wait for A2P** (24-48h)
   - EIN verified by IRS
   - SMS A2P approval comes through
   - SMS fully operational

5. **First Customer** (by April 18)
   - Book their services
   - Onboard them
   - Revenue flowing

---

**Status:** Production system live. Sales phase begins. 🚀
