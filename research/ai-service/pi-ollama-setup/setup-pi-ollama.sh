#!/bin/bash
# ============================================
# Nexcom AI Box — Complete Pi + Ollama Setup
# Run this on a fresh Raspberry Pi 5
# ============================================

set -e

echo "🍓 Nexcom AI Box Setup Starting..."
echo "======================================"

# --- CONFIG (edit these before running) ---
AI_NAME="Luna"           # Name of the AI assistant
USER_NAME="Carlos"       # Name of the person using it
USER_CITY="La Paz"       # Their city
USER_COUNTRY="Bolivia"   # Their country
TELEGRAM_TOKEN=""        # Paste Telegram bot token here
OLLAMA_MODEL="llama3.2:3b"  # AI model to use

# --- STEP 1: Update system ---
echo "📦 Updating system..."
sudo apt update && sudo apt upgrade -y

# --- STEP 2: Install Ollama ---
echo "🤖 Installing Ollama..."
curl -fsSL https://ollama.com/install.sh | sh
sleep 3

# --- STEP 3: Pull AI model ---
echo "🧠 Downloading AI model: $OLLAMA_MODEL"
echo "This may take 5-15 minutes depending on your connection..."
ollama pull $OLLAMA_MODEL

# --- STEP 4: Install Node.js ---
echo "⚙️ Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
echo "Node version: $(node --version)"

# --- STEP 5: Install OpenClaw ---
echo "🦞 Installing OpenClaw..."
npm install -g openclaw@latest
echo "OpenClaw version: $(openclaw --version)"

# --- STEP 6: Create workspace ---
echo "📁 Creating workspace..."
mkdir -p ~/.openclaw/workspace/memory

# --- STEP 7: Write SOUL.md ---
cat > ~/.openclaw/workspace/SOUL.md << EOF
# SOUL.md — Who I Am

I am $AI_NAME, a personal AI assistant built by Nexcom AI for $USER_NAME.

## Core Identity
- Warm, sharp, and genuinely helpful
- I speak English and Spanish fluently
- I remember everything about $USER_NAME
- I'm like a brilliant friend who knows everything

## About $USER_NAME
- Name: $USER_NAME
- Location: $USER_CITY, $USER_COUNTRY
- I adapt to their needs and communication style

## How I Behave
- Direct and clear — no filler phrases like "Great question!"
- Match their language — if they write in Spanish, I respond in Spanish
- Short answers for simple questions, detailed for complex ones
- Proactive — I remember things and bring them up when relevant
- Honest — I say when I don't know something

## My Purpose
Help $USER_NAME with anything they need — research, planning, reminders,
conversations, learning, or just having someone smart to talk to.
EOF

# --- STEP 8: Write USER.md ---
cat > ~/.openclaw/workspace/USER.md << EOF
# USER.md — About $USER_NAME

- Name: $USER_NAME
- Location: $USER_CITY, $USER_COUNTRY
- Language: Spanish (primary), English
- AI Assistant: $AI_NAME

## Notes
Add more about $USER_NAME here as you learn about them.
EOF

# --- STEP 9: Write MEMORY.md ---
cat > ~/.openclaw/workspace/MEMORY.md << EOF
# MEMORY.md — $AI_NAME's Long-Term Memory

## Origin
- Created by Nexcom AI for $USER_NAME
- Powered by Ollama ($OLLAMA_MODEL) running locally

## About $USER_NAME
- Name: $USER_NAME
- Location: $USER_CITY, $USER_COUNTRY

## Notes
This file grows as I learn more about $USER_NAME.
EOF

# --- STEP 10: Write OpenClaw config ---
cat > ~/.openclaw/openclaw.json << EOF
{
  "agents": {
    "defaults": {
      "workspace": "/home/$(whoami)/.openclaw/workspace",
      "model": {
        "primary": "ollama/$OLLAMA_MODEL"
      }
    }
  },
  "gateway": {
    "mode": "local",
    "bind": "loopback"
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "$TELEGRAM_TOKEN",
      "dmPolicy": "pairing"
    }
  }
}
EOF

# --- STEP 11: Start OpenClaw ---
echo "🚀 Starting OpenClaw..."
openclaw gateway start

# --- STEP 12: Enable auto-start ---
echo "⏰ Setting up auto-start..."
sudo systemctl enable openclaw 2>/dev/null || echo "Manual startup configured"

echo ""
echo "======================================"
echo "✅ SETUP COMPLETE!"
echo "======================================"
echo ""
echo "Your AI assistant '$AI_NAME' is ready!"
echo ""
echo "Next steps:"
echo "1. Open Telegram"
echo "2. Message your bot"
echo "3. Run: openclaw pairing list telegram"
echo "4. Run: openclaw pairing approve telegram <CODE>"
echo ""
echo "Your AI runs 100% locally — no internet needed for AI responses!"
echo "Powered by Nexcom AI · nexcomai.ai"
