import {
  MissionTemplateHeader,
  MissionAttributesContainer,
  MissionLabelKey,
  MissionLabelValue,
  AttributeSubContainer,
} from './elements';
import { useTranslation } from 'react-i18next';
import { missionTypeMappings } from '~/constants';
import { getJoinedRewardableBadgesText } from '~/utils';

export const CommonDetails = ({ missionDetails }) => {
  const { t } = useTranslation();
  return (
    <>
      <MissionTemplateHeader>{t('Mission Details')}</MissionTemplateHeader>

      <MissionAttributesContainer mt={2.5}>
        <AttributeSubContainer>
          <MissionLabelKey>{t('Mission Type')}</MissionLabelKey>

          <MissionLabelValue>
            {missionTypeMappings[missionDetails?.missionType].text || '-'}
          </MissionLabelValue>
        </AttributeSubContainer>

        <AttributeSubContainer>
          <MissionLabelKey>{t('Rewards')}</MissionLabelKey>

          <MissionLabelValue>
            {getJoinedRewardableBadgesText(
              missionDetails?.rewardableBadges || [],
            )}
          </MissionLabelValue>
        </AttributeSubContainer>
      </MissionAttributesContainer>

      <AttributeSubContainer mt={2.5}>
        <MissionLabelKey>{t('Title')}</MissionLabelKey>

        <MissionLabelValue>{missionDetails?.title || '-'}</MissionLabelValue>
      </AttributeSubContainer>

      <AttributeSubContainer mt={2.5}>
        <MissionLabelKey>{t('Description')}</MissionLabelKey>

        <MissionLabelValue>
          {missionDetails?.description || '-'}
        </MissionLabelValue>
      </AttributeSubContainer>
    </>
  );
};
