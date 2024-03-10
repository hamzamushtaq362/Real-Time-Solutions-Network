import React, { useContext, useEffect, useState } from 'react';
import { Heading, HeroContainer, SmallText, StartButton } from './elements';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { HeroStyleImage } from '~/assets';
import { Box } from '@mui/material';
import { setCurrentDialog } from '~/redux';
import { useDispatch } from 'react-redux';
import AppContext from 'context/AppContext';

const Hero = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleSignup = () => {
    dispatch(setCurrentDialog('signup-open-dialog'));
  };
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      setIsUserLoggedIn(true);
    }
  }, [user]);

  return (
    <HeroContainer>
      <Box position="absolute" left={0} top={0}>
        <Image
          width="500"
          height="300"
          alt="HeroStyle Image"
          src={HeroStyleImage.src}
        />
      </Box>
      <SmallText>Find Collaborations & Collaborators to</SmallText>
      <Heading>{t('Build Immersive AR, VR, XR')}<br/>{t("& Spatial Experiences")}</Heading>

      {!isUserLoggedIn && (
        <StartButton height={45} onClick={handleSignup}>
          Get Started Free
        </StartButton>
      )}
    </HeroContainer>
  );
};

export default Hero;
