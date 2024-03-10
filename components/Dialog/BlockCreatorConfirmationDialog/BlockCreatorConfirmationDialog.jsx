import { useTranslation } from 'react-i18next';
import { Dialog } from '../elements';
import {
  BlockConfirmationDialogContainer,
  MessageText,
  BtnContainer,
} from './elements';
import { PrimaryButton } from '~/components';
import { useDispatch } from 'react-redux';
import { setCurrentDialog } from '~/redux';

export const BlockCreatorConfirmationDialog = ({ open, handleClose }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  return (
    (<Dialog open={open} onClose={handleClose} width="472px">
      <BlockConfirmationDialogContainer>
        <MessageText>
          {t("Are you sure you want to block this user from contacting you ?")}
        </MessageText>

        <BtnContainer>
          <PrimaryButton
            onClick={() => dispatch(setCurrentDialog(''))}
            width="190px"
            height="48px"
          >{t("Cancel")}</PrimaryButton>
          <PrimaryButton
            onClick={() => dispatch(setCurrentDialog(''))}
            width="210px"
            height="48px"
          >{t("Confirm")}</PrimaryButton>
        </BtnContainer>
      </BlockConfirmationDialogContainer>
    </Dialog>)
  );
};
