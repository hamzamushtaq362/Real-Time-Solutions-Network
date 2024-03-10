import { useTranslation } from 'react-i18next';
import { Dialog } from '../elements';
import {
  SuccessDialogContainer,
  MessageText,
} from './elements';

import { Tickblack } from '~/assets';
import { PrimaryButton, ImageIconElement } from '~/components';

import { useRouter } from 'next/router';
import { Spacer } from '~/components';
import { BtnContainer } from 'components/Dialog/BlockCreatorConfirmationDialog/elements';

export const SuccessDialogNew = ({
  open,
  handleClose,
  message1,
  message2,
  collectiveLink,
  successDialogType,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (<>
    {successDialogType === 'collective' && (
      <Dialog open={open} onClose={handleClose} height="450px" width="472px">
        <SuccessDialogContainer>
          <ImageIconElement size={'5rem'} src={Tickblack.src} />
          <MessageText>
            {message1 ? message1 : 'You have Successfully Created Team'}
          </MessageText>
          <MessageText>
            {message2
              ? message2
              : 'Now you can add your collabs to collective page and member will together work on collabs'}
          </MessageText>

          <BtnContainer>
            <PrimaryButton
              onClick={() => {
                router.push(`/team/${collectiveLink}`);
              }}
              width="190px"
              height="48px"
            >{t("View Profile")}</PrimaryButton>
            <PrimaryButton
              onClick={() => {
                router.push(`/team/${collectiveLink}/project/create`);
              }}
              width="210px"
              height="48px"
            >{t("Add Collabs in Team")}</PrimaryButton>
          </BtnContainer>
        </SuccessDialogContainer>
      </Dialog>
    )}
    {successDialogType == 'collectiveInvite' && (
      <Dialog open={open} onClose={handleClose} height="200px" width="472px">
        <SuccessDialogContainer>
          <ImageIconElement size={'5rem'} src={Tickblack.src} />
          <Spacer value={20} />
          <MessageText>{t("Invitation Sent Successfully")}</MessageText>
        </SuccessDialogContainer>
      </Dialog>
    )}
  </>);
};
