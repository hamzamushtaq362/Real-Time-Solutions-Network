import {
  HeadTableCell,
  BodyTableCell,
  OutlinedButton,
  PrimaryButton,
  UserDescriptionCell,
  TwitterSubmissionMoreDetailsDialog,
  Tooltip,
} from '~/components';
import { LinkLabelValue } from './elements';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  Box,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import { openLinkInNewTab } from 'utils/utils';
import { ArrowRightUpLongIconStyled } from 'components/CollabDetails/CollabDetailsComponents/elements';
import axios from 'axios';
import { BASE_URL, fetchRefreshToken, reFetchTokenExpire } from '~/apis';
import { useEffect, useState } from 'react';
import { useNotistack } from '~/hooks';
import { UilInfoCircle } from '@iconscout/react-unicons';

export const TweetSubmissionTable = ({ missionSubmissions }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [acceptOrRejectApplicantLoading, setAcceptOrRejectApplicantLoading] =
    useState(false);
  const [updatedMissionSubmissions, setUpdatedMissionSubmissions] =
    useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [moreDetailsDialogOpen, setMoreDetailsDialogOpen] = useState(null);

  const generateSnackbar = useNotistack();

  useEffect(() => {
    if (missionSubmissions) {
      setUpdatedMissionSubmissions(missionSubmissions);
    }
  }, [missionSubmissions]);

  const getMissionAccomplishedStatus = (missionSubmission) => {
    const { markedCompleted, missionApproved, missionRejected } =
      missionSubmission;

    if (markedCompleted && missionApproved) {
      return 'Approved';
    } else if (markedCompleted && missionRejected) {
      return 'Rejected';
    } else if (markedCompleted && !missionApproved && !missionRejected) {
      return 'Submitted';
    }
    return '-';
  };

  const getRejectButtonDisableStatus = (missionSubmission) => {
    if (
      missionSubmission.missionApproved ||
      missionSubmission.missionRejected
    ) {
      return true;
    }
  };

  const getApproveButtonDisableStatus = (missionSubmission) => {
    if (
      missionSubmission.missionApproved ||
      missionSubmission.missionRejected
    ) {
      return true;
    }
  };

  const approveOrRejectMission = async (status, missionInstanceId) => {
    try {
      setAcceptOrRejectApplicantLoading(true);
      const f1 = async () => {
        const res = await axios.put(
          `${BASE_URL}/api/v1/mission-instance/${missionInstanceId}/approve-reject`,
          {
            status,
          },
        );
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        setUpdatedMissionSubmissions((prev) => {
          return prev.map((missionSubmission) => {
            if (missionSubmission._id === missionInstanceId) {
              missionSubmission.missionApproved = status === 'approve';
              missionSubmission.missionRejected = status === 'reject';
            }
            return missionSubmission;
          });
        });
      }

      setAcceptOrRejectApplicantLoading(false);
    } catch (err) {
      generateSnackbar('Something went wrong!', 'error');
      setAcceptOrRejectApplicantLoading(false);
    }
  };

  return (
    <Table sx={{ width: '100%', marginTop: '20px' }}>
      <TableHead>
        <TableRow>
          <HeadTableCell width="230px">{t('User')}</HeadTableCell>
          <HeadTableCell width="340px">{t('User Twitter')}</HeadTableCell>
          <HeadTableCell width="200px">{t('Submitted Date')}</HeadTableCell>
          <HeadTableCell width="200px">{t('Status')}</HeadTableCell>
          <HeadTableCell width="300px" align="center">
            {t('Action')}
          </HeadTableCell>
          <HeadTableCell />
        </TableRow>
      </TableHead>
      {updatedMissionSubmissions && updatedMissionSubmissions.length > 0 ? (
        <>
          {updatedMissionSubmissions.map((submission) => (
            <>
              <TwitterSubmissionMoreDetailsDialog
                open={moreDetailsDialogOpen === submission._id}
                setOpen={setMoreDetailsDialogOpen}
                submissionDetails={submission}
              />
              <TableBody key={submission._id}>
                <TableRow>
                  <BodyTableCell width="230px" sx={{ padding: 0 }}>
                    <UserDescriptionCell
                      image={submission?.user?.imageUrl}
                      name={
                        submission?.user?.fullName || submission?.user?.username
                      }
                      subText={
                        submission?.user?.skills?.length > 0
                          ? submission?.user?.skills[0]
                          : '-'
                      }
                    />
                  </BodyTableCell>
                  <BodyTableCell width="340px">
                    <LinkLabelValue
                      onClick={() =>
                        openLinkInNewTab(submission?.metadata?.userProfile)
                      }
                    >
                      {submission?.metadata?.userProfile || '-'}
                      <ArrowRightUpLongIconStyled
                        color={theme.palette.background.inverse}
                        width={15}
                        height={15}
                      />
                    </LinkLabelValue>
                  </BodyTableCell>
                  <BodyTableCell width="200px">
                    {format(parseISO(submission?.createdAt), 'dd/MM/yyyy')}
                  </BodyTableCell>
                  <BodyTableCell width="200px">
                    {getMissionAccomplishedStatus(submission)}
                  </BodyTableCell>

                  <BodyTableCell width="300px" align="center">
                    {' '}
                    <Box
                      sx={{
                        display: 'flex',
                        columnGap: '5px',
                      }}
                    >
                      <PrimaryButton
                        onClick={() =>
                          approveOrRejectMission('reject', submission._id)
                        }
                        disabled={
                          getRejectButtonDisableStatus(submission) ||
                          acceptOrRejectApplicantLoading
                        }
                        width="120px"
                        padding="6px"
                      >
                        {t('Reject')}
                      </PrimaryButton>
                      <OutlinedButton
                        onClick={() =>
                          approveOrRejectMission('approve', submission._id)
                        }
                        width="120px"
                        padding="6px"
                        disabled={
                          getApproveButtonDisableStatus(submission) ||
                          acceptOrRejectApplicantLoading
                        }
                      >
                        {t('Approve')}
                      </OutlinedButton>

                      <Tooltip title="More details">
                        <PrimaryButton
                          onClick={() =>
                            setMoreDetailsDialogOpen(submission._id)
                          }
                          width="30px"
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          <UilInfoCircle
                            size="20px"
                            color={
                              isHovered
                                ? theme.palette.background.inverse
                                : theme.palette.background.default
                            }
                          />
                        </PrimaryButton>
                      </Tooltip>
                    </Box>
                  </BodyTableCell>
                  <BodyTableCell />
                </TableRow>
              </TableBody>
            </>
          ))}
        </>
      ) : (
        <></>
      )}
    </Table>
  );
};
