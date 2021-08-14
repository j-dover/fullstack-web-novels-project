const pool = require('../db');

/**
 * Chapter represents the chapter entity from Webvel's database.
 */
class Chapter {
  /**
   * Constructs Chapter object for acting as a data model
   * @param {object} chapter Request object containing data
   */
  constructor(chapter) {
    if (chapter === null || chapter === undefined) {
      /** @private @const {object array} */
      this.allChapters = [];
    } else {
      /** @private @const {number} */
      this.chapter_id = chapter.chapter_id || null;

      /** @private @const {number} */
      this.title = chapter.chapter_title || null;

      /** @private @const {number} */
      this.story_id = chapter.story_id || null;

      /** @private @const {string} */
      this.chapter_text = chapter.chapter_text || null;
    }
  }

  /**
   * Queries the database to get all chapters of a story by the story's id and adds the chapters to the model
   * @param {string} story_id Id of the story
   */
  async getAllChaptersByStoryId(story_id) {    
    await pool.query(`
    SELECT chapter.chapter_id, chapter.chapter_title, chapter.chapter_text, story.story_title
    FROM chapter
    RIGHT JOIN story
    ON story.story_id = chapter.story_id
    WHERE story.story_id = $1;`, [story_id])
    .then(
      results => {
        console.log('Chapter Rows: ', results.rows);
        this.allChapters = results.rows;
      }
    )
    .catch(error => console.error(`Error: getAllChaptersByStoryId for story ${story_id}\n`, error.message, error.stack));
  }
}

module.exports = Chapter;