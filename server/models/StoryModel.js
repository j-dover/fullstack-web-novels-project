const pool = require('../db');

/**
 * Story represents the story entity from Webvel's database.
 */
class Story {
  /**
   * Constructs Story object for acting as a data model
   * @param {object} story Request object containing data
   */
  constructor(story) {
    if (story === null || story === undefined) {
      /** @private @const {object array} */
      this.allStories = [];
    } else {
      /** @private @const {number} */
      this.story_id = story.story_id || null;

      /** @private @const {number} */
      this.story_title = story.story_title || null;

      /** @private @const {number} */
      this.user_id = story.user_id || null;

      /** @private @const {string} */
      this.summary = story.summary || null;
    }
  }

  /**
   * Queries database for all stories and adds them to the model
   */
  async getAllStories() {
    await pool.query(`
      SELECT story.story_id, story.story_title, user_account.username 
      FROM story
      INNER JOIN user_account
      ON user_account.user_id = story.user_id;`)
      .then(
        results => {
          console.log('Story Rows: ', results.rows);
          this.allStories = results.rows;
        })
      .catch(error => console.error('Error: Query Execution\n', error.stack));
  }

  /**
   * Queries the database to get all stories by username and adds them to the model
   * @param {string} username arg1 Username of the story author
   */
  async getAllStoriesByUserId(userId) {    
    await pool.query(`
    SELECT story.story_id, story.story_title, story.summary, user_account.username
    FROM story
    RIGHT JOIN user_account
    ON user_account.user_id = story.user_id
    WHERE user_account.user_id = $1;`, [userId])
    .then(
      results => {
        console.log('Story Rows: ', results.rows);
        this.allStories = results.rows;
      }
    )
    .catch(error => console.error(`Error: getAllStoriesByUsername for user ${userId}\n`, error.message, error.stack));
  }

  /**
   * Queries the database with a story's id and adds story data to the model
   */
  async getStoryById() {
    await pool.query(`
    SELECT story.story_id, story.story_title, story.summary, user_account.username
    FROM story
    RIGHT JOIN user_account
    ON user_account.user_id = story.user_id
    WHERE story.story_id = $1`, [this.story_id])
    .then(
      result => {
        if (result.rowCount > 0) {
          console.log('Story Row: ', result.rows);
          this.story_id = result.rows[0].story_id;
          this.story_title = result.rows[0].story_title;
          this.summary = result.rows[0].summary;
          this.username = result.rows[0].username;
        }
      }
    )
    .catch(error => console.error(`Error: getStoryByTitle for title ${this.story_title}\n`, error.message, error.stack));
  }

  /**
   * Inserts new story into the database 
   */
   async createNewStory() {
    await pool.query(`
    INSERT INTO story(story_title, user_id, summary) 
    VALUES ($1, $2, $3) 
    RETURNING *`, [this.story_title, this.user_id, this.summary])
    .then(
      result => {
        console.log('New story: ', result.rows);
        this.story_id = result.rows[0].story_id;
        this.story_title = result.rows[0].story_title;
        this.summary = result.rows[0].summary;
        this.user_id = result.rows[0].user_id;
        this.creation_date = result.rows[0].creation_date;
      }
    )
    .catch(error => console.error(`Error: createNewStory for title ${this.story_title}, id: ${this.story_id}\n`, error.message, error.stack));
  }

  /**
   * Updates a story from the database
   */
   async updateStory() {
    await pool.query(`
    UPDATE story SET story_title = $1, summary = $2
    WHERE story_id = $3
    RETURNING *;`, [this.story_title, this.summary, this.story_id])
    .then(
      result => {
        console.log("Updated story: ", result.rows);
        
        this.story_id = result.rows[0].story_id;
        this.story_title = result.rows[0].story_title;
        this.user_id = result.rows[0].user_id;
        this.summary = result.rows[0].summary;

    // if (updatedStory.rowCount === 0) {
    //   console.error(`Error: story_id ${req.params.story_id} cannot be found. User ${req.params.user_id} may not be the story's author.`);
    //   next();
    // } else {
    //   console.log('Successful update');
    //   res.json(updatedStory);
    // }
      }
    )
    .catch(error => console.error(`Error: updateStory for title ${this.story_title} \n`, error.message, error.stack));
  }

  async deleteStory() {
    await pool.query(`
    DELETE 
    FROM stories 
    where story_id = $1 
    RETURNING *;`, [req.params.story_id])
    .then(
      result => {
        console.log(`Success: Deleted story ${req.params.story_id} by user`);
      }
    )
    .catch(error => onsole.error(`Error: deleteStory failed, cannot delete story id: ${this.story_id}\n`, error.message, error.stack));
  }
}

module.exports = Story;