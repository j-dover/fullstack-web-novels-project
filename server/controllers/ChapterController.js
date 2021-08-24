var Chapter = require('../models/ChapterModel.js');

/**
 * Interacts with the model to obtain all of Webvel's chapters from the 
 * @param {object} req Object containing HTTP request data
 * @param {object} res Object containing HTTP response data
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
 * @param {object} req Object containing HTTP request data
 * @param {object} res Object containing HTTP response data
 */
exports.getAllChaptersByStoryId = async(req, res) => {
  try {
    // Use chapter model to obtain all chapters
    const chapterModel = new Chapter();
    await chapterModel.getAllChaptersByStoryId(req.params.story_id);
    res.json(chapterModel);
  } catch(error) {
    console.error(error.message);
  }  
}

/**
 * Interacts with the model to obtain a chapter by its id from the database
 * @param {object} req Object containing HTTP request data
 * @param {object} res Object containing HTTP response data
 */
/*
exports.getChapterByChapterId = async(req, res) => {
  try {
    // Use chapter model to obtain a chapter
    const chapterModel = new Chapter();
    await chapterModel.getChapterByID(req.params.chapter_id);
    res.json(chapterModel);
  } catch(error) {
    console.error(error.message);
  }
}*/

/**
 * Uses the model to insert a new chapter into the database
 * @param {object} req Object containing HTTP request data
 * @param {object} res Object containing HTTP response data
 */
exports.createNewChapter = async(req, res) => {
  try {
    // Use chapter model to create a new chapter
    console.log('Chapter data: ', req.body);
    const chapterModel = new Chapter(req.body);
    await chapterModel.createNewChapter();
    res.json(chapterModel);
  } catch(error) {
    console.error(error.message);
  }
}

/**
 * Uses the model to insert a new chapter into the database
 * @param {object} req Object containing HTTP request data
 * @param {object} res Object containing HTTP response data
 */
 exports.updateChapter = async(req, res) => {
  try {
    // Use chapter model to update a chapter
    console.log('Chapter data: ', req.body);
    const chapterModel = new Chapter(req.body);
    await chapterModel.updateChapter();
    res.json(chapterModel);
  } catch(error) {
    console.error(error.message);
  }
}

/**
 * Uses the model to delete a story's chapter from the database
 * @param {object} req Object containing HTTP request data
 * @param {object} res Object containing HTTP response data
 */
exports.deleteChapter = async(req, res, next) => {
  try {
    // Use chapter model to delete a 
    let chapterData = { story_id: req.params.story_id, chapter_id: req.params.chapter_id };
    const chapterModel = new Story(chapterData);
    await chapterModel.deleteChapter();

    // Validate deletion by returning
    if (Object.keys(chapterModel).length > 0) {
      res.json({"message": "Deleted chapter"});
    }
    else {
      next();
    }

  } catch(error) {
    console.error(error.message);
  }
}