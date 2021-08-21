var Chapter = require('../models/ChapterModel.js');

/**
 * Interacts with the model to obtain all of Webvel's chapters from the database
 * @return {Chapter object}
 */
exports.getChapterByIndexAndStoryId = async(req, res, next) => {
  try {
    // Use chapter model to obtain chapter by its index and story id
    console.log(`Chapter Index ${req.params.chapter_index} from Story ${req.params.story_id}`);
    let chapterData = {chapter_index: req.params.chapter_index, story_id: req.params.story_id}
    const chapterModel = new Chapter(chapterData);
    await chapterModel.getChapterByIndexAndStoryId();
    
    if (chapterModel.chapter_id !== null) {
      res.json(chapterModel);
    } else {
      next();
    }
  }
  catch (error) {
    console.error(error.message);
  }
}

/**
 * Interacts with the model to obtain a storys's chapters from the database with the story id
 * @param {int} story_id ID number of a story
 * @return {Chapter object}
 */
exports.getAllChaptersByStoryId = async(req, res) => {
  try {
    // Use chapter model to obtain all chapters
    const chapterModel = new Chapter();
    await chapterModel.getAllChaptersByStoryId(storyId);
    return chapterModel;
  } catch(error) {
    console.error(error.message);
  }  
}

/**
 * Interacts with the model to obtain a chapter by its id from the database
 * @param {int} chapter_id ID number of chapter
 * @return {Chapter object}
 */
exports.getChapterByChapterId = async(req, res) => {
  try {
    // Use chapter model to obtain a chapter
    const chapterModel = new Chapter();
    chapterModel.chapter_id = chapterId;
    await chapterModel.getChapterByID();
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
exports.createNewChapter = async(chapter_data) => {
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

// module.exports = {
//   getAllChaptersByStoryId,
//   getChapterByChapterId,
//   createNewChapter
// }