# 🏗️ Nexcom AI — Complete Client Operations System
_How we onboard, manage, scale, and hand off clients_

---

## 💰 STARTUP COSTS PER CLIENT (What you spend to set them up)

### Starter Client ($500 setup fee from them)

| Item | Your Cost | Notes |
|---|---|---|
| Twilio phone number | $1.15 one-time + $1.15/mo | Get them their own local number |
| Twilio SMS registration | $4 one-time | A2P 10DLC brand registration |
| Render (shared server) | $0 | You already pay $7/mo shared |
| Claude API setup | $0 | Uses your API key, billed per usage |
| Your time (setup) | 3-4 hours | Configure, test, train the AI |
| **Total YOUR cost** | **~$6 + 4 hrs time** | |
| **You charge them** | **$500** | |
| **Your profit on setup** | **~$494** | 🔥 |

### Growth Client ($1,000 setup fee)

| Item | Your Cost | Notes |
|---|---|---|
| Twilio number | $1.15/mo | |
| A2P registration | $4 | |
| Facebook/Instagram setup | $0 | Your time only |
| WhatsApp Business setup | $0 | Your time only |
| Your time (setup) | 5-6 hours | More channels = more time |
| **Total YOUR cost** | **~$6 + 6 hrs time** | |
| **You charge them** | **$1,000** | |
| **Your profit on setup** | **~$994** | 🔥🔥 |

---

## ⏱️ HOW LONG DOES SETUP TAKE?

| Phase | Time | What happens |
|---|---|---|
| Onboarding call | 30 min | Gather all info from client |
| AI configuration | 1-2 hrs | Train the bot on their business |
| Channel setup | 30-60 min | Connect phone, website, social |
| Testing | 30 min | Test all flows, fix issues |
| Client review | 30 min | They test and approve |
| Go live | 15 min | Flip the switch |
| **Total** | **3-5 hours** | Spread over 48 hours |

---

## 📋 WHAT WE NEED FROM EACH CLIENT

### Information (collected on onboarding call)
- [ ] Business name + tagline
- [ ] Owner name + contact info
- [ ] Service area / cities covered
- [ ] Business hours
- [ ] Emergency availability?
- [ ] All services offered
- [ ] Price ranges per service
- [ ] Service call / diagnostic fee
- [ ] What they DON'T do
- [ ] Tone preference (casual/professional/friendly)
- [ ] Any phrases they always use
- [ ] How to handle complaints
- [ ] Preferred callback name

### Access/Accounts (they create, share with us temporarily)
- [ ] Their phone number (we get them a new Twilio number)
- [ ] Facebook page admin access (for Messenger)
- [ ] Instagram business account (for DMs)
- [ ] WhatsApp Business phone number
- [ ] Google account (for Calendar integration)
- [ ] Website access (to embed chat widget)

### Assets
- [ ] Logo (for chat widget header)
- [ ] Business photos (optional)
- [ ] Any existing FAQ document

---

## 🗂️ CLIENT FILE SYSTEM

Each client gets their own folder in your workspace:

```
ventures/clients/
├── CLIENT_001_suncoast_plumbing/
│   ├── INFO.md          ← Business info, contacts
│   ├── CREDENTIALS.md   ← All logins (encrypted)
│   ├── CONFIG.md        ← Bot configuration
│   ├── NOTES.md         ← Meeting notes, changes
│   └── ASSETS/          ← Logo, photos
├── CLIENT_002_/
└── ...
```

### CREDENTIALS.md (for each client)
Stores:
- Twilio number + SID
- Facebook Page ID + token
- Instagram account
- WhatsApp number
- Google Calendar ID
- Website login
- Any other accounts

⚠️ **Security note:** Keep this file private. Never push to GitHub. Add to .gitignore.

---

## 📈 HOW WE SCALE

### Phase 1: You do everything (0-10 clients)
- You handle all onboarding, setup, maintenance
- Takes 3-5 hrs per client setup
- 10 clients = manageable solo

### Phase 2: Systemize (10-25 clients)
- Create templates for each industry (plumbing, electrical, real estate, etc.)
- Reuse 80% of code per new client
- Setup time drops to 1-2 hrs per client
- Hire 1 part-time VA to handle onboarding calls + data entry

### Phase 3: Hire & delegate (25-50 clients)
- Hire 1 technical person (sets up bots)
- You focus on sales only
- VA handles client communication
- Profit per client stays high

### Phase 4: Productize (50+ clients)
- Build a self-serve dashboard
- Clients configure their own bot
- Become a SaaS product
- Massive scale possible

---

## 🤖 AUTOMATION OPPORTUNITIES (Work less, earn more)

### Already automated:
- ✅ AI responds to customer messages
- ✅ Leads captured automatically
- ✅ Discord alerts when lead comes in
- ✅ Appointment booking flow

### Can automate next:
- [ ] **Auto-onboarding form** — Client fills Google Form → data flows into their config automatically
- [ ] **Auto-invoice** — Stripe sends invoice on 1st of month automatically
- [ ] **Auto-reporting** — Monthly email to client with their stats
- [ ] **Auto-backup** — GitHub push daily at midnight
- [ ] **Auto-monitoring** — Alert you if client's bot goes down
- [ ] **Auto-review requests** — Bot asks happy customers for Google reviews

### Future automation:
- [ ] **Client portal** — Clients log in to see their leads, stats, conversation history
- [ ] **Self-serve setup** — Client fills a form, bot auto-configures itself
- [ ] **AI trains itself** — Bot learns from conversations over time

---

## 🔑 DO CLIENTS OWN THEIR STUFF?

**Short answer: Yes, but you manage it.**

Here's how to structure it:

### Option A — You Own Everything (Simple, most common)
- All accounts (Twilio, Claude API) are in YOUR name
- Client pays you monthly
- If they leave → you turn off their bot
- **Pro:** Simple to manage, you control everything
- **Con:** Client has no asset if they leave

### Option B — They Own, You Manage (Better for trust)
- Client creates their own Twilio account
- Client creates their own Facebook App
- You get admin access to manage it
- If they leave → they take their accounts with them
- **Pro:** Client feels ownership, builds trust
- **Con:** More setup work, managing multiple accounts

### Option C — Hybrid (Recommended)
- **Phone number:** In YOUR Twilio (simpler)
- **Facebook/Instagram:** In THEIR Meta account (they own their page)
- **Bot logic:** In YOUR system (your IP)
- If they leave → transfer phone number to them, remove from your system
- **Pro:** Best of both worlds

---

## 📊 SCALING MATH

| Clients | Your time/mo | Revenue | Cost | Profit |
|---|---|---|---|---|
| 5 | 10 hrs/mo | $1,900 | $150 | $1,750 |
| 10 | 20 hrs/mo | $3,800 | $280 | $3,520 |
| 20 | 35 hrs/mo | $7,600 | $520 | $7,080 |
| 30 | 50 hrs/mo | $11,400 | $760 | $10,640 |
| 40 | hire help | $15,000 | $2,000 | $13,000 |
| 50 | hire help | $19,000 | $3,000 | $16,000 |

**At 30 clients you're making $10K+/mo working ~50hrs/mo.**
**At 40+ clients you hire one person and your income actually grows.**

---

## 🗓️ CLIENT LIFECYCLE

```
Day 0:  Sales call → Demo → Close deal
Day 1:  Onboarding call → Gather info
Day 2:  Build + configure bot
Day 3:  Client reviews and approves
Day 4:  Go LIVE 🚀
Week 2: Check-in call → Any tweaks?
Month 1: Performance review → Upsell opportunities?
Monthly: Auto-invoice → Bot runs itself → You collect $
```

---

## 📁 CREATING CLIENT FILES

When you get a new client, run this in Ubuntu:

```bash
mkdir -p ~/.openclaw/workspace/ventures/clients/CLIENT_001_NAME
```

Then create:
- `INFO.md` — their business info
- `CREDENTIALS.md` — their logins (NEVER push to GitHub)
- `CONFIG.md` — their bot settings

Add to `.gitignore`:
```
ventures/clients/*/CREDENTIALS.md
```

---

*Last updated: 2026-04-06 · Nexcom AI LLC · nexcomai.ai*
