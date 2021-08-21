const express = require('express');
const router = express.Router();

const storyController = require('../controllers/StoryController');
const chapterController = require('../controllers/ChapterController');


// Get a story by id
router.get('/:story_id', storyController.getStoryById);

// Create a new story
router.post('/create', storyController.createNewStory);

// Update a story with story query set to story id: ?story_id=<story_id>
router.put('/:story_id/update', storyController.updateStory);

// Delete a story
router.delete('/:story_id', storyController.deleteStory);

// Get chapter of a story by chapter index
router.get('/:story_id/chapter/:chapter_index', chapterController.getChapterByIndexAndStoryId);

module.exports = router;