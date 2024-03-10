import React from 'react';
import Bottom from './Bottom/Bottom';
import Middle from './Middle/Middle';
import { ProfileCardContainer } from './elements';
import Top from './Top/Top';

const ProfileCard = ({ user, setSelectedCollabuser }) => {
  return (
    <ProfileCardContainer>
      <Top user={user} />
      <Middle user={user} setSelectedCollabuser={setSelectedCollabuser} />
      <Bottom user={user} />
    </ProfileCardContainer>
  );
};

export default ProfileCard;
