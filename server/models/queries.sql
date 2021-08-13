-- Story --

-- Get All Stories for 
SELECT story.story_id, story.title, user_account.username 
FROM story
INNER JOIN user_account
ON user_account.user_id = story.user_id;


-- User Account --

-- Create User Account Table
CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	email VARCHAR(50) NOT NULL,
    username VARCHAR(20) NOT NULL,
	account_password VARCHAR(25) NOT NULL,
	registration_date DATE NOT NULL default CURRENT_DATE
)

-- User Profile --

-- Create User Profile Table
CREATE TABLE user_profile (
	user_id integer PRIMARY KEY references user_account,
	bio varchar(160),
	donation_link TEXT
)

-- Get header data for user profile
SELECT user_account.username, user_profile.bio, user_profile.donation_link
FROM story
INNER JOIN user_account ON user_account.user_id = user_profile.user_id;

-- Get story list data for user profile
SELECT story_id, story_title FROM story