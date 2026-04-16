/**
 * NexcomAI Conversational Flow
 * DB-backed stateless flow — state passed in and out
 */

const BOOKING_KEYWORDS = ['book a demo', 'schedule a demo', 'book a call', 'schedule a call',
  'want a demo', 'book me', 'lets book', "let's book", 'i want to book', 'interested in a demo',
  'get a demo', 'like to get a demo', 'would like a demo', 'like to book', 'sign me up',
  'ready to start', 'how do i start', 'get started', 'want a demo', 'would like'];

const WHATSAPP_KEYWORDS = ['whatsapp', 'whats app'];
const FACEBOOK_KEYWORDS = ['facebook', 'messenger'];
const TELEGRAM_KEYWORDS = ['telegram'];
const SMS_KEYWORDS = ['sms', 'text message', 'texting'];
const WEB_KEYWORDS = ['web chat', 'website chat', 'chat widget', 'chat on website'];
const PRICE_KEYWORDS = ['price', 'cost', 'how much', 'pricing', 'monthly', 'setup fee'];
const SERVICE_KEYWORDS = ['service', 'offer', 'product', 'package', 'plan', 'what do you'];
const GREETINGS = ['hi', 'hello', 'hey', 'hola', 'good morning', 'good afternoon'];

function matchesAny(text, keywords) {
  return keywords.some(k => text.includes(k));
}

// In-memory sessions (fallback only, DB is primary)
const sessions = {};

function processMessage(message, sessionId) {
  if (!sessions[sessionId]) sessions[sessionId] = { step: 'start' };
  const { response, newState } = processMessageWithState(message, sessions[sessionId]);
  sessions[sessionId] = newState;
  return response;
}

function processMessageWithState(message, inputState) {
  const state = { ...inputState };
  const text = message.toLowerCase().trim();
  let response = '';

  // STEP-BASED FLOW (check steps FIRST before keyword matching)

  if (state.step === 'confirm') {
    if (/yes|yeah|sure|ok|yep|confirm|correct/i.test(text)) {
      state.step = 'done';
      response = `All set, ${state.name ? state.name.split(' ')[0] : 'there'}! 🎉 Your demo is confirmed for ${state.date} at ${state.time}. We'll call ${state.phone} — looking forward to showing you what NexcomAI can do for ${state.business || 'your business'}!`;
    } else {
      state.step = 'date';
      response = `No problem! What date works better for you?`;
    }
    return { response, newState: state };
  }

  if (state.step === 'name') {
    state.name = message;
    state.step = 'company';
    response = `Nice to meet you, ${message.split(' ')[0]}! What's your company name?`;
    return { response, newState: state };
  }

  if (state.step === 'company') {
    state.business = message;
    state.step = 'phone';
    response = `Great! What's the best phone number to reach you?`;
    return { response, newState: state };
  }

  if (state.step === 'phone') {
    state.phone = message;
    state.step = 'date';
    response = `Perfect! What date works best for your demo call? (e.g. Monday April 21)`;
    return { response, newState: state };
  }

  if (state.step === 'date') {
    state.date = message;
    state.step = 'time';
    response = `Let me check availability for ${message}... What time works best for you? (We have slots: 9am, 10am, 11am, 2pm, 3pm)`;
    return { response, newState: state };
  }

  if (state.step === 'time') {
    state.time = message;
    state.step = 'confirm';
    response = `${message} on ${state.date} works! Just to confirm — we'll call ${state.phone} for the demo. Sound good? (Reply Yes to confirm)`;
    return { response, newState: state };
  }

  // KEYWORD MATCHING (for fresh conversations)

  if (matchesAny(text, GREETINGS) && text.length < 20) {
    response = "Hi! 👋 I'm the NexcomAI assistant. We set up AI chatbots for local businesses — SMS, website chat, WhatsApp, and more. What type of business do you have?";
    return { response, newState: state };
  }

  if (matchesAny(text, BOOKING_KEYWORDS)) {
    state.step = 'name';
    response = "Great! Let's book your free demo. What's your first and last name?";
    return { response, newState: state };
  }

  if (matchesAny(text, PRICE_KEYWORDS)) {
    response = "Our packages start at $500 setup + $300/mo for SMS or Web Chat. Most popular is SMS + Web at $800 setup + $500/mo. Want to book a free demo to see which fits your business?";
    return { response, newState: state };
  }

  if (matchesAny(text, WHATSAPP_KEYWORDS)) {
    response = "Yes! We set up WhatsApp Business chatbots that answer customer messages 24/7. It's included in our $1,000 setup + $750/mo package. Want to see a live demo?";
    return { response, newState: state };
  }

  if (matchesAny(text, FACEBOOK_KEYWORDS)) {
    response = "Absolutely — we integrate with Facebook Messenger too! That's part of our Full Suite ($1,500 setup + $1,000/mo). Want to book a free demo to see how it works?";
    return { response, newState: state };
  }

  if (matchesAny(text, SMS_KEYWORDS)) {
    response = "Our SMS chatbot answers customer texts 24/7, books appointments, and captures leads automatically. It's $500 setup + $300/mo. Want to see a live demo for your business?";
    return { response, newState: state };
  }

  if (matchesAny(text, SERVICE_KEYWORDS)) {
    response = "We offer AI chatbots for local businesses: SMS ($300/mo), Web Chat ($300/mo), SMS + Web ($500/mo), WhatsApp ($750/mo), or Full Suite ($1,000/mo). Which channel do your customers use most?";
    return { response, newState: state };
  }

  if (text.includes('how') && (text.includes('work') || text.includes('does'))) {
    response = "We configure the AI with your business info in 24-48 hours. Then it answers customer texts and messages automatically — 24/7, no human needed. Want to see a demo?";
    return { response, newState: state };
  }

  // DEFAULT
  response = "That's a great question! The best way to see how NexcomAI works for your business is a quick 15-min demo. Want to book one? It's free, no pressure. 😊";
  return { response, newState: state };
}

module.exports = { processMessage, processMessageWithState, sessions };
