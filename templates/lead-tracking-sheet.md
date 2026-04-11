# Lead Tracking Sheet — Parking Lot Striping

## How to Use This Template

### Setup (One-time)
1. Go to **Google Sheets** (sheets.google.com)
2. Click **+ Create** → **Blank spreadsheet**
3. Name it: `Parking Lot Leads — 2026`
4. Copy the column headers below into row 1
5. Format as described

### Column Headers (Copy these to Row 1)

```
A: Date | B: Source | C: Business Name | D: Contact Name | E: Phone | F: Email | G: City | H: Lot Size (spaces) | I: Service | J: Quote $ | K: Status | L: Job Date | M: Paid $ | N: Materials $ | O: Hours | P: Profit $ | Q: Notes
```

---

## Column Details (What to Put in Each)

| Column | What to Enter | Example |
|--------|---------------|---------|
| **A: Date** | Date you got the lead | 04/11/2026 |
| **B: Source** | Thumbtack / Craigslist / Facebook / Nextdoor / Cold Call / Referral | Thumbtack |
| **C: Business Name** | Company or property | Main Street Pizza |
| **D: Contact Name** | Person's name | John Smith |
| **E: Phone** | Their phone | 727-555-1234 |
| **F: Email** | Their email | john@mainstreetpizza.com |
| **G: City** | Which Pinellas city | Clearwater |
| **H: Lot Size** | Number of parking spaces | 45 |
| **I: Service** | Stripe / Patch / Resurfacing / Mixed | Stripe + Fire Lane |
| **J: Quote $** | Price you quoted them | 350 |
| **K: Status** | Quoted / Accepted / Rejected / In Progress / Complete | Accepted |
| **L: Job Date** | When you did/will do it | 04/15/2026 |
| **M: Paid $** | What they actually paid | 350 |
| **N: Materials $** | Paint, gas, supplies cost | 45 |
| **O: Hours** | Time you spent (estimate) | 3.5 |
| **P: Profit $** | *Formula: =M-N-(O*50)* | 175 |
| **Q: Notes** | Any extras | Includes ADA symbol, repeat customer |

---

## Formulas to Add

### At the bottom of your sheet, add summary calculations:

**Total Leads (Row 25):**
```
=COUNTA(A2:A24)
```

**Conversion Rate (Row 26):**
```
=COUNTIF(K2:K24,"Accepted")/COUNTA(A2:A24)
```
*(Shows as decimal, e.g., 0.40 = 40%)*

**Total Revenue (Row 27):**
```
=SUM(M2:M24)
```

**Total Profit (Row 28):**
```
=SUM(P2:P24)
```

**Profit by Source (Row 30+):**
```
=SUMIF(B:B,"Thumbtack",P:P)   (repeat for each source)
```

---

## Color Coding (Optional but Helpful)

- **Green:** Status = "Complete" (paid jobs done)
- **Yellow:** Status = "Accepted" (jobs not yet done)
- **Red:** Status = "Rejected" (lost leads)
- **Gray:** Status = "Quoted" (waiting on answer)

In Google Sheets:
1. Select the row
2. Format → Conditional formatting
3. Set rules for each status

---

## Sample Data (Copy this to get started)

```
Date | Source | Business | Contact | Phone | Email | City | Spaces | Service | Quote | Status | Job Date | Paid | Materials | Hours | Profit | Notes
04/11/2026 | Thumbtack | Main St Pizza | John Smith | 727-555-1234 | john@example.com | Clearwater | 45 | Stripe | 350 | Accepted | 04/15/2026 | 350 | 45 | 3 | 205 | Standard 2-color stripe
04/12/2026 | Cold Call | Best Buy | Manager Bob | 727-555-5678 | bob@bestbuy.com | Largo | 120 | Stripe+Fire | 650 | Quoted | - | 0 | 0 | 0 | 0 | Waiting on approval
04/13/2026 | Craigslist | Church of Life | Rev. Paul | 727-555-9999 | paul@churchoflife.org | St Pete | 60 | ADA Only | 180 | Rejected | - | 0 | 0 | 0 | 0 | Too low budget
04/14/2026 | Facebook | Local Restaurant | Manager Sue | 727-555-2222 | sue@localrest.com | Clearwater | 30 | Stripe | 200 | Complete | 04/14/2026 | 200 | 30 | 2.5 | 105 | Fast turnaround, happy customer
```

---

## What This Tells You (After 10 Jobs)

After 10 leads, you'll see:

- **"Thumbtack converts 60% but Cold Calls only 20%"** → Focus on Thumbtack
- **"Stripe jobs profit $150 but Patching jobs profit $80"** → Sell more striping
- **"I can do 3 jobs per week at $400 avg"** → $1,200/week, $4,800/month
- **"Materials are only 10% of revenue"** → Pricing is good
- **"Churches are slow payers but loyal"** → Set payment terms upfront

---

## Pro Tips

1. **Enter data SAME DAY** — don't wait, you'll forget details
2. **Call it by date** — "Parking Lot Leads — April 2026"
3. **Share with me** (optional) — paste the link in Telegram, I can help you analyze
4. **Update after EVERY job** — payment date, actual hours, actual materials cost
5. **Review weekly** — Friday night, see what worked, what didn't

---

## Next: Actually Build It

1. Go to sheets.google.com
2. Create blank sheet
3. Copy headers from the table above
4. Add sample data to start
5. Save it
6. Send me the link if you want feedback

Takes 10 minutes. Do it now while it's fresh! 🦊

---

*This is your business dashboard. It doesn't have to be fancy — it just has to work.*
