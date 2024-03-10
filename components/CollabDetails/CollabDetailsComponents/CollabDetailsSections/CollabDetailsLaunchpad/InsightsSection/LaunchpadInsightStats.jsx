import { useTranslation } from 'react-i18next';
import React from 'react';
// import { StatsContainer } from './elements';
import { StatBox } from '~/components';
import { StatsContainer } from '../../CollabDetailsApplicants/elements';

export default function LaunchpadInsightStats({
  discordCount,
  twitterCount,
  RtsnSubsCount,
  isLoading,
}) {
  const { t } = useTranslation();

  return (
    (<div>
      <StatsContainer>
        <StatBox
          showBorderRight
          title={`${discordCount || 0}`}
          subTitle={t("Discord Subscribers")}
          isLoading={isLoading}
        />
        <StatBox
          showBorderRight
          title={`${twitterCount || 0}`}
          subTitle={t("Twitter Subscribers")}
          isLoading={isLoading}
        />
        <StatBox
          showBorderRight
          title={`${RtsnSubsCount.count || 0}`}
          subTitle={t("RTSN Subscribers")}
          isLoading={isLoading}
        />
      </StatsContainer>
    </div>)
  );
}
