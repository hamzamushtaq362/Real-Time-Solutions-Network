import { useTranslation } from 'react-i18next';
import { StatsContainer } from './elements';
import { StatBox } from '~/components';

export const CollabDetailsApplicantsStatsSection = ({
  totalApplicants,
  acceptedApplicants,
  pendingApplicants,
  deniedApplicants,
  applicantsLoading,
  applicantsStatsLoading,
}) => {
  const { t } = useTranslation();

  return (
    (<StatsContainer>
      <StatBox
        showBorderRight
        title={`${totalApplicants || 0}`}
        subTitle={t("Total Applicants")}
        isLoading={applicantsLoading || applicantsStatsLoading}
      />
      <StatBox
        showBorderRight
        title={`${acceptedApplicants || 0}`}
        subTitle="Accepted"
        isLoading={applicantsLoading || applicantsStatsLoading}
      />
      <StatBox
        showBorderRight
        title={`${pendingApplicants || 0}`}
        subTitle={t("Pending for Acceptance")}
        isLoading={applicantsLoading || applicantsStatsLoading}
      />
      <StatBox
        title={`${deniedApplicants || 0}`}
        subTitle="Rejected"
        isLoading={applicantsLoading || applicantsStatsLoading}
      />
    </StatsContainer>)
  );
};
