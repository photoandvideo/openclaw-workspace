const express = require('express');
const twilio = require('twilio');
const db = require('../models/db');
const aiService = require('../services/ai.service');
const notificationService = require('../services/notification.service');

const router = express.Router();
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

// ── CONVERSATION STATE (in-memory, can move to Redis) ──
const conversationState = {};

/**
 * Get or create conversation state
 */
async function getConversationState(sessionKey) {
  if (!conversationState[sessionKey]) {
    const conversation = await db.get(
      'SELECT * FROM conversations WHERE platform = ? AND visitor_phone = ? ORDER BY created_at DESC LIMIT 1',
      ['sms', sessionKey]
    );
    
    conversationState[sessionKey] = conversation?.id || null;
  }
  return conversationState[sessionKey];
}

/**
 * Create new conversation
 */
async function createConversation(phone, customerId) {
  const result = await db.run(
    `INSERT INTO conversations (customer_id, platform, visitor_phone, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    [customerId, 'sms', phone]
  );
  return result.lastID;
}

/**
 * Save message to database
 */
async function saveMessage(conversationId, platform, direction, sender, content, tokensUsed = 0) {
  await db.run(
    `INSERT INTO messages (conversation_id, platform, direction, sender, content, tokens_used, created_at)
     VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    [conversationId, platform, direction, sender, content, tokensUsed]
  );
}

/**
 * Get customer by phone (for mapping incoming SMS to customer)
 * For now, uses default customer. In production, you'd map phone -> customer
 */
async function getCustomerByPhone(phone) {
  // For MVP: return first active customer (you'd have proper mapping in production)
  const customer = await db.get(
    'SELECT * FROM customers WHERE status = ? LIMIT 1',
    ['active']
  );
  return customer;
}

/**
 * SMS Webhook from Twilio
 * POST /sms
 */
router.post('/', async (req, res) => {
  try {
    const from = req.body.From; // Visitor's phone
    const body = req.body.Body || '';
    
    console.log(`📱 SMS from ${from}: ${body}`);

    // Find which customer this is for
    const customer = await getCustomerByPhone(from);
    if (!customer) {
      console.warn(`⚠️ No customer found for phone ${from}`);
      const response = new twilio.twiml.MessagingResponse();
      response.message('Thanks for texting! We\'ll get back to you shortly.');
      return res.type('text/xml').send(response.toString());
    }

    // Get or create conversation
    let conversationId = await getConversationState(from);
    if (!conversationId) {
      conversationId = await createConversation(from, customer.id);
    }

    // Get conversation history for context
    const history = await db.all(
      'SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at DESC LIMIT 5',
      [conversationId]
    );

    // Save inbound message
    await saveMessage(conversationId, 'sms', 'inbound', 'visitor', body);

    // Get customer settings
    const settings = await db.get(
      'SELECT * FROM settings WHERE customer_id = ?',
      [customer.id]
    );

    // Generate AI response
    const businessContext = settings?.business_context ? JSON.parse(settings.business_context) : {
      name: customer.business_name,
      type: customer.business_type,
      description: ''
    };

    const aiResult = await aiService.generateResponse(body, history, businessContext);
    
    // Save outbound message
    await saveMessage(conversationId, 'sms', 'outbound', 'ai', aiResult.response, aiResult.tokens_used);

    // Extract customer info if available
    const extracted = aiService.extractCustomerInfo(body, {});
    if (Object.keys(extracted).length > 0) {
      await db.run(
        `UPDATE conversations 
         SET visitor_name = COALESCE(visitor_name, ?),
             visitor_business = COALESCE(visitor_business, ?),
             visitor_email = COALESCE(visitor_email, ?),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [extracted.name || null, extracted.business || null, extracted.email || null, conversationId]
      );
    }

    // Send reply via SMS
    await twilioClient.messages.create({
      from: process.env.TWILIO_PHONE,
      to: from,
      body: aiResult.response
    });

    // Notify via Discord
    await notificationService.notifyDiscord({
      type: 'sms',
      from,
      message: body,
      response: aiResult.response,
      conversationId
    });

    // Send Twilio response (acknowledge receipt)
    const response = new twilio.twiml.MessagingResponse();
    res.type('text/xml').send(response.toString());

  } catch (error) {
    console.error('❌ SMS handler error:', error);
    const response = new twilio.twiml.MessagingResponse();
    response.message('Sorry, something went wrong. Please try again.');
    res.type('text/xml').send(response.toString());
  }
});

module.exports = router;
