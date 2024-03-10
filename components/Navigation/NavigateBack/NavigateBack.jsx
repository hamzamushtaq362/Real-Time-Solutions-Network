import { useState } from 'react';
import { NavigateBackContainer } from './elements';
import { ArrowLeftIcon } from '~/components';
import { useTheme } from '@mui/material';

export const NavigateBack = ({ onNavigateBack, sx }) => {
  const theme = useTheme();

  const [hovered, setHovered] = useState(false);

  return (
    <NavigateBackContainer
      sx={sx}
      onClick={onNavigateBack}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ArrowLeftIcon
        width={20}
        height={20}
        color={hovered ? theme.palette.text.primary : theme.palette.text.label}
      />
    </NavigateBackContainer>
  );
};
