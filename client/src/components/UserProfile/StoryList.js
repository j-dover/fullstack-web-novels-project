import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

const StoryList = (props) => {
  console.log('Receive prop ', props.username);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/user/${props.username}/stories`)
      .then(res => res.json())
      .then(
        (result) => {
          // set is loaded
          setStories(result);
        },
        (error) => {
          console.error(error);
        }
      )
  }, []);

  return (
    <div>
      <ul>
        {stories.map(item => (
          <li key={item.story_id}>
            {item.title} by {item.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoryList;