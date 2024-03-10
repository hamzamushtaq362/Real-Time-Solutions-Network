import { useTranslation } from 'react-i18next';
import { StatBox } from '~/components';
import { StatsContainer } from 'components/CollabDetails/CollabDetailsComponents/CollabDetailsSections/CollabDetailsApplicants/elements';

export const CuratorsStatsSection = ({
  totalPercentForCurators,
  usedPercentForCurators,
}) => {
  const { t } = useTranslation();

  return (
    (<StatsContainer>
      <StatBox
        showBorderRight
        title={`${totalPercentForCurators || 0}%`}
        subTitle={t("Total Percentage for Curators")}
      />
      <StatBox
        showBorderRight
        title={`${usedPercentForCurators || 0}%`}
        subTitle={t("Used Percentage for Curators")}
      />
      <StatBox
        title={`${totalPercentForCurators - usedPercentForCurators || 0}%`}
        subTitle={t("Available Percentage for Curators")}
      />
    </StatsContainer>)
  );
};
