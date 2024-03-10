import { Box, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';
import {
  copyToClipBoard,
  shareLinkHandler,
  useIsMobileView,
} from 'utils/utils';
import {
  Heading,
  InputContainer,
  InputContainerButton,
  InputContainerControl,
  ReferredContainer,
  Shared,
  SharedContainer,
  SharedContainerTitle,
  SocialLinksRow,
  UserSettingsReferralContainer,
} from './elements';
import config from '~/config';
import {
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from '~/components';
import { RoundedIcon } from 'components/Landing/SubscribeSection/elements';
import { InformationDescription } from 'components/CollabCreate/elements';
import { FlexBox } from 'components/common/elements';
import AppContext from 'context/AppContext';
import { useTranslation } from 'react-i18next';
import { getRefferedUsers } from 'apis/user';
import { useEffect } from 'react';
import CollaboratorCard from 'components/CollabDetails/CollabDetailsLayouts/Collaborators/CollaboratorCard';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

export const UserSettingsReferralSection = () => {
  const theme = useTheme();
  const APP_URL = config.APP_URL;
  const isMobileView = useIsMobileView();
  const { user } = useContext(AppContext);

  const { t } = useTranslation();

  const [buttonState, setButtonState] = useState('Copy Link');
  const [hoveredSocial, setIconHovered] = useState(null);
  const [refferedUsers, setRefferedUsers] = useState([]);
  const shareUrl = `${APP_URL}?join=${user?.referralCode || user?.username}`;

  const handleGetrefferedUsers = async () => {
    const users = await getRefferedUsers();
    if (users.length > 0) {
      setRefferedUsers(users);
    }
  };

  useEffect(() => {
    handleGetrefferedUsers();
  }, []);

  return (
    <>
      <UserSettingsReferralContainer>
        <Heading>{t('Referral')}</Heading>
        <Shared>
          <Box>
            <InformationDescription>
              {t('Your referral link')}
            </InformationDescription>
          </Box>
          <SharedContainer>
            <FlexBox>
              <Box>
                <InputContainer>
                  <InputContainerControl
                    placeholder={t('You referral link')}
                    type="text"
                    name="referral_link"
                    id="referral_link"
                    value={shareUrl}
                    readOnly
                  />
                  {!isMobileView && (
                    <InputContainerButton
                      onClick={() => {
                        copyToClipBoard(shareUrl);
                        setButtonState('Copied');
                      }}
                    >
                      {buttonState}
                    </InputContainerButton>
                  )}
                </InputContainer>
                <InputContainer>
                  {isMobileView && (
                    <InputContainerButton
                      onClick={() => {
                        copyToClipBoard(shareUrl);
                        setButtonState('Copied');
                      }}
                    >
                      {buttonState}
                    </InputContainerButton>
                  )}
                </InputContainer>
              </Box>
              <SocialLinksRow>
                <RoundedIcon
                  hovered={hoveredSocial === 'facebook'}
                  onMouseEnter={() => setIconHovered('facebook')}
                  onMouseLeave={() => setIconHovered('')}
                  onClick={() => shareLinkHandler('facebook', shareUrl)}
                  padding={1.5}
                  ml={1}
                >
                  <FacebookIcon
                    width={18}
                    height={18}
                    color={
                      hoveredSocial === 'facebook'
                        ? theme.palette.text.inverse
                        : theme.palette.text.primary
                    }
                  />
                </RoundedIcon>
                <RoundedIcon
                  hovered={hoveredSocial === 'twitter'}
                  onMouseEnter={() => setIconHovered('twitter')}
                  onMouseLeave={() => setIconHovered('')}
                  onClick={() => shareLinkHandler('twitter', shareUrl)}
                  padding={1.5}
                  ml={1}
                >
                  <TwitterIcon
                    width={18}
                    height={18}
                    color={
                      hoveredSocial === 'twitter'
                        ? theme.palette.text.inverse
                        : theme.palette.text.primary
                    }
                  />
                </RoundedIcon>
                <RoundedIcon
                  hovered={hoveredSocial === 'whatsapp'}
                  onMouseEnter={() => setIconHovered('whatsapp')}
                  onMouseLeave={() => setIconHovered('')}
                  onClick={() =>
                    shareLinkHandler(
                      'whatsapp',
                      shareUrl,
                      'Join me on this amazing platform!',
                    )
                  }
                  padding={1.5}
                  ml={1}
                >
                  <WhatsappIcon
                    width={18}
                    height={18}
                    color={
                      hoveredSocial === 'whatsapp'
                        ? theme.palette.text.inverse
                        : theme.palette.text.primary
                    }
                  />
                </RoundedIcon>
                <RoundedIcon
                  hovered={hoveredSocial === 'telegram'}
                  onMouseEnter={() => setIconHovered('telegram')}
                  onMouseLeave={() => setIconHovered('')}
                  onClick={() => shareLinkHandler('telegram', shareUrl)}
                  padding={1.5}
                  ml={1}
                >
                  <TelegramIcon
                    width={18}
                    height={18}
                    color={
                      hoveredSocial === 'telegram'
                        ? theme.palette.text.inverse
                        : theme.palette.text.primary
                    }
                  />
                </RoundedIcon>
              </SocialLinksRow>
            </FlexBox>
          </SharedContainer>
        </Shared>
        <ReferredContainer>
          <Box>
            <LeftHeaderComp
              headerText={t('Referred Creators')}
              subheader={t(
                'Users that have signed up using your referral link. Refer users & Earn Rewards.',
              )}
            />
          </Box>

          <SharedContainer>
            {refferedUsers && refferedUsers.length > 0 ? (
              <FlexBox flexDirection="row">
                {refferedUsers.map((user, index) => (
                  <CollaboratorCard
                    key={index}
                    imageUrl={user?.imageUrl}
                    fullName={user?.fullName}
                    skill={user?.skill}
                    username={user?.username}
                  />
                ))}
              </FlexBox>
            ) : (
              <SharedContainerTitle>
                {t('No referred users found.')}
              </SharedContainerTitle>
            )}
          </SharedContainer>
        </ReferredContainer>
      </UserSettingsReferralContainer>
    </>
  );
};
