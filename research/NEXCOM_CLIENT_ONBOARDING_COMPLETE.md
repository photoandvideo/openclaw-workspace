# NexcomAI — Complete Client Onboarding Plan
**Version 1.0** | April 14, 2026

---

## TABLE OF CONTENTS
1. [Sales Discovery Call](#sales-discovery-call)
2. [Service Packages](#service-packages)
3. [Setup Process by Platform](#setup-process-by-platform)
4. [Information Checklist](#information-checklist)
5. [Cost Breakdown](#cost-breakdown)
6. [Implementation Timeline](#implementation-timeline)
7. [Handoff & Support](#handoff--support)

---

## SALES DISCOVERY CALL
**Duration:** 15-20 minutes | **Goal:** Understand needs, recommend package

### Questions to Ask

#### Business Basics
- [ ] **Business name?** (exact legal name)
- [ ] **What type of service?** (plumbing, real estate, cleaning, etc.)
- [ ] **How many employees?**
- [ ] **Current phone number?** (we'll use this for SMS/calls)
- [ ] **Website URL?** (if they have one)

#### Pain Points
- [ ] **How many leads/inquiries do you get per week?**
- [ ] **How many do you lose because you can't respond fast?**
- [ ] **What's your biggest bottleneck?** (answering calls, responding to texts, scheduling)
- [ ] **Do customers text you, call you, or both?**

#### Current Setup
- [ ] **Do you have a website?** (Yes/No)
- [ ] **Are you on Facebook/Instagram?** (Yes/No — ask for profiles)
- [ ] **Do customers use WhatsApp?** (Yes/No)
- [ ] **Do you use email for inquiries?** (Yes/No)
- [ ] **Current phone system?** (landline, cell, both?)

#### Desired Solution
- [ ] **Which channels do you want?**
  - SMS chatbot?
  - Website chat?
  - WhatsApp bot?
  - Facebook Messenger?
  - Call forwarding?
- [ ] **What should the AI answer?**
  - Pricing questions?
  - Service FAQs?
  - Appointment booking?
  - Lead qualification?

#### Business Details for AI
- [ ] **What are your main services?** (list 3-5)
- [ ] **Service descriptions?** (brief overview of each)
- [ ] **Pricing?** (can be general ranges)
- [ ] **Service area?** (where you operate)
- [ ] **Hours of operation?**
- [ ] **Do you offer emergency/after-hours service?**
- [ ] **Common FAQs?** (what do customers always ask?)

#### Contact & Follow-up
- [ ] **Best phone/email to reach you?**
- [ ] **When can we schedule setup?** (24-48h turnaround)
- [ ] **Budget approval?** (confirm they can spend $300-$1000/mo)

---

## SERVICE PACKAGES

### PACKAGE 1: SMS CHATBOT ONLY
**Best for:** Mobile-first businesses, contractors, service calls

**What's Included:**
- ✅ AI SMS responder (24/7)
- ✅ Instant lead capture
- ✅ Appointment scheduling
- ✅ FAQ automation
- ✅ Dashboard to see conversations
- ✅ Monthly optimization call

**Platforms Used:**
- Twilio (SMS provider)
- Minimax AI (chatbot)
- SQLite database (lead storage)

**Setup Time:** 24 hours
**Cost to Us:** ~$20/mo (Twilio + AI)
**Price to Customer:** $300/mo
**Profit:** $280/mo

---

### PACKAGE 2: WEBSITE CHATBOT ONLY
**Best for:** Lead generation, service businesses with websites

**What's Included:**
- ✅ Live chat widget on website
- ✅ AI responses to visitor questions
- ✅ Lead capture form
- ✅ Email notifications
- ✅ Chat history dashboard
- ✅ Monthly optimization

**Platforms Used:**
- Website hosting (Netlify/Vercel)
- Custom chat widget (JavaScript)
- Minimax AI
- SQLite database

**Setup Time:** 24-48 hours
**Cost to Us:** ~$15/mo (hosting + AI)
**Price to Customer:** $300/mo
**Profit:** $285/mo

---

### PACKAGE 3: SMS + WEBSITE CHAT (MOST POPULAR)
**Best for:** Full customer engagement, omnichannel presence

**What's Included:**
- ✅ SMS chatbot (24/7)
- ✅ Website chat widget
- ✅ Unified lead dashboard
- ✅ Conversation history (all channels)
- ✅ Appointment scheduling (SMS + web)
- ✅ Lead scoring
- ✅ Weekly optimization calls

**Platforms Used:**
- Twilio (SMS)
- Website chat widget (custom)
- Minimax AI (unified)
- SQLite database
- Email notifications

**Setup Time:** 48 hours
**Cost to Us:** ~$30/mo
**Price to Customer:** $500/mo
**Profit:** $470/mo

---

### PACKAGE 4: FULL SUITE (SMS + WEBSITE + WHATSAPP)
**Best for:** High-volume businesses, national reach

**What's Included:**
- ✅ SMS chatbot
- ✅ Website chat
- ✅ WhatsApp Business API
- ✅ Unified dashboard
- ✅ Multi-language support (EN/ES)
- ✅ Lead quality scoring
- ✅ Performance reports (weekly)
- ✅ Priority support

**Platforms Used:**
- Twilio (SMS)
- WhatsApp Business API (Meta)
- Website chat (custom)
- Minimax AI
- SQLite database
- Email + Discord notifications

**Setup Time:** 3-5 days (WhatsApp approval)
**Cost to Us:** ~$50/mo (includes WhatsApp premium)
**Price to Customer:** $750/mo
**Profit:** $700/mo

---

### PACKAGE 5: ENTERPRISE (SMS + WEB + WHATSAPP + FACEBOOK + TELEGRAM)
**Best for:** Multi-location, high-volume, national businesses

**What's Included:**
- ✅ All platforms (SMS, web, WhatsApp, Facebook, Telegram)
- ✅ Custom integrations (CRM, calendar, etc.)
- ✅ Multi-user support (team access)
- ✅ Custom AI training
- ✅ Bi-weekly strategy calls
- ✅ Lead distribution/routing
- ✅ Advanced analytics
- ✅ SLA guarantee (99% uptime)

**Platforms Used:**
- Twilio (SMS)
- WhatsApp Business API
- Facebook Messenger API
- Telegram API
- Custom CRM integration
- Minimax AI (enterprise)
- SQLite + PostgreSQL

**Setup Time:** 5-7 days
**Cost to Us:** ~$80/mo
**Price to Customer:** $1,200/mo
**Profit:** $1,120/mo

---

## SETUP PROCESS BY PLATFORM

### PLATFORM 1: SMS CHATBOT (TWILIO)

#### Pre-Setup (Discovery)
- [ ] Get customer's phone number
- [ ] Get business name, type, services
- [ ] Get FAQ list (top 10 questions)
- [ ] Get pricing info (or ranges)
- [ ] Get business hours
- [ ] Get service area

#### Our Setup Steps
1. **Create Twilio account** (if customer doesn't have one)
   - Customer provides: phone preference (toll-free or local)
   - Cost: $1/mo Twilio + overage
   - Timeline: 1 hour

2. **Configure Twilio number**
   - [ ] Verify customer's phone for testing
   - [ ] Set up SMS webhook to our Render backend
   - [ ] Configure Twilio security rules
   - Timeline: 30 min

3. **Build AI Profile**
   - [ ] Create system prompt with their business info
   - [ ] Add FAQ knowledge base
   - [ ] Train on their pricing/services
   - [ ] Set response tone (professional, friendly, etc.)
   - Timeline: 1 hour

4. **Database Setup**
   - [ ] Create customer record in our system
   - [ ] Initialize conversation table
   - [ ] Set up lead capture fields
   - Timeline: 15 min

5. **Testing**
   - [ ] Send test SMS from customer's phone
   - [ ] Verify AI response
   - [ ] Check dashboard shows conversation
   - [ ] Verify lead capture works
   - Timeline: 30 min

6. **Training Call**
   - [ ] Show customer dashboard
   - [ ] Explain how to read conversations
   - [ ] Show how to update FAQ/info
   - [ ] Set expectations (response time, quality, etc.)
   - Timeline: 30 min

**Total Setup Time:** 4-5 hours
**Customer's Involvement:** 1 hour (info gathering + training call)

---

### PLATFORM 2: WEBSITE CHATBOT

#### Pre-Setup (Discovery)
- [ ] Get website URL
- [ ] Get website hosting provider (Netlify, Vercel, WordPress, etc.)
- [ ] Get FTP/admin access (if needed)
- [ ] Get same business info as SMS (FAQ, pricing, services)
- [ ] Determine where widget should appear

#### Our Setup Steps
1. **Assess Website**
   - [ ] Check website technology stack
   - [ ] Confirm can add JavaScript/HTML
   - [ ] Identify best placement for chat widget
   - Timeline: 30 min

2. **Build Chat Widget**
   - [ ] Create custom chat UI (matching their colors if desired)
   - [ ] Add auto-open after 3 seconds
   - [ ] Create `/api/chat` endpoint on our backend
   - [ ] Test widget locally
   - Timeline: 2 hours

3. **Deploy Widget**
   - [ ] Add script tag to their HTML
   - [ ] Test on live site
   - [ ] Verify chat appears after 3 seconds
   - [ ] Verify messages are being saved
   - Timeline: 1 hour

4. **Configure AI**
   - [ ] Same as SMS (system prompt, FAQs, etc.)
   - [ ] Customize greeting message
   - [ ] Set up email notifications
   - Timeline: 1 hour

5. **Testing**
   - [ ] Send test messages from website
   - [ ] Verify responses appear
   - [ ] Check dashboard shows conversations
   - [ ] Test on mobile
   - Timeline: 30 min

6. **Training Call**
   - [ ] Show how to access chat history
   - [ ] Show dashboard
   - [ ] Explain how leads are captured
   - Timeline: 30 min

**Total Setup Time:** 5-6 hours
**Customer's Involvement:** 30 min (info + training)

---

### PLATFORM 3: WHATSAPP BUSINESS API

#### Pre-Setup (Discovery)
- [ ] Get WhatsApp Business phone number (or they create one)
- [ ] Get business verification documents (if applying)
- [ ] Get all SMS info (business details, FAQs, etc.)
- [ ] Confirm service area has WhatsApp presence

#### Our Setup Steps
1. **WhatsApp Account Setup**
   - [ ] Register with Meta (WhatsApp Business API)
   - [ ] Verify business account
   - [ ] Get API credentials
   - Cost: ~$30-$50/mo (Meta charges)
   - Timeline: 2-3 days (Meta approval)

2. **Webhook Configuration**
   - [ ] Set up webhook URL in Meta dashboard
   - [ ] Point to our Render backend
   - [ ] Test incoming messages
   - Timeline: 1 hour

3. **AI Integration**
   - [ ] Same system prompt as SMS/web
   - [ ] Format responses for WhatsApp (shorter, mobile-friendly)
   - [ ] Test message formatting
   - Timeline: 1 hour

4. **Testing**
   - [ ] Send test message from WhatsApp
   - [ ] Verify AI responds
   - [ ] Check message appears in dashboard
   - [ ] Test media handling (images, etc.)
   - Timeline: 1 hour

5. **Rollout**
   - [ ] Customer tells customers about WhatsApp channel
   - [ ] Update website (add WhatsApp button)
   - [ ] Add WhatsApp to email signature
   - Timeline: ongoing

6. **Training Call**
   - [ ] Show WhatsApp integration in dashboard
   - [ ] Explain response times
   - [ ] Discuss message limitations
   - Timeline: 30 min

**Total Setup Time:** 3-4 days (mostly waiting for Meta approval)
**Customer's Involvement:** 2 hours (documentation + training)
**Extra Cost to Customer:** +$200/mo for WhatsApp Premium

---

### PLATFORM 4: FACEBOOK MESSENGER

#### Pre-Setup (Discovery)
- [ ] Get Facebook Business Page URL
- [ ] Get Facebook Page admin access (we need it temporarily)
- [ ] Get all business info (same as SMS)
- [ ] Confirm page is business/verified

#### Our Setup Steps
1. **Facebook Page Configuration**
   - [ ] Connect Facebook Page to Meta Business Account
   - [ ] Enable Messenger
   - [ ] Generate API credentials
   - Timeline: 1 hour

2. **Webhook Setup**
   - [ ] Register webhook with Facebook
   - [ ] Point to our Render backend
   - [ ] Subscribe to message_received events
   - Timeline: 1 hour

3. **AI Integration**
   - [ ] Format responses for Facebook (shorter, emoji-friendly)
   - [ ] Test message types
   - [ ] Set up lead capture from Messenger
   - Timeline: 1 hour

4. **Testing**
   - [ ] Send test message via Facebook Messenger
   - [ ] Verify AI responds
   - [ ] Check dashboard
   - [ ] Test file/image handling
   - Timeline: 1 hour

5. **Configuration**
   - [ ] Set greeting message
   - [ ] Configure call-to-action button
   - [ ] Add to website (Messenger button)
   - Timeline: 1 hour

**Total Setup Time:** 4-5 hours
**Customer's Involvement:** 30 min (access + training)

---

### PLATFORM 5: TELEGRAM

#### Pre-Setup (Discovery)
- [ ] Create Telegram Business Account (or use personal)
- [ ] Get Telegram username
- [ ] Get all business info
- [ ] (Optional) Create private Telegram group for support team

#### Our Setup Steps
1. **Telegram Bot Creation**
   - [ ] Create bot via BotFather
   - [ ] Get bot token
   - [ ] Set bot name/description
   - Timeline: 30 min

2. **Webhook Setup**
   - [ ] Register webhook with Telegram
   - [ ] Point to our Render backend
   - [ ] Test incoming messages
   - Timeline: 1 hour

3. **AI Integration**
   - [ ] Format responses for Telegram
   - [ ] Set up inline keyboards (buttons)
   - [ ] Add custom commands (/start, /help, /book, etc.)
   - Timeline: 1 hour

4. **Testing**
   - [ ] Add bot to chat
   - [ ] Send test message
   - [ ] Verify AI responds
   - [ ] Test command buttons
   - Timeline: 1 hour

5. **Promotion**
   - [ ] Create public bot link
   - [ ] Share on website
   - [ ] Add to email signature
   - [ ] Optional: advertise in Telegram groups
   - Timeline: ongoing

**Total Setup Time:** 3-4 hours
**Customer's Involvement:** 15 min (training)

---

## INFORMATION CHECKLIST

### Essential (Needed for Any Package)

#### Business Information
- [ ] **Legal Business Name**
- [ ] **Business Type** (plumbing, real estate, cleaning, etc.)
- [ ] **Service Description** (1-2 sentence summary)
- [ ] **Services/Products Offered** (list 3-10 main ones)
- [ ] **Pricing** (exact or ranges for each service)
- [ ] **Service Area** (cities, zip codes served)
- [ ] **Hours of Operation** (Mon-Fri, weekends, holidays)
- [ ] **Emergency Service?** (after-hours, 24/7?)

#### Contact Information
- [ ] **Primary Phone Number** (for SMS/calls)
- [ ] **Email Address** (for notifications)
- [ ] **Address** (optional, for Google Maps integration)
- [ ] **Website URL** (if applicable)
- [ ] **Social Media** (Facebook, Instagram, etc.)

#### FAQs (Top 10 Questions)
- [ ] Q: How much does service cost?
- [ ] Q: How quickly can you come out?
- [ ] Q: Do you offer emergency service?
- [ ] Q: What areas do you serve?
- [ ] Q: How do I book an appointment?
- [ ] Q: Can I reschedule?
- [ ] Q: Do you offer financing/payments?
- [ ] Q: What's your warranty?
- [ ] Q: Are you licensed/insured?
- [ ] Q: [Custom Q specific to their business]

#### Conversation Preferences
- [ ] **Tone:** Professional / Friendly / Casual
- [ ] **Language:** English / Spanish / Bilingual
- [ ] **Response Style:** Detailed / Concise / Matter-of-fact
- [ ] **Emoji?** Yes / No / Minimal

---

### For SMS Chatbot
- [ ] **Current phone number** (we'll transfer to Twilio)
- [ ] **Twilio account preference** (existing or new?)
- [ ] **Preferred phone type** (toll-free or local?)

### For Website Chatbot
- [ ] **Website hosting provider** (Netlify, Vercel, WordPress, etc.)
- [ ] **Website technology** (HTML/CSS, React, WordPress, etc.)
- [ ] **FTP/Admin access** (if needed)
- [ ] **Preferred chat placement** (bottom-right, bottom-left, etc.)
- [ ] **Widget colors** (match brand?)

### For WhatsApp
- [ ] **WhatsApp phone number** (dedicated or personal?)
- [ ] **Business verification docs** (ID, utility bill, etc.)
- [ ] **Expected message volume** (low, medium, high)

### For Facebook Messenger
- [ ] **Facebook Business Page URL**
- [ ] **Page admin access** (we need this temporarily)
- [ ] **Expected daily inquiries**

### For Telegram
- [ ] **Telegram username** (if existing)
- [ ] **Preferred bot name**
- [ ] **Bot commands** (beyond standard)

---

## COST BREAKDOWN

### Our Costs (Per Customer Per Month)

| Component | SMS | Web Chat | WhatsApp | Facebook | Telegram | All 5 |
|-----------|-----|----------|----------|----------|----------|-------|
| Twilio SMS | $15 | — | $15 | — | — | $15 |
| Minimax AI | $8 | $8 | $8 | $8 | $8 | $8 |
| Hosting (Render) | $5 | $5 | $5 | $5 | $5 | $5 |
| WhatsApp API | — | — | $30 | — | — | $30 |
| Database (SQLite) | $2 | $2 | $2 | $2 | $2 | $2 |
| Email/Notifications | $3 | $3 | $3 | $3 | $3 | $3 |
| **TOTAL** | **$33** | **$18** | **$63** | **$18** | **$18** | **$63** |

---

### Customer Pricing

| Package | Setup Fee | Monthly | Profit/mo | Year 1 Revenue |
|---------|-----------|---------|-----------|-----------------|
| SMS Only | $200 | $300 | $267 | $3,804 |
| Web Chat | $200 | $300 | $282 | $3,804 |
| SMS + Web | $300 | $500 | $452 | $6,300 |
| SMS + Web + WhatsApp | $400 | $750 | $687 | $9,300 |
| **Full Suite (5 platforms)** | **$500** | **$1,000** | **$937** | **$12,300** |

---

### Revenue Model (Customer Acquisition Example)

**Year 1 Target: 40 customers**

**Breakdown (conservative mix):**
- 10 × SMS Only @ $300/mo = $3,000/mo
- 10 × SMS + Web @ $500/mo = $5,000/mo
- 15 × SMS + Web + WhatsApp @ $750/mo = $11,250/mo
- 5 × Full Suite @ $1,000/mo = $5,000/mo

**Total Year 1 Revenue:** $24,250/mo × 12 = **$291,000/year**
**Total Year 1 Profit:** ($24,250 - $1,000 in costs) × 12 = **$279,000/year**
**Profit Margin:** 95.9%

---

## IMPLEMENTATION TIMELINE

### Day 1: Discovery & Information Gathering
- [ ] 20-min discovery call (questions from above)
- [ ] Send information collection form
- [ ] Collect FAQ list
- [ ] Get platform access (Twilio, Facebook, etc. if applicable)

**Deliverable:** Signed Statement of Work (SOW), payment received

---

### Day 2-3: System Configuration

#### SMS Only (Day 2)
- [ ] Set up Twilio account
- [ ] Build AI profile
- [ ] Test SMS flow
- [ ] Create dashboard access
- [ ] Schedule training call

#### SMS + Web Chat (Day 2-3)
- [ ] SMS setup (Day 2, see above)
- [ ] Build chat widget (Day 2)
- [ ] Integrate into website (Day 3)
- [ ] Cross-platform testing (Day 3)

#### With WhatsApp (Day 3-5)
- [ ] Submit WhatsApp Business verification
- [ ] Configure Twilio/Meta webhooks
- [ ] Wait for Meta approval (2-3 days)
- [ ] Final testing

---

### Day 4: Training & Handoff
- [ ] 30-45 min training call
- [ ] Walk through dashboard
- [ ] Review FAQ management
- [ ] Set expectations
- [ ] Provide documentation

---

### Day 5+: Optimization & Monitoring
- [ ] Monitor conversations
- [ ] Optimize responses based on feedback
- [ ] Monthly check-in calls
- [ ] Performance reports

---

## HANDOFF & SUPPORT

### What Customer Gets

1. **Access to Dashboard**
   - [ ] Link to dashboard
   - [ ] Username/password
   - [ ] 2FA setup

2. **Documentation Package**
   - [ ] How to use dashboard PDF
   - [ ] FAQ management guide
   - [ ] Response time expectations
   - [ ] Emergency support contact
   - [ ] Monthly report template

3. **Support Package**
   - [ ] Email support (24-48h response)
   - [ ] Monthly optimization call (30 min)
   - [ ] Quarterly strategy review (optional)
   - [ ] Emergency phone support (premium tier)

4. **Onboarding Materials**
   - [ ] Customer setup checklist
   - [ ] Platform-specific guides
   - [ ] Troubleshooting FAQ
   - [ ] Best practices document

---

### What We Keep

- API credentials (Twilio, Meta, Minimax)
- Database backup copies
- Analytics/reporting dashboard
- System health monitoring

---

### Ongoing Support Tiers

#### **Basic** (Included)
- Email support (48h response)
- Monthly check-in call
- Bug fixes
- Monthly performance report

#### **Premium** (+$50/mo)
- Priority email support (24h)
- Bi-weekly check-in calls
- Custom AI training
- Weekly performance reports
- Dedicated Slack channel

#### **Enterprise** (+$150/mo)
- 24/7 phone support
- Weekly strategy calls
- Custom integrations (CRM, calendar)
- SLA guarantee (99% uptime)
- Dedicated account manager

---

## SAMPLE SALES EMAIL TEMPLATE

```
Subject: AI Customer Support System for [Business Name]

Hi [Name],

Thanks for taking the call today! I wanted to follow up on the SMS chatbot 
system we discussed.

Here's what we'd set up for you:

✅ **SMS AI Assistant** — Answers customer texts 24/7 with your FAQs
✅ **Instant Lead Capture** — Every message is saved with customer info
✅ **Appointment Booking** — Customers can book straight through text
✅ **Live Dashboard** — You see all conversations in one place

**Timeline:** Set up in 24 hours
**Cost:** $200 setup + $300/month

This covers:
- Twilio SMS integration
- Minimax AI (trained on your business)
- Lead management dashboard
- Monthly optimization calls

Interested? Here's what we need from you:
- Your current phone number
- Top 10 FAQ answers
- Your service areas & pricing
- Business hours

Once we have that, we'll have you live by tomorrow.

Let me know!
[Your Name]
```

---

## QUICK REFERENCE: WHICH PACKAGE FOR WHICH BUSINESS?

| Business Type | Recommended Package | Why |
|---------------|---------------------|-----|
| Plumbing/HVAC | SMS + Web Chat | Mobile-first, high-volume texts |
| Real Estate | Full Suite | Multi-channel (web, WhatsApp, FB) |
| Cleaning Service | SMS Only | Quick quote requests |
| Electrician | SMS + Web Chat | Urgent requests, website reviews |
| Lawn Care | SMS Only | Seasonal, simple booking |
| Pest Control | SMS + Web Chat | Lead capture critical |
| Roofing | Full Suite | Long sales cycle, nurture leads |
| Massage/Salon | SMS + Web Chat | Appointment-heavy |
| Contractor | SMS Only | Simple, mobile communication |
| E-Commerce | Web Chat + Facebook | Website traffic-focused |

---

## SUCCESS METRICS TO TRACK

After implementation, measure:
- **Response Time:** 0 vs. previously X minutes
- **Lead Capture Rate:** % of inquiries captured vs. lost
- **Conversation Volume:** messages/day
- **Booking Rate:** % that schedule vs. abandon
- **Customer Satisfaction:** based on feedback
- **Revenue Impact:** new appointments booked via AI

---

**End of Document**

---

## NEXT STEPS FOR YOU

1. **Print this** (or save as PDF)
2. **Use the discovery questions** during next cold call
3. **Pick a package** based on their needs
4. **Use the checklist** to gather info
5. **Follow the timeline** to deliver on schedule

You now have a complete sales & delivery process. 🚀

