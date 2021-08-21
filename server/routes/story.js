const express = require('express');
const router = express.Router();

const storyController = require('../controllers/StoryController');

// Get a story
router.get('/', storyController.getStoryById)

// Get a story by id
router.get('/:story_id', storyController.getStoryById);

// Create a new story
router.post('/create', storyController.createNewStory);

// Update a story with story query set to story id: ?story_id=<story_id>
router.put('/:story_id/update', storyController.updateStory);

// Delete a story
router.delete('/:story_id', storyController.deleteStory);

module.exports = router;