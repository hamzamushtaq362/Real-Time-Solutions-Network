import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  PrimaryButton,
  OutlinedButton,
  Spacer,
  Spinner,
  Tooltip,
} from '~/components';
import {
  MissionTemplateContainer,
  MissionLabelKey,
  MissionLabelValue,
  AttributeSubContainer,
  TimeLineDotContainer,
  ButtonsContainer,
  CopyTextMainContainer,
} from './elements';
import { CommonDetails } from './CommonDetails';
import { Dialog } from '../elements';
import { useStyles } from './elements';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';

import { Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/styles';

import { UilCopy } from '@iconscout/react-unicons';

export const AddTwitterBioDialog = ({
  missionDetails,
  submitMissionLoading,
  onSubmit,
  open,
  setOpen,
}) => {
  const { t } = useTranslation();

  const classes = useStyles();

  const theme = useTheme();

  const [copiedTooltipDisabled, setCopiedTooltipDisabled] = useState(true);

  const copyToClipboard = () => {
    setCopiedTooltipDisabled(false);
    navigator.clipboard.writeText(missionDetails?.metadata?.twitterBio || '');
    setTimeout(() => {
      setCopiedTooltipDisabled(true);
    }, 2000);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        // dispatch(setCurrentDialog(''));
        setOpen(null);
      }}
      width="500px"
    >
      <MissionTemplateContainer>
        <CommonDetails missionDetails={missionDetails} />

        <AttributeSubContainer mt={2.5}>
          <MissionLabelKey>{t('Bio Text')}</MissionLabelKey>

          <CopyTextMainContainer>
            <Box flex={5}>
              <MissionLabelValue>
                {missionDetails?.metadata?.twitterBio || '-'}
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
                {t('Update your twitter profile bio with the copied text')}
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
                {t('Submit the mission and get rewards')}
              </MissionLabelValue>
            </TimelineContent>
          </TimelineItem>
        </Timeline>

        <ButtonsContainer>
          <OutlinedButton
            onClick={() => {
              // dispatch(setCurrentDialog(''));
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
