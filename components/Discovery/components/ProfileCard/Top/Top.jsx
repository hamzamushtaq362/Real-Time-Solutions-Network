import React from 'react';
import CoverImage from '../../../assets/CoverImage.jpg';
import ProfilePic from '../../../assets/ProfilePic.jpg';
import {
  ProfileTopContainer,
  CoverImage as CoverImageElement,
  ProfilePic as ProfilePicElement,
} from './elements';

const Top = ({ user }) => {
  return (
    <ProfileTopContainer>
      <CoverImageElement
        src={user.coverImageUrl ? user.coverImageUrl : CoverImage.src}
        alt="coverimage"
      />
      <ProfilePicElement
        src={user.imageUrl ? user.imageUrl : ProfilePic.src}
        alt="ProfilePic"
      />
    </ProfileTopContainer>
  );
};

export default Top;
