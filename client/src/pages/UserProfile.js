import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import StoryList from '../components/UserProfile/StoryList';
// import NavBar from '../components/common/NavBar';

function UserProfile() {
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
      {/* <NavBar/> */}
      <StoryList/>
    </div>
  );
}

export default UserProfile;