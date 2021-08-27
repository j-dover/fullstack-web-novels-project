import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const StoryList = (props) => {
  console.log('Receive prop ', props.username);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/user/${props.username}/stories`)
      .then(res => res.json())
      .then(
        (result) => {
          // set is loaded
          setStories(result.allStories);
        },
        (error) => {
          console.error(error);
        }
      )
  }, []);

  return (
    <section className="storylist">
      <h2 className="storylist__">Stories</h2>
      <ListGroup variant="flush">
        {stories.map(story => (
        <ListGroup.Item action key={story.story_id}>
          {story.story_title} by {story.username}
        </ListGroup.Item>
        ))}
      </ListGroup>
    </section>
  );
}

export default StoryList;