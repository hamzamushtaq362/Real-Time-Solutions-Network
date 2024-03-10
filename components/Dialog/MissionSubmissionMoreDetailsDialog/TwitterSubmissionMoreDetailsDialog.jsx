import { useTranslation } from 'react-i18next';
import { PrimaryButton, Spacer } from '~/components';
import {
  MoreDetailsContainer,
  MissionLabelKey,
  MissionLabelValue,
  AttributeSubContainer,
  ButtonsContainer,
  DialogHeader,
  MissionAttributesContainer,
} from './elements';
import { Dialog } from '../elements';
import { useTheme } from '@mui/material';
import { ArrowRightUpLongIconStyled } from 'components/CollabDetails/CollabDetailsComponents/elements';
import { openLinkInNewTab, getTweetIdFromLink } from 'utils/utils';
import { TwitterTweetEmbed } from 'react-twitter-embed';

export const TwitterSubmissionMoreDetailsDialog = ({
  submissionDetails,
  open,
  setOpen,
}) => {
  const { t } = useTranslation();

  const theme = useTheme();

  return (
    <Dialog open={open} onClose={() => setOpen(null)} width="500px">
      <MoreDetailsContainer>
        <DialogHeader>{t('Submission Details')}</DialogHeader>

        <MissionAttributesContainer mt={2.5}>
          <AttributeSubContainer>
            <MissionLabelKey>{t('User Twitter Handle')}</MissionLabelKey>

            <MissionLabelValue>
              @{submissionDetails?.metadata?.userName}
            </MissionLabelValue>
          </AttributeSubContainer>

          <AttributeSubContainer>
            <MissionLabelKey>{t('User Twitter Name')}</MissionLabelKey>

            <MissionLabelValue>
              {submissionDetails?.metadata?.userFullName}
            </MissionLabelValue>
          </AttributeSubContainer>
        </MissionAttributesContainer>

        <AttributeSubContainer mt={2.5}>
          <MissionLabelKey>{t('User Twitter Profile')}</MissionLabelKey>

          <MissionLabelValue
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              openLinkInNewTab(submissionDetails?.metadata?.userProfile)
            }
          >
            {submissionDetails?.metadata?.userProfile || '-'}

            <ArrowRightUpLongIconStyled
              color={theme.palette.background.inverse}
              width={15}
              height={15}
            />
          </MissionLabelValue>
        </AttributeSubContainer>

        {submissionDetails?.mission?.missionType === 'post-tweet' && (
          <AttributeSubContainer mt={2.5}>
            <MissionLabelKey>{t('Posted Tweet')}</MissionLabelKey>

            <MissionLabelValue
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                openLinkInNewTab(submissionDetails?.metadata?.postedTweetLink)
              }
            >
              {submissionDetails?.metadata?.postedTweetLink || '-'}

              <ArrowRightUpLongIconStyled
                color={theme.palette.background.inverse}
                width={15}
                height={15}
              />
            </MissionLabelValue>
            <TwitterTweetEmbed
              tweetId={getTweetIdFromLink(
                submissionDetails?.metadata?.postedTweetLink,
              )}
            />
          </AttributeSubContainer>
        )}

        {submissionDetails?.mission?.missionType === 'retweet-tweet' && (
          <AttributeSubContainer mt={2.5}>
            <MissionLabelKey>{t('Tweet Link for retweet')}</MissionLabelKey>

            <MissionLabelValue
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                openLinkInNewTab(
                  submissionDetails?.mission?.metadata?.retweetTweetLink,
                )
              }
            >
              {submissionDetails?.mission?.metadata?.retweetTweetLink || '-'}

              <ArrowRightUpLongIconStyled
                color={theme.palette.background.inverse}
                width={15}
                height={15}
              />
            </MissionLabelValue>

            <TwitterTweetEmbed
              tweetId={getTweetIdFromLink(
                submissionDetails?.metadata?.retweetTweetLink,
              )}
            />
          </AttributeSubContainer>
        )}

        {submissionDetails?.mission?.missionType === 'like-tweet' && (
          <AttributeSubContainer mt={2.5}>
            <MissionLabelKey>{t('Tweet Link to be like')}</MissionLabelKey>

            <MissionLabelValue
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                openLinkInNewTab(
                  submissionDetails?.mission?.metadata?.likeTweetLink,
                )
              }
            >
              {submissionDetails?.mission?.metadata?.likeTweetLink || '-'}

              <ArrowRightUpLongIconStyled
                color={theme.palette.background.inverse}
                width={15}
                height={15}
              />
            </MissionLabelValue>

            <TwitterTweetEmbed
              tweetId={getTweetIdFromLink(
                submissionDetails?.metadata?.likeTweetLink,
              )}
            />
          </AttributeSubContainer>
        )}

        {submissionDetails?.mission?.missionType === 'add-twitter-bio' && (
          <AttributeSubContainer mt={2.5}>
            <MissionLabelKey>{t('Bio')}</MissionLabelKey>

            <MissionLabelValue
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                openLinkInNewTab(
                  submissionDetails?.mission?.metadata?.twitterBio,
                )
              }
            >
              {submissionDetails?.mission?.metadata?.twitterBio || '-'}

              <ArrowRightUpLongIconStyled
                color={theme.palette.background.inverse}
                width={15}
                height={15}
              />
            </MissionLabelValue>
          </AttributeSubContainer>
        )}

        {/* <TwitterTweetEmbed tweetId={'1691132663531294725'} /> */}

        <Spacer value={20} />

        <ButtonsContainer>
          <PrimaryButton width="150px" onClick={() => setOpen(null)} inverse>
            Done
          </PrimaryButton>
        </ButtonsContainer>
      </MoreDetailsContainer>
    </Dialog>
  );
};
