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
router.delete('/:story_id', async(req, res) => {
  try {
    const removedStory = await pool.query('DELETE FROM stories where story_id = $1 AND user_id = $2 RETURNING *;', [req.params.story_id]);
    console.log(`Success: Deleted story ${req.params.story_id} by user`);
    res.json(removedStory.row);
  }
  catch(error) {
    console.error(`Failed to delete story ${req.params.story_id} by user!\n${error.message}`);
  }
});

module.exports = router;