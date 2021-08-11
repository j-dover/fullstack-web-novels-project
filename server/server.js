const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const port = 3000;

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
  } catch(error) {
    console.error(error.message);
  }
});

// Get a particular user's stories
app.get('user/:user_id/stories', async(req, res) => {
  try {
    const userStories = await pool.query('SELECT * FROM story where user_id = $1', [req.params.user_id]);
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
    console.log(`Create Story - Title: ${title}, Author: ${user_id}, Summary: ${summary}`);
    const newStory = await pool.query('INSERT INTO story(title, user_id, summary) VALUES ($1, $2, $3) RETURNING *', [title, user_id, summary]);
    console.log('Executed Query');
    res.json(newStory);
  } catch (error) {
    console.error(error.message);
  }
});

// Update a story from user
app.put('/user/:user_id/story/:story_id', async(req, res) => {
  try {
    const { title, user_id, summary } = req.body;
    console.log(`Update Story - Title: ${title}, Author: ${user_id}, Summary: ${summary}`);
    const updatedStory = await pool.query('UPDATE story SET title = $1, summary = $2', [req.params.user_id, req.params.story_id]);
    res.json(updatedStory);
  }
  catch(error) {
    console.error(error.message);
  }
});

// Delete a story
app.delete('/user/:user_id/story/:story_id', (req, res) => {
  try {
    const removedStory = await pool.query('DELETE FROM stories where story_id = $1 AND user_id = $2 RETURNING *;', [req.params.story_id, req.params.user_id]);
    resjson(removedStory);
  }
  catch(error) {
    console.error('Failed to delete story!');
    console.error(error.message);
  }
});


app.listen(port, () => {
  console.log(`Webvel Server listening on port ${port}`);
});
