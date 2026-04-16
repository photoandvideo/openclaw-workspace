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

// ── VOICE HANDLER: Incoming calls ──
app.post('/voice', (req, res) => {
  const twilio = require('twilio');
  const voiceResponse = new twilio.twiml.VoiceResponse();
  
  // Play greeting and hang up
  voiceResponse.say(
    'Thanks for calling NexcomAI. Text us your question and we will respond right away.',
    { voice: 'woman' }
  );
  voiceResponse.hangup();
  
  res.type('text/xml').send(voiceResponse.toString());
});

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

// In-memory chat sessions (works perfectly, no DB needed)
const chatSessions = {};

// ── API: Web Chat ──
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });
    const sid = sessionId || 'default';

    // Get or create session state
    if (!chatSessions[sid]) chatSessions[sid] = { step: 'start' };
    const state = chatSessions[sid];

    // Process message
    const { processMessageWithState } = require('./services/chat.flow');
    const { response, newState } = processMessageWithState(message, state);
    
    // Save updated state
    chatSessions[sid] = newState;

    // If booking confirmed, notify
    if (newState.step === 'done' && newState.phone) {
      try {
        const notificationService = require('./services/notification.service');
        await notificationService.notifyBusinessOwner('nexcomaiai@gmail.com', {
          visitorName: newState.name,
          visitorBusiness: newState.business,
          visitorPhone: newState.phone,
          preferredTime: `${newState.date} at ${newState.time}`
        });
      } catch(e) { console.error('Notification error:', e.message); }
    }

    res.json({ response, success: true });
  } catch (error) {
    console.error('Chat API error:', error.message);
    res.status(500).json({ response: 'Sorry, something went wrong. Please try again.', success: false });
  }
});

// ── API: Test Email ──
app.get('/api/test-email', async (req, res) => {
  try {
    const notificationService = require('./services/notification.service');
    const result = await notificationService.notifyBusinessOwner('nexcomaiai@gmail.com', {
      visitorName: 'Test User',
      visitorBusiness: 'Test Company',
      visitorPhone: '727-555-0100',
      preferredTime: 'April 21 at 10am'
    });
    res.json({ success: result, resend_key_set: !!process.env.RESEND_API_KEY });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ── API: Demo Booking ──
app.post('/api/book', async (req, res) => {
  try {
    const { name, business, phone, businessType, packages } = req.body;
    if (!name || !phone) return res.status(400).json({ error: 'Name and phone required' });

    const notificationService = require('./services/notification.service');
    const calendarService = require('./services/calendar.service');
    
    // Save lead to database
    await db.run(
      `INSERT INTO customers (business_name, business_type, contact_phone, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [business || 'Unknown', businessType || 'Other', phone, 'lead']
    );

    // Notify Hugo via email
    await notificationService.notifyBusinessOwner('nexcomaiai@gmail.com', {
      visitorName: name,
      visitorBusiness: business,
      visitorPhone: phone,
      preferredTime: 'ASAP',
      visitorEmail: req.body.email || '—'
    });

    // Create Google Calendar event
    await calendarService.createDemoBooking({ name, business, phone, businessType, packages });

    console.log(`📅 New booking: ${name} - ${business} - ${phone}`);
    res.json({ success: true, message: 'Demo booked! We\'ll reach out within 24h.' });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Booking failed', message: error.message });
  }
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
