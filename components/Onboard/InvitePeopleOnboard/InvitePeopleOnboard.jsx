import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { Spacer, SelectItemButton, ImageIconElement } from '~/components';
import {
  OnBoardEarnBadgeContainer,
  OnBoardEarnBadgeDesc,
  OnBoardEarnBadgeTitle,
  OnBoardInviteContainer,
  OnBoardInviteInputContainer,
  OnBoardInviteOrText,
  OnBoardInviteShareButton,
  OnBoardInviteShareContainer,
  OnBoardInviteSkipButton,
  OnBoardInviteText,
  OnBoardInviteTitle,
} from './elements';
import { InviteBadge } from '~/assets';
import ThreeDots from '../common/ThreeDots/ThreeDots';
import { onBoardSkipStep, BASE_URL } from '~/apis';
import { Box, useTheme } from '@mui/material';
import Button from '../common/Button/Button';
import { OnBoardRightSignUpInput } from '../Signup/elements';
import { getOnBoardInviteLogoMappings } from '~/constants';
import { shareLinkHandler, isEmailValid } from '~/utils';
import config from '~/config';
import { useNotistack } from '~/hooks';
import axios from 'axios';

export const InvitePeopleOnboard = (props) => {
  const { t } = useTranslation();

  const { onFinish } = props;
  const [loading, setLoading] = useState(false);
  const [inviteEmailLoading, setInviteEmailLoading] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userName = JSON.parse(localStorage.getItem('auth'))?.username;

      setUserName(userName);
    }
  }, []);

  const theme = useTheme();
  const generateSnackbar = useNotistack();

  const sharePlatforms = [
    'Twitter',
    'Whatsapp',
    'Reddit',
    'Facebook',
    'Copy Link',
  ];

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleContinueClick = async () => {
    setLoading(false);
    onFinish();
  };

  const handleSkipStep = async () => {
    setSkipLoading(true);
    await onBoardSkipStep();
    setSkipLoading(false);
    onFinish();
  };

  const platformClickHandler = (newSelectedSuggestion) => {
    if (!selectedPlatforms.includes(newSelectedSuggestion)) {
      setSelectedPlatforms((prevState) => {
        return [newSelectedSuggestion, ...prevState];
      });
    } else {
      setSelectedPlatforms((prevState) => {
        return prevState.filter(
          (suggestion) => suggestion !== newSelectedSuggestion,
        );
      });
    }
    shareLinkHandler(
      newSelectedSuggestion.toLowerCase(),
      `${config?.APP_URL}/@${userName}`,
    );
  };

  const handleShareClick = async () => {
    if (email && isEmailValid(email)) {
      try {
        setInviteEmailLoading(true);
        const response = await axios.post(
          `${BASE_URL}/invitation/sendProfileInvitation`,
          {
            email: email,
          },
        );
        if (response?.data?.status === 'success') {
          generateSnackbar(
            response?.data?.message || 'Invitation mail sent successfully',
            'success'
          );
        }
        setInviteEmailLoading(false);
      } catch (err) {
        setInviteEmailLoading(false);
        return err;
      }
    }
  };

  return (
    (<OnBoardInviteContainer>
      <OnBoardInviteTitle>{t("Invite People")}</OnBoardInviteTitle>
      <OnBoardInviteText>{t("Invite people to grow your network.")}</OnBoardInviteText>
      <Spacer value={64} />
      <OnBoardEarnBadgeContainer>
        <ImageIconElement
          src={InviteBadge.src}
          width="71px"
          height="71px"
          marginLeft="20px"
          alignSelf="center"
        />
        <Box>
          <OnBoardEarnBadgeTitle>{t("Earn MetaConnector NFT Badge")}</OnBoardEarnBadgeTitle>
          <OnBoardEarnBadgeDesc>{t("Earn a Badge by inviting 3 people.")}</OnBoardEarnBadgeDesc>
        </Box>
      </OnBoardEarnBadgeContainer>
      <Spacer value={32} />
      <OnBoardInviteInputContainer>
        <OnBoardRightSignUpInput
          onChange={handleEmailChange}
          placeholder={t("Enter Email to Invite People")}
          email={email}
          disableUnderline="true"
          sx={{
            borderRadius: '10px',
            width: '75%',
            fontSize: 'medium',
          }}
        />
        <OnBoardInviteShareButton onClick={handleShareClick}>
          {inviteEmailLoading ? (
            <ThreeDots color={theme.palette.background.default} />
          ) : (
            'Share'
          )}
        </OnBoardInviteShareButton>
      </OnBoardInviteInputContainer>
      <Spacer value={32} />
      <OnBoardInviteOrText>{t("- or -")}</OnBoardInviteOrText>
      <Spacer value={32} />
      <OnBoardInviteShareContainer>
        {sharePlatforms.map((name) => (
          <SelectItemButton
            key={name}
            name={name}
            image={getOnBoardInviteLogoMappings(name).image.src}
            active={selectedPlatforms.includes(name)}
            selectItemClickHandler={() => platformClickHandler(name)}
            source="OnBoardInvite"
          />
        ))}
      </OnBoardInviteShareContainer>
      <Spacer value={80} />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: '30px',
          marginTop: '2rem',
        }}
      >
        <Box sx={{ display: 'flex', columnGap: '30px', marginTop: '2rem' }}>
          <OnBoardInviteSkipButton
            onClick={() => {
              handleContinueClick();
            }}
          >
            {loading ? (
              <ThreeDots color={theme.palette.background.inverse} />
            ) : (
              'Continue'
            )}
          </OnBoardInviteSkipButton>
          <Button onClick={handleSkipStep}>
            {!skipLoading ? (
              'Skip'
            ) : (
              <ThreeDots color={theme.palette.background.default} />
            )}
          </Button>
        </Box>
      </Box>
    </OnBoardInviteContainer>)
  );
};
