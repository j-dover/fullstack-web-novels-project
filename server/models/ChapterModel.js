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
      this.chapter_title = chapter.chapter_title || null;

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
    SELECT chapter.chapter_id, chapter.chapter_title, story.story_title, updated_date
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

  /**
   * Queries the database with a chapter's title and adds chapter data to the model
   */
   async getChapterByChapterId() {
    await pool.query(`
    SELECT chapter.chapter_title, chapter.chapter_text, story.story_title
    FROM chapter
    RIGHT JOIN story
    ON story.story_id = story.story_id
    WHERE chapter.chapter_title = $1`, [this.chapter_id])
    .then(
      result => {
        console.log('Chapter Row: ', result.rows);
        this.chapter_title = result.rows[0].chapter_title;
        this.chapter_text = result.rows[0].chapter_text;
        this.story_title = result.rows[0].story_title;
      }
    )
    .catch(error => console.error(`Error: getChapterByTitle for title ${title}\n`, error.message, error.stack));
  }

  /**
   * Inserts new chapter into the database 
   */
     async createNewChapter() {
      await pool.query(`
      INSERT INTO chapter(chapter_title, story_id, chapter_text) 
      VALUES ($1, $2, $3)
      RETURNING *`, [this.chapter_title, this.story_id, this.chapter_text])
      .then(
        result => {
          console.log('New chapter: ', result.rows);
          this.chapter_id = result.rows[0].chapter_id;
          this.chapte_title = result.rows[0].chapter_title;
          this.chapter_text = result.rows[0].chapter_text;
          this.story_id = result.rows[0].story_id;
          this.updated_date = result.rows[0].updated_date;
        }
      )
      .catch(error => console.error(`Error: createNewChapter for title ${this.chapter_title}, id: ${this.chapter_id}\n`, error.message, error.stack));
    }
}

module.exports = Chapter;