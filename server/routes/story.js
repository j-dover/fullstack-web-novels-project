const express = require('express');
const router = express.Router();

const storyController = require('../controllers/StoryController');
const chapterController = require('../controllers/ChapterController');


// Get a story by its id
router.get('/:story_id', storyController.getStoryById);

// Create a new story
router.post('/create', storyController.createNewStory);

// Update a story with story query set to story id: ?story_id=<story_id>
router.put('/:story_id/update', storyController.updateStory);

// Delete a story
router.delete('/:story_id', storyController.deleteStory);

// Get chapter of a story by chapter index
router.get('/:story_id/chapter/:chapter_index', chapterController.getChapterByIndexAndStoryId);

// Get all chapters of a story by story id
router.get('/:story_id/chapters', chapterController.getAllChaptersByStoryId);

// Create a new chapter for a story
router.post('/:story_id/chapter/create', chapterController.createNewChapter);

// Update a chapter of story by story id
router.put('/:story_id/chapter/:chapter_id', chapterController.updateChapter);

// Delete a chapter of a story by story id
router.delete('/:story_id/chapter/:chapter_id', chapterController.deleteChapter)

module.exports = router;