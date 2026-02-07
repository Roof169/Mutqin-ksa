const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// ============================================
// GET All Reviews
// ============================================
router.get('/', async (req, res) => {
  try {
    const { approved, published } = req.query;
    let query = {};
    
    if (approved === 'true') query.isApproved = true;
    if (published === 'true') query.isPublished = true;
    
    const reviews = await Review.find(query)
      .populate('serviceId', 'name')
      .sort({ createdAt: -1 });
      
    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// CREATE Review (Public)
// ============================================
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({
      success: true,
      message: 'Review submitted (pending approval)',
      data: review
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ============================================
// APPROVE Review (Admin)
// ============================================
router.patch('/:id/approve', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved: true, isPublished: true },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.json({
      success: true,
      message: 'Review approved and published',
      data: review
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// DELETE Review (Admin)
// ============================================
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
