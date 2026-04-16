-- NexcomAI SQLite Schema
-- Created: April 13, 2026
-- Initialize with: sqlite3 nexcom.db < schema.sql

-- Customers (multi-tenant SaaS)
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  business_name TEXT,
  business_type TEXT,
  phone TEXT,
  pricing_tier TEXT DEFAULT 'starter', -- 'starter', 'dual', 'messaging', 'sms_messaging', 'enterprise'
  channels TEXT, -- JSON: ["sms", "whatsapp", "facebook"]
  setup_date TEXT,
  monthly_limit INTEGER, -- messages per month based on tier
  stripe_customer_id TEXT,
  api_key TEXT UNIQUE,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Conversations (leads captured from SMS/FB/WA/Telegram)
CREATE TABLE IF NOT EXISTS conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  platform TEXT NOT NULL, -- 'sms', 'whatsapp', 'facebook', 'telegram'
  visitor_phone TEXT,
  visitor_name TEXT,
  visitor_business TEXT,
  visitor_type TEXT,
  visitor_email TEXT,
  preferred_time TEXT,
  callback_phone TEXT,
  notes TEXT,
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'demo_scheduled', 'closed', 'qualified'
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Messages (all inbound/outbound conversation log)
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id INTEGER NOT NULL,
  platform TEXT NOT NULL,
  direction TEXT NOT NULL, -- 'inbound', 'outbound'
  sender TEXT NOT NULL, -- 'visitor' or 'ai'
  content TEXT NOT NULL,
  ai_model TEXT, -- 'minimax', 'claude', etc.
  tokens_used INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

-- API Usage (for billing and limits)
CREATE TABLE IF NOT EXISTS api_usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  month TEXT NOT NULL, -- YYYY-MM
  messages_count INTEGER DEFAULT 0,
  conversations_count INTEGER DEFAULT 0,
  ai_tokens_used INTEGER DEFAULT 0,
  sms_sent INTEGER DEFAULT 0,
  email_sent INTEGER DEFAULT 0,
  total_cost REAL DEFAULT 0.0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  UNIQUE(customer_id, month)
);

-- Settings (per customer configuration)
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL UNIQUE,
  business_greeting TEXT,
  business_context TEXT, -- JSON: type, description, services
  timezone TEXT DEFAULT 'America/New_York',
  language TEXT DEFAULT 'en',
  google_calendar_id TEXT,
  calendar_color TEXT DEFAULT '#4285F4',
  email_domain TEXT,
  email_template TEXT,
  webhook_url TEXT,
  webhook_secret TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Scheduled Appointments (for Google Calendar integration)
CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  visitor_name TEXT,
  visitor_phone TEXT,
  visitor_email TEXT,
  appointment_time TEXT, -- ISO 8601 datetime
  duration_minutes INTEGER DEFAULT 30,
  service_type TEXT,
  notes TEXT,
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'confirmed', 'completed', 'cancelled'
  google_event_id TEXT,
  email_sent BOOLEAN DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Session Store (for stateful conversations — can be moved to Redis later)
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id INTEGER NOT NULL,
  platform TEXT NOT NULL,
  phone_or_id TEXT NOT NULL,
  conversation_state TEXT, -- JSON: {step: 'get_name', name: null, ...}
  last_activity TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  UNIQUE(conversation_id, phone_or_id)
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_conversations_customer ON conversations(customer_id);
CREATE INDEX IF NOT EXISTS idx_conversations_platform ON conversations(platform);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON conversations(status);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_api_usage_customer_month ON api_usage(customer_id, month);
CREATE INDEX IF NOT EXISTS idx_appointments_customer ON appointments(customer_id);
CREATE INDEX IF NOT EXISTS idx_appointments_time ON appointments(appointment_time);

-- Audit log (for debugging)
CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER,
  action TEXT,
  details TEXT, -- JSON
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- Web Chat Sessions (simple key-value for website chat)
CREATE TABLE IF NOT EXISTS chat_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_key TEXT UNIQUE NOT NULL,
  data TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
