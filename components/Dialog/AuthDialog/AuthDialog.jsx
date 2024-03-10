import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import {
  Dialog,
  DialogHeaderText,
  BottomDrawer,
  LogoText,
  Divider,
  AuthLabel,
  LabelWrap,
  SignupEmailInput,
  SmallSpinner,
} from '~/components';
import {
  AuthContentContainer,
  AuthLeftContainer,
  TopText,
  WelcomeTextHeading,
  AuthContainer,
} from './elements';
import { Box, useTheme } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  GoogleLoginComponent,
  MetamaskComponent,
  TermsConditions,
  WalletConnectComponent,
} from 'components/Onboard/Signup';
import { useRouter } from 'next/router';
import { setSessionData, useIsMobileView } from '~/utils';
import { magicLinkLogin } from 'components/Onboard/LoginProviders/magicLink';
import AppContext from 'context/AppContext';
import { useLocalStorage } from '~/hooks';
import { setCurrentDialog } from '~/redux';
import { useDispatch } from 'react-redux';
import { postAuthRedirector } from '~/utils';
import { LoginLeft } from '~/assets';
import Image from 'next/image';
import { StartButton } from 'components/Landing/Hero/elements';
import { FlexBox } from 'components/common/elements';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
});

export const AuthDialog = ({ open, handleClose, loginLoading }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const isMobileView = useIsMobileView();

  const { setUser } = useContext(AppContext);
  const [, setAuth] = useLocalStorage('auth');
  const referralCode = router.query.join;

  useEffect(() => {
    if (router.query.invite) {
      setSessionData('invite', router.query.invite);
    }
  }, [router.query]);

  const handleSignup = async () => {
    dispatch(setCurrentDialog(''));
    postAuthRedirector(router);
  };

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: { email: '' },
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);
  const handleSubmitEmail = async () => {
    const { email } = getValues();
    setLoading(true);
    await magicLinkLogin(email, referralCode, setUser, setAuth);
    setLoading(false);
    dispatch(setCurrentDialog(''));
    await handleSignup();
  };

  const _renderForm = () => {
    const { t } = useTranslation();

    return (
      <AuthContentContainer>
        <LogoText>{t('rtsn.')}</LogoText>
        <DialogHeaderText color={theme.palette.text.inverse}>
          {t('You can join rtsn. using one of the below sign up methods.')}
        </DialogHeaderText>
        <Box mt={5} mb={3}>
          <LabelWrap>
            <AuthLabel width={260}>{t('Sign up with Email')}</AuthLabel>
            <Divider color="rgba(108, 104, 104, 0.44)" />
          </LabelWrap>
          <Controller
            name="email"
            control={control}
            render={({ field, formState: { errors } }) => (
              <SignupEmailInput
                {...field}
                fullWidth
                placeholder="Email"
                error={!!errors?.email?.message}
                helperText={errors?.email?.message}
              />
            )}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <StartButton
            disabled={loading}
            width={200}
            height={50}
            marginTop={4}
            type="submit"
          >
            {loading ? <SmallSpinner inverse={true} /> : 'Join with Email'}
          </StartButton>
        </Box>

        <LabelWrap mt={4}>
          <AuthLabel width={290}>{t('Sign up with Socials')}</AuthLabel>
          <Divider color="rgba(108, 104, 104, 0.44)" />
        </LabelWrap>

        <GoogleLoginComponent
          onSignup={handleSignup}
          referralCode={referralCode}
          loginLoading={loginLoading}
        />

        <LabelWrap mt={3}>
          <AuthLabel width={280}>{t('Sign up with Wallet')}</AuthLabel>
          <Divider color="rgba(108, 104, 104, 0.44)" />
        </LabelWrap>

        <FlexBox>
          <MetamaskComponent
            onSignup={handleSignup}
            referralCode={referralCode}
          />
          <WalletConnectComponent
            onSignup={handleSignup}
            referralCode={referralCode}
          />
        </FlexBox>
      </AuthContentContainer>
    );
  };

  if (isMobileView) {
    return (
      <BottomDrawer open={open} handleClose={handleClose}>
        <Box p={1}>{_renderForm()}</Box>
      </BottomDrawer>
    );
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      width="70%"
      maxHeight={630}
      height="80vh"
    >
      <form
        onSubmit={handleSubmit(handleSubmitEmail)}
        style={{ height: '100%' }}
      >
        <AuthContainer>
          <Box flex={1} height="100%">
            <AuthLeftContainer>
              <Image
                src={LoginLeft.src}
                alt={t('Landing Header Background')}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                priority
                style={{ zIndex: 0, filter: 'brightness(60%)' }}
              />
              <TopText>{t('rtsn.')}</TopText>
              <Box mt="-30%" zIndex={1}>
                <WelcomeTextHeading>Ready to</WelcomeTextHeading>
                <WelcomeTextHeading>
                  Unleash your Creative Potential?
                </WelcomeTextHeading>
              </Box>
              <Box zIndex={1}>
                <>
                  <TermsConditions />
                </>
              </Box>
            </AuthLeftContainer>
          </Box>
          <Box flex={1} height="100%">
            {_renderForm()}
          </Box>
        </AuthContainer>
      </form>
    </Dialog>
  );
};
