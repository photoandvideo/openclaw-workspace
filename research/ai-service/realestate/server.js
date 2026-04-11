const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── LISTINGS ──
app.get('/api/listings', (req, res) => {
  const listings = db.getListings(req.query);
  res.json({ count: listings.length, listings });
});

app.get('/api/listings/:id', (req, res) => {
  const row = db.getListing(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

// ── LEADS ──
app.post('/api/leads', (req, res) => {
  const lead = db.saveLead(req.body);
  res.json({ success: true, lead_id: lead.id });
});

app.get('/api/leads', (req, res) => {
  const leads = db.getLeads();
  res.json({ count: leads.length, leads });
});

// ── SHOWINGS ──
app.post('/api/showings', (req, res) => {
  const showing = db.saveShowing(req.body);
  res.json({ success: true, showing_id: showing.id });
});

app.get('/api/showings', (req, res) => {
  const showings = db.getShowings();
  res.json({ count: showings.length, showings });
});

// ── DASHBOARD ──
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// ── START ──
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🏠 Real Estate AI Demo running!`);
  console.log(`   Chatbot:   http://localhost:${PORT}/`);
  console.log(`   Dashboard: http://localhost:${PORT}/dashboard`);
  console.log(`   API:       http://localhost:${PORT}/api/listings\n`);
});
