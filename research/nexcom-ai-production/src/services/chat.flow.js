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
const WHATSAPP_KEYWORDS = ['whatsapp', 'whats app', 'wa'];
const FACEBOOK_KEYWORDS = ['facebook', 'messenger', 'fb'];
const TELEGRAM_KEYWORDS = ['telegram'];
const FULL_KEYWORDS = ['all', 'everything', 'full', 'complete', 'all platforms'];

const BOOKING_KEYWORDS = ['demo', 'book', 'schedule', 'appointment', 'call', 'talk', 'meeting', 'yes', 'sure', 'interested'];

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
    state.step = 'booking';
    return "Great! Let's get you set up. What's your name and business name so we can schedule your free demo?";
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

  // CAPTURE NAME (during booking flow OR if looks like a name)
  const looksLikeName = /^[A-Z][a-z]+ [A-Z][a-z]+$/.test(message.trim()) || (state.step === 'booking' && !state.name);
  if (looksLikeName && !state.name) {
    state.step = 'booking';
    state.name = message;
    return `Nice to meet you, ${message.split(' ')[0]}! What type of business do you run? (e.g. plumbing, real estate, cleaning, HVAC)`;
  }

  // CAPTURE BUSINESS TYPE
  if (state.step === 'booking' && state.name && !state.business) {
    state.business = message;
    return `Perfect! What's the best phone number to reach you to schedule the demo?`;
  }

  // CAPTURE PHONE
  if (state.step === 'booking' && state.name && state.business && !state.phone) {
    const phoneMatch = message.match(/[\d\s\-\(\)\+]{7,}/);
    if (phoneMatch) {
      state.phone = phoneMatch[0].trim();
      return `Got it! We'll call ${state.phone} within 24 hours to schedule your free demo. We'll show you exactly how the AI works for a ${state.business} business. Anything else I can help with?`;
    }
    return "Could you share your phone number so we can reach you? (e.g. 727-555-0100)";
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
