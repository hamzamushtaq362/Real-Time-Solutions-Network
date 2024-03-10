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
import { getTweetIdFromLink } from '~/utils';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useTheme } from '@mui/styles';

import { openLinkInNewTab } from '~/utils';
import { ArrowRightUpLongIconStyled } from 'components/CollabDetails/CollabDetailsComponents/elements';

export const RetweetTweetDialog = ({
  missionDetails,
  submitMissionLoading,
  onSubmit,
  open,
  setOpen,
  isUserTwitterConnected,
  handleTwitterConnection,
}) => {
  const { t } = useTranslation();

  const classes = useStyles();

  const theme = useTheme();
  const isTwitterNotConnected = !isUserTwitterConnected;
  const buttonLabel = isTwitterNotConnected ? 'Click to Continue' : 'Submit';
  const buttonAction = isTwitterNotConnected
    ? handleTwitterConnection
    : () => onSubmit(null);
  const isButtonDisabled = isTwitterNotConnected ? false : submitMissionLoading;
  return (
    <Dialog
      open={open}
      onClose={() => {
        // dispatch(setCurrentDialog(''));
        setOpen(false);
      }}
      width="500px"
    >
      <MissionTemplateContainer>
        <CommonDetails missionDetails={missionDetails} />

        <AttributeSubContainer mt={2.5}>
          <MissionLabelKey>{t('Tweet Link')}</MissionLabelKey>

          <MissionLabelValue
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onClick={() =>
              openLinkInNewTab(missionDetails?.metadata?.retweetTweetLink)
            }
          >
            {missionDetails?.metadata?.retweetTweetLink || '-'}
            <ArrowRightUpLongIconStyled
              color={theme.palette.background.inverse}
              width={15}
              height={15}
            />
          </MissionLabelValue>
        </AttributeSubContainer>

        <TwitterTweetEmbed
          onLoad={function noRefCheck() {}}
          tweetId={getTweetIdFromLink(
            missionDetails?.metadata?.retweetTweetLink,
          )}
        />

        <Spacer value={20} />

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
                  'Click on the above tweet link to open the tweet in a new tab',
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
              <MissionLabelValue>{t('Retweet the tweet')}</MissionLabelValue>
            </TimelineContent>
          </TimelineItem>

          {/* Item # 3 */}
          <TimelineItem>
            <TimelineSeparator>
              <TimeLineDotContainer>3</TimeLineDotContainer>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '2px', px: '10px' }}>
              <MissionLabelValue>
                {t('Submit and get rewards')}
              </MissionLabelValue>
            </TimelineContent>
          </TimelineItem>
        </Timeline>

        <ButtonsContainer>
          <OutlinedButton
            onClick={() => {
              // dispatch(setCurrentDialog(''));
              setOpen(false);
            }}
            inverse
          >
            {t('Cancel')}
          </OutlinedButton>

          <PrimaryButton
            onClick={buttonAction}
            disabled={isButtonDisabled}
            inverse
          >
            {!submitMissionLoading ? (
              buttonLabel
            ) : (
              <Spinner size={12} color={theme.palette.background.inverse} />
            )}
          </PrimaryButton>
        </ButtonsContainer>
      </MissionTemplateContainer>
    </Dialog>
  );
};
