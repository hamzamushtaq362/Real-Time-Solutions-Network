import React, { useState, useLayoutEffect, useContext } from 'react';
import {
  DashboardNavbarContainer,
  ConnectContainer,
  StyledToolbar,
} from './elements';
import { AppLogo } from '~/components';
import { useIsMobileView } from '~/utils';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { StartButton } from 'components/Landing/Hero/elements';
import AppContext from 'context/AppContext';
import { useProtectedAction } from '~/hooks';

const Header = ({dark}) => {
  const { user } = useContext(AppContext);
  const isMobileView = useIsMobileView();
  const { t } = useTranslation();
  const router = useRouter();

  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useLayoutEffect(() => {
    setIsMobileScreen(isMobileView);
  }, [isMobileView]);

  const handleSignup = useProtectedAction(() => {
    router.push('/dashboard');
  })

  return (
    <DashboardNavbarContainer
      elevation={0}
      isMobileView={isMobileScreen}
      dark={dark}
      // visible={visible}
    >
      <StyledToolbar disableGutters>
        <AppLogo dark={dark} />

        {/*{!isMobileScreen && (*/}
        {/*  <>*/}
        {/*    <VerticalDivider />*/}
        {/*    <Sections />*/}
        {/*  </>*/}
        {/*)}*/}

        {/*{!isMobileScreen && <VerticalDivider />}*/}

        {/*{isMobileScreen ? (*/}
        {/*  <MobileMenu />*/}
        {/*) : (*/}
          <ConnectContainer isMobileView={isMobileView} width={user ? 240 : 140}>
            <StartButton
              height={45}
              marginTop={0}
              width={user ? 240 : 140}
              onClick={handleSignup}
            >
              {user ?
                t('Dashboard →') :
                t('Join')
              }
            </StartButton>
          </ConnectContainer>
        {/*)}*/}
      </StyledToolbar>
    </DashboardNavbarContainer>
  );
};

export default Header;
