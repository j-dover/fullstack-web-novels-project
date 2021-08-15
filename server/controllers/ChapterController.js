var Chapter = require('../models/ChapterModel.js');

/**
 * Interacts with the model to obtain all of Webvel's chapters from the database
 * @return {Chapter object}
 */


/**
 * Interacts with the model to obtain a storys's chapters from the database with the story id
 * @param {int} story_id ID number of a story
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

/**
 * Uses the model to insert a new chapter into the database
 * @param {object} chapter_data 
 * @return {Chapter object}
 */
 const createNewChapter = async(chapter_data) => {
  try {
    // Create new chapter model
    console.log('Chapter data: ', chapter_data);
    const chapterModel = new Chapter(chapter_data);
    await chapterModel.createNewChapter();
    return chapterModel;
  } catch(error) {
    console.error(error.message);
  }
}

module.exports = {
  getAllChaptersByStoryId,
  createNewChapter
}