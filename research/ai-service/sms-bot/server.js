const express = require('express');
const twilio = require('twilio');
const https = require('https');
const crypto = require('crypto');

const app = express();

// ── RAW BODY for Facebook signature verification ──
app.use('/webhook/facebook', express.raw({ type: 'application/json' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ── CONFIG ──────────────────────────────────────────────────
const TWILIO_SID     = process.env.TWILIO_SID || 'AC831290d16c13e7903a20f4e085ff5937';
const TWILIO_TOKEN   = process.env.TWILIO_TOKEN || '29bd832e260b61e8488fb7a0d5b1df1a';
const TWILIO_NUMBER  = process.env.TWILIO_NUMBER || '+18443146777';
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK || 'https://discord.com/api/webhooks/1489403319381135501/rRAmEJFUVILC-rVY7uH-Qh0Qlm6TYXHzaxOtM67LJbTKNNQ8KdZocTYWuy5lhgowj0_A';
const FB_PAGE_TOKEN  = process.env.FB_PAGE_TOKEN || '';
const FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'nexcomai2026';
const FB_APP_SECRET  = process.env.FB_APP_SECRET || '';
const WA_TOKEN       = process.env.WA_TOKEN || ''; // WhatsApp via Meta Cloud API
const WA_PHONE_ID    = process.env.WA_PHONE_ID || '';
const WA_VERIFY_TOKEN = process.env.WA_VERIFY_TOKEN || 'nexcomai2026';

const twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN);

// ── SESSION STORE ────────────────────────────────────────────
// Key: platform:userId (e.g. "sms:+17275551234", "fb:1234567", "wa:+591123456")
const sessions = {};

// ── CONVERSATION ENGINE ──────────────────────────────────────
function getSession(key) {
  if (!sessions[key]) {
    sessions[key] = { step: 'start', name: null, business: null, interest: null, callbackPhone: null, preferredTime: null, platform: key.split(':')[0] };
  }
  return sessions[key];
}

function getResponse(sessionKey, message, fromPhone) {
  const lower = message.toLowerCase().trim();
  const s = getSession(sessionKey);

  if (s.step === 'start' || /^(hi|hello|hey|hola|yes|info|help|start|buenos|buenas)/.test(lower)) {
    s.step = 'get_name';
    return `Hi! Thanks for texting Nexcom AI. We help local businesses capture leads 24/7. What's your name?`;
  }

  if (s.step === 'get_name') {
    s.name = message.trim();
    s.step = 'get_business';
    return `Nice to meet you, ${s.name}! 😊\n\nWhat's your business name?`;
  }

  if (s.step === 'get_business') {
    s.business = message.trim();
    s.step = 'get_interest';
    return `Great! What type of business is ${s.business}?\n\n1️⃣ Plumbing / HVAC\n2️⃣ Electrical\n3️⃣ Real Estate\n4️⃣ Cleaning Service\n5️⃣ Other`;
  }

  if (s.step === 'get_interest') {
    const types = { '1': 'Plumbing/HVAC', '2': 'Electrical', '3': 'Real Estate', '4': 'Cleaning Service', '5': 'Other' };
    s.interest = types[lower] || message.trim();
    s.step = 'offer_demo';
    return `Perfect! I'd love to show you how an AI assistant would work for ${s.business}. 🚀\n\nCheck out our live demo: nexcomai.ai\n\nWould you like Hugo to give you a quick 15-min walkthrough? Reply YES!`;
  }

  if (s.step === 'offer_demo') {
    if (/yes|sure|ok|yeah|please|yep|book|call|absolutely|si|sí|claro/.test(lower)) {
      s.step = 'get_time';
      return `Awesome! 🎉 When's the best time for a quick call?\n\n1️⃣ Today\n2️⃣ Tomorrow morning\n3️⃣ Tomorrow afternoon\n4️⃣ This week — you pick`;
    } else {
      s.step = 'done';
      return `No problem! Explore the demo at nexcomai.ai whenever you're ready.\n\nAny questions, just message here anytime — available 24/7! 😊`;
    }
  }

  if (s.step === 'get_time') {
    s.preferredTime = message.trim();
    s.step = 'confirm_phone';
    s.callbackPhone = fromPhone || null;
    return `Got it — ${s.preferredTime} works!\n\nBest phone number for Hugo to call? (or reply "this number")`;
  }

  if (s.step === 'confirm_phone') {
    if (/this|same|here|mine/.test(lower)) {
      s.callbackPhone = fromPhone || 'provided via ' + s.platform;
    } else {
      s.callbackPhone = message.trim();
    }
    s.step = 'done';
    notifyAll(s, sessionKey);
    return `✅ *You're all set, ${s.name}!*\n\nHugo will call ${s.callbackPhone} ${s.preferredTime}.\n\nIn the meantime, try the live demo: nexcomai.ai\n\nLooking forward to showing you what's possible! 🚀`;
  }

  if (/price|cost|how much|pricing|charge|cuanto|precio/.test(lower)) {
    return `Our plans:\n\n💰 *Starter:* $500 setup + $300/mo\n🚀 *Growth:* $1,000 setup + $500/mo\n\nMost clients make it back week 1 from jobs they would've missed.\n\nSee demo: nexcomai.ai — Reply YES to book a call!`;
  }

  if (/what|how|work|explain|tell|como|que es/.test(lower)) {
    return `Nexcom AI sets up a custom AI assistant for your business that:\n\n✅ Answers texts & DMs 24/7\n✅ Books appointments automatically\n✅ Captures leads while you sleep\n✅ Works in English & Spanish 🇪🇸\n✅ Works on SMS, Facebook, Instagram & WhatsApp\n\nSee it live: nexcomai.ai\n\nReply YES to book a quick call with Hugo!`;
  }

  return `Thanks for reaching out! Hugo from Nexcom AI will get back to you shortly.\n\nCheck out our live demo: nexcomai.ai 🤖\n\nQuestions? Just message here anytime!`;
}

// ── NOTIFY DISCORD ───────────────────────────────────────────
function notifyAll(session, sessionKey) {
  const platform = sessionKey.split(':')[0].toUpperCase();
  const platformEmoji = { SMS: '📱', FB: '💬', WA: '📲', IG: '📸' }[platform] || '💬';

  try {
    const body = JSON.stringify({
      username: 'Nexcom AI 🤖',
      embeds: [{
        title: `🔥 NEW LEAD via ${platformEmoji} ${platform}!`,
        color: 5814783,
        fields: [
          { name: '👤 Name', value: session.name || '—', inline: true },
          { name: '🏢 Business', value: session.business || '—', inline: true },
          { name: '🔧 Type', value: session.interest || '—', inline: true },
          { name: '📞 Callback', value: session.callbackPhone || '—', inline: true },
          { name: '⏰ Time', value: session.preferredTime || '—', inline: true },
          { name: '📡 Platform', value: platform, inline: true },
          { name: '🎯 Action', value: `Call ${session.callbackPhone} ${session.preferredTime}!`, inline: false }
        ],
        footer: { text: 'Nexcom AI · nexcomai.ai' },
        timestamp: new Date().toISOString()
      }]
    });

    const url = new URL(DISCORD_WEBHOOK);
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    });
    req.write(body);
    req.end();
    console.log(`✅ Discord notified — lead from ${platform}`);
  } catch(e) {
    console.error('Discord error:', e.message);
  }
}

// ── SEND FACEBOOK MESSAGE ────────────────────────────────────
function sendFBMessage(recipientId, text) {
  if (!FB_PAGE_TOKEN) return;
  const body = JSON.stringify({ recipient: { id: recipientId }, message: { text }, messaging_type: 'RESPONSE' });
  const req = https.request({
    hostname: 'graph.facebook.com',
    path: '/v18.0/me/messages?access_token=' + FB_PAGE_TOKEN,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  });
  req.write(body);
  req.end();
}

// ── SEND WHATSAPP MESSAGE (Meta Cloud API) ───────────────────
function sendWAMessage(to, text) {
  if (!WA_TOKEN || !WA_PHONE_ID) return;
  const body = JSON.stringify({
    messaging_product: 'whatsapp',
    to: to,
    type: 'text',
    text: { body: text }
  });
  const req = https.request({
    hostname: 'graph.facebook.com',
    path: `/v18.0/${WA_PHONE_ID}/messages`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${WA_TOKEN}`,
      'Content-Length': Buffer.byteLength(body)
    }
  });
  req.write(body);
  req.end();
}

// ══════════════════════════════════════════════════════════════
// CHANNEL HANDLERS
// ══════════════════════════════════════════════════════════════

// ── SMS (Twilio) ─────────────────────────────────────────────
app.post('/sms', (req, res) => {
  const from = req.body.From;
  const body = req.body.Body || '';
  console.log(`📱 SMS from ${from}: ${body}`);

  const reply = getResponse(`sms:${from}`, body, from);
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(reply);
  res.type('text/xml').send(twiml.toString());
});

// ── FACEBOOK MESSENGER ───────────────────────────────────────
// Verification
app.get('/webhook/facebook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === FB_VERIFY_TOKEN) {
    console.log('✅ Facebook webhook verified');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Incoming messages
app.post('/webhook/facebook', (req, res) => {
  res.sendStatus(200); // Acknowledge immediately

  let body;
  try { body = JSON.parse(req.body); } catch(e) { return; }

  if (body.object !== 'page') return;

  body.entry?.forEach(entry => {
    entry.messaging?.forEach(event => {
      if (!event.message || event.message.is_echo) return;

      const senderId = event.sender.id;
      const text = event.message.text || '';
      console.log(`💬 Facebook from ${senderId}: ${text}`);

      const reply = getResponse(`fb:${senderId}`, text, null);
      sendFBMessage(senderId, reply);
    });
  });
});

// ── WHATSAPP (Meta Cloud API) ────────────────────────────────
// Verification
app.get('/webhook/whatsapp', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === WA_VERIFY_TOKEN) {
    console.log('✅ WhatsApp webhook verified');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Incoming messages
app.post('/webhook/whatsapp', (req, res) => {
  res.sendStatus(200);

  const body = req.body;
  const entry = body.entry?.[0];
  const changes = entry?.changes?.[0];
  const value = changes?.value;

  if (!value?.messages) return;

  value.messages.forEach(msg => {
    if (msg.type !== 'text') return;
    const from = msg.from;
    const text = msg.text?.body || '';
    console.log(`📲 WhatsApp from ${from}: ${text}`);

    const reply = getResponse(`wa:${from}`, text, '+' + from);
    sendWAMessage(from, reply);
  });
});

// ── HEALTH CHECK ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: '✅ Nexcom AI Multi-Channel Bot running',
    channels: {
      sms: `${TWILIO_NUMBER} → /sms`,
      facebook: '/webhook/facebook',
      whatsapp: '/webhook/whatsapp'
    },
    demo: 'nexcomai.ai',
    version: '3.0'
  });
});

// ── START ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`\n🤖 Nexcom AI Multi-Channel Bot v3.0`);
  console.log(`   SMS:       POST /sms`);
  console.log(`   Facebook:  /webhook/facebook`);
  console.log(`   WhatsApp:  /webhook/whatsapp`);
  console.log(`   Port: ${PORT}\n`);
});
