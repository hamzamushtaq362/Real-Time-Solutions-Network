import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import { Circle, InfoSection, InfoTitle, RightPaneLabel } from './elements';
import { Spacer, Spinner, SmallSpinner } from '~/components';
import AppContext from 'context/AppContext';
import { CollabOfferDetailsContainer } from './elements';

import { COLLAB_SOURCE } from 'constants/collab';
import NewButton from 'components/Button/NewButton';
import SecondaryButton from 'components/Button/SecondaryButton';

export const CollabOfferDetails = ({
  collabAssociationDetails,
  acceptOrRejectInvite,
  setShowChooseWallet,
  loadingAccept,
  loadingReject,
  // negotiateInvite,
  collabSource,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { user } = useContext(AppContext);

  return (
    <>
      {collabAssociationDetails?.status === 'PENDING' &&
        collabAssociationDetails?.isInvite && (
          <>
            <InfoSection>
              <Circle
                width={10}
                height={10}
                fill={theme.palette.text.primary}
              />
              <InfoTitle>{t('Your Invite')}</InfoTitle>
            </InfoSection>
            <CollabOfferDetailsContainer>
              <Box sx={{ width: '100%' }}>
                <RightPaneLabel>
                  {collabSource === COLLAB_SOURCE.internal
                    ? t('You have been invited by ') +
                      collabAssociationDetails?.senderId?.fullName +
                      t(' the Collab Author, to be a part of the ') +
                      collabAssociationDetails?.collabId?.title
                    : t('Were you part of this collab ?')}
                </RightPaneLabel>

                {/* Start: Please do not remove the following code */}

                {/* {collabAssociationDetails?.memberNegotiation && (
              <>
                <SideDetailsLabelValue
                  label={t('Negotiated Terms')}
                  variant="small"
                  value={` ${
                    collabAssociationDetails?.memberNegotiation?.amount
                  }  ${
                    collabAssociationDetails?.memberNegotiation?.paymentMode ===
                    COLLAB_PAYMENT_MODE.RevenueSharing
                      ? '%'
                      : collabAssociationDetails?.memberNegotiation?.paymentType
                  }`}
                />
              </>
            )} */}

                {/* Ends */}

                <Spacer value={20} />

                {/* Offer Details End */}

                <Grid container spacing={2}>
                  <Grid item sm={8} xs={12}>
                    <NewButton
                      width={'100%'}
                      onClick={() => {
                        if (user && user?.addresses?.length > 1) {
                          setShowChooseWallet(true);
                        } else {
                          acceptOrRejectInvite(
                            collabAssociationDetails?._id,
                            'accept',
                          );
                        }
                      }}
                      disabled={loadingAccept || loadingReject}
                    >
                      {loadingAccept ? (
                        <SmallSpinner inverse={true} />
                      ) : (
                        `Yes, Accept ${
                          collabAssociationDetails.memberNegotiation
                            ? 'Original Offer'
                            : 'Invitation'
                        }`
                      )}
                    </NewButton>
                  </Grid>

                  <Grid item sm={4} xs={12}>
                    <SecondaryButton
                      disabled={loadingAccept || loadingReject}
                      width={'100%'}
                      onClick={() => {
                        acceptOrRejectInvite(
                          collabAssociationDetails?._id,
                          'reject',
                        );
                      }}
                    >
                      {loadingReject ? (
                        <Spinner size="20px" />
                      ) : (
                        `Decline ${
                          collabAssociationDetails.memberNegotiation
                            ? 'Original Offer'
                            : ''
                        }`
                      )}
                    </SecondaryButton>
                  </Grid>
                </Grid>

                {/* Start: Please do not remove the following code */}

                {/* {collabSource === COLLAB_SOURCE.internal && (
              <Box mt={1}>
                <OutlinedButton
                  width="100%" // Set the width to 100% if memberNegotiation is true
                  disabled={loadingAccept || loadingReject}
                  onClick={negotiateInvite}
                >
                  {loadingReject ? (
                    <Spinner size="20px" />
                  ) : (
                    `${
                      !collabAssociationDetails?.memberNegotiated
                        ? 'Negotiate'
                        : 'Renegotiate'
                    }`
                  )}
                </OutlinedButton>
              </Box>
            )} */}

                {/* Ends */}
              </Box>
            </CollabOfferDetailsContainer>
          </>
        )}
    </>
  );
};
