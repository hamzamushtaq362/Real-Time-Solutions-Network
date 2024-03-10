import { ProfileSubText, ProfileAvatar, ProfileName } from './elements';
import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { FlexBox } from 'components/common/elements';
import ArrowRightLongIcon from 'components/Icons/ArrowRightLongIcon';
import { AvatarSampleImage2 } from 'assets/png';
import { useEffect } from 'react';

export const CreatorProfileCard = ({
  onClick = () => {},
  user,
  emailInviteUser,
  userEmail,
}) => {
  const [hovered, setHovered] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    if (user) {
      const { fullName, imageUrl, introduction } = user;
      const profileImage = imageUrl?.includes('boringavatar')
        ? `${imageUrl}&square`
        : imageUrl;
      setUserDetails({ fullName, imageUrl, introduction, profileImage });
    }
  }, [user]);
  const theme = useTheme();
  return emailInviteUser ? (
    <Box
      onClick={onClick}
      pb={1}
      sx={{ cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      overflow="hidden"
    >
      <ProfileAvatar
        width="290px"
        height="284px"
        alt="collaboratorImage"
        src={AvatarSampleImage2.src}
        style={{ objectFit: 'cover' }}
      />
      <FlexBox mt="5px">
        <ProfileName hovered={hovered}>{userEmail}</ProfileName>
        <ArrowRightLongIcon
          width={18}
          height={18}
          color={theme.palette.text.primary}
          style={{
            opacity: hovered ? 1 : 0,
            marginLeft: '4px',
            transition: 'all 100ms ease-out',
          }}
        />
      </FlexBox>
    </Box>
  ) : (
    <Box
      onClick={onClick}
      pb={1}
      sx={{ cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      overflow="hidden"
    >
      <ProfileAvatar
        width="290px"
        height="284px"
        alt="collaboratorImage"
        src={userDetails?.profileImage ?? userDetails?.imageUrl}
        style={{ objectFit: 'cover' }}
      />
      <FlexBox mt="5px">
        <ProfileName hovered={hovered}>{userDetails?.fullName}</ProfileName>
        <ArrowRightLongIcon
          width={18}
          height={18}
          color={theme.palette.text.primary}
          style={{
            opacity: hovered ? 1 : 0,
            marginLeft: '4px',
            transition: 'all 100ms ease-out',
          }}
        />
      </FlexBox>
      <ProfileSubText mt="6px">{userDetails?.introduction}</ProfileSubText>
    </Box>
  );
};
