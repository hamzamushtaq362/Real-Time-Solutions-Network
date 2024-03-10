import { useTranslation } from 'react-i18next';
import { Spacer, NormalInput, PrimaryButton } from '~/components';

import { ReportCreatorDialogContainer, ButtonsContainer } from './elements';
import { DialogHeaderText, Dialog } from '../elements';
import { useDispatch } from 'react-redux';
import { setCurrentDialog } from '~/redux';

export const ReportCreatorDialog = ({ open, handleClose }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  return (
    (<Dialog open={open} onClose={handleClose} width="600px">
      <ReportCreatorDialogContainer>
        <DialogHeaderText>{t("Report Creator")}</DialogHeaderText>
        <Spacer value={30} />

        <NormalInput
          variant="outlined"
          borderRadius="8px"
          padding="15px"
          multiline
          rows={3}
          placeholder={t("Add additional details to report this user")}
        />

        <Spacer value={60} />

        <ButtonsContainer>
          <PrimaryButton
            width="120px"
            onClick={() => dispatch(setCurrentDialog(''))}
          >{t("Cancel")}</PrimaryButton>
          <PrimaryButton
            width="120px"
            onClick={() => dispatch(setCurrentDialog(''))}
          >{t("Submit")}</PrimaryButton>
        </ButtonsContainer>
      </ReportCreatorDialogContainer>
    </Dialog>)
  );
};
