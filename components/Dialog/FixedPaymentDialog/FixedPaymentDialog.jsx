import { useTranslation } from 'react-i18next';
import { Dialog } from '../elements';
import {
  FixedPaymentDialogContainer,
  HeaderRow,
  MessageText,
  HeaderText,
} from './elements';
import { PrimaryButton } from '~/components';

export const FixedPaymentDialog = ({ open, handleClose }) => {
  const { t } = useTranslation();

  return (
    (<Dialog open={open} onClose={handleClose} height="240px" width="500px">
      <FixedPaymentDialogContainer>
        <HeaderRow>
          <HeaderText>{t("Fixed Crypto Payments")}</HeaderText>
        </HeaderRow>

        <MessageText>{t(
          "This value is an indicator of how much you are willing to pay to the\n          co-creator for participating in the Collab. The transaction needs to\n          initiated by you and completed by you and the co-creator without any\n          intervention of RTSN."
        )}</MessageText>

        <PrimaryButton onClick={handleClose}>{t("I agree")}</PrimaryButton>
      </FixedPaymentDialogContainer>
    </Dialog>)
  );
};
