const express = require('express');
const router = express.Router();

const storyController = require('../controllers/StoryController');

// Get stories
router.get('/', storyController.getAllStories);

module.exports = router;