import { Box } from '@mui/material';
import { BottomText, UserFullName } from './elements';
import { Avatar } from '~/components';
import { DotWrap } from 'components/CollabCommon/CollabTile/elements';
import { AvatarSampleImage2 } from 'assets/png';
import DropdownEmailAvatar from 'components/Dropdown/DropdownEmailAvatar';
import React from 'react';
import { FlexBox } from 'components/common/elements';

export const User = ({
  imageUrl,
  fullName,
  inverse,
  username,
  totalCollabs = 0,
  connections,
  customEmail,
}) => {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        onClick={() => {
          window.open(`/@${username}`, '_blank');
        }}
        sx={{ cursor: 'pointer' }}
      >
        <FlexBox mr={1} justifyContent="center">
          <Avatar
            size={38}
            avatar={
              (customEmail ? <DropdownEmailAvatar size={32} /> : imageUrl) ||
              AvatarSampleImage2
            }
            showRing={true}
          />
        </FlexBox>
        <Box display="flex" flexDirection="column">
          <UserFullName inverse={inverse}>
            {customEmail ?? fullName}
          </UserFullName>

          {!customEmail && (
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <>
                {totalCollabs > 0 && (
                  <>
                    <BottomText inverse={inverse} highlight>
                      {totalCollabs >= 0 && totalCollabs > 99
                        ? '99+'
                        : totalCollabs}
                    </BottomText>

                    <BottomText inverse={inverse}>
                      {totalCollabs > 0 ? 'Collabs' : 'Collab'}
                    </BottomText>
                  </>
                )}
              </>

              {connections > 0 && (
                <>
                  <DotWrap hovered={inverse}>•</DotWrap>
                  <>
                    <BottomText inverse={inverse} highlight>
                      {connections >= 0 && connections}
                    </BottomText>
                    <BottomText inverse={inverse}>
                      {connections > 0 ? 'Collaborators' : 'Collaborator'}
                    </BottomText>
                  </>
                </>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
