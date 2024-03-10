import { Dialog } from '../elements';
import {
  SuccessDialogContainer,
  HeaderRow,
  MessageText,
  SuccessImage,
  LinkText,
} from './elements';

import { CongratsIcon } from '~/assets';
import { Spacer, PrimaryButton, Iconify } from '~/components';

import { IconButton, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

export const SuccessDialog = ({
  open,
  handleClose,
  message,
  buttonText,
  onClick,
  navigateTo,
  navigateToText,
}) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={handleClose} height="472px" width="472px">
      <SuccessDialogContainer>
        <HeaderRow>
          <IconButton
            onClick={handleClose}
            sx={{ backgroundColor: theme.palette.grey.normal1 }}
          >
            <Iconify icon="charm:cross" width={16} height={16} />
          </IconButton>
        </HeaderRow>

        <SuccessImage src={CongratsIcon.src} variant="square" />
        <Spacer value={32} />

        <MessageText>{message}</MessageText>

        {navigateTo && (
          <>
            <Spacer value={16} />
            <LinkText
              onClickCapture={onClick}
              onClick={() => router.push(navigateTo)}
            >
              {navigateToText}
            </LinkText>
          </>
        )}
        <Spacer value={24} />

        <PrimaryButton onClick={onClick} width="190px" height="48px">
          {buttonText}
        </PrimaryButton>
      </SuccessDialogContainer>
    </Dialog>
  );
};
