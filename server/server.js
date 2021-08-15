const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const { query } = require('express');
const storyController = require('./controllers/StoryController');
const chapterController = require('./controllers/ChapterController');

const port = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());


// Routes

// Get stories for home page
app.get('/', (req, res) => {
  res.json({ info: 'This is a test!'});
});

// Get user profile data
app.get('/user/:username', async(req, res) => {
  try {
    const user = await pool.query(`
      SELECT user_id, username
      FROM user_account
      WHERE username = $1;
    `, [req.params.username]);
    res.json(user.rows);
  } catch(error) {
    console.error(error.message);
  }
});

// Get all stories
app.get('/stories', async (req, res, next) => {
  try {
    const stories = await storyController.getAllStories();
    res.json(stories);
  } catch(error) {
    console.error(error.message);
  }
});

// Get all stories by user
app.get('/user/:username/stories', async(req, res) => {
  try {
    const stories = await storyController.getAllStoriesByUsername(req.params.username);
    res.json(stories);
  } catch(error) {
    console.error(error.message);
  }
});

// Get a story by title
app.get('/story/:story_title', async(req, res) => {
  try {
    var story = await storyController.getStoryByTitle(req.params.story_title);
    res.json(story);
  } catch(error) {
    console.error(error.message);
  }
});

// Create a new story
app.post('/story/create', async (req, res) => {
  try {
    console.log('Create new story ', req.body.story_title);
    const newStory = await storyController.createNewStory(req.body);
    res.json(newStory);
  } catch (error) {
    console.error(error.message);
  }
});

// Update a story with story query set to story id: ?story=story_id
app.put('/story/:story_title/update', async(req, res, next) => {
  try {
    console.log(`Update story ${req.params.story_title}, id ${req.query.story}`);

    // Add to story_id to request body
    req.body.story_id = req.query.story;
    const updatedStory = await storyController.updateStory(req.body, req.params.story_title);

    res.json(updatedStory);

    // const { title, user_id, summary } = req.body;
    // console.log(`Update story - Title: ${title}, Author: ${user_id}, Summary: ${summary}, Genre: ${genre}`);
    // const updatedStory = await pool.query(`
    //   UPDATE story SET title = $1, summary = $2, genre = $3
    //   WHERE story_id = $4 AND user_id = $5 
    //   RETURNING story_id`, [title, summary, genre, req.params.story_id, req.params.user_id]);
    // if (updatedStory.rowCount === 0) {
    //   console.error(`Error: story_id ${req.params.story_id} cannot be found. User ${req.params.user_id} may not be the story's author.`);
    //   next();
    // }
    // else {
    //   console.log(`Updated information: Title: ${title}, Summary: ${summary}`);
    //   res.json(updatedStory.rows);
    // }
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
    res.json(removedStory.row);
  }
  catch(error) {
    console.error(`Failed to delete story ${req.params.story_id} by user ${req.params.user_id}!\n${error.message}`);
  }
});


// Get all chapters from a story by story id
app.get('/story/:story_id/chapters', async(req, res) => {  
  try {
    var allChapters = await chapterController.getAllChaptersByStoryId(req.params.story_id);
    res.json(allChapters);
  }
  catch(error) {
    console.error(error.message);
  }
});

// Create a chapter for a story
app.post('/story/:story_id/chapter', async(req, res) => {
  try {
    console.log("Chapter Data: ", req.body);
    var newChapter = await chapterController.createNewChapter(req.body);
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
    res.json(chapter.rows);
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
