import { useTranslation } from 'react-i18next';
import React from 'react';
import {
  EmailChipContainer,
  EmailChipOutsideContainer,
  EmailText,
  SentText,
} from './elements';

import { UilEnvelope, UilTimes } from '@iconscout/react-unicons';
import { useTheme } from '@mui/styles';
import { Avatar, Box } from '@mui/material';
import {
  ArrowRightUpLongIconStyled,
  FlexBox,
} from 'components/common/elements';
import { useState } from 'react';
import ThreeDots from 'components/Onboard/common/ThreeDots/ThreeDots';

export const EmailChip = ({ emails, onDelete, handlSendInvite, loading }) => {
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  return (
    (<FlexBox gap={10} justifyContent={'space-between'}>
      <EmailChipOutsideContainer>
        {emails?.map((email, index) => (
          <EmailChipContainer key={index}>
            <Avatar
              sx={{
                width: '2rem',
                height: '2rem',
                borderRadius: '100%',
                backgroundColor: theme.palette.background.inverse,
              }}
            >
              <UilEnvelope size="1.3rem" />
            </Avatar>

            <EmailText>{email}</EmailText>

            <div style={{ cursor: 'pointer' }} onClick={() => onDelete(email)}>
              <UilTimes size="30" />
            </div>
          </EmailChipContainer>
        ))}
      </EmailChipOutsideContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {loading ? (
          <ThreeDots color={theme.palette.background.default} />
        ) : (
          <>
            <SentText onClick={handlSendInvite}>{t("Send Invites")}</SentText>
            <Box component="span" ml={1}>
              <ArrowRightUpLongIconStyled
                width={20}
                height={20}
                color={theme.palette.text.inverse}
                hovered={isHovered}
              />
            </Box>
          </>
        )}
      </Box>
    </FlexBox>)
  );
};
