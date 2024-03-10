import { useTranslation } from 'react-i18next';
import {
  RemindDetailsContainer,
  RemindDetailsHeader,
  RemindDetailsSubHeader,
  NormalText,
  DialogList,
  DialogListItem
} from './elements';
import { Dialog } from '../elements';
import {
  PrimaryButton,
  Spacer,
} from '~/components';
import { useRouter } from 'next/router';

export const RemindMissingDetailsDialog = ({
  user,
  open,
  handleClose,
}) => {
  const { t } = useTranslation();

  const router = useRouter();
  const { imageUrl, fullName, coverImageUrl, bio } = user;

  const handleGoToSettings = () => {
    router.push('/settings')
    handleClose();
  }

  return (
    (<Dialog open={open} onClose={handleClose} width="900px">
      <RemindDetailsContainer>
        <Spacer value={8} />
        <RemindDetailsHeader>{t("Setup your profile")}</RemindDetailsHeader>
        <Spacer value={16} />
        <RemindDetailsSubHeader textAlign="left">{t("Please setup your profile to create, apply and join Collabs.")}</RemindDetailsSubHeader>

        <Spacer value={32} />

        <RemindDetailsSubHeader textAlign="left">{t("Below information is mandatory to be filled:")}</RemindDetailsSubHeader>

        <DialogList>
          {!fullName && <DialogListItem>
            <NormalText textAlign='left'>{t("Full Name")}</NormalText>
          </DialogListItem>}
          {!imageUrl && <DialogListItem>
            <NormalText textAlign='left'>{t("Profile Image")}</NormalText>
          </DialogListItem>}
          {!coverImageUrl && <DialogListItem>
            <NormalText textAlign='left'>{t("Cover Photo")}</NormalText>
          </DialogListItem>}
          {!bio && <DialogListItem>
            <NormalText textAlign='left'>{t("Bio")}</NormalText>
          </DialogListItem>}
        </DialogList>

        <Spacer value={32} />

        <PrimaryButton
          width="200px"
          fontWeight={500}
          fontSize="16px"
          onClick={handleGoToSettings}
        >{t("Go to Settings")}</PrimaryButton>

        <Spacer value={8} />
      </RemindDetailsContainer>
    </Dialog>)
  );
};
