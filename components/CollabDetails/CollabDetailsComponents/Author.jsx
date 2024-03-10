import {
  InfoWrap,
  RightPaneLabel,
  UserName,
  UserWrap,
  BottomText,
} from './elements';
import { Avatar } from '~/components';
import { Box } from '@mui/material';
import { NotFoundText } from '../../Creator/CreatorProfileCard/elements';
import { useRouter } from 'next/router';
import { DotWrap } from 'components/CollabCommon/CollabTile/elements';
import { MetricLabel } from '../../Card/CompletedCollabCard/elements';
import React from 'react';

const User = ({
  label,
  users,
  noFoundText,
  avatarSize,
  avatarSpacing,
  showRole,
}) => {
  const router = useRouter();

  return (
    <>
      {label && <RightPaneLabel>{label}</RightPaneLabel>}

      {users && users.length !== 0 ? (
        users.map((user) => {
          const connections = user?.connections || 0;
          const memberRole = user?.memberRole || null;
          const totalCollabs = user?.totalCollabs;

          return (
            <UserWrap
              key={user?.id}
              onClick={() =>
                router.push(`/@${user?.username || user?.username}`)
              }
            >
              <InfoWrap>
                <Avatar
                  size={avatarSize ?? 42}
                  avatar={user?.imageUrl}
                  showRing
                />
                <Box ml={avatarSpacing ?? 2}>
                  <UserName>{user?.fullName}</UserName>
                  <Box
                    sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}
                  >
                    {showRole ? (
                      <MetricLabel>{memberRole?.skill}</MetricLabel>
                    ) : (
                      <>
                        <>
                          <BottomText highlight>
                            {totalCollabs >= 0 && totalCollabs > 99
                              ? '99+'
                              : totalCollabs}
                          </BottomText>
                          <BottomText>
                            {totalCollabs > 0 ? 'Collabs' : 'Collab'}
                          </BottomText>
                        </>

                        {connections != 0 && (
                          <>
                            <DotWrap>•</DotWrap>

                            <>
                              <BottomText highlight>
                                {connections >= 0 && connections}
                              </BottomText>

                              <BottomText>
                                {connections > 0
                                  ? 'Collaborators'
                                  : 'Collaborator'}
                              </BottomText>
                            </>
                          </>
                        )}
                      </>
                    )}
                  </Box>
                </Box>
              </InfoWrap>
            </UserWrap>
          );
        })
      ) : (
        <NotFoundText>{noFoundText}</NotFoundText>
      )}
    </>
  );
};

export default User;
