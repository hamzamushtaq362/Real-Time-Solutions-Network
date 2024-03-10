import { useTranslation } from 'react-i18next';
import React from 'react';
import { useRouter } from 'next/router';
import { CollabButton, ViewButton } from '../../../elements';
import { Box } from '@mui/material';
import { Divider, Spacer, MiniBadeLabel } from '~/components';
import {
  ProfileCardMiddleContainer,
  MiddleButtonContainer,
  ProfileName,
  ProfileSubName,
  ProfileBio,
  RolesText,
  RolesContainer,
} from './elements';
import { captilalizeString } from '~/utils';

const Middle = ({ user, setSelectedCollabuser }) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (<>
    <ProfileCardMiddleContainer>
      <MiddleButtonContainer id="buttons-container">
        <ViewButton onClick={() => router.push(`/@${user.username}`)}>{t("View Profile")}</ViewButton>

        <CollabButton onClick={() => setSelectedCollabuser(user)}>{t("Collab")}</CollabButton>
      </MiddleButtonContainer>
      <ProfileName>
        {user.username && captilalizeString(user.username)}
      </ProfileName>
      <ProfileSubName>
        @{user.username && captilalizeString(user.username)}
      </ProfileSubName>
      <ProfileBio>{user.bio}...</ProfileBio>
      <Spacer value={8} />
      <Divider />
      <Spacer value={16} />
      <Box>
        <RolesText>{t("Roles")}</RolesText>
        <RolesContainer>
          {user &&
            user.skills &&
            user.skills[0] &&
            user.skills.map((s) => {
              return (
                <MiniBadeLabel
                  key={user?._id}
                  text={s}
                  sx={{
                    borderRadius: '5px',
                    marginRight: '1rem',
                    marginBottom: '1rem',
                  }}
                />
              );
            })}
        </RolesContainer>
      </Box>
      <Divider />
    </ProfileCardMiddleContainer>
  </>);
};

export default Middle;
