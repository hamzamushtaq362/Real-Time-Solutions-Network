import {
  NavButtonGroupContainer,
  ButtonCountActive,
  ButtonCountLite,
} from './elements';
import { NavGroupButton, NavGroupRightButton } from '../elements';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import ArrowRightUpIcon from 'components/Icons/ArrowRightUpIcon';

export const NavTabsGroup = ({
  buttonsData,
  activeButton,
  setActiveButton,
  clickListener,
  align,
  hideBorderTop,
  hideBorderBottom,
  showRightButton,
  rightButtonText,
  onClickRightButton,
}) => {
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (router?.query?.view) {
      setActiveButton(router?.query?.view);
    }
  }, []);

  return (
    (<NavButtonGroupContainer
      align={align}
      hideBorderTop={hideBorderTop}
      hideBorderBottom={hideBorderBottom}
    >
      {buttonsData?.length > 0 ? (
        <>
          {buttonsData.map((item) => (
            <>
              {!item?.hide ? (
                <NavGroupButton
                  key={item?.value}
                  active={activeButton === item?.value}
                  onClick={() => {
                    if (item?.value) {
                      setActiveButton(item?.value);
                    }

                    if (clickListener) {
                      clickListener(item?.value);
                    }

                    const strippedAsPath = router?.asPath.split('?')[0];

                    router.replace(
                      `${strippedAsPath}?view=${item?.value}`,
                      undefined,
                      { shallow: true },
                    );
                  }}
                >
                  {item?.text}
                  {item?.count || item?.count === 0 ? (
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
      {showRightButton && (
        <NavGroupRightButton onClick={onClickRightButton}>
          {rightButtonText}
          <Box display="flex" component="span">
            <ArrowRightUpIcon
              width={18}
              height={18}
              color={theme.palette.text.primary}
            />
          </Box>{" "}
        </NavGroupRightButton>
      )}
    </NavButtonGroupContainer>)
  );
};
