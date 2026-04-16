/**
 * NexcomAI Conversational Flow
 * Smart rule-based chat that guides prospects to book a demo
 * Reliable, predictable, focused on sales
 */

const SERVICES = {
  sms: { name: 'SMS Chatbot', setup: '$500', monthly: '$300' },
  web: { name: 'Web Chat', setup: '$500', monthly: '$300' },
  sms_web: { name: 'SMS + Web Chat', setup: '$800', monthly: '$500' },
  whatsapp: { name: 'WhatsApp', setup: '$1,000', monthly: '$750' },
  full: { name: 'Full Suite (all platforms)', setup: '$1,500', monthly: '$1,000' }
};

const GREETINGS = [
  'hi', 'hello', 'hey', 'hola', 'good morning', 'good afternoon', 'good evening', 'howdy'
];

const SERVICE_KEYWORDS = [
  'service', 'offer', 'product', 'package', 'plan', 'price', 'cost', 'how much', 'what do you'
];

const SMS_KEYWORDS = ['sms', 'text', 'texting', 'message', 'messaging'];
const WEB_KEYWORDS = ['web', 'website', 'chat', 'widget', 'site'];
const WHATSAPP_KEYWORDS = ['whatsapp', 'whats app'];
const FACEBOOK_KEYWORDS = ['facebook', 'messenger'];
const TELEGRAM_KEYWORDS = ['telegram'];
const FULL_KEYWORDS = ['all platforms', 'full suite', 'everything', 'all channels'];

const BOOKING_KEYWORDS = ['book a demo', 'schedule a demo', 'book a call', 'schedule a call', 'want a demo', 'book me', 'lets book', "let's book", 'i want to book', 'interested in a demo'];

const PRICE_KEYWORDS = ['price', 'cost', 'how much', 'pricing', 'charge', 'fee', 'monthly', 'setup'];

function matchesAny(text, keywords) {
  return keywords.some(k => text.includes(k));
}

function getSessionState(sessions, sessionId) {
  if (!sessions[sessionId]) {
    sessions[sessionId] = { step: 'start', name: null, business: null, phone: null };
  }
  return sessions[sessionId];
}

const sessions = {};

function processMessage(message, sessionId) {
  const text = message.toLowerCase().trim();
  const state = getSessionState(sessions, sessionId);

  // GREETING
  if (matchesAny(text, GREETINGS) && text.length < 20) {
    return "Hi! 👋 I'm the NexcomAI assistant. We set up AI chatbots for local businesses — SMS, website chat, WhatsApp, and more. What type of business do you have?";
  }

  // BOOKING / DEMO REQUEST
  if (matchesAny(text, BOOKING_KEYWORDS) && !matchesAny(text, FACEBOOK_KEYWORDS) && !matchesAny(text, WHATSAPP_KEYWORDS) && !matchesAny(text, SMS_KEYWORDS) && !matchesAny(text, WEB_KEYWORDS)) {
    state.step = 'name';
    return "Great! Let's book your free demo. What's your name?";
  }

  // PRICE INQUIRY
  if (matchesAny(text, PRICE_KEYWORDS)) {
    return "Our packages start at $500 setup + $300/mo for SMS or Web Chat. The most popular is SMS + Web at $800 setup + $500/mo. Want me to explain what's included, or would you like to book a free demo?";
  }

  // SPECIFIC SERVICE INQUIRIES
  if (matchesAny(text, FULL_KEYWORDS)) {
    return `Our Full Suite covers all platforms — SMS, web chat, WhatsApp, Facebook, and Telegram. It's $1,500 setup + $1,000/mo. Interested in a free demo to see it in action?`;
  }

  if (matchesAny(text, WHATSAPP_KEYWORDS)) {
    return "Yes! We set up WhatsApp Business chatbots that answer customer messages 24/7. It's included in our $1,000 setup + $750/mo package. Want to see a live demo?";
  }

  if (matchesAny(text, FACEBOOK_KEYWORDS)) {
    return "Absolutely — we integrate with Facebook Messenger too! That's part of our Full Suite ($1,500 setup + $1,000/mo). Want to book a free demo to see how it works?";
  }

  if (matchesAny(text, SMS_KEYWORDS)) {
    return "Our SMS chatbot answers customer texts 24/7, books appointments, and captures leads automatically. It's $500 setup + $300/mo. Want to see a live demo for your business?";
  }

  if (matchesAny(text, WEB_KEYWORDS)) {
    return "Our web chat widget pops up on your website and starts conversations with visitors automatically. It's $500 setup + $300/mo. Want a free demo on your site?";
  }

  // GENERAL SERVICE INQUIRY
  if (matchesAny(text, SERVICE_KEYWORDS)) {
    return "We offer AI chatbots for local businesses: SMS ($300/mo), Web Chat ($300/mo), SMS + Web ($500/mo), WhatsApp ($750/mo), or Full Suite ($1,000/mo). Which channel do your customers use most?";
  }

  // STEP: Capture NAME
  if (state.step === 'name') {
    state.name = message;
    state.step = 'company';
    return `Nice to meet you, ${message.split(' ')[0]}! What's your company name?`;
  }

  // STEP: Capture COMPANY
  if (state.step === 'company') {
    state.business = message;
    state.step = 'phone';
    return `Great! What's the best phone number to reach you?`;
  }

  // STEP: Capture PHONE
  if (state.step === 'phone') {
    state.phone = message;
    state.step = 'date';
    return `Perfect! What date works best for your demo call? (e.g. Monday April 21)`;
  }

  // STEP: Capture DATE
  if (state.step === 'date') {
    state.date = message;
    state.step = 'time';
    return `And what time works for you on ${message}? (e.g. 10am, 2pm)`;
  }

  // STEP: Capture TIME
  if (state.step === 'time') {
    state.time = message;
    state.step = 'done';
    return `All set, ${state.name ? state.name.split(' ')[0] : 'there'}! 🎉 Your demo is scheduled for ${state.date} at ${message}. We'll call ${state.phone} to confirm. Looking forward to showing you what NexcomAI can do for ${state.business}!`;
  }

  // HOW IT WORKS
  if (text.includes('how') && (text.includes('work') || text.includes('does'))) {
    return "We configure the AI with your business info, services, and FAQs. It's live in 24-48 hours. Then it answers customer texts and messages automatically — 24/7, no human needed. Want to see a demo?";
  }

  // WHO YOU HELP
  if (text.includes('who') || text.includes('type') || text.includes('industry')) {
    return "We work with plumbers, HVAC, electricians, real estate agents, cleaning services, lawn care, pest control, and more. Basically any local business that gets texts or messages from customers. What's your industry?";
  }

  // DEFAULT - Push to demo
  return "That's a great question! The best way to see how NexcomAI works for your business is a quick 15-min demo. Want to book one? It's free, no pressure. 😊";
}

module.exports = { processMessage };
