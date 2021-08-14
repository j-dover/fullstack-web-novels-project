var Story = require('../models/StoryModel.js');

/**
 * Interacts with the model to obtain all of Webvel's stories from the database
 * @return {Story object}
 */
const getAllStories = async() => {
  try {
    // Use story model to obtain all stories
    const storyModel = new Story();
    await storyModel.getAllStories();
    return storyModel;
  } catch(error) {
    console.error(error.message);
  }
}

/**
 * Interacts with the model to obtain a user's stories from the database
 * @param {string} username Username of the story author
 * @return {Story object}
 */
const getAllStoriesByUsername = async(username) => {
  try {
    // Use story model to obtain all stories
    const storyModel = new Story();
    await storyModel.getAllStoriesByUsername(username);
    return storyModel;
  } catch(error) {
    console.error(error.message);
  }  
}

/**
 * Interacts with the model to obtain a story by its title from the database
 * @param {string} title Title of a story
 * @return {Story object}
 */
const getStoryByTitle = async(title) => {
  try {
    // Use story model to obtain a story
    const storyModel = new Story();
    await storyModel.getStoryByTitle(title);
    return storyModel;
  } catch(error) {
    console.error(error.message);
  }
}

/**
 * Uses the model to insert a new story into the database
 * @param {object} story_data 
 * @return {Story object}
 */
 const createNewStory = async(story_data) => {
  try {
    // Create new story model
    console.log('Story data: ', story_data);
    const storyModel = new Story(story_data);
    console.log(storyModel);
    await storyModel.createNewStory();
    return storyModel;
  } catch(error) {
    console.error(error.message);
  }
}

module.exports = {
  getAllStories,
  getAllStoriesByUsername,
  getStoryByTitle,
  createNewStory
}