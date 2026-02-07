const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ============================================
// Middleware
// ============================================
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// Database Connection
// ============================================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mutqin-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.warn('⚠️ MongoDB Connection Failed (in-memory mode):', error.message);
    console.log('ℹ️ Running in demo mode without database persistence');
  }
};

// ============================================
// Routes
// ============================================

// Health Check
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Mutqin API Server is Running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Import routes (we'll create these next)
const servicesRoutes = require('./routes/services');
const reviewsRoutes = require('./routes/reviews');
const contactRoutes = require('./routes/contact');

app.use('/api/services', servicesRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/contact', contactRoutes);

// ============================================
// Error Handling
// ============================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path
  });
});

// ============================================
// Start Server
// ============================================
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🌐 Server running on: http://localhost:${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
  });
});

module.exports = app;
