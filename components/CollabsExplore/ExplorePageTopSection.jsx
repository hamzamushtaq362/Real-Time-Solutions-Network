import { ExplorePageTitle, ExploreTopContainer } from './elements';
import { PrimaryButton } from '~/components';
import { useTheme, Box } from '@mui/material';
import React, { useState } from 'react';
import { ArrowRightUpLongIconStyled } from 'components/common/elements';
import { useTranslation } from 'react-i18next';

export const ExplorePageTopSection = ({
  heading,
  btnText,
  btnWidth,
  btnClickHandler,
  hideBtn,
}) => {
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <ExploreTopContainer>
      <ExplorePageTitle>{t(heading)}</ExplorePageTitle>
      {!hideBtn && (
        <PrimaryButton
          width={btnWidth ?? '150px'}
          onClick={btnClickHandler}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {btnText}
          <Box ml={1} display="flex">
            <ArrowRightUpLongIconStyled
              width={20}
              height={20}
              color={
                hovered
                  ? theme.palette.text.primary
                  : theme.palette.text.inverse
              }
              hovered={hovered}
            />
          </Box>
        </PrimaryButton>
      )}
    </ExploreTopContainer>
  );
};
