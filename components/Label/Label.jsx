import React from 'react';
import {
  CrossButtonLabelText,
  BadgeLabelContainer,
  MiniLabelContainer,
  MiniLabelText,
  CapsuleLabelContainer,
  CapsuleLabelText,
  StatusLabelContainer,
} from './elements';
import { IconButton, Box, useTheme } from '@mui/material';
import { UilTimes } from '@iconscout/react-unicons';
import { Avatar } from '~/components';

export const BadgeLabel = ({
  text,
  crossable,
  image,
  onClick,
  onCross,
  sx,
}) => {
  const theme = useTheme();
  return (
    <BadgeLabelContainer
      onClick={onClick}
      type={crossable ? 'cross-button' : ''}
      sx={sx}
    >
      {image && <Avatar size={25} avatar={image} />}
      <CrossButtonLabelText>{text}</CrossButtonLabelText>
      {crossable && (
        <IconButton onClick={onCross} sx={{ marginLeft: '3px' }} size="small">
          <UilTimes color={theme.palette.text.label} size="22" />
        </IconButton>
      )}
    </BadgeLabelContainer>
  );
};

export const CapsuleLabel = ({ text, sx }) => (
  <CapsuleLabelContainer sx={sx}>
    <CapsuleLabelText>{text}</CapsuleLabelText>
  </CapsuleLabelContainer>
);

export const MiniBadeLabel = ({ text, sx }) => (
  <MiniLabelContainer sx={sx}>
    <MiniLabelText>{text}</MiniLabelText>
  </MiniLabelContainer>
);

export const ApplicantStatusLabel = ({ text, sx, variant }) => (
  <StatusLabelContainer variant={variant} sx={sx}>
    {text}
  </StatusLabelContainer>
);

export const IconBadgeLabel = ({ text, icon, onClick }) => {
  return (
    <BadgeLabelContainer
      onClick={onClick}
      sx={{ padding: '10px', height: '50px' }}
      minWidth="200px"
    >
      <Box sx={{ marginRight: '4px', marginTop: '6px' }}>{icon}</Box>
      <CrossButtonLabelText fontSize="15px" fontWeight={400}>
        {text}
      </CrossButtonLabelText>
    </BadgeLabelContainer>
  );
};
