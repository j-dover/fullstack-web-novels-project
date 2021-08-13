var Story = require('../models/StoryModel.js');

const getAllStories = async(req, res) => {
  try {
    const story = new Story();
    const allStories = await story.getAllStories();
    console.log(allStories);
    res.json(allStories);
  } catch(error) {
    console.error(error.message);
  }
}

module.exports = {
  getAllStories
}