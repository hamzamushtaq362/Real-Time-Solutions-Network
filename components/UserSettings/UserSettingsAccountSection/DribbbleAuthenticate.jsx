import React, { useState } from 'react';
import {
  ConnectText, DialogContentWrap,
  InstructionContainer,
  InstructionHeader, InstructionStep,
  LogosWrap, NumberCount,
  RTSNText, StepText,
} from 'components/UserSettings/UserSettingsAccountSection/elements';
import { DribbbleText } from '~/assets';
import ArrowRightLongIcon from 'components/Icons/ArrowRightLongIcon';
import { Box, useTheme } from '@mui/material';
import { Divider } from '~/components';
import NewButton from 'components/Button/NewButton';
import { useNotistack } from '~/hooks';
import { DRIBBBLE_CLIENT_ID } from '~/constants';
import Image from 'next/image';

const DRIBBBLE_AUTH_URL = `https://dribbble.com/oauth/authorize?client_id=${DRIBBBLE_CLIENT_ID}`;

const DribbbleAuthenticate = ({getDribbbleUser, fetchDribbbleShots, loading: fetchLoading, dribbbleUser}) => {
  const theme = useTheme();
  const generateSnackbar = useNotistack();

  const [loading, setLoading] = useState(false);

  const handleAuthorization = async () => {
    try {
      if (dribbbleUser) {
        fetchDribbbleShots();
        return;
      }
      setLoading(true);
      window.open(DRIBBBLE_AUTH_URL);
      window.addEventListener(
        'message',
        async (event) => {
          if (event.data.message === 'Authorization Successful!') {
            generateSnackbar(
              'Successfully connected dribbble account',
              'success',
            );
            setLoading(false);
            fetchDribbbleShots();
            getDribbbleUser();
          }
        },
        false,
      );
    } catch (error) {
      setLoading(false);
    }
  }
  const getButtonState = () => {
    if (fetchLoading) {
      return 'Importing Shots ...';
    }
    if (loading){
      return 'Authorizing ...';
    }
    if (dribbbleUser) {
      return 'Import Shots';
    }
    return 'Authorize';
  }

  return (
    <DialogContentWrap>
      <LogosWrap>
        <Image
          width="100"
          height="55"
          alt="Dribbble Image"
          src={DribbbleText.src}
        />
        <ArrowRightLongIcon
          width={12}
          height={12}
          color={theme.palette.background.full}
          style={{
            margin: '0 20px',
          }}
        />
        <RTSNText>
          rtsn.
        </RTSNText>
      </LogosWrap>
      <Box mt={4}>
        <InstructionHeader>
          How Dribbble Import works
        </InstructionHeader>
        <InstructionContainer>
          <InstructionStep>
            <NumberCount>1</NumberCount>
            <StepText>Authorize your Dribbble account</StepText>
          </InstructionStep>
          <InstructionStep>
            <NumberCount>2</NumberCount>
            <StepText>Choose which Shots to import</StepText>
          </InstructionStep>
          <InstructionStep>
            <NumberCount>3</NumberCount>
            <StepText>Edit Details and Invite Collaborators</StepText>
          </InstructionStep>
        </InstructionContainer>
      </Box>
      <Divider color={theme.palette.borderLight} width='70%' />

      <ConnectText>
        Connect your Dribbble account to begin the Import process.
      </ConnectText>

      <NewButton
        width={300}
        onClick={handleAuthorization}
        disabled={loading || fetchLoading}
      >
        {getButtonState()}
      </NewButton>
    </DialogContentWrap>
  );
};

export default DribbbleAuthenticate;