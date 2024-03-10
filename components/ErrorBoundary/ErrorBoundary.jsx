import { useTranslation } from 'react-i18next';
import {
  ErrorMainContainer,
  ErrorImage,
  HeaderText,
  SubHeaderText,
} from './elements';
import { TopNavbar, Spacer, PrimaryButton } from '~/components';
import { ERROR_PAGE_CACTUS_IMAGE } from '~/constants';
import { useRouter } from 'next/router';

export const ErrorBoundaryComponent = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const navigateClickHandler = () => {
    router.push('/dashboard');
    if (typeof window !== 'undefined') {
      window.location.reload(false);
    }
  };

  return (<>
    <ErrorMainContainer>
      <TopNavbar />
      <Spacer value={64} />
      <ErrorImage src={ERROR_PAGE_CACTUS_IMAGE} />

      <HeaderText>{t("Something went wrong!")}</HeaderText>
      <Spacer value={16} />

      <SubHeaderText>{t("So Sorry, but something is not right with the app right now.")}</SubHeaderText>
      <SubHeaderText>{t("We are working on this and")}{"we'll"}{t("be back soon")}</SubHeaderText>
      <Spacer value={32} />

      <PrimaryButton onClick={navigateClickHandler} width="370px">{t("Back to Homepage")}</PrimaryButton>
    </ErrorMainContainer>
  </>);
};
