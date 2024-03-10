import { useTranslation } from 'react-i18next';
import { Spacer, Iconify, ImageIconElement } from '~/components';
import { IconButton, useTheme } from '@mui/material';
import { Dialog } from '../elements';
import {
  BadgeDialogContainer,
  HeaderRow,
  MessageText,
  ConfirmButton,
  MessageHeader,
} from './elements';

export const BadgeDialog = ({
  open,
  handleClose,
  message,
  buttonText,
  onClick,
  dialogHeight,
  dialogWidth,
  badgeImage,
}) => {
  const { t } = useTranslation();

  const theme = useTheme();

  return (
    (<Dialog
      open={open}
      onClose={handleClose}
      height={dialogHeight ? dialogHeight : '326px'}
      width={dialogWidth ? dialogWidth : '491px'}
    >
      <BadgeDialogContainer>
        <HeaderRow>
          <IconButton
            onClick={handleClose}
            sx={{ backgroundColor: theme.palette.grey.normal1 }}
          >
            <Iconify icon="charm:cross" width={16} height={16} />
          </IconButton>
        </HeaderRow>

        <MessageHeader>{t("Congrats!")}</MessageHeader>

        <ImageIconElement
          borderRadius="100%"
          src={badgeImage}
          width="100px"
          height="100px"
          margin="0 auto"
          objectFit="contain"
        />
        {/* <Image src={BadgeIcon} alt="badgeIcon" /> */}

        <MessageText>{message}</MessageText>

        <Spacer value={24} />

        <ConfirmButton onClick={onClick} height="40px">
          {buttonText}
        </ConfirmButton>
      </BadgeDialogContainer>
    </Dialog>)
  );
};
