import { useTranslation } from 'react-i18next';
import React from 'react';
import Friendly from '../../../assets/Friendly.png';
import Favourite from '../../../assets/Favourite.png';

import {
  ProfileCardContainer,
  BottomLeftContainer,
  BottomLeftSubContainer1,
  StatText,
  BottomLeftSubContainer2,
  BottomRightContainer,
  RightSubContainer1,
  BadgeImage,
  BadgeText,
  RightSubContainer2,
} from './elements';
import { UilUsersAlt } from '@iconscout/react-unicons';
import SparkleIcon from '../../../../Icons/SparkleIcon';
import { useTheme } from '@mui/material';

const Bottom = ({ user }) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const formateString = (num) => {
    if (num > 1) {
      return 'Collabs';
    } else {
      return 'Collab';
    }
  };

  return (
    (<ProfileCardContainer>
      <BottomLeftContainer>
        <BottomLeftSubContainer1>
          {user?.totalCollabs > 0 && (
            <>
              <SparkleIcon
                width={18}
                height={18}
                color={theme.palette.grey.common}
              />
              <StatText>
                {`${user.totalCollabs}
                ${formateString(user.totalCollabs)}`}
              </StatText>
            </>
          )}
        </BottomLeftSubContainer1>
        <BottomLeftSubContainer2
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {user?.connections > 0 && <UilUsersAlt size="20" />}

          <StatText>
            {user?.connections > 0 &&
              `${user.connections} ${
                user && user.connections && user.connections > 1
                  ? 'Collaborators'
                  : 'Collaborator'
              }`}
          </StatText>
        </BottomLeftSubContainer2>
      </BottomLeftContainer>
      <BottomRightContainer>
        <RightSubContainer1>
          <BadgeImage src={Friendly.src} alt="Friendly" />
          <BadgeText>{t("Friendly")}</BadgeText>
        </RightSubContainer1>
        <RightSubContainer2>
          <BadgeImage src={Favourite.src} alt="Favourite" />
          <BadgeText>{t("Favourite")}</BadgeText>
        </RightSubContainer2>
      </BottomRightContainer>
    </ProfileCardContainer>)
  );
};

export default Bottom;
