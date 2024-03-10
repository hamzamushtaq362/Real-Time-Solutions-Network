import { useTranslation } from 'react-i18next';
import { NoResultsFoundContainer, NoResultsText } from './elements';

export const NoResultsComponent = () => {
  const { t } = useTranslation();

  return (
    (<NoResultsFoundContainer>
      <NoResultsText>{t("No Results found")}</NoResultsText>
    </NoResultsFoundContainer>)
  );
};
