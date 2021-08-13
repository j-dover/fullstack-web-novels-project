const pool = require('../db');

/**
 * Story represents the story entity from Webvel's database.
 */
class Story {
  /**
   * Constructs Story object for acting as a data model
   * @param {object} arg1 Request object containing data
   */
  constructor(story) {
    if (story === null || story === undefined) {
      /** @private @const {object array} */
      this.allStories = [];
    }
    else {
      /** @private @const {object array} */
      this.story_id = story.story_id;

      /** @private @const {number} */
      this.user_id = story.user_id;

      /** @private @const {number} */
      this.title = story.title_id;

      /** @private @const {string} */
      this.summary = story.summary;
    }
  }

  /**
   * Queries database for all stories and adds them to the story model
   */
  async getAllStories() {
    await pool.query(`
      SELECT story.story_id, story.title, user_account.username 
      FROM story
      INNER JOIN user_account
      ON user_account.user_id = story.user_id;`)
      .then(
        results => {
          console.log("Story Rows: ", results.rows);
          this.allStories = results.rows;
        })
      .catch(error => console.error('Error: Query Execution\n', error.stack));
  }

  /**
   * Queries database for all stories by username and adds them to the story model
   * @param {string} username arg1 Username of the story author
   */
  async getAllStoriesByUsername(username) {    
    await pool.query(`
    SELECT story.story_id, story.title, story.summary, user_account.username, story.creation_date 
    FROM story
    RIGHT JOIN user_account
    ON user_account.user_id = story.user_id
    WHERE user_account.username = $1;`, [username])
    .then(
      results => {
        console.log("Story Rows: ", results.rows);
        this.allStories = results.rows;
      }
    )
    .catch(error => console.error(`Error: getAllStoriesByUsername for user ${username}\n`, error.message, error.stack));
  }

  async getStoryByTitle(title) {
    await pool.query(`
    SELECT story.title, story.summary, user_account.username
    FROM story
    RIGHT JOIN user_account
    ON user_account.user_id = story.user_id
    WHERE story.title = $1`, [title])
    .then(
      results => {
        console.log("Story Row: ", results.rows);
        this.title = results.rows[0].title;
        this.summary = results.rows[0].summary;
        this.user_account = results.rows[0].user_account;
      }
    )
    .catch(error => console.error(`Error: getStoryByTitle for title ${title}\n`, error.message, error.stack))
  }
}

module.exports = Story;