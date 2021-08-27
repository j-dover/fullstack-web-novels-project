import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const Home = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/stories')
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
    <div className="browsestories">
      <section className="storylist">
        <h2 className="storylist__title">Stories</h2>
        <ListGroup variant="flush">
          {stories.map(story => (
          <ListGroup.Item action key={story.story_id}>
            {story.story_title} by {story.username}
          </ListGroup.Item>
          ))}
        </ListGroup>
      </section>
    </div>
  );
}

export default Home;