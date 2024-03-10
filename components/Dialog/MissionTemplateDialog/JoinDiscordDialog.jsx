import { useTranslation } from 'react-i18next';
import { PrimaryButton, OutlinedButton, Spacer, Spinner } from '~/components';
import {
  MissionTemplateContainer,
  MissionLabelKey,
  MissionLabelValue,
  AttributeSubContainer,
  TimeLineDotContainer,
  ButtonsContainer,
} from './elements';
import { CommonDetails } from './CommonDetails';
import { Dialog } from '../elements';
import { useStyles } from './elements';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { useTheme } from '@mui/styles';

import { openLinkInNewTab } from '~/utils';
import { ArrowRightUpLongIconStyled } from 'components/CollabDetails/CollabDetailsComponents/elements';

export const JoinDiscordDialog = ({
  missionDetails,
  submitMissionLoading,
  onSubmit,
  open,
  setOpen,
}) => {
  const { t } = useTranslation();

  const classes = useStyles();

  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(null);
      }}
      width="500px"
    >
      <MissionTemplateContainer>
        <CommonDetails missionDetails={missionDetails} />

        <AttributeSubContainer mt={2.5}>
          <MissionLabelKey>{t('Discord Server Invite URL')}</MissionLabelKey>

          <MissionLabelValue
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onClick={() =>
              openLinkInNewTab(missionDetails?.metadata?.discordServerLink)
            }
          >
            {missionDetails?.metadata?.discordServerLink || '-'}
            <ArrowRightUpLongIconStyled
              color={theme.palette.text.inverse}
              width={15}
              height={15}
            />
          </MissionLabelValue>
        </AttributeSubContainer>

        <MissionLabelKey mt={2.5}>
          {t('How to complete the mission ?')}
        </MissionLabelKey>

        <Spacer value={20} />

        <Timeline
          sx={{ px: '20px', pl: 0, py: '6px' }}
          className={classes.timeline}
        >
          {/* Item # 1 */}
          <TimelineItem>
            <TimelineSeparator>
              <TimeLineDotContainer>1</TimeLineDotContainer>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '2px', px: '10px' }}>
              <MissionLabelValue>
                {t(
                  'Join the mentioned discord server by clicking on the above\n                discord server invite link',
                )}
              </MissionLabelValue>
            </TimelineContent>
          </TimelineItem>

          {/* Item # 2 */}
          <TimelineItem>
            <TimelineSeparator>
              <TimeLineDotContainer>2</TimeLineDotContainer>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '2px', px: '10px' }}>
              <MissionLabelValue>
                {t(
                  'Marked the mission as complete by clicking on the Submit button',
                )}
              </MissionLabelValue>
            </TimelineContent>
          </TimelineItem>

          {/* Item # 3 */}
          <TimelineItem>
            <TimelineSeparator>
              <TimeLineDotContainer>3</TimeLineDotContainer>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '2px', px: '10px' }}>
              <MissionLabelValue>{t('Get rewards')}</MissionLabelValue>
            </TimelineContent>
          </TimelineItem>
        </Timeline>

        <ButtonsContainer>
          <OutlinedButton
            onClick={() => {
              setOpen(null);
            }}
            inverse
          >
            {t('Cancel')}
          </OutlinedButton>
          <PrimaryButton
            disabled={submitMissionLoading}
            onClick={() => onSubmit(null)}
            inverse
          >
            {!submitMissionLoading ? (
              'Submit'
            ) : (
              <Spinner size={12} color={theme.palette.background.inverse} />
            )}
          </PrimaryButton>
        </ButtonsContainer>
      </MissionTemplateContainer>
    </Dialog>
  );
};
