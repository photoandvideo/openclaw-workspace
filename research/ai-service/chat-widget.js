/**
 * NexcomAI Chat Widget
 * Embed this on your website to allow visitors to chat with the AI
 */

(function() {
  // Configuration
  const API_URL = 'https://openclaw-workspace-zoq0.onrender.com';
  const WIDGET_ID = 'nexcom-chat-widget';
  const CONTAINER_ID = 'nexcom-chat-container';

  // Create widget HTML
  function createWidget() {
    // Container
    const container = document.createElement('div');
    container.id = CONTAINER_ID;
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 400px;
      max-width: 90vw;
      height: 500px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 5px 40px rgba(0,0,0,0.16);
      display: flex;
      flex-direction: column;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: white;
      padding: 16px;
      border-radius: 12px 12px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
    header.innerHTML = `
      <div style="font-weight: 600;">NexcomAI Assistant</div>
      <button id="nexcom-close-btn" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">×</button>
    `;

    // Messages area
    const messagesArea = document.createElement('div');
    messagesArea.id = 'nexcom-messages';
    messagesArea.style.cssText = `
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: #f8f9fa;
      display: flex;
      flex-direction: column;
      gap: 12px;
    `;

    // Input area
    const inputArea = document.createElement('div');
    inputArea.style.cssText = `
      padding: 12px;
      border-top: 1px solid #e0e0e0;
      display: flex;
      gap: 8px;
    `;

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'nexcom-input';
    input.placeholder = 'Ask a question...';
    input.style.cssText = `
      flex: 1;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 14px;
      outline: none;
      color: #333;
      background: white;
    `;

    const sendBtn = document.createElement('button');
    sendBtn.innerHTML = '→';
    sendBtn.style.cssText = `
      background: #38bdf8;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 8px 12px;
      cursor: pointer;
      font-weight: bold;
      font-size: 16px;
    `;

    inputArea.appendChild(input);
    inputArea.appendChild(sendBtn);

    container.appendChild(header);
    container.appendChild(messagesArea);
    container.appendChild(inputArea);

    document.body.appendChild(container);

    // Add greeting
    addMessage('Hi! 👋 I\'m here to help. What can I tell you about our services?', 'bot');

    // Event listeners
    document.getElementById('nexcom-close-btn').addEventListener('click', toggleWidget);
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    // Hide initially
    container.style.display = 'none';
  }

  function addMessage(text, sender) {
    const messagesArea = document.getElementById('nexcom-messages');
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
      padding: 10px 12px;
      border-radius: 8px;
      max-width: 80%;
      word-wrap: break-word;
      ${sender === 'user' ? `
        background: #38bdf8;
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: 2px;
      ` : `
        background: white;
        color: #333;
        border: 1px solid #e0e0e0;
        border-bottom-left-radius: 2px;
      `}
    `;
    messageDiv.textContent = text;
    messagesArea.appendChild(messageDiv);
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }

  async function sendMessage() {
    const input = document.getElementById('nexcom-input');
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    // Show typing indicator
    addMessage('typing...', 'bot');

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sessionId: getSessionId()
        })
      });

      const data = await response.json();
      
      // Remove typing indicator
      const messagesArea = document.getElementById('nexcom-messages');
      messagesArea.removeChild(messagesArea.lastChild);

      // Add bot response
      addMessage(data.response || 'Sorry, I couldn\'t process that. Please try again.', 'bot');
    } catch (error) {
      console.error('Chat error:', error);
      addMessage('Sorry, something went wrong. Please try again.', 'bot');
    }
  }

  function getSessionId() {
    let sid = localStorage.getItem('nexcom-session-id');
    if (!sid) {
      sid = 'web-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('nexcom-session-id', sid);
    }
    return sid;
  }

  function toggleWidget() {
    const container = document.getElementById(CONTAINER_ID);
    container.style.display = container.style.display === 'none' ? 'flex' : 'none';
  }

  // Create toggle button
  function createToggleButton() {
    const btn = document.createElement('button');
    btn.id = 'nexcom-toggle-btn';
    btn.innerHTML = '💬';
    btn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #38bdf8;
      border: none;
      cursor: pointer;
      font-size: 28px;
      box-shadow: 0 4px 12px rgba(56, 189, 248, 0.4);
      z-index: 9998;
      transition: transform 0.2s;
    `;
    btn.addEventListener('click', toggleWidget);
    btn.addEventListener('mouseover', () => btn.style.transform = 'scale(1.1)');
    btn.addEventListener('mouseout', () => btn.style.transform = 'scale(1)');
    document.body.appendChild(btn);
  }

  // Initialize
  function init() {
    createWidget();
    createToggleButton();

    // Auto-open after 3 seconds
    setTimeout(() => {
      document.getElementById(CONTAINER_ID).style.display = 'flex';
      document.getElementById('nexcom-toggle-btn').style.display = 'none';
    }, 3000);
  }

  // Load when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
