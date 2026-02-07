const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ============================================
// Health Check
// ============================================
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: '🚀 متقن API - الخادم يعمل بنجاح',
    version: '1.0.0-demo',
    timestamp: new Date().toISOString(),
    status: 'online'
  });
});

// ============================================
// Test Endpoints (Demo Data)
// ============================================
const demoServices = [
  { _id: '1', name: 'استشارات مالية', price: 500, category: 'financial' },
  { _id: '2', name: 'خدمات حكومية', price: 300, category: 'government' }
];

app.get('/api/services', (req, res) => {
  res.json({ success: true, count: demoServices.length, data: demoServices });
});

app.post('/api/services', (req, res) => {
  const newService = { _id: Date.now(), ...req.body };
  demoServices.push(newService);
  res.status(201).json({ success: true, message: 'تم الإضافة', data: newService });
});

app.get('/api/reviews', (req, res) => {
  res.json({ success: true, count: 0, data: [] });
});

app.get('/api/contact', (req, res) => {
  res.json({ success: true, count: 0, data: [] });
});

// ============================================
// Start Server
// ============================================
app.listen(PORT, () => {
  console.log(`\n✅ خادم متقن يعمل على: http://localhost:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  console.log(`🎨 لوحة التحكم: http://localhost:8888\n`);
});

module.exports = app;
