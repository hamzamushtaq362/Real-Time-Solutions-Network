import { TopNavbar, Spacer, PrimaryButton } from '~/components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SubHeaderText, MainContainer, ContentContainer } from './elements';
import { useTranslation } from 'react-i18next';

export const FourOFour = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const navigateClickHandler = () => {
    router.push('/dashboard');
  };
  return (
    <>
      <TopNavbar />
      <MainContainer>
        <ContentContainer>
          <Image height={500} width={600} src="/404-not-found.png" />

          <SubHeaderText>{t('Oops! Page not found')}</SubHeaderText>

          <Spacer value={32} />

          <PrimaryButton onClick={navigateClickHandler} width="370px">
          {t('Back to Homepage')}
          </PrimaryButton>
        </ContentContainer>
      </MainContainer>
    </>
  );
};
