const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

// @route   GET /api/users/:id
// @desc    Get user profile
// @access  Private
router.get('/:id', auth, getUserProfile);

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private
router.put('/:id', auth, updateUserProfile);

module.exports = router;
