import {
  LaunchpadCardWrap,
  LaunchpadCardTitle,
  LaunchpadActionText,
} from './elements';
import { useState } from 'react';
import { ArrowRightUpLongIconStyled } from 'components/common/elements';
import { Tooltip } from '~/components';
import { useTheme, Box } from '@mui/material';
import { ActionIconWrapper } from './elements';

export const LaunchpadLandingCard = ({
  mainText,
  subText,
  icon,
  onClick,
  disabled,
  disabledTooltip,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const theme = useTheme();

  return (
    <Tooltip disabled={!disabled} title={disabledTooltip}>
      <LaunchpadCardWrap
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        hovered={isHovered}
        onClick={onClick}
        disabled={disabled}
      >
        {icon ? <ActionIconWrapper>{icon}</ActionIconWrapper> : <Box></Box>}
        {!subText ? (
          <LaunchpadActionText hovered={isHovered}>
            {mainText}
            <Box display="flex" component="span" ml={1}>
              <ArrowRightUpLongIconStyled
                width={20}
                height={20}
                color={theme.palette.text.primary}
                hovered={isHovered}
                strokeWidth="1"
              />
            </Box>
          </LaunchpadActionText>
        ) : (
          <Box>
            <LaunchpadActionText color={theme.palette.grey.common}>
              {mainText}
            </LaunchpadActionText>
            <LaunchpadCardTitle>{subText}</LaunchpadCardTitle>
          </Box>
        )}
      </LaunchpadCardWrap>
    </Tooltip>
  );
};
