# NexcomAI Production
*AI assistant for service businesses — SMS, WhatsApp, Facebook, Telegram*

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Initialize Database
```bash
npm run init-db
```

### 4. Start Server
```bash
npm start
```

Server runs on `http://localhost:3002`

---

## Credentials Needed

### ✅ Already Have
- `TWILIO_SID` — From ~/.env
- `TWILIO_TOKEN` — From ~/.env
- `TWILIO_PHONE` — From ~/.env

### 🔄 Need to Set Up (5 min each)

**Minimax API (AI Engine)**
1. Go to https://www.minimax.io
2. Sign up (free tier available)
3. Create API key
4. Add to `.env` as `MINIMAX_API_KEY`

**SendGrid (Email)**
1. Go to https://sendgrid.com
2. Create free account
3. Generate API key
4. Add to `.env` as `SENDGRID_API_KEY`

**Telegram Bot**
1. Message @BotFather on Telegram
2. Type `/newbot` and follow prompts
3. Get bot token
4. Add to `.env` as `TELEGRAM_BOT_TOKEN`

**Discord Webhook**
1. Create Discord server (or use existing)
2. Create webhook in #notifications channel
3. Copy webhook URL
4. Add to `.env` as `DISCORD_WEBHOOK`

**Google Calendar (Optional - coming soon)**
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable Calendar API
4. Create service account
5. Download JSON credentials
6. Add path to `.env` as `GOOGLE_SERVICE_ACCOUNT_JSON`

**Stripe (Optional - coming soon)**
1. Go to https://stripe.com
2. Create account (free)
3. Get secret key
4. Add to `.env` as `STRIPE_SECRET_KEY`

---

## API Endpoints

### SMS Webhook
```
POST /sms
Body: From, Body (from Twilio)
```

### Get Conversations
```
GET /api/conversations
Response: { success: true, data: [...] }
```

### Get Messages
```
GET /api/conversations/:id/messages
Response: { success: true, data: [...] }
```

### Dashboard
```
GET /dashboard
Opens interactive dashboard
```

---

## Database Schema

**Tables:**
- `customers` — Businesses using NexcomAI
- `conversations` — Lead captures
- `messages` — All SMS/message logs
- `appointments` — Scheduled meetings
- `settings` — Per-customer config
- `api_usage` — For billing
- `sessions` — Conversation state

Run `sqlite3 nexcom.db .schema` to see all tables.

---

## Webhooks to Configure

### Twilio SMS
1. Go to Twilio console
2. Phone Number → Configure
3. Messaging → Webhook URL: `https://YOUR_DOMAIN/sms`
4. Save

### Telegram
1. Use BotFather: `/setwebhook`
2. Webhook URL: `https://YOUR_DOMAIN/webhook/telegram`

### Discord
1. Copy webhook URL from Discord settings
2. Add to `.env` as `DISCORD_WEBHOOK`

---

## Deployment (Render)

1. Push to GitHub
2. Create account at https://render.com
3. Connect GitHub repo
4. Create new Web Service
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables from `.env`
8. Deploy

Your app is live at `https://your-app.onrender.com`

---

## Testing

### Send Test SMS
```bash
curl -X POST http://localhost:3002/sms \
  -d "From=%2B17275551234&Body=Hello" \
  -H "Content-Type: application/x-www-form-urlencoded"
```

### Check Dashboard
Open http://localhost:3002/dashboard

### View Conversations
```bash
curl http://localhost:3002/api/conversations
```

---

## Troubleshooting

**Database connection error?**
- Make sure `nexcom.db` exists
- Run `npm run init-db`

**Minimax API not working?**
- Check API key in `.env`
- Verify API endpoint is correct

**SMS not sending?**
- Check Twilio credentials
- Verify webhook is configured correctly

**Email not sending?**
- Check SendGrid API key
- Verify sender email is authenticated

---

## Next Steps

- [ ] WhatsApp integration
- [ ] Facebook Messenger integration
- [ ] Customer dashboard (auth)
- [ ] Google Calendar scheduling
- [ ] Payment handling (Stripe)
- [ ] Advanced analytics

---

*Built with Express, SQLite, Minimax AI*
