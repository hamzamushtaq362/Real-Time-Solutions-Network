import React, {useState} from 'react';
import { Dialog, Divider, PrimaryButton, StyledInput } from '~/components';
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DialogHeading, DialogLabel } from 'components/UserSettings/elements';
import { emailCheckUsingMagicAuth } from 'components/Onboard/LoginProviders/magicLink';
import { isValidEmail } from 'utils/utils';
import ArrowRightIcon from 'components/Icons/ArrowRightIcon';
import { useNotistack } from '~/hooks';
import axios from 'axios';
import { BASE_URL } from '~/apis';
import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';

export const EmailUpdateDialog = ({open, onClose, onSuccess, currentEmail}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const generateSnackbar = useNotistack();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [loginBtnText, setLoginBtnText] = useState(t('Send Login Code'));

  const sendCode = async () => {
    try {
      setLoading(true);
      setLoginBtnText('Sending ...');

      if (email) {
        const verifyStatus = await emailCheckUsingMagicAuth(email, setLoginBtnText);
        if (verifyStatus) {
          await onSaveDetails();
          generateSnackbar(t('Email updated successfully'), t('success'));
          onClose();
          onSuccess(email)
          setEmail('')
        }
      }
      setLoading(false);
    } catch (error) {
      generateSnackbar(t('An error occurred, please try again'), 'error');
      setLoading(false);
    }
  };
  const onSaveDetails = async () => {
    try {
      const f1 = async () => {
        return await axios.patch(`${BASE_URL}/user`, { email });
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res) {
      }
    } catch (err) {
        generateSnackbar(
        err?.response?.data?.message ?? 'Oops! Something went wrong. Please try again.',
        'error',
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      width='450px'
    >
      <DialogHeading>
        Update Email
      </DialogHeading>
      <Divider color={theme.palette.borderLight} strokeWidth='0.5px' margin={0} />
      <DialogLabel>
        Enter your new email
      </DialogLabel>
      <Box px='28px' mb='28px' width='100%'>
        <StyledInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('Email')}
          height={42}
        />
        <PrimaryButton
          onClick={sendCode}
          restrictHoverStyles
          marginTop={40}
          disabled={!isValidEmail(email) || currentEmail === email}
          width={170}
          height={34}
          translate='none'
          borderRadius={6}
          padding={0}
          fontSize={14}
          fontFamily='Inter, sans-serif'
          letterSpacing='-0.4px'
        >
          {t(loginBtnText)}

          {!loading &&
            <Box ml={1}>
            <ArrowRightIcon
              width={16}
              height={16}
              color={theme.palette.text.inverse}
              display='flex'
            />
          </Box>}
        </PrimaryButton>
      </Box>
    </Dialog>
  );
};
