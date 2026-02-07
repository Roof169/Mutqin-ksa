const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// ============================================
// GET All Contact Messages (Admin)
// ============================================
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status) query.status = status;
    
    const messages = await Contact.find(query).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// CREATE Contact Message (Public)
// ============================================
router.post('/', async (req, res) => {
  try {
    const message = new Contact(req.body);
    await message.save();
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ============================================
// REPLY to Contact Message (Admin)
// ============================================
router.patch('/:id/reply', async (req, res) => {
  try {
    const { adminReply } = req.body;
    if (!adminReply) {
      return res.status(400).json({ success: false, message: 'Reply text is required' });
    }
    
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'replied',
        adminReply,
        repliedAt: new Date()
      },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    
    res.json({
      success: true,
      message: 'Reply sent successfully',
      data: message
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// DELETE Contact Message (Admin)
// ============================================
router.delete('/:id', async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
