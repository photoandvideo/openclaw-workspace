# 🧠 How to "Train" Your Pi AI Assistant
### Making Ollama smart, personal, and effective

---

## The Truth About Local AI "Training"

You don't need to retrain the model. What matters is:

1. **The right model** — smart enough for the job
2. **A good system prompt** — tells it who it is
3. **Memory files** — what it knows about the user
4. **Good conversations** — it gets better as you use it

---

## Phase 1 — Initial Setup (Day 1)

### Tell it about the user
Have your first conversation like this:

> "Hi! Let me tell you about myself so you can help me better.
> My name is Carlos. I live in La Paz, Bolivia. I work as [job].
> I'm interested in [topics]. My main goals right now are [goals].
> Please remember all of this."

The AI will store this context and use it going forward.

### Set the language
> "Please always respond in Spanish unless I write to you in English."

### Set the tone
> "I prefer direct, concise answers. Don't over-explain unless I ask."

---

## Phase 2 — Daily Use (Week 1)

### Morning routine
Send a message every morning:
> "Good morning! What should I focus on today?"

It will learn your patterns and start giving better morning briefings.

### Feed it context
The more you tell it, the smarter it gets about YOU:
> "I have a meeting with my boss at 3pm today about [topic]"
> "I'm trying to learn [skill] this month"
> "I don't like [thing], please avoid recommending it"

### Ask it to remember things
> "Remember that I have a dentist appointment next Tuesday"
> "Remember that my wife's name is Maria and our anniversary is March 15"

---

## Phase 3 — Advanced Customization

### Custom skills to add
Edit `SOUL.md` on the Pi to add specific capabilities:

**For a business person:**
```
## Business Context
- Company: [company name]
- Industry: [industry]
- Key contacts: [names and roles]
- Current projects: [list]
```

**For someone learning:**
```
## Learning Goals
- Currently studying: [subject]
- Level: [beginner/intermediate]
- Preferred learning style: [visual/practical/theory]
```

**For productivity:**
```
## Daily Routine
- Wake up: 7am
- Work hours: 9am-6pm
- Exercise: evenings
- Weekly priorities: [list]
```

---

## Best Prompts to "Teach" the AI

### Memory prompts
```
"Remember this for future reference: [information]"
"Add to my profile: I prefer [preference]"
"Update my goals: I'm now focused on [new goal]"
```

### Context prompts
```
"I'm going to tell you about my situation so you can help me better..."
"Here's background on [topic] that's important for you to know..."
"When I ask about [subject], always consider that [context]..."
```

### Feedback prompts
```
"That was perfect, keep responding like that"
"Your last response was too long — be more concise"
"I prefer bullet points over paragraphs for lists"
```

---

## Model Comparison for Personal Use

### llama3.2:3b — Recommended
```bash
ollama pull llama3.2:3b
```
- Great for: daily conversation, Spanish, general help
- Speed: fast (3-5 seconds on Pi 5)
- Quality: surprisingly good for personal use

### mistral:7b — Best quality
```bash
ollama pull mistral:7b
```
- Great for: complex questions, analysis, writing
- Speed: slower (15-30 seconds on Pi 5)
- Quality: excellent
- Use this if Pi has 8GB RAM

### phi3:mini — Fastest
```bash
ollama pull phi3:mini
```
- Great for: quick questions, simple tasks
- Speed: very fast (2 seconds)
- Quality: decent for basic tasks

### Switch between models
```bash
# In OpenClaw config, change the model:
# "primary": "ollama/mistral:7b"
# Then restart: openclaw gateway restart
```

---

## Hybrid Setup (Best for clients)

Use local model for privacy + Claude for hard questions:

In `~/.openclaw/openclaw.json`:
```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "ollama/llama3.2:3b",
        "failover": ["anthropic/claude-haiku-3-5-20241022"]
      }
    }
  }
}
```

Tell the user:
> "Your AI runs locally on your device. For complex questions, it automatically uses a cloud AI. Your conversations stay private by default."

---

## What the AI learns over time

The more the user talks to it, the better it gets because:

1. **MEMORY.md grows** — Finn updates it with important info
2. **Context builds** — it knows their history, preferences, patterns
3. **Corrections stick** — when they correct it, it adjusts
4. **Topics deepen** — it learns what they care about

After 2-4 weeks of daily use, it feels like a genuine personal assistant that knows them well.

---

## Nexcom AI Box — What to tell clients

> "Your AI Box runs a local AI model on the device itself. It doesn't send your conversations to any server. It learns about you over time and becomes more personalized the more you use it. For complex questions, it can optionally use a cloud AI for better answers."

**Selling points:**
- ✅ Private — runs on their device
- ✅ No monthly AI cost (local model is free)
- ✅ Learns their preferences over time
- ✅ Works offline
- ✅ Available in Spanish
- ✅ Plug and play

---

*Nexcom AI · nexcomai.ai · Built by Hugo & Finn 🦊*
