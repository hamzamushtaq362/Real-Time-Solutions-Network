import { useState } from 'react';
import { Box } from '@mui/material';
import { InfoValue, ArrowRightUpLongIconStyled } from './elements';

import { useTheme } from '@mui/material';

export const CommonLinkLabel = ({ title, domain, url }) => {
  const [hovered, setHovered] = useState(null);
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
      }}
      onClick={() => {
        window.open(url, '_blank');
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <InfoValue>
        {title} {'- '}
      </InfoValue>

      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <InfoValue>&nbsp;{domain}</InfoValue>
        <Box
          style={{
            marginLeft: '.5rem',
            marginTop: '.5rem',
          }}
        >
          <ArrowRightUpLongIconStyled
            width={15}
            height={15}
            hovered={hovered}
            color={theme.palette.text.primary}
          />
        </Box>
      </Box>
    </Box>
  );
};
