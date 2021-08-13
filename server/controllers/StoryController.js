var Story = require('../models/StoryModel.js');

const getAllStories = async() => {
  try {
    const story = new Story();
    const allStories = await story.getAllStories();
    console.log("All Stories: ", allStories);
    return allStories;
  } catch(error) {
    console.error(error.message);
  }
}

module.exports = {
  getAllStories
}