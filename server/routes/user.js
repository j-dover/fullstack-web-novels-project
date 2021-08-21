const express = require('express');
const router = express.Router();
const pool = require('../db');

// const userController = require('../controllers/UserAccountController');
const storyController = require('../controllers/StoryController');


router.get('/:username', async(req, res) => {
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

router.get('/:user_id/stories', storyController.getAllStoriesByUserId);

module.exports = router;