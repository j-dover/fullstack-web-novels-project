import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import StoryList from '../components/UserProfile/StoryList';
// import NavBar from '../components/common/NavBar';

const UserProfile = ({match:{params:{username}}}) => {
  console.log(username);
  return (
    <div>
      {/* <NavBar/> */}
      <StoryList username={username} />
    </div>
  );
}

export default UserProfile;