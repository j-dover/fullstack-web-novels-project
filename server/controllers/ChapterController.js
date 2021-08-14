var Chapter = require('../models/ChapterModel.js');

/**
 * Interacts with the model to obtain all of Webvel's chapters from the database
 * @return {Chapter object}
 */


/**
 * Interacts with the model to obtain a storys's chapters from the database with story id
 * @param {string} username Username of the chapter author
 * @return {Chapter object}
 */
const getAllChaptersByStoryId = async(story_id) => {
  try {
    // Use chapter model to obtain all chapters
    const chapterModel = new Chapter();
    await chapterModel.getAllChaptersByStoryId(story_id);
    return chapterModel;
  } catch(error) {
    console.error(error.message);
  }  
}

module.exports = {
  getAllChaptersByStoryId,
}