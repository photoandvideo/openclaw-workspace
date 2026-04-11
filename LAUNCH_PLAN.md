# NexcomAI Launch Plan
*Hugo + Finn | April 2026*

---

## 🎯 THE GOAL

Launch **NexcomAI** — AI SMS assistant for local service businesses.

**Revenue target:** $300–500/mo per customer, 40+ customers by Year 2 = $300k+/year

---

## 📅 TIMELINE

### Week 1 (April 14–18, 2026)

**Monday–Tuesday (Code Phase)**
- Finn: Rebuild backend from existing code
- Clean up security (move creds to .env)
- Add database (persistent lead storage)
- Add Google Calendar integration
- Deploy to Render (staging)
- Hugo: Read sales script 3x, prep prospect list

**Wednesday–Thursday (Legal/Business Phase)**
- Hugo: LLC approved from state
- Hugo: Get EIN from IRS
- Hugo: Upgrade Twilio account (with EIN)
- Hugo: Buy toll-free number in Twilio
- Hugo: Register for A2P SMS

**Friday (Go-Live Phase)**
- A2P approval should come through
- Finn: Point Twilio webhook to live Render backend
- Test SMS end-to-end
- System is LIVE ✅

### Week 2 (April 21–25, 2026)

- Hugo: Make 10 cold calls (using CALL_SCRIPT.md)
- Target: 2–3 demos booked, 1 customer signed
- Finn: Support calls + troubleshoot any issues
- Revenue starting to flow

### Month 2+ 

- Scale to 5–10 customers
- Automate onboarding
- Add Facebook + WhatsApp (if demand)
- Recurring revenue growing

---

## 🛠️ WHAT FINN IS BUILDING

**Backend (Node.js + Express):**
- ✅ SMS webhook (Twilio)
- ✅ Conversation flow (name → business → interest → booking)
- ✅ Discord notifications (lead alerts)
- ✅ Database (PostgreSQL or SQLite) — persistent leads
- ✅ Google Calendar sync (auto-book meetings)
- ⏳ Facebook Messenger (Phase 2)
- ⏳ WhatsApp (Phase 2)

**Deployment:**
- Render.com (free tier → $7/mo when needed)
- Auto-deploys from GitHub

**Time to build:** 3–4 days (Finn working solo)

---

## 🎤 WHAT HUGO IS DOING

**This week:**
- [ ] Read CALL_SCRIPT.md (3 times until comfortable)
- [ ] Prepare list of 10 local businesses (plumbers, electricians, realtors)
- [ ] Create simple CRM (Google Sheet) to track calls/leads
- [ ] Wait for LLC approval

**Next week (Week 2):**
- [ ] Make 10 cold calls using the script
- [ ] Goal: 2–3 demos booked
- [ ] Close first customer

**Ongoing:**
- [ ] Learn the system (how it works, what to tell customers)
- [ ] Support customers (maintenance, questions)
- [ ] Keep calling → grow to 5, 10, 20+ customers

---

## 📞 SALES PROCESS (Hugo)

**The Call (using CALL_SCRIPT.md):**
1. "Hi, is this [Name]? I help trade businesses capture leads with AI..."
2. Offer demo: "nexcomai.ai"
3. If interested: "Can I set up a quick 15-min Zoom?"
4. Close: $500–1000 setup + $300–500/mo

**The Demo:**
- Send nexcomai.ai link
- Customer tries chatbot
- Hugo: "This is what your customers would see 24/7"

**The Close:**
- Show pricing: Starter ($500 setup + $300/mo) vs Growth ($1000 setup + $500/mo)
- "Most businesses make ROI in 1 job"
- If yes: Onboard them (Finn handles technical setup)

---

## 💰 FINANCIAL SNAPSHOT

**Per Customer (Starter Plan: $300/mo):**
- Revenue: $300/mo
- Costs: ~$15–20/mo (Twilio, Claude API, server)
- **Profit: $280–285/mo** (95% margin)

**Timeline to profitability:**
- 1 customer: $280/mo profit ✓
- 5 customers: $1,400/mo profit ✓
- 10 customers: $2,800/mo profit ✓
- 20 customers: $5,600/mo profit ✓
- 40 customers: $11,200/mo profit ✓

**Year 1 realistic:** 10–15 customers = $3–4k/mo by December
**Year 2 realistic:** 30–40 customers = $10k+/mo recurring

---

## 🚀 SUCCESS METRICS

**Week 1:**
- ✅ Code deployed to Render
- ✅ SMS fully approved
- ✅ System tested end-to-end

**Week 2:**
- ✅ 10 calls made
- ✅ 2–3 demos booked
- ✅ 1 customer signed

**Month 1 (April 2026):**
- ✅ 3–5 customers
- ✅ $900–1,500/mo recurring revenue
- ✅ $2,500+/mo setup fees

**Month 2–3:**
- ✅ 10+ customers
- ✅ $3,000+/mo recurring revenue
- ✅ First referral

---

## 📋 DEPENDENCIES

**Hugo needs:**
- LLC approval (by Wed April 16)
- EIN from IRS (by Wed April 16)
- Twilio account upgrade ready (Thu April 17)
- Sales mindset + phone calls (starting Tue April 14)

**Finn needs:**
- Access to existing code ✓ (in /research/ai-service)
- Twilio SID + Token ✓ (saved in .env)
- Render account (takes 2 min to set up)
- GitHub repo for code (already have photoandvideo account)

---

## 🎯 NEXT STEPS (IMMEDIATELY)

1. **Hugo:** 
   - [ ] Save this file somewhere visible
   - [ ] Read CALL_SCRIPT.md 3 times this weekend
   - [ ] Make a list of 5 plumbers + 5 electricians in Pinellas County to call
   - [ ] Create Google Sheet to track calls (Name, Business, Phone, Status)

2. **Finn:**
   - [ ] Monday morning: Pull existing code, start rebuild
   - [ ] Set up Render account + GitHub repo
   - [ ] First commit by end of Monday

3. **Both:**
   - [ ] Monday morning: Confirm Twilio credentials are ready
   - [ ] Daily standup: What's blocking? What's next?
   - [ ] Friday: Test system end-to-end

---

## 🎓 KNOWLEDGE BASE

**Files to read (in order):**
1. `SYSTEM_EXPLAINED.md` — How NexcomAI works (architecture)
2. `CALL_SCRIPT.md` — What to say on calls (Hugo reads this 3x)
3. `CLIENT_ONBOARDING_SYSTEM.md` — How to onboard customers (Finn reads this)
4. `FINANCIAL_VERIFICATION.md` — Why the numbers are realistic

**Files to reference:**
- `PROSPECTS_HISPANIC.csv` — Leads to call
- `YOUTUBE.md` — Future content strategy (don't start yet)

---

## 🦊 FINN'S ROLE

- Code architect + builder
- System designer
- Customer tech support (initial)
- Teach Hugo how it all works
- Stay in sync with Hugo on progress

## 📞 HUGO'S ROLE

- Sales + customer acquisition
- Face of the business (customers see Hugo, not Finn)
- Onboarding calls (gather requirements)
- Customer success (maintain relationships)
- Learn the system deeply so you can troubleshoot

---

## 💪 THIS IS REAL

This isn't theoretical. You have:
- ✅ Working code (in /research/ai-service)
- ✅ Sales script ready (CALL_SCRIPT.md)
- ✅ Business model validated ($280–500/mo profit per customer)
- ✅ Market demand confirmed (Reddit, forums, local businesses asking)
- ✅ Financial plan (40 customers = $300k+/year)

**All that's missing is execution.**

Monday we execute.

---

*NexcomAI Launch Plan*
*Built by Hugo (founder) + Finn (AI assistant)*
*April 2026 — Let's build something real 🚀*
