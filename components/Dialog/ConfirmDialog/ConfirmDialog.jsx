import { Spacer, Iconify } from '~/components';
import { IconButton, useTheme } from '@mui/material';
import { Dialog } from '../elements';
import {
  ConfirmDialogContainer,
  HeaderRow,
  MessageText,
  ConfirmButton,
} from './elements';

export const ConfirmDialog = ({
  open,
  handleClose,
  message,
  buttonText,
  onClick,
  dialogHeight,
  dialogWidth,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      height={dialogHeight ? dialogHeight : '210px'}
      width={dialogWidth ? dialogWidth : '330px'}
    >
      <ConfirmDialogContainer>
        <HeaderRow>
          <IconButton
            onClick={handleClose}
            sx={{ backgroundColor: theme.palette.grey.normal1 }}
          >
            <Iconify icon="charm:cross" width={16} height={16} />
          </IconButton>
        </HeaderRow>

        <MessageText>{message}</MessageText>

        <Spacer value={24} />

        <ConfirmButton onClick={onClick} height="40px">
          {buttonText}
        </ConfirmButton>
      </ConfirmDialogContainer>
    </Dialog>
  );
};
