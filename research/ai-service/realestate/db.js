// Pure JS database — no compilation needed, uses JSON files
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

function loadFile(name) {
  const p = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function saveFile(name, data) {
  fs.writeFileSync(path.join(DATA_DIR, `${name}.json`), JSON.stringify(data, null, 2));
}

// ── SEED PROPERTIES ──
if (loadFile('properties').length === 0) {
  saveFile('properties', [
    { id: 1, address: '112 Bayview Blvd', city: 'Clearwater', zip: '33755', price: 349000, bedrooms: 3, bathrooms: 2, sqft: 1620, type: 'Single Family', status: 'For Sale', description: 'Charming 3/2 just minutes from Clearwater Beach. Updated kitchen, large backyard, no HOA.' },
    { id: 2, address: '45 Palm Harbor Dr', city: 'Palm Harbor', zip: '34683', price: 425000, bedrooms: 4, bathrooms: 2.5, sqft: 2100, type: 'Single Family', status: 'For Sale', description: 'Spacious 4/2.5 in top-rated school district. Pool, 2-car garage, move-in ready.' },
    { id: 3, address: '308 Marina Way #4B', city: 'Clearwater', zip: '33755', price: 279000, bedrooms: 2, bathrooms: 2, sqft: 1100, type: 'Condo', status: 'For Sale', description: 'Waterfront condo with stunning marina views. Updated throughout. Perfect for downsizing or investment.' },
    { id: 4, address: '87 Sunset Ct', city: 'Dunedin', zip: '34698', price: 389000, bedrooms: 3, bathrooms: 2, sqft: 1780, type: 'Single Family', status: 'For Sale', description: 'Beautifully maintained home in sought-after Dunedin. Walking distance to downtown restaurants and shops.' },
    { id: 5, address: '1540 Gulf Blvd #201', city: 'Clearwater Beach', zip: '33767', price: 599000, bedrooms: 2, bathrooms: 2, sqft: 1300, type: 'Condo', status: 'For Sale', description: 'Gulf-front 2/2 condo steps from the beach. Stunning sunsets, resort amenities, great rental income potential.' },
    { id: 6, address: '220 Oak Grove Ln', city: 'Safety Harbor', zip: '34695', price: 465000, bedrooms: 4, bathrooms: 3, sqft: 2350, type: 'Single Family', status: 'For Sale', description: 'Large 4/3 in quiet Safety Harbor neighborhood. New roof 2023, screened lanai, mature oak trees.' },
    { id: 7, address: '15 Harbour Point Dr', city: 'Tarpon Springs', zip: '34689', price: 298000, bedrooms: 3, bathrooms: 2, sqft: 1450, type: 'Single Family', status: 'For Sale', description: 'Affordable 3/2 near the famous Tarpon Springs Sponge Docks. Great starter home or investment property.' },
    { id: 8, address: '730 Island Way #5C', city: 'Clearwater', zip: '33767', price: 520000, bedrooms: 3, bathrooms: 2, sqft: 1650, type: 'Condo', status: 'For Sale', description: 'Intracoastal condo with boat slip available. Private beach, tennis courts, gated community.' },
    { id: 9, address: '91 Largo Estates Blvd', city: 'Largo', zip: '33771', price: 319000, bedrooms: 3, bathrooms: 2, sqft: 1540, type: 'Single Family', status: 'For Sale', description: 'Well-maintained 3/2 in central Largo. No HOA, new AC 2024, close to schools and shopping.' },
    { id: 10, address: '444 Pelican Point Rd', city: 'Clearwater', zip: '33760', price: 750000, bedrooms: 5, bathrooms: 4, sqft: 3200, type: 'Single Family', status: 'For Sale', description: 'Luxury waterfront estate with private dock. Chef kitchen, home theater, 3-car garage. The dream home.' },
  ]);
  console.log('✅ Seeded 10 sample listings');
}

// ── API ──
module.exports = {
  getListings(filters = {}) {
    let rows = loadFile('properties').filter(p => p.status === 'For Sale');
    if (filters.min_price) rows = rows.filter(p => p.price >= Number(filters.min_price));
    if (filters.max_price) rows = rows.filter(p => p.price <= Number(filters.max_price));
    if (filters.bedrooms)  rows = rows.filter(p => p.bedrooms >= Number(filters.bedrooms));
    if (filters.city)      rows = rows.filter(p => p.city.toLowerCase().includes(filters.city.toLowerCase()));
    if (filters.type)      rows = rows.filter(p => p.type.toLowerCase() === filters.type.toLowerCase());
    return rows.slice(0, Number(filters.limit) || 5);
  },

  getListing(id) {
    return loadFile('properties').find(p => p.id === Number(id)) || null;
  },

  saveLead(data) {
    const leads = loadFile('leads');
    const lead = { id: leads.length + 1, ...data, source: 'chatbot', created_at: new Date().toISOString() };
    leads.push(lead);
    saveFile('leads', leads);
    return lead;
  },

  getLeads() { return loadFile('leads'); },

  saveShowing(data) {
    const showings = loadFile('showings');
    const showing = { id: showings.length + 1, ...data, status: 'requested', created_at: new Date().toISOString() };
    showings.push(showing);
    saveFile('showings', showings);
    return showing;
  },

  getShowings() {
    const showings = loadFile('showings');
    const leads = loadFile('leads');
    const props = loadFile('properties');
    return showings.map(s => ({
      ...s,
      lead_name: leads.find(l => l.id === s.lead_id)?.name || '—',
      lead_phone: leads.find(l => l.id === s.lead_id)?.phone || '—',
      address: props.find(p => p.id === s.property_id)?.address || '—',
      city: props.find(p => p.id === s.property_id)?.city || '—',
      price: props.find(p => p.id === s.property_id)?.price || 0,
    }));
  },
};
