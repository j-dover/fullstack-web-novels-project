const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const { query } = require('express');
const port = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());


// Routes

app.get('/', (req, res) => {
  res.json({ info: 'This is a test!'});
});

// Get all Stories
app.get('/stories', async(req, res) => {
  try {
    const allStories = await pool.query("SELECT * FROM story");
    console.log(allStories);
    res.json(allStories);
  } catch(error) {
    console.error(error.message);
  }
});

// Get a particular user's stories
app.get('/user/:username/stories', async(req, res) => {
  try {
    const userStories = await pool.query(`
      SELECT user_account.username, story.title, story.summary, story.creation_date FROM story
        RIGHT JOIN 
          user_account
        ON user_account.user_id = story.user_id
        WHERE user_account.username = $1;`, [req.params.username]);
    res.json(userStories);
  }
  catch(error) {
    console.error(error.message);
  }
});

// Create a story
app.post('/story', async (req, res) => {
  try {
    const { title, user_id, summary } = req.body;
    console.log(`Create story - Title: ${title}, Author: ${user_id}, Summary: ${summary}`);
    const newStory = await pool.query('INSERT INTO story(title, user_id, summary) VALUES ($1, $2, $3) RETURNING *', [title, user_id, summary]);
    res.json(newStory);
  } catch (error) {
    console.error(error.message);
  }
});

// Update a story from user
app.put('/user/:user_id/story/:story_id', async(req, res, next) => {
  try {
    const { title, user_id, summary } = req.body;
    console.log(`Update story - Title: ${title}, Author: ${user_id}, Summary: ${summary}`);
    const updatedStory = await pool.query('UPDATE story SET title = $1, summary = $2 WHERE story_id = $3 AND user_id = $4 RETURNING story_id', [title, summary, req.params.story_id, req.params.user_id]);
    if (updatedStory.rowCount === 0) {
      console.error(`Error: story_id ${req.params.story_id} cannot be found. User ${req.params.user_id} may not be the story's author.`);
      next();
    }
    else {
      console.log(`Updated information: Title: ${title}, Summary: ${summary}`);
      res.json(updatedStory);
    }
  }
  catch(error) {
    console.error(error.message);
  }
});

// Delete a story
app.delete('/user/:user_id/story/:story_id', async(req, res) => {
  try {
    const removedStory = await pool.query('DELETE FROM stories where story_id = $1 AND user_id = $2 RETURNING *;', [req.params.story_id, req.params.user_id]);
    console.log(`Success: Deleted story ${req.params.story_id} by user ${req.params.user_id}`);
    res.json(removedStory);
  }
  catch(error) {
    console.error(`Failed to delete story ${req.params.story_id} by user ${req.params.user_id}!\n${error.message}`);
  }
});


// Get all chapters from a story
app.get('/story/:story_id/chapters', async(req, res) => {
  try {
    const allChapters = await pool.query(`
      SELECT title, updated_date FROM chapter WHERE story = $1;
    `, req.params.story_id);
  }
  catch(error) {
    console.error(error.message);
  }
});

// Create a chapter
app.post('/user/:username/story/:story_id/chapter', async(req, res) => {
  try {
    const {title, story_id, chapter_text} = req.body;
    const newChapter = await pool.query(`
      INSERT INTO chapter (title, story_id, chapter_text)
      VALUES($1, $2, $3);
    `, [title, story_id, chapter_text]);
    res.json(newChapter);
  }
  catch(error) {
    console.error(error.message);
  }
});

// Read a chapter
app.get('/story/:title/chapter/:chapter_id', async(req, res) => {
  try {
    const chapter = await pool.query(`
      SELECT title, chapter_text 
      FROM chapter
      WHERE chapter_id = $1
    `, [req.params.chapter_id]);
  }
  catch(error) {
    console.error(error.message);
  }
});


// Update a chapter
/*
app.get('/story/:story_id/chapter/:chapter_id', async(req, res) => {
  try {
  }
  catch(error) {
    console.error(error.message);
  }
});
*/


// Delete a chapter
/*
app.delete('/story/:story_id/chapter/:chapter_id', async(req, res) => {
  try {
  }
  catch(error) {
    console.error(error.message);
  }
})
*/

// Middleware for 404
app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(port, () => {
  console.log(`Webvel Server listening on port ${port}`);
});
