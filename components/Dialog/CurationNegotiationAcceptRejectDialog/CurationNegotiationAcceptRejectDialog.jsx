import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Spacer, PrimaryButton, SecondaryButton, Spinner } from '~/components';
import {
  CuratorNegotiateDialogContainer,
  CurationFeesContainer,
  CurationFeeSubContainer,
  CurationFeeLabel,
  CurationFeeValue,
} from './elements';
import { DialogHeaderText, Dialog } from '../elements';
import { Box } from '@mui/material';

import { acceptRejectCollabAdminNegotiatedOffer } from '~/apis';
import { useNotistack } from '~/hooks';
import { useTheme } from '@mui/material';

export const CurationNegotiationAcceptRejectDialog = ({
  open,
  handleClose,
  curation,
  updatedFilteredCurationStatusOnNegotiation,
  onAcceptedCuration,
}) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const generateSnackbar = useNotistack();

  const acceptRejectNegotiatedOffer = async (status) => {
    if (status === 'ACCEPTED' || status === 'REJECTED') {
      try {
        setLoading(true);
        const response = await acceptRejectCollabAdminNegotiatedOffer(
          curation?._id,
          status,
        );

        if (response.status === 'success') {
          updatedFilteredCurationStatusOnNegotiation(curation?._id, status);
          onAcceptedCuration();
        }
        generateSnackbar(
          `${
            status === 'ACCEPTED' ? 'Accepted ' : 'Rejected'
          } negotiated offer by Collab Admin `,
          'success',
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        generateSnackbar('Something went wrong', 'error');
      }
    } else {
      generateSnackbar('Invalid Status value', 'info');
    }
  };

  return (
    (<Dialog open={open} onClose={handleClose} width="650px">
      <CuratorNegotiateDialogContainer>
        <DialogHeaderText>{t("NEGOTIATED BY COLLAB ADMIN")}</DialogHeaderText>

        <Spacer value={56} />

        <CurationFeesContainer>
          <CurationFeeSubContainer>
            <CurationFeeLabel>{t("Ask for Curation Fees")}</CurationFeeLabel>

            <CurationFeeValue>
              {curation?.curatorDemandedEarning}%
            </CurationFeeValue>
          </CurationFeeSubContainer>
          <CurationFeeSubContainer showBorderLeft>
            <CurationFeeLabel>{t("Negotiated Offer by Admin")}</CurationFeeLabel>
            <CurationFeeValue>
              {curation?.subsequentNegotiationEarning}%
            </CurationFeeValue>
          </CurationFeeSubContainer>
        </CurationFeesContainer>

        <Spacer value={32} />

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            columnGap: '10px',
            justifyContent: 'flex-end',
          }}
        >
          <PrimaryButton
            disabled={loading}
            width="150px"
            onClick={() => acceptRejectNegotiatedOffer('ACCEPTED')}
          >
            {loading ? (
              <Spinner color={theme.palette.background.default} size={15} />
            ) : (
              'Accept'
            )}
          </PrimaryButton>
          <SecondaryButton
            disabled={loading}
            width="150px"
            onClick={() => acceptRejectNegotiatedOffer('REJECTED')}
          >
            {loading ? (
              <Spinner color={theme.palette.background.default} size={15} />
            ) : (
              'Reject'
            )}
          </SecondaryButton>
        </Box>
      </CuratorNegotiateDialogContainer>
    </Dialog>)
  );
};
