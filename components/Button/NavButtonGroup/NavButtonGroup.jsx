import {
  NavButtonGroupContainer,
  ButtonCountActive,
  ButtonCountLite,
  RightButtonWrap,
  RightButtonText,
  PlusIconWrap,
} from './elements';
import { NavGroupButton } from '../elements';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTheme, Box } from '@mui/material';
import { ArrowRightUpLongIconStyled } from 'components/common/elements';
import { useTranslation } from 'react-i18next';

export const NavButtonGroup = ({
  buttonsData,
  activeButton,
  setActiveButton,
  clickListener,
  align,
  showBorderTop,
  showBorderBottom,
  showRightButton,
  rightButtonText,
  onClickRightButton,
  subview,
  rightButtonIcon,
  buttonWidth,
  sx,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!subview) {
      if (router?.query?.view) {
        activeButton && setActiveButton(router?.query?.view);
      }
    } else {
      if (router?.query?.subview) {
        setActiveButton(router?.query?.subview);
      }
    }
  }, []);

  const navButtonClickedHander = (value) => {
    if (value) {
      setActiveButton(value);
    }

    if (clickListener) {
      clickListener(value);
    }

    const queryParams = new URLSearchParams(window.location.search);
    const currentView = queryParams.get('view');
    const currentSubview = queryParams.get('subview');

    if (subview) {
      queryParams.set('subview', value);
      if (!currentSubview && !currentView) {
        queryParams.delete('view');
      }
    } else {
      queryParams.set('view', value);
      if (!currentView && !currentSubview) {
        queryParams.delete('subview');
      }
    }

    const strippedAsPath = router?.asPath.split('?')[0];

    router.replace(`${strippedAsPath}?${queryParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <NavButtonGroupContainer
        align={align}
        showBorderTop={showBorderTop}
        showBorderBottom={showBorderBottom}
        sx={sx}
      >
        {buttonsData?.length > 0 ? (
          <>
            {buttonsData.map((item) => (
              <>
                {!item?.hide ? (
                  <NavGroupButton
                    key={item?.value}
                    active={activeButton === item?.value}
                    onClick={() => navButtonClickedHander(item?.value)}
                  >
                    {t(item?.text)}
                    {item?.count && item?.count !== 0 ? (
                      <>
                        {activeButton === item?.value ? (
                          <ButtonCountActive>{item.count}</ButtonCountActive>
                        ) : (
                          <ButtonCountLite>{item.count}</ButtonCountLite>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </NavGroupButton>
                ) : (
                  <></>
                )}
              </>
            ))}
          </>
        ) : (
          <></>
        )}
      </NavButtonGroupContainer>
      <RightButtonWrap>
        {showRightButton ? (
          <Box
            onClick={onClickRightButton}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <RightButtonText hovered={hovered} width={buttonWidth}>
              {rightButtonText}
              {!rightButtonIcon && (
                <PlusIconWrap hovered={hovered}>+</PlusIconWrap>
              )}
            </RightButtonText>
            {rightButtonIcon === 'arrow-right-up-long' && (
              <ArrowRightUpLongIconStyled
                width={20}
                height={20}
                color={theme.palette.text.primary}
                hovered={hovered}
              />
            )}
          </Box>
        ) : (
          <Box sx={{ width: '140px' }}></Box>
        )}
      </RightButtonWrap>
    </>
  );
};
