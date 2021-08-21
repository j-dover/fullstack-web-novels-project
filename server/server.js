const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const { query } = require('express');
const storyController = require('./controllers/StoryController');
// const userRouter = require('./routes/user');
const storyRouter = require('./routes/story');
const browseStoriesRouter = require('./routes/browseStories');
const chapterController = require('./controllers/ChapterController');

const port = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// Routes
app.use('/story', storyRouter);
app.use('/stories', browseStoriesRouter);
// app.use('/user', userRouter);

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

// Get all stories by user
// app.get('/user/:username/stories', storyController.getAllStoriesByUsername);


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

// Get a chapter by its ID
app.get('/story/:story_title/chapter/:chapter_id', async(req, res) => {
  try {
    // const chapter = await pool.query(`
    //   SELECT title, chapter_text 
    //   FROM chapter
    //   WHERE chapter_id = $1
    // `, [req.params.chapter_id]);

    var chapter = await chapterController.getChapterByChapterId(req.params.chapter_id);
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
