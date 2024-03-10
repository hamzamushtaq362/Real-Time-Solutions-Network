import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDialog } from 'redux/dialogSlice';
import { useTheme, Box } from '@mui/material';
import { Dialog, Spacer, PrimaryButton, OutlinedButton } from '~/components';
import {
  DialogContainer,
  DialogHeader,
  SubText,
  EventDetailsContainer,
  DetailsTextContainer,
  CollabPreviewContainer,
  CollabPreviewImage,
} from './elements';
import { twitterAuthorizeHandler } from './twitterAuth';

export const TwitterVerificationDialog = ({ collabDetails }) => {
  const { currentDialog } = useSelector((state) => state.dialog);

  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Dialog
      open={currentDialog === 'twitter-verification-dialog'}
      onClose={() => dispatch(setCurrentDialog(''))}
      width="640px"
    >
      <DialogContainer>
        <DialogHeader>Verify your identity</DialogHeader>

        <SubText>
          Please verify your identity with Twitter authentication of your
          official profile.
        </SubText>

        <Spacer value={100} />

        <EventDetailsContainer>
          <DetailsTextContainer flex={2}>
            <SubText>Event Name</SubText>
            <SubText color={theme.palette.text.primary}>
              Metaverse Space
            </SubText>
          </DetailsTextContainer>

          <DetailsTextContainer>
            <SubText>Role</SubText>
            <SubText color={theme.palette.text.primary}>Museum</SubText>
          </DetailsTextContainer>
        </EventDetailsContainer>

        <Spacer value={40} />

        <DetailsTextContainer>
          <SubText sx={{ alignSelf: 'flex' }}>Collab</SubText>
          <CollabPreviewContainer>
            {collabDetails?.images && collabDetails?.images.length > 0 && (
              <CollabPreviewImage
                src={collabDetails?.images[0]}
                alt="collab-preview"
              />
            )}

            <DetailsTextContainer>
              <SubText sx={{ marginTop: 1 }} color={theme.palette.text.primary}>
                {collabDetails?.title}
              </SubText>
            </DetailsTextContainer>
          </CollabPreviewContainer>
        </DetailsTextContainer>

        <Spacer value={80} />

        <Box
          sx={{
            display: 'flex',
            columnGap: '15px',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <OutlinedButton
            width={'160px'}
            onClick={() => {
              dispatch(setCurrentDialog(''));
            }}
          >
            Cancel
          </OutlinedButton>

          <PrimaryButton width={'160px'} onClick={twitterAuthorizeHandler}>
            Authorize
          </PrimaryButton>
        </Box>
      </DialogContainer>
    </Dialog>
  );
};
