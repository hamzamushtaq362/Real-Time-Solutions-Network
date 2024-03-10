import { useTranslation } from 'react-i18next';
import { CurationsStatusContainer } from './elements';
import { StatBox } from '~/components';

export const CurationsStatsSection = ({
  curatorDetails,
  curatorDetailsLoading,
}) => {
  const { t } = useTranslation();

  return (
    (<CurationsStatusContainer>
      <StatBox
        isLoading={curatorDetailsLoading}
        showBorderRight
        title={`${curatorDetails?.allCurationEarnings || 0}`}
        subTitle={t("Curation Earnings")}
      />
      <StatBox
        isLoading={curatorDetailsLoading}
        showBorderRight
        title={`${curatorDetails?.acceptedCurations || 0}`}
        subTitle={t("Accepted Curations")}
      />
      <StatBox
        isLoading={curatorDetailsLoading}
        title={`${curatorDetails?.totalCurations || 0}`}
        subTitle={t("Total Curations")}
      />
    </CurationsStatusContainer>)
  );
};
