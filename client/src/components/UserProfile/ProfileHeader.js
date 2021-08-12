import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

const ProfileHeader = (props) => {
  return (
    <section className="userprofile__header">
      <h1 className="userprofile__username">{props.username}</h1>
      <Button className="userprofile__donate" href="https://www.patreon.com/" target="__blank">Donate</Button>
      <div className="userprofile__bio">
        <p className="userprofile__bio-paragraph">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.
        </p>
      </div>
    </section>
  );
}

export default ProfileHeader;