var Story = require('../models/StoryModel.js');

const getAllStories = async() => {
  try {
    const storyModel = new Story();
    // const allStories = await story.getAllStories();
    await storyModel.getAllStories();

    console.log("All Stories: ", storyModel.allStories);
    return storyModel;
  } catch(error) {
    console.error(error.message);
  }
}

const getAllStoriesByUsername = async(username) => {
  try {
    const storyModel = new Story();
    await storyModel.getAllStoriesByUsername(username);

    console.log("All Stories: ", storyModel.allStories);
    return storyModel;
  } catch(error) {
    console.error(error.message);
  }  
}

module.exports = {
  getAllStories,
  getAllStoriesByUsername
}