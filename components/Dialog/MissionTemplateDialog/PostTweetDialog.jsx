import { useTranslation } from 'react-i18next';
import {
  PrimaryButton,
  OutlinedButton,
  Spacer,
  Spinner,
  Tooltip,
  StyledInput,
} from '~/components';
import {
  MissionTemplateContainer,
  MissionLabelKey,
  MissionLabelValue,
  AttributeSubContainer,
  TimeLineDotContainer,
  ButtonsContainer,
  CopyTextMainContainer,
  InformationDescription,
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
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
import { UilCopy } from '@iconscout/react-unicons';
import { isValidURL } from '~/utils';

export const PostTweetDialog = ({
  missionDetails,
  submitMissionLoading,
  onSubmit,
  open,
  setOpen,
  isCollabBelongsToLoginUser,
  isAMember,
  isUserTwitterConnected,
  handleTwitterConnection,
}) => {
  const { t } = useTranslation();

  const [copiedTooltipDisabled, setCopiedTooltipDisabled] = useState(true);
  const [postedTweetLink, setPostedTweetLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const classes = useStyles();

  const theme = useTheme();

  const copyToClipboard = () => {
    setCopiedTooltipDisabled(false);
    navigator.clipboard.writeText(missionDetails?.metadata?.twitterBio || '');
    setTimeout(() => {
      setCopiedTooltipDisabled(true);
    }, 2000);
  };

  const handleSubmit = () => {
    if (!isCollabBelongsToLoginUser && !isAMember) {
      if (!postedTweetLink) {
        setErrorMessage('Please enter the tweet link');
        return;
      } else if (!isValidURL(postedTweetLink)) {
        setErrorMessage('Please enter a valid tweet link');
        return;
      } else {
        onSubmit({ postedTweetLink });
      }
    } else {
      setOpen(false);
    }
  };

  const disabled = isCollabBelongsToLoginUser || isAMember;
  const isTwitterNotConnected = !isUserTwitterConnected;
  const buttonLabel = isTwitterNotConnected ? 'Click to Continue' : 'Submit';
  const buttonAction = isTwitterNotConnected
    ? handleTwitterConnection
    : handleSubmit;
  const isButtonDisabled = isTwitterNotConnected ? false : submitMissionLoading;
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
          <MissionLabelKey>{t('Tweet Text')}</MissionLabelKey>

          <CopyTextMainContainer>
            <Box flex={5}>
              <MissionLabelValue>
                {missionDetails?.metadata?.tweetText || '-'}
              </MissionLabelValue>
            </Box>

            <Box
              flex={1}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Tooltip
                placement="top"
                arrow={true}
                disabled={copiedTooltipDisabled}
                title="Copied to Clipboard"
                leaveDelay={2000}
              >
                <IconButton onClick={copyToClipboard}>
                  <UilCopy size="20px" />
                </IconButton>
              </Tooltip>
            </Box>
          </CopyTextMainContainer>
        </AttributeSubContainer>

        <AttributeSubContainer mt={2.5}>
          <MissionLabelKey mb={1}>{t('Tweet Link')}</MissionLabelKey>
          <StyledInput
            onChange={(event) => {
              setErrorMessage('');
              setPostedTweetLink(event.target.value);
            }}
            placeholder="Enter tweet link"
          />

          {errorMessage && (
            <InformationDescription mt={0.5} type="error">
              {errorMessage}
            </InformationDescription>
          )}
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
                {t('Copy the above bio text')}
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
                {t('Tweet the above text with your twitter account')}
              </MissionLabelValue>
            </TimelineContent>
          </TimelineItem>

          {/* Item # 3 */}
          <TimelineItem>
            <TimelineSeparator>
              <TimeLineDotContainer>3</TimeLineDotContainer>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '2px', px: '10px' }}>
              <MissionLabelValue>
                {t(
                  'Enter the tweet link in the input field given above and submit',
                )}
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
          <Tooltip
            title={
              disabled && 'Collab Members  can not participate in Missions'
            }
          >
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
          </Tooltip>
        </ButtonsContainer>
      </MissionTemplateContainer>
    </Dialog>
  );
};
