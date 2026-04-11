# Problem Discovery & Solution Validation Roadmap
*How to find real problems and build products people will pay for*

By: Finn 🦊 | April 2026

---

## THE BIG IDEA

**Most software fails because it solves problems nobody has.**

Your job is to:
1. Find REAL problems (what people are actually struggling with)
2. Validate they'll PAY to solve it
3. Build the minimum solution
4. Sell it before you build too much

This document is your thinking roadmap for that process.

---

## PHASE 1: PROBLEM DISCOVERY
*Finding problems worth solving*

### Step 1A: Where to Scrape (Find Problems)

**Reddit (Best source — real people, real pain)**
- Search: "How do I..." or "[industry] problem"
- Subreddits to monitor:
  - r/smallbusiness
  - r/Entrepreneur
  - r/Plumbing, r/Electricians, r/Roofing (trade subreddits)
  - r/RealEstate
  - r/marketing
  - r/ecommerce
  - r/freelance
  - r/webdev

**Example search:**
```
site:reddit.com "plumber" "how do I" problem OR struggle OR "can't" OR "too hard"
```

**What to look for:**
- Pain points (what's hard?)
- Frequency (does it happen often?)
- Cost (would they pay to fix it?)
- Emotion (is it frustrating?)

**Signals of a real problem:**
- ✅ Multiple people asking the same thing
- ✅ Comments with "YES, me too!"
- ✅ People willing to pay alternatives
- ✅ Time-wasting or money-losing activity

---

### Step 1B: Other Sources to Scrape

**Twitter/X**
```
Search: "[industry] problem" OR "[job] struggling" OR "wish there was"
```

**Facebook Groups**
- Local business groups
- Industry-specific groups (contractors, realtors, etc.)
- Search for complaints or requests

**Quora**
- "How do I..." questions in your target space
- Look at "Most Wanted Answers" = high pain

**LinkedIn**
- Search industry posts with lots of comments
- Comments = people sharing pain points

**Nextdoor**
- Hyper-local problems
- Small business owners asking for help

**Product Hunt**
- Reverse engineer: look at successful products
- Read negative reviews to see what people want differently

**YouTube Comments**
- Channels about your industry
- Comments reveal unmet needs

---

### Step 1C: How to Scrape (Tools & Process)

**Tool 1: Brave Search (you have this)**
```
Query: site:reddit.com/r/[subreddit] "[problem keyword]"
```

**Tool 2: Playwright Scraper (you have this skill)**
- Scrape Reddit threads + comments
- Save to CSV with: Title, Author, Upvotes, Comments, Problem, Solution Asked For

**Tool 3: Manual + Google Sheets**
- Spend 2 hours scrolling Reddit
- Copy interesting problems into Google Sheet
- Categorize by: Industry, Problem Type, Frequency, Pain Level

**Your Scraping Routine (2-3 hours, once a week):**
1. Pick 3 subreddits (e.g., r/plumbing, r/RealEstate, r/smallbusiness)
2. Search for pain keywords: "how", "problem", "can't", "wish", "help"
3. Read top 20 posts in each subreddit
4. Note interesting problems in spreadsheet
5. Mark: "1 person mentioned" vs "5+ people asked"

**Output:** CSV with 30-50 potential problems per week

---

### Step 1D: Spot Patterns

After scraping, look for **clusters** of similar problems:

**Example Pattern from Plumbing Reddit:**
- Person A: "How do I manage customer callbacks?"
- Person B: "Lost a job because I didn't call back in time"
- Person C: "Can't keep up with voicemails while on jobs"
- Person D: "Need better way to track jobs"

**Pattern identified:** Callback/lead management is HARD

This is what NexcomAI solves. See how that works?

---

## PHASE 2: VALIDATION INTERVIEW
*Confirm the problem is real (don't build before you validate)*

### Step 2A: Find Someone with the Problem

From your scraping, find people who posted about it:
- Reddit: DM them
- Facebook: Join group, ask if anyone has this problem
- LinkedIn: Message them
- Craigslist: Call them (their number is there)

**Script:**
> "Hi [Name], saw your post about [problem]. I'm exploring solutions for this. Would you have 15 min this week to chat about how you're dealing with it? No pitch — just learning."

**Goal:** Get them on a 15-min call.

---

### Step 2B: The Discovery Interview (15 minutes)

**You're trying to learn, not pitch.** Ask open questions.

**The 5 Questions (in order):**

**Q1: Tell me about your business**
> "What do you do? How long have you been doing it?"
- Listen: Revenue, team size, growth stage
- Why: Understand their scale

**Q2: What's the biggest challenge you face right now?**
> "If I could wave a magic wand and fix one thing about running your [business], what would it be?"
- Listen: NOT necessarily the problem from Reddit
- Why: Let them tell you the #1 pain

**Q3: Tell me about the specific problem [from their post]**
> "You mentioned [problem]. Tell me more about that. How does it affect your day?"
- Listen: How often? How much time? How much money lost?
- Why: Measure severity (daily vs monthly)

**Q4: How are you solving it now?**
> "What do you do today to deal with this?"
- Listen: Manual process? Bad software? Workaround?
- Why: Understand current solution's limitations
- **IMPORTANT:** Ask what they DON'T like about current solution

**Q5: What would the ideal solution look like?**
> "If you had a tool that could [handle the problem], what would it need to do?"
- Listen: Features, integrations, workflows
- Why: Get product requirements from the customer

**Bonus questions (if time):**
- "How much time/money does this cost you monthly?"
- "Would you pay to fix this? How much?"
- "Who else has this problem?"

---

### Step 2C: What You're Really Looking For

**STRONG SIGNAL (Problem is Real):**
- ✅ They mention the problem WITHOUT you asking
- ✅ It happens multiple times per week
- ✅ It costs them money or time
- ✅ They've tried multiple solutions
- ✅ They'd pay $X/month to fix it

**WEAK SIGNAL (Maybe not a problem):**
- ❌ They say "yeah, it's annoying I guess"
- ❌ It happens once a month
- ❌ They haven't tried anything else
- ❌ They're not sure if they'd pay

**RED FLAG (Don't build):**
- ❌ They don't think about it much
- ❌ They say "I live with it"
- ❌ They won't pay to fix it
- ❌ Only 1 person has asked about it

---

### Step 2D: Document the Interview

After the call, write down:

```
INTERVIEW NOTES

Business: [name]
Person: [name + title]
Date: [date]
Duration: [15 min]

PROBLEM:
- What is it? [description]
- How often? [daily/weekly/monthly]
- Impact: [time wasted, money lost, customer churn?]
- Current solution: [what they do now]
- Frustrations with current: [what doesn't work]

CUSTOMER SIGNAL:
- Would they pay? [Yes/No/Maybe]
- Price willing to pay? [$X/month]
- Timeline? [Need it now/sometime/nice to have?]
- Who else has this? [1 person/multiple/industry-wide?]

NEXT STEP:
- [ ] Schedule follow-up
- [ ] Build prototype
- [ ] Show them MVP
- [ ] Get commitment to buy

CONFIDENCE SCORE: 1-10 (how real is this problem?)
```

---

## PHASE 3: PROBLEM ASSESSMENT
*Is this problem worth building for?*

After 5-10 interviews, ask these questions:

### Is the Problem Frequent Enough?

**Strong:** Happens daily or multiple times per week
**Weak:** Happens monthly or less
**Verdict:** Build if strong

### Is It Painful Enough?

**Strong:** Costs them $X/week in lost time/money
**Weak:** Annoyance but they cope fine
**Verdict:** Build if strong

### Will They Pay?

**Strong:** "I'd pay $500/month in a heartbeat"
**Weak:** "Maybe $20/month if it was perfect"
**Verdict:** Build ONLY if they'll pay enough to cover costs

### How Many People Have It?

**Strong:** 5+ interviews mention it unprompted
**Weak:** Had to ask 20 people to find 1 with it
**Verdict:** Build if strong (market size matters)

### Can You Solve It?

**Strong:** Simple, obvious solution
**Weak:** Complex, requires changing their entire workflow
**Verdict:** Build if strong (avoid 6-month builds)

---

## PHASE 4: SOLUTION DESIGN
*How to think through building a solution*

### Step 4A: Define the MVP (Minimum Viable Product)

**MVP = smallest thing that solves the problem**

NOT: "All features they asked for"
YES: "The core feature they'll pay for"

**Example:**
- **Problem:** Plumbers miss callbacks while on job
- **Customer wants:** AI bot, appointment booking, SMS, calendar sync, dashboard
- **Your MVP:** AI bot that texts replies + logs their name/phone
  - No calendar (they can add manually for now)
  - No dashboard (they'll see in SMS thread)
  - Simple but solves the core problem

**How to decide MVP scope:**
1. List all features they mentioned
2. Rank by: "Will they pay without this?" 
3. Keep only TOP 3 features
4. Cut everything else
5. Launch in 2 weeks, not 6 months

---

### Step 4B: Tech Stack Decision

**Questions to ask yourself:**

1. **Can I build this with tools I know?**
   - YES → Use what you know
   - NO → Learn as you go (2-4 weeks)

2. **Does it need to integrate with their existing tools?**
   - Gmail? → Gmail API
   - Slack? → Slack API
   - Calendar? → Google Calendar or Outlook API
   - CRM? → Zapier webhook (easier than direct API)

3. **Does it need a database?**
   - Store customer data? → PostgreSQL or SQLite
   - Just log messages? → Google Sheet is fine

4. **Does it need a frontend?**
   - Dashboard for viewing? → React or simple HTML
   - Just notifications? → Email or SMS (no frontend)

5. **Where do I host it?**
   - Simple job? → Render (free tier)
   - Heavy compute? → AWS or DigitalOcean
   - Just an API? → Vercel (serverless)

**Your Process:**
```
Problem → MVP Scope → Tech Stack → Build → Test → Sell
```

---

### Step 4C: "What Tools Can We Use?" Framework

This is the KEY question. When you discover a problem, ask:

**1. What existing APIs/services already do parts of this?**

Example: Plumber callback problem
- Twilio → SMS replies ✓
- Google Calendar → Auto-booking ✓
- Discord → Notifications ✓
- Zapier → Connect them together ✓

**Your job:** Combine these, not build from scratch.

**2. What would take longest to build?**

Example: AI conversation logic → That's custom, needs Claude API

**3. What can I integrate vs. build?**

```
INTEGRATE (use existing service):
- SMS: Twilio ✓
- Email: SendGrid ✓
- Calendar: Google Calendar ✓
- Notifications: Discord ✓

BUILD (custom):
- Conversation logic (the chatbot brain)
- Customer onboarding flow
- Admin dashboard (maybe)
```

**Result:** 80% integrated, 20% custom = 2-week build instead of 2-month

---

### Step 4D: The Build Plan Template

```
PRODUCT: [Name]
PROBLEM: [What you're solving]

CORE FEATURES (MVP):
1. [Feature #1] - Required to solve problem
2. [Feature #2] - Nice to have but works without
3. [Feature #3] - Minimal feature set

TECH STACK:
- Backend: [Node.js/Python/etc]
- Database: [PostgreSQL/SQLite/Sheet]
- Integrations: [Twilio, Calendar, etc]
- Hosting: [Render/Vercel/AWS]

ESTIMATED BUILD TIME: 1-2 weeks
LAUNCH TARGET: [Date]

INTEGRATION CHECKLIST:
- [ ] Twilio account set up
- [ ] Google Calendar OAuth
- [ ] Database schema designed
- [ ] API endpoints planned

CUSTOM CODE CHECKLIST:
- [ ] Conversation logic
- [ ] Webhook handlers
- [ ] Error handling
- [ ] Logging

TESTING:
- [ ] Manual testing with real customer
- [ ] Edge case testing
- [ ] Load testing (if needed)

LAUNCH:
- [ ] Deploy to production
- [ ] Get customer feedback
- [ ] Iterate
```

---

## PHASE 5: PRE-LAUNCH VALIDATION
*Sell BEFORE you build*

### Step 5A: The Pre-Sale Call

Before you code, call the customer again:

> "Hey [Name], I've been thinking about your callback problem. I have an idea for a solution. It would be [simple description]. Would this solve your problem? And if I could set it up in 2 weeks for [price], would you be interested?"

**Goals:**
- ✅ Confirm they still want it
- ✅ Get commitment (not promise, COMMITMENT)
- ✅ Agree on price
- ✅ Set launch date

**If they say yes:** BUILD
**If they say maybe:** Interview 2-3 more people first
**If they say no:** PIVOT or move to next problem

---

### Step 5B: Price Setting

**DON'T just guess.** Ask them:

> "How much would you pay per month for this?"

Listen to the number. If they say $500, that's your starting price.

**Price Anchoring:**
- Software subscription = $100–1000/mo typically
- Your cost: ~$15–30/mo to run it
- Your margin: 80–90%
- YOUR REVENUE: $70–970/mo per customer

**Price by value:**
- If it saves them $X/month → charge 20-30% of that savings
- If it makes them $X/month → charge 10-20% of that gain

---

## PHASE 6: LAUNCH & ITERATE
*Ship, learn, repeat*

### First Customer Workflow

1. **Get them live:** Set up product for their specific business
2. **Support them:** Daily check-ins first week
3. **Gather feedback:** "What would make this better?"
4. **Fix quick wins:** Easy improvements
5. **Document:** Write down what you learn
6. **Second customer:** Faster onboarding (you know process now)
7. **Third customer:** Starting to systemize
8. **Tenth customer:** Repeatable playbook

---

## YOUR ROADMAP (Next 4 Weeks)

### Week 1: Discovery
- [ ] Scrape Reddit/Facebook for problems (3 hours)
- [ ] Find 5 people with interesting problems
- [ ] Schedule 5 discovery interviews

### Week 2: Validation
- [ ] Do 5 discovery interviews (1.25 hours each)
- [ ] Document findings
- [ ] Identify top 3 problems with strongest signals
- [ ] Pick ONE to build

### Week 3: Design + Pre-Sale
- [ ] Call top 3 customers again
- [ ] Pre-sell solution ("I'll build X for $Y by date Z")
- [ ] Get 1-2 commitments
- [ ] Design MVP (tech stack, features, timeline)

### Week 4: Build
- [ ] Build MVP (parallel with NexcomAI)
- [ ] Test with customer
- [ ] Launch and iterate

---

## TOOLS YOU ALREADY HAVE

✅ **Brave Search** — find problems
✅ **Playwright Scraper** — scrape Reddit/web
✅ **Claude API** — think through solutions
✅ **GitHub** — version control
✅ **Render** — host it
✅ **Your own experience** — you understand problems

---

## THE FRAMEWORK (In 30 Seconds)

```
PROBLEM DISCOVERY → VALIDATION INTERVIEW → ASSESSMENT → 
MVP DESIGN → PRE-SALE → BUILD → LAUNCH
```

Each phase confirms: "Is this worth building?"

If answer is NO at any point → stop and pivot.
If answer is YES throughout → ship it fast.

---

## Example: How NexcomAI Started

1. **Problem Found:** Plumbers missing callbacks = lost jobs
2. **Validated:** Multiple Reddit posts, Twilio post about missed calls
3. **Assessed:** Daily problem, costs them money, they'd pay $300–500/mo
4. **Solution:** AI bot answers texts + books appointments
5. **Tech:** Twilio + Claude + Google Calendar (no custom code needed)
6. **Pre-sold:** Called 3 plumbers, got 1 commitment
7. **Built:** 2 weeks with existing code
8. **Launched:** Week 1 revenue ✓

**Same process you'll follow for the next 3 products.**

---

## What Success Looks Like

**By end of month:**
- 2-3 problems thoroughly validated
- 1 product built + 1-2 paying customers
- Playbook documented (so you can repeat)
- Revenue flowing

**By end of quarter:**
- 4-5 products in market (iterate fast)
- 10+ customers across products
- $3-5k/mo recurring revenue
- Repeatable system

---

*This roadmap is your thinking guide. Follow it. Modify it. Document what works.*

*Questions? Ask me. I'm here to help you think through problems, not just code.*

🦊
