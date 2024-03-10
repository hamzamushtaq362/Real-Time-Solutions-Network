import {
  HeadTableCell,
  BodyTableCell,
  OutlinedButton,
  PrimaryButton,
  UserDescriptionCell,
} from '~/components';
import { Table, TableHead, TableRow, TableBody, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';

export const JoinDiscordSubmissionTable = ({ missionSubmissions }) => {
  const { t } = useTranslation();

  const getMissionAccomplishedStatus = (missionSubmission) => {
    const { markedCompleted, missionApproved } = missionSubmission;

    if (markedCompleted && missionApproved) {
      return 'Approved';
    } else if (markedCompleted && !missionApproved) {
      return 'Submitted';
    }
    return '-';
  };

  const getRejectButtonDisableStatus = (missionSubmission) => {
    if (missionSubmission.mission.missionType === 'join-discord-server') {
      return true;
    }

    return true;
  };

  const getApproveButtonDisableStatus = (missionSubmission) => {
    if (missionSubmission.mission.missionType === 'join-discord-server') {
      return true;
    }

    return true;
  };

  return (
    <Table sx={{ width: '100%', marginTop: '20px' }}>
      <TableHead>
        <TableRow>
          <HeadTableCell width="230px">{t('User')}</HeadTableCell>
          <HeadTableCell width="340px">{t('Submission')}</HeadTableCell>
          <HeadTableCell width="200px">{t('Submitted Date')}</HeadTableCell>

          <HeadTableCell width="200px">{t('Status')}</HeadTableCell>
          <HeadTableCell width="300px">{t('Action')}</HeadTableCell>
          <HeadTableCell />
        </TableRow>
      </TableHead>
      {missionSubmissions && missionSubmissions.length > 0 ? (
        <>
          {missionSubmissions.map((submission) => (
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
                <BodyTableCell width="340px">-</BodyTableCell>
                <BodyTableCell width="200px">
                  {format(parseISO(submission?.createdAt), 'dd/MM/yyyy')}
                </BodyTableCell>
                <BodyTableCell width="200px">
                  {getMissionAccomplishedStatus(submission)}
                </BodyTableCell>

                <BodyTableCell width="300px">
                  {' '}
                  <Box
                    sx={{
                      display: 'flex',
                      columnGap: '5px',
                    }}
                  >
                    <PrimaryButton
                      disabled={getRejectButtonDisableStatus(submission)}
                      width="140px"
                      padding="6px"
                    >
                      {t('Reject')}
                    </PrimaryButton>
                    <OutlinedButton
                      width="140px"
                      padding="6px"
                      disabled={getApproveButtonDisableStatus(submission)}
                      onClick={() => {}}
                    >
                      {t('Approve')}
                    </OutlinedButton>
                  </Box>
                </BodyTableCell>
                <BodyTableCell />
              </TableRow>
            </TableBody>
          ))}
        </>
      ) : (
        <></>
      )}
    </Table>
  );
};
