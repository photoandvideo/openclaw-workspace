const axios = require('axios');

class AIService {
  constructor() {
    // Minimax OpenAI-compatible API (v1 endpoint)
    this.apiKey = process.env.MINIMAX_API_KEY;
    this.baseUrl = process.env.MINIMAX_BASE_URL || 'https://api.minimax.io/v1';
    this.model = 'MiniMax-M2.7';
  }

  /**
   * Generate AI response using Minimax (OpenAI-compatible API)
   */
  async generateResponse(message, history = [], businessContext = {}) {
    try {
      // Build system prompt
      const systemPrompt = `You are a helpful AI assistant for a ${businessContext.type || 'service'} business.

Business: ${businessContext.name || 'Our Company'}
Type: ${businessContext.type || 'Service Business'}

Your job is to:
1. Answer questions about the business professionally
2. Capture visitor information (name, business, type of service)
3. Suggest booking a demo or appointment when appropriate
4. Be warm, helpful, and professional
5. Handle requests in English or Spanish
6. Keep responses concise (under 150 words)

Always be friendly and responsive.`;

      // Build messages for OpenAI format
      const messages = [
        {
          role: 'user',
          content: message
        }
      ];

      // Add history if available
      if (history && history.length > 0) {
        history.slice(-4).forEach((msg) => {
          messages.unshift({
            role: msg.direction === 'inbound' ? 'user' : 'assistant',
            content: msg.content
          });
        });
      }

      console.log(`📤 Calling Minimax (OpenAI API) for: "${message.substring(0, 50)}..."`);

      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: this.model,
          max_tokens: 200,
          system: systemPrompt,
          messages: messages,
          temperature: 0.7,
          top_p: 0.95
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const aiResponse = response.data.choices?.[0]?.message?.content || 'I couldn\'t generate a response.';
      const tokensUsed = response.data.usage?.total_tokens || 0;

      console.log(`✅ Minimax responded: "${aiResponse.substring(0, 50)}..."`);

      return {
        response: aiResponse.trim(),
        tokens_used: tokensUsed,
        model: this.model,
        success: true
      };
    } catch (error) {
      console.error('❌ AI Service error:', error.message);
      if (error.response?.data) {
        console.error('API Error:', error.response.data);
      }
      
      return {
        response: `Thanks for reaching out! I'm processing your request.\n\nA human from our team will get back to you shortly.\n\nOr call us: ${process.env.TWILIO_PHONE}`,
        tokens_used: 0,
        model: this.model,
        success: false,
        error: error.message
      };
    }
  }

  parseAction(response) {
    const lower = response.toLowerCase();
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

  extractCustomerInfo(message, currentData = {}) {
    const data = { ...currentData };

    if (!data.name && message.length < 50) {
      const words = message.split(' ').filter(w => /^[A-Z]/.test(w));
      if (words.length === 1) data.name = words[0];
    }

    if (!data.business && (message.includes('company') || message.includes('business'))) {
      const match = message.match(/(?:company|business)\s+(?:is\s+)?([^.!?]+)/i);
      if (match) data.business = match[1].trim();
    }

    if (!data.phone) {
      const phoneMatch = message.match(/(\d{3}[-.]?\d{3}[-.]?\d{4})|(\+\d{1,3}\d{9,})/);
      if (phoneMatch) data.phone = phoneMatch[0];
    }

    if (!data.email) {
      const emailMatch = message.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
      if (emailMatch) data.email = emailMatch[0];
    }

    return data;
  }
}

module.exports = new AIService();
