var Story = require('../models/StoryModel');

/**
 * Interacts with the model to obtain all of Webvel's stories from the database
 * and sends a JSON response
 * @param {object} req Object containing HTTP request data
 * @param {object} res Object containing HTTP response data
 */
exports.getAllStories = async(req, res) => {
  try {
    // Use story model to obtain all stories
    const storyModel = new Story();
    await storyModel.getAllStories();
    res.json(storyModel);
  } catch(error) {
    console.error(error.message);
  }
}

/**
 * Interacts with the model to obtain a user's stories from the database
 * and sends a JSON response
 * @param {object} req Object containing HTTP request data
 * @param {object} res Object containing HTTP response data
 */
exports.getAllStoriesByUserId = async(req, res) => {
  try {
    // Use story model to obtain all stories
    const storyModel = new Story();
    await storyModel.getAllStoriesByUsername(req.params.username);
    res.json(storyModel);
  } catch(error) {
    console.error(error.message);
  }  
}

/**
 * Interacts with the model to obtain a story by its id from the database
 * @param {object} req Object containing HTTP request data
 * @param {object} res Object containing HTTP response data
 */
exports.getStoryById = async(req, res, next) => {
  try {
    // Use story model to obtain a story
    const storyModel = new Story();
    storyModel.story_id = req.params.story_id;
    await storyModel.getStoryById();
    if (storyModel.story_title !== undefined && storyModel.story_title !== null) {
      res.json(storyModel);
    }
    else {
      next();
    }
  } catch(error) {
    console.error(error.message);
  }
}

/**
 * Uses the model to insert a new story into the database
 * @param {object} req Object containing HTTP request data
 * @param {object} res Object containing HTTP response data
 */
exports.createNewStory = async(req, res) => {
  try {
    // Create new story model
    console.log('Create new story data: ', req.body);
    const storyModel = new Story(req.body);
    await storyModel.createNewStory();
    res.json(storyModel);
  } catch(error) {
    console.error(error.message);
  }
}

/**
 * Uses the model to update a user's story from the database
 * @param {object} req Object containing HTTP request data
 * @param {object} res Object containing HTTP response data
 */
exports.updateStory = async(req, res) => {
  try {
    console.log(`Update story id ${req.params.story_id}`);
    // Add story id query to request body
    req.body.story_id = req.params.story_id;

    // Update a story model's properties
    const storyModel = new Story(req.body);
    await storyModel.updateStory();
    res.json(storyModel);
  } catch(error) {
    console.error(error.message);
  }
}

exports.deleteStory = async(req, res) => {
  try {
    const storyModel = new Story(req.body);
    await storyModel.deleteStory();
    res.json({"message": "Deleted story"})
  }
  catch(error) {
    console.error(`Failed to delete story ${req.params.story_id}`);
  }
}