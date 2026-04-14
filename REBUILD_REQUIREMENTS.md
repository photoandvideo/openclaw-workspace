# NexcomAI Rebuild — Requirements & Credentials

## 1. CREDENTIALS NEEDED

### Already Have (in ~/.env):
- ✅ TWILIO_SID
- ✅ TWILIO_TOKEN
- ✅ TWILIO_PHONE

### Need to Create/Obtain:

**Discord Webhook:**
- Status: You have it hardcoded in code
- What to do: Extract to .env as `DISCORD_WEBHOOK`
- Create new? Yes, or use existing one

**Facebook Messenger:**
- `FB_PAGE_ID` — Your Facebook page ID
- `FB_PAGE_TOKEN` — Get from Facebook Business Manager
- `FB_APP_SECRET` — From Facebook App settings
- `FB_VERIFY_TOKEN` — You set this (e.g., "nexcomai2026")

**WhatsApp (Meta Cloud API):**
- `WA_PHONE_ID` — Your WhatsApp phone number ID
- `WA_TOKEN` — Your WhatsApp Cloud API token
- `WA_VERIFY_TOKEN` — You set this (e.g., "nexcomai2026")

**Telegram (NEW):**
- `TELEGRAM_BOT_TOKEN` — Get from BotFather on Telegram
- Create new bot? Yes, simple 5-min process

**Claude API (for AI):**
- `CLAUDE_API_KEY` — Get from Anthropic console
- Do you have this? Check your account

**Google Calendar (for scheduling):**
- `GOOGLE_CALENDAR_ID` — Your calendar email
- `GOOGLE_SERVICE_ACCOUNT_JSON` — Credentials file
- Do you have this? Need to set up OAuth

**Email (for confirmations):**
- `SENDGRID_API_KEY` — OR `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`
- Simple SMTP option cheaper? Yes

**Stripe (for payments):**
- `STRIPE_SECRET_KEY` — For payment processing
- Do you have this? Create free account

---

## 2. DATABASE SCHEMA (SQLite)

```sql
-- Customers (multi-tenant)
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  business_name TEXT,
  business_type TEXT,
  phone TEXT,
  pricing_tier TEXT, -- 'starter', 'dual', 'messaging', 'sms_messaging', 'enterprise'
  channels TEXT, -- JSON: ["sms", "whatsapp", "facebook"]
  setup_date TEXT,
  monthly_limit INTEGER, -- messages per month based on tier
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Conversations (lead capture)
CREATE TABLE conversations (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  platform TEXT, -- 'sms', 'whatsapp', 'facebook', 'telegram'
  visitor_phone TEXT,
  visitor_name TEXT,
  visitor_business TEXT,
  visitor_type TEXT,
  visitor_email TEXT,
  preferred_time TEXT,
  callback_phone TEXT,
  status TEXT, -- 'new', 'contacted', 'demo_scheduled', 'closed'
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(customer_id) REFERENCES customers(id)
);

-- Messages (conversation log)
CREATE TABLE messages (
  id INTEGER PRIMARY KEY,
  conversation_id INTEGER NOT NULL,
  platform TEXT,
  direction TEXT, -- 'inbound', 'outbound'
  sender TEXT, -- 'visitor' or 'ai'
  content TEXT,
  tokens_used INTEGER, -- for tracking AI costs
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(conversation_id) REFERENCES conversations(id)
);

-- API Usage (for billing)
CREATE TABLE api_usage (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  month TEXT, -- YYYY-MM
  messages_count INTEGER DEFAULT 0,
  conversations_count INTEGER DEFAULT 0,
  ai_tokens_used INTEGER DEFAULT 0,
  sms_sent INTEGER DEFAULT 0,
  email_sent INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(customer_id) REFERENCES customers(id)
);

-- Settings (per customer)
CREATE TABLE settings (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL UNIQUE,
  business_greeting TEXT,
  timezone TEXT DEFAULT 'America/New_York',
  google_calendar_id TEXT,
  email_domain TEXT,
  webhook_url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(customer_id) REFERENCES customers(id)
);
```

**To create:** `npm install sqlite3` then run init script ✓

---

## 3. AI MODEL OPTIONS

### Option A: Claude (Anthropic)
- **Cost:** $3 per 1M input tokens, $15 per 1M output tokens
- **Per conversation:** ~0.5 cents (very cheap)
- **Quality:** Best (state-of-the-art)
- **Speed:** Fast (1-2 seconds)
- **You have credits?** You mentioned $5 purchased

**NOT recommended:** You only have $5 worth. That's ~1,000 conversations max. Need to budget better.

---

### Option B: Minimax (Your suggestion) ✓
- **Cost:** ~$0.5 per 1M tokens (MUCH cheaper)
- **Quality:** Good (90% as good as Claude)
- **Speed:** Fast
- **Setup:** Simple API
- **Pro:** 1/6th the cost of Claude
- **Con:** Less powerful for complex reasoning

**VERDICT: YES, use Minimax**

---

### Option C: Open-Source (Ollama locally)
- **Cost:** $0 (if running on your machine)
- **Quality:** Good (Llama2, Mistral)
- **Speed:** Depends on hardware
- **Pro:** No API costs ever
- **Con:** Requires your server to run it (uses CPU/memory)

**VERDICT: Not for production (you're on Render, can't run locally)**

---

### Option D: Hybrid (Budget)
- **Use Minimax for most responses** (80% cheaper)
- **Use Claude only for complex edge cases** (when needed)
- **Setup:** Try Minimax first, fallback to Claude if needed

**VERDICT: Smart for scale**

---

## RECOMMENDATION: Minimax + Fallback

**Use Minimax as primary (saves 85% on AI costs)**
- For simple Q&A, appointment booking, lead capture
- Daily cost: ~$0.10–0.50 per 100 conversations

**Fallback to Claude for complex queries** (if Minimax confidence < 70%)
- Better conversation quality
- Only 5-10% of messages

**Net result:** ~$0.20 per conversation (vs. $1 with Claude alone)

---

## 4. CONVERSATION LOGIC (Remove Hardcoded)

### Current (Hardcoded):
```javascript
if (s.step === 'start') {
  return `Hi! Thanks for texting...`;
}
if (s.step === 'get_name') {
  return `What's your name?`;
}
// ... 20+ if statements
```

**Problem:** 
- Not intelligent
- Only works for your specific flow
- Can't handle variations
- Hard to customize per customer

---

### New (AI-Powered):

```javascript
async function getResponse(sessionKey, message, context) {
  const session = getSession(sessionKey);
  
  // Get AI response using Minimax
  const aiResponse = await generateResponse(
    message,
    session.history, // Previous messages
    context // Business info (plumber, HVAC, etc.)
  );
  
  // Extract action from response
  const action = parseAction(aiResponse); // 'book', 'answer', 'escalate'
  
  return aiResponse;
}
```

**Benefits:**
- Works for ANY business type
- Handles natural variations
- Multi-language (Spanish works naturally)
- Learns from conversation
- Can be customized per customer

---

## SUMMARY: WHAT TO BUILD

### Week 1:
1. **Database setup** ✓ (SQLite, schema above)
2. **Credentials file** (.env with all needed keys)
3. **Minimax integration** (cheaper AI)
4. **Conversation engine** (remove hardcoded logic)
5. **Multi-tenant support** (different customers)

### Week 2:
6. **Google Calendar integration**
7. **Email confirmations**
8. **Telegram support**
9. **Stripe payments**
10. **Deploy to Render**

---

## ACTION ITEMS FOR YOU:

- [ ] **Minimax account** — Sign up at minimax.io (free tier available)
- [ ] **Get Minimax API key** — Add to .env
- [ ] **Facebook tokens** — Do you have these? If not, I can guide setup
- [ ] **WhatsApp tokens** — Same as above
- [ ] **Telegram BotFather** — 5-min setup to get bot token
- [ ] **Google Calendar API** — Need to set up OAuth (30 min)
- [ ] **Stripe account** — Create free (5 min)

Which ones do you already have? 🦊
