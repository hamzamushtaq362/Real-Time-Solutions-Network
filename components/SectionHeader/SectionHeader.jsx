import React from 'react';
import { Box, useTheme } from '@mui/material';
import {
  DashboardHeaderContainer,
  DashboardTitle,
  SeeAllButton,
  TitleInfoText,
} from '../DashboardHome/elements';
import { Container, TitleBox } from './elements';
import ArrowRightUpLongIcon from '../Icons/ArrowRightUpLongIcon';
import { useTranslation } from 'react-i18next';

export const SectionHeader = ({
  text,
  infoText,
  buttonText,
  buttonOnClickHandler,
  ...rest
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <DashboardHeaderContainer {...rest}>
      <Container>
        <TitleBox>
          <DashboardTitle>{text}</DashboardTitle>
          {infoText && <TitleInfoText>{infoText}</TitleInfoText>}
        </TitleBox>
        {buttonOnClickHandler && (
          <SeeAllButton onClick={buttonOnClickHandler} mr={4}>
            {t(buttonText)}
            <Box display="flex" component="span" ml={0.8}>
              <ArrowRightUpLongIcon
                width={16}
                height={16}
                color={theme.palette.text.primary}
              />
            </Box>
          </SeeAllButton>
        )}
      </Container>
    </DashboardHeaderContainer>
  );
};
