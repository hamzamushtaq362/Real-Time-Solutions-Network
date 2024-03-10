import {
  SubscribeText,
  SubscribeInput,
  FormWrap,
  SubscribeButton,
  NavLinksWrap,
  LinkTitle,
  LinkText,
  RoundedIcon,
  SocialIconsWrap,
  LinkTextWrap,
  SubscribeWrap,
} from './elements';
import { SectionContainer } from '../elements';
import React, { useState } from 'react';
import { Grid, useTheme } from '@mui/material';
import { FacebookIcon, TwitterIcon } from '~/components';
import ArrowRightUpIcon from '../../Icons/ArrowRightUpIcon';
import { shareLinkHandler, useIsMobileView } from '~/utils';
import axios from 'axios';
import { BASE_URL } from '~/apis';
import { useNotistack } from '~/hooks';
import config from '~/config';
import { useTranslation } from 'react-i18next';

export const SubscribeSection = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [iconHovered, setIconHovered] = useState('');
  const isMobileView = useIsMobileView();
  const generateSnackbar = useNotistack();
  const { t } = useTranslation();

  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value);
    setEmailError(!validateEmail(value));
    setEmail(value);
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = async () => {
    try {
      await axios.post(`${BASE_URL}/mailchimp/add-user`, {
        email_address: email,
        status: 'subscribed',
      });
      generateSnackbar(
        "Thanks for subscribing! You'll receive our latest news, updates, and exclusive offers in your inbox.",
        'success',
      );
    } catch (error) {}
  };
  const shareUrl = config.APP_URL;

  return (
    <SectionContainer>
      <SubscribeWrap mx={3} my={6}>
        <Grid container rowSpacing={0} columnSpacing={0}>
          <Grid item sm={7} xs={12}>
            <SubscribeText>
              {t('Subscribe to our news to be among the first')}
            </SubscribeText>
            `
            <FormWrap>
              <SubscribeInput
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                error={emailError && email}
                helperText={emailError && email ? 'Enter a valid email!' : ''}
                size="small"
              ></SubscribeInput>
              <SubscribeButton onClick={handleSubscribe}>
                {t('Subscribe')}
                <ArrowRightUpIcon
                  width={20}
                  height={20}
                  color={theme.palette.text.inverse}
                />
              </SubscribeButton>
            </FormWrap>
          </Grid>
          <Grid item sm={5} xs={12}>
            <Grid container mt={isMobileView ? 4 : 0}>
              <Grid item sm={4} xs={6}>
                <NavLinksWrap>
                  <LinkTitle>{t('RTSN')}</LinkTitle>
                  <LinkTextWrap>
                    <LinkText>{t('Mission')}</LinkText>
                  </LinkTextWrap>
                  <LinkTextWrap>
                    <LinkText>{t('About Us')}</LinkText>
                  </LinkTextWrap>
                  <LinkTextWrap>
                    <LinkText>{t('Press')}</LinkText>
                  </LinkTextWrap>
                  <LinkTextWrap>
                    <LinkText>{t('News')}</LinkText>
                  </LinkTextWrap>
                  <LinkTextWrap>
                    <LinkText>{t('Contact')}</LinkText>
                  </LinkTextWrap>
                </NavLinksWrap>
              </Grid>
              <Grid item sm={4} xs={6}>
                <NavLinksWrap>
                  <LinkTitle>{t('Help')}</LinkTitle>
                  <LinkTextWrap>
                    <LinkText>{t('Support')}</LinkText>
                  </LinkTextWrap>
                  <LinkTextWrap>
                    <LinkText>{t('FAQ')}</LinkText>
                  </LinkTextWrap>
                  <LinkTextWrap>
                    <LinkText>{t('Help')}</LinkText>
                  </LinkTextWrap>
                </NavLinksWrap>
              </Grid>
              <Grid item sm={4} xs={12}>
                <SocialIconsWrap>
                  {/*<RoundedIcon*/}
                  {/*  hovered={iconHovered === 'instagram'} */}
                  {/*  onMouseEnter={() => setIconHovered('instagram')}*/}
                  {/*  onMouseLeave={() => setIconHovered('')}*/}
                  {/*>*/}
                  {/*  <InstagramIcon width={isMobileView ? 18 : 22} height={isMobileView ? 18 : 22} color={iconHovered === 'instagram' ? theme.palette.text.inverse : theme.palette.text.primary} />*/}
                  {/*</RoundedIcon>*/}

                  <RoundedIcon
                    hovered={iconHovered === 'facebook'}
                    onMouseEnter={() => setIconHovered('facebook')}
                    onMouseLeave={() => setIconHovered('')}
                    onClick={() => shareLinkHandler('facebook', shareUrl)}
                    backgroundColor={theme.palette.background.paperLanding}
                  >
                    <FacebookIcon
                      width={isMobileView ? 18 : 22}
                      height={isMobileView ? 18 : 22}
                      color={
                        iconHovered === 'facebook'
                          ? theme.palette.text.inverse
                          : theme.palette.text.primary
                      }
                    />
                  </RoundedIcon>

                  <RoundedIcon
                    hovered={iconHovered === 'twitter'}
                    onMouseEnter={() => setIconHovered('twitter')}
                    onMouseLeave={() => setIconHovered('')}
                    onClick={() => shareLinkHandler('twitter', shareUrl)}
                    backgroundColor={theme.palette.background.paperLanding}
                    mt={1}
                  >
                    <TwitterIcon
                      width={isMobileView ? 18 : 22}
                      height={isMobileView ? 18 : 22}
                      color={
                        iconHovered === 'twitter'
                          ? theme.palette.text.inverse
                          : theme.palette.text.primary
                      }
                    />
                  </RoundedIcon>
                </SocialIconsWrap>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SubscribeWrap>
    </SectionContainer>
  );
};
