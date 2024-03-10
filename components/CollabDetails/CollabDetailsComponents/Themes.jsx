import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {
  CollabSubHeader,
  MiniBadgeLabelContainer,
  PlusMoreText,
  TextBox,
} from './elements';
import { NotFoundText } from '../../Creator/CreatorProfileCard/elements';
import { Tooltip } from '~/components';
import { Box } from '@mui/material';

//TODO: Rename component to something like CollabThemes since it is creating confusion with the themes of the meterial ui
// Themes referes to collab themes (formely known as collab tags)
const Themes = ({ themes }) => {
  const { t } = useTranslation();

  const [themesTrimLimit, setThemesTrimLimit] = useState(3);
  const [showLess, setShowLess] = useState(false);

  return (
    (<Box mt={3}>
      <CollabSubHeader>{t("Themes")}</CollabSubHeader>
      {themes?.length === 0 ? (
        <NotFoundText>{t("No Themes Found")}</NotFoundText>
      ) : themes?.length >= themesTrimLimit ? (
        themes?.length > themesTrimLimit ? (
          <MiniBadgeLabelContainer>
            {themes?.slice(0, themesTrimLimit).map((theme, index) => (
              <TextBox key={index}>{theme}</TextBox>
            ))}
            <Tooltip
              placement="top"
              title={themes.slice(themesTrimLimit).join(', ')}
            >
              <PlusMoreText
                onClick={() => {
                  setThemesTrimLimit(themes?.length);
                  setShowLess(true);
                }}
              >
                +{themes?.slice(themesTrimLimit).length}{t("more")}</PlusMoreText>
            </Tooltip>
          </MiniBadgeLabelContainer>
        ) : (
          <MiniBadgeLabelContainer>
            {themes?.slice(0, themesTrimLimit).map((theme, index) => (
              <TextBox key={index}>{theme}</TextBox>
            ))}

            {showLess && themesTrimLimit !== 3 && (
              <PlusMoreText
                onClick={() => {
                  setThemesTrimLimit(3);
                  setShowLess(false);
                }}
              >{t("Show Less")}</PlusMoreText>
            )}
          </MiniBadgeLabelContainer>
        )
      ) : (
        <MiniBadgeLabelContainer>
          {themes?.map((theme, index) => (
            <TextBox key={index}>{theme}</TextBox>
          ))}
        </MiniBadgeLabelContainer>
      )}
    </Box>)
  );
};

export default Themes;
