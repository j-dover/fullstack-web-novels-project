const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const { query } = require('express');
const userRouter = require('./routes/user');
const storyRouter = require('./routes/story');
const storiesRouter = require('./routes/stories');
const chapterRouter = require('./routes/chapter');

const port = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// Routes
app.use('/story', storyRouter);
app.use('/stories', storiesRouter);
app.use('/user', userRouter);
// app.use('/chapter', chapter);
/*
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
*/

// Get all stories by user
// app.get('/user/:username/stories', storyController.getAllStoriesByUsername);

// Middleware for 404
app.use((req, res, next) => {
  res.status(404).send();
});

const server = app.listen(port, () => {
  console.log(`Webvel Server listening on port ${port}`);
});

module.exports = server;