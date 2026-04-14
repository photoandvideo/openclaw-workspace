const axios = require('axios');

class AIService {
  constructor() {
    this.apiKey = process.env.MINIMAX_API_KEY;
    this.model = process.env.MINIMAX_MODEL || 'minimax-text-saas';
    this.baseUrl = 'https://api.minimax.chat/v1';
  }

  /**
   * Generate AI response using Minimax
   * @param {string} message - User message
   * @param {array} history - Previous messages for context
   * @param {object} businessContext - Business info (type, description, etc.)
   * @returns {object} { response, tokens_used, confidence }
   */
  async generateResponse(message, history = [], businessContext = {}) {
    try {
      // Build conversation history for context
      const messages = [
        {
          sender_type: 'USER',
          text: `You are an AI assistant for a ${businessContext.type || 'service'} business. 
          
Business: ${businessContext.name || 'Our Company'}
Type: ${businessContext.type || 'Service Business'}
Description: ${businessContext.description || ''}

Your job is to:
1. Answer questions about the business
2. Capture visitor information (name, business, type of service needed)
3. Suggest booking a demo or appointment
4. Be helpful, friendly, and professional
5. Handle requests in English or Spanish

Visitor message: ${message}`
        }
      ];

      // Add conversation history if available
      if (history && history.length > 0) {
        history.slice(-4).forEach((msg, i) => { // Last 4 messages for context
          messages.push({
            sender_type: msg.direction === 'inbound' ? 'USER' : 'BOT',
            text: msg.content
          });
        });
      }

      const response = await axios.post(
        `${this.baseUrl}/text/chatcompletion`,
        {
          model: this.model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 200,
          top_p: 0.95
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const aiResponse = response.data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
      const tokensUsed = response.data.usage?.total_tokens || 0;

      return {
        response: aiResponse.trim(),
        tokens_used: tokensUsed,
        model: this.model,
        success: true
      };
    } catch (error) {
      console.error('❌ AI Service error:', error.message);
      
      // Fallback response if AI fails
      return {
        response: `Thanks for reaching out! I'm having a moment of confusion. 🤔\n\nA human from our team will get back to you shortly.\n\nOr call us: ${process.env.TWILIO_PHONE}`,
        tokens_used: 0,
        model: this.model,
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Extract action from AI response (book, answer, escalate, etc.)
   * @param {string} response - AI response
   * @returns {object} { action, confidence }
   */
  parseAction(response) {
    const lower = response.toLowerCase();

    // Detect intent
    if (/book|schedule|appointment|demo|call|time|when/.test(lower)) {
      return { action: 'book_appointment', confidence: 0.9 };
    }
    if (/price|cost|how much|pricing/.test(lower)) {
      return { action: 'provide_pricing', confidence: 0.9 };
    }
    if (/contact|phone|email|reach/.test(lower)) {
      return { action: 'provide_contact', confidence: 0.8 };
    }
    if (/help|issue|problem|error|confused/.test(lower)) {
      return { action: 'escalate', confidence: 0.9 };
    }

    return { action: 'answer', confidence: 0.7 };
  }

  /**
   * Extract customer info from conversation
   * @param {string} message - Latest message
   * @param {object} currentData - Current extracted data
   * @returns {object} Updated customer data
   */
  extractCustomerInfo(message, currentData = {}) {
    const data = { ...currentData };

    // Simple name extraction (look for capitalized words)
    if (!data.name && message.length < 50) {
      const words = message.split(' ').filter(w => /^[A-Z]/.test(w));
      if (words.length === 1) data.name = words[0];
    }

    // Business name (look for quoted text or common patterns)
    if (!data.business && message.includes('company') || message.includes('business')) {
      const match = message.match(/(?:company|business)\s+(?:is\s+)?([^.!?]+)/i);
      if (match) data.business = match[1].trim();
    }

    // Phone number
    if (!data.phone) {
      const phoneMatch = message.match(/(\d{3}[-.]?\d{3}[-.]?\d{4})|(\+\d{1,3}\d{9,})/);
      if (phoneMatch) data.phone = phoneMatch[0];
    }

    // Email
    if (!data.email) {
      const emailMatch = message.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
      if (emailMatch) data.email = emailMatch[0];
    }

    return data;
  }
}

module.exports = new AIService();
