import React from 'react';
import {
  EmailChipContainer,
  EmailChipOutsideContainer,
  EmailText,
} from './elements';
import { Avatar, useTheme } from '@mui/material';
import { UilEnvelope } from '@iconscout/react-unicons';

export const EmailUserLabel = ({ email }) => {
  const theme = useTheme();
  return (
    <EmailChipOutsideContainer>
      <EmailChipContainer marginLeft={'-1rem'}>
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
      </EmailChipContainer>
    </EmailChipOutsideContainer>
  );
};
