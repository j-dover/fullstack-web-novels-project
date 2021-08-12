import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function StoryList() {
  let testUser = 'testuser1';
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/user/testuser1/stories")
      .then(res => res.json())
      .then(
        (result) => {
          // set is loaded
          setChapters(result);
        },
        (error) => {
          console.error(error);
        }
      )
  }, []);

  return (
    <div>
      <ul>
        {chapters.map(item => (
          <li key={item.story_id}>
            {item.title} by {item.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoryList;