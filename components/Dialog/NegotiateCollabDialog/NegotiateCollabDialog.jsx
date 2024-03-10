import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import {
  AvatarHeaderText,
  DetailsLabelKey,
  DetailsLabelValue,
} from './elements';
import { Dialog, DialogHeaderText } from '../elements';
import { Box, useTheme } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '~/apis';
import {
  fetchRefreshToken,
  reFetchTokenExpire,
  setCurrentDialog,
} from '~/redux';
import { useNotistack } from '~/hooks';
import { useDispatch } from 'react-redux';
import { COLLAB_PAYMENT_TYPES, COLLAB_PAYMENT_MODE } from '~/constants';
import {
  Spacer,
  PrimaryButton,
  NormalInput,
  Divider,
  Dropdown,
} from '~/components';

export const NegotiateCollabDialog = ({
  id,
  open,
  handleClose,
  getSentInvites,
  setCollabAssociationDetails,
  memberRoleDetails,
  selectedWalletForCollab,
}) => {
  const { t } = useTranslation();

  const [compensationMethod, setCompensationMethod] = useState(
    COLLAB_PAYMENT_MODE.NoPayment,
  );
  const [compensationType, setCompensationType] = useState(
    COLLAB_PAYMENT_TYPES.ETH,
  );
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSnackbar = useNotistack();
  const dispatch = useDispatch();
  const theme = useTheme();

  const sendUpdateTerms = async () => {
    try {
      setLoading(true);
      const f1 = async () => {
        const res = await axios.patch(`${BASE_URL}/api/v1/collabmember`, {
          id,
          memberNegotiation: {
            paymentMode: compensationMethod,
            paymentType: compensationType,
            amount,
            skill: memberRoleDetails?.skill,
          },
          selectedWalletForCollab,
        });
        if (res) return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        setLoading(false);

        // Options side effects
        if (getSentInvites) {
          getSentInvites('received');
        }

        if (setCollabAssociationDetails) {
          setCollabAssociationDetails(res.data.data.member);
        }
        generateSnackbar('Successfully updated negotiation terms!', 'success');
        dispatch(setCurrentDialog(''));
      }
    } catch (error) {
      setLoading(false);
      generateSnackbar('Something went wrong!', 'error');
      dispatch(setCurrentDialog(''));
    }
  };

  useEffect(() => {
    if (memberRoleDetails) {
      const { paymentMode, paymentType, amount } = memberRoleDetails;
      if (paymentMode) setCompensationMethod(paymentMode);
      if (paymentType) setCompensationType(paymentType);
      if (amount) setAmount(amount);
    }
  }, [memberRoleDetails]);

  return (
    (<Dialog open={open} onClose={handleClose} width="400px">
      <Box
        width="400px"
        padding={'30px'}
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        <DialogHeaderText>{t("Negotiation")}</DialogHeaderText>
        <Spacer value={24} />
        <Divider />
        <Spacer value={32} />

        <AvatarHeaderText>{t("Compensation Details")}</AvatarHeaderText>
        <Spacer value={24} />

        <DetailsLabelKey>{t("Role")}</DetailsLabelKey>
        <DetailsLabelValue>{memberRoleDetails?.skill}</DetailsLabelValue>

        <Spacer value={30} />

        <DetailsLabelKey mb={1}>{t("Payment Mode")}</DetailsLabelKey>
        <Dropdown
          selectedItem={compensationMethod}
          setSelectedItem={(value) => {
            setCompensationMethod(value);
            setAmount('');
          }}
          options={Object.values(COLLAB_PAYMENT_MODE)}
          width="100%"
        />

        <Spacer value={32} />

        {compensationMethod !== COLLAB_PAYMENT_MODE.NoPayment && (
          <>
            {compensationMethod !== COLLAB_PAYMENT_MODE.RevenueSharing && (
              <>
                <DetailsLabelKey mb={1}>{t("Payment Type")}</DetailsLabelKey>

                <Dropdown
                  selectedItem={compensationType}
                  setSelectedItem={(value) => {
                    setCompensationType(value);
                    setAmount('');
                  }}
                  options={Object.keys(COLLAB_PAYMENT_TYPES)}
                  width="100%"
                />
              </>
            )}

            <Spacer value={32} />

            <DetailsLabelKey mb={1}>
              {compensationMethod === COLLAB_PAYMENT_MODE.RevenueSharing
                ? COLLAB_PAYMENT_MODE.RevenueSharing
                : 'Amount'}
            </DetailsLabelKey>
            <NormalInput
              variant="outlined"
              padding="15px"
              type="number"
              placeholder={
                compensationMethod === COLLAB_PAYMENT_MODE.RevenueSharing
                  ? '%'
                  : 'Amount'
              }
              name={'amount'}
              value={
                compensationMethod === COLLAB_PAYMENT_MODE.RevenueSharing
                  ? amount * 1 >= 0 && amount <= 99
                    ? amount * 1
                    : 0
                  : amount
              }
              pattern={'[0-99]'}
              handleChange={(e) => setAmount(e.target.value)}
            />
          </>
        )}

        <Spacer value={32} />

        <PrimaryButton
          disabled={
            loading || compensationMethod === COLLAB_PAYMENT_MODE.RevenueSharing
              ? amount >= 100
              : false
          }
          onClick={() => sendUpdateTerms()}
        >
          {loading ? 'Sending updated terms' : 'Send updated terms'}
        </PrimaryButton>
      </Box>
    </Dialog>)
  );
};
