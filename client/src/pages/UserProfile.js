import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ProfileHeader from '../components/UserProfile/ProfileHeader'
import StoryList from '../components/UserProfile/StoryList';
// import NavBar from '../components/common/NavBar';

const UserProfile = ({match:{params:{username}}}) => {
  console.log(username);
  return (
    <div className="userprofile">
      {/* Profile Header */}
      <ProfileHeader username={username} />
      {/* Story List */}
      <StoryList username={username} />
    </div>
  );
}

export default UserProfile;