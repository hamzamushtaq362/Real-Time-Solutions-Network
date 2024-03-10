import { Spacer, StyledInput, StyledTextArea } from '~/components';
import { Box } from '@mui/material';
import { Dialog } from '../elements';
import {
  ConfirmDialogContainer,
  HeaderRow,
  ConfirmButton,
  MessageHeader,
  AvatarRow,
  AvatarHeader,
  AvatarBody,
  TitleRow,
  BodyRow,
  TitleHeader,
  DescriptionRow,
  AvatarContainer,
  ConfirmButtonContainer,
} from './elements';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const CollabRequestDialog = ({
  open,
  handleClose,
  buttonText,
  dialogHeight,
  dialogWidth,
  header,
  avatar,
  requestTitle,
  requestDescription,
  setRequestTitle,
  setRequestDescription,
  sendCollabRequest,
  user,
}) => {
  const [auth] = useLocalStorage('auth');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      height={dialogHeight ? dialogHeight : '640px'}
      width={dialogWidth ? dialogWidth : '794px'}
    >
      <ConfirmDialogContainer>
        <HeaderRow>
          <MessageHeader>{header}</MessageHeader>
        </HeaderRow>

        <AvatarRow>
          <AvatarContainer backgroundImage={user?.imageUrl || avatar} />
          <AvatarContainer
            backgroundImage={auth?.imageUrl || avatar}
            marginLeft={'6px'}
          />
          <Box
            sx={{
              height: '64px',
              width: '350px',
              marginLeft: '10px',
            }}
          >
            <AvatarHeader>{`Work with ${
              user?.fullName || user?.username
            }`}</AvatarHeader>
            <AvatarBody>
              {`Share details of your collaboration idea with ${
                user?.fullName || user?.username
              }. Be as
              detailed as possible to increase the chances of your request
              getting responded to.`}
            </AvatarBody>
          </Box>
        </AvatarRow>

        <BodyRow>
          <TitleRow>
            <Box sx={{ width: '100%' }}>
              <TitleHeader>Collab Title</TitleHeader>
              <StyledInput
                sx={{ width: '100%', marginTop: '8px' }}
                value={requestTitle}
                onChange={(e) => setRequestTitle(e.target.value)}
                fullWidth
                height={'36px'}
                padding={'8px 12px 8px 12px'}
                borderRadius={'6px'}
                placeholder="Give a unique name to your future Collab"
              />
            </Box>
          </TitleRow>

          <DescriptionRow>
            <TitleHeader>Description</TitleHeader>
            <StyledTextArea
              sx={{ marginTop: '8px' }}
              rows={6}
              value={requestDescription}
              onChange={(e) => setRequestDescription(e.target.value)}
            />
          </DescriptionRow>

          <Spacer value={60} />

          <ConfirmButtonContainer>
            <ConfirmButton onClick={sendCollabRequest} height="32px">
              {buttonText}
            </ConfirmButton>
          </ConfirmButtonContainer>
        </BodyRow>
      </ConfirmDialogContainer>
    </Dialog>
  );
};
