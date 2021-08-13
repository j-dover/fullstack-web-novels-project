const pool = require('../db');

class Story {
  constructor(story) {
    if (story === null || story === undefined) {
      this.story_id = null;
      this.user_id = null;
      this.title = null;
      this.summary = null;
    }
    else {
      this.story_id = story.story_id;
      this.user_id = story.user_id;
      this.title = story.title_id;
      this.summary = story.summary;
    }
  }

  // Retrieve all stories from database and 
  async getAllStories() {
    let allStories = {};
    console.log('Stories before: ', allStories);

    await pool.query(`
      SELECT story.story_id, story.title, user_account.username 
      FROM story
      INNER JOIN user_account
      ON user_account.user_id = story.user_id;`)
      .then(
        results => {
          console.log("Rows: ", results.rows);
          // for (row in queryResults.rows) {
          //   stories.push(row);
          // }
          allStories.stories = results.rows;
        })
      .catch(e => console.error('Error executing query', e.stack))
    return allStories;
  }
}

module.exports = Story;