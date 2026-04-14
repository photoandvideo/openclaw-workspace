require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// Services
const db = require('./models/db');

// Routes
const smsRoute = require('./routes/sms.route');

const app = express();
const PORT = process.env.PORT || 3002;

// ── MIDDLEWARE ──
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ── STATIC FILES ──
app.use(express.static(path.join(__dirname, '../public')));

// ── HEALTH CHECK ──
app.get('/', (req, res) => {
  res.json({
    status: '✅ NexcomAI Production running',
    version: '1.0.0',
    channels: {
      sms: 'POST /sms',
      whatsapp: 'POST /webhook/whatsapp',
      facebook: 'POST /webhook/facebook',
      telegram: 'POST /webhook/telegram'
    },
    dashboard: '/dashboard',
    api: '/api'
  });
});

// ── API ROUTES ──
app.use('/sms', smsRoute);

// ── PLACEHOLDER: Other channels (coming next) ──
app.post('/webhook/whatsapp', (req, res) => {
  res.json({ status: 'WhatsApp handler - coming soon' });
});

app.post('/webhook/facebook', (req, res) => {
  res.json({ status: 'Facebook handler - coming soon' });
});

app.post('/webhook/telegram', (req, res) => {
  res.json({ status: 'Telegram handler - coming soon' });
});

// ── PLACEHOLDER: Dashboard ──
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

// ── API: Get conversations ──
app.get('/api/conversations', async (req, res) => {
  try {
    const conversations = await db.all(
      'SELECT * FROM conversations ORDER BY created_at DESC LIMIT 50'
    );
    res.json({ success: true, data: conversations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ── API: Get messages for conversation ──
app.get('/api/conversations/:id/messages', async (req, res) => {
  try {
    const messages = await db.all(
      'SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC',
      [req.params.id]
    );
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ── ERROR HANDLING ──
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// ── 404 ──
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── START SERVER ──
app.listen(PORT, () => {
  console.log(`\n🤖 NexcomAI Production v1.0.0`);
  console.log(`   SMS:       POST /sms`);
  console.log(`   WhatsApp:  POST /webhook/whatsapp`);
  console.log(`   Facebook:  POST /webhook/facebook`);
  console.log(`   Telegram:  POST /webhook/telegram`);
  console.log(`   Dashboard: GET /dashboard`);
  console.log(`   API:       GET /api/conversations`);
  console.log(`   Port:      ${PORT}\n`);
  console.log(`✅ Ready to receive messages!\n`);
});

// ── GRACEFUL SHUTDOWN ──
process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down...');
  await db.close();
  process.exit(0);
});
