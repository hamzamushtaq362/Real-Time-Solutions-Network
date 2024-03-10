import { useTranslation } from 'react-i18next';
import {
  StyledTableCell,
  StyledTableRow,
  HeaderTableCell,
  RoleText,
  Commentary,
  CollabApplicantsGrid,
  NoApplicantsFoundText,
  CollabTableStatusText,
} from './elements';
import {
  OutlinedButton,
  PrimaryButton,
  ApplicantStatusLabel,
  CheckCircleIcon,
  User,
  SmallSpinner,
} from '~/components';
import CloseIcon from 'components/Icons/CloseIcon';
import { Table, TableBody, TableHead, TableRow, Box } from '@mui/material';
import React from 'react';
import { LoaderWrap, LoadingMoreText } from 'components/Spinner/elements';
import { FlexBox } from 'components/common/elements';
import { getCollabMemberStatusMappings } from '~/constants';
import { useTheme } from '@mui/material';

export const CollabDetailsApplicantsTable = ({
  showTable,
  applicantsLoading,
  applicants,
  acceptOrRejectApplicant,
  loadingAccept,
  loadingReject,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <CollabApplicantsGrid>
        {showTable && (
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <HeaderTableCell>{t('Creator')}</HeaderTableCell>
                <HeaderTableCell>{t('Role')}</HeaderTableCell>
                <HeaderTableCell>{t('Applicant Message')}</HeaderTableCell>

                <HeaderTableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {!applicantsLoading && applicants?.length > 0 && (
                <>
                  {applicants?.map((applicant) => {
                    const {
                      userId,
                      personalNote,
                      collabId: { roles },
                    } = applicant || {};

                    const {
                      totalCollabs,
                      connections,
                      fullName,
                      imageUrl,
                      username,
                    } = userId;

                    return (
                      <StyledTableRow key={userId}>
                        <StyledTableCell sx={{ width: '26%' }}>
                          <User
                            fullName={fullName}
                            totalCollabs={totalCollabs}
                            connections={connections}
                            imageUrl={imageUrl}
                            username={username}
                          />
                        </StyledTableCell>
                        <StyledTableCell sx={{ width: '22%' }}>
                          <RoleText>{roles?.[0]?.skill}</RoleText>
                        </StyledTableCell>
                        <StyledTableCell sx={{ width: '26%' }}>
                          <Commentary>
                            {personalNote ? personalNote : '-'}
                          </Commentary>
                        </StyledTableCell>

                        <StyledTableCell sx={{ width: '22%' }}>
                          {applicant.status === 'PENDING' && (
                            <Box
                              display="flex"
                              alignItems="center"
                              columnGap={1}
                            >
                              <PrimaryButton
                                width={120}
                                disabled={loadingAccept || loadingReject}
                                onClick={() =>
                                  acceptOrRejectApplicant(
                                    applicant?._id,
                                    'accept',
                                    userId?._id,
                                  )
                                }
                              >
                                {t('Accept')}
                              </PrimaryButton>

                              <OutlinedButton
                                width={120}
                                disabled={loadingAccept || loadingReject}
                                onClick={() =>
                                  acceptOrRejectApplicant(
                                    applicant?._id,
                                    'reject',
                                  )
                                }
                              >
                                {t('Reject')}
                              </OutlinedButton>
                            </Box>
                          )}
                          {(applicant.status === 'ACCEPTED' ||
                            applicant.status === 'REJECTED') && (
                            <ApplicantStatusLabel
                              variant="small"
                              sx={{ marginLeft: 1 }}
                              text={
                                <>
                                  <CollabTableStatusText mr={1}>
                                    {getCollabMemberStatusMappings(
                                      applicant.status,
                                    )}
                                  </CollabTableStatusText>
                                  {applicant.status === 'ACCEPTED' && (
                                    <CheckCircleIcon
                                      width={15}
                                      height={15}
                                      color={theme.palette.text.primary}
                                    />
                                  )}

                                  {applicant.status === 'REJECTED' && (
                                    <CloseIcon
                                      width={15}
                                      height={15}
                                      color={theme.palette.text.primary}
                                    />
                                  )}
                                </>
                              }
                            />
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </>
              )}
            </TableBody>
          </Table>
        )}
        {!applicantsLoading && applicants?.length === 0 && (
          <FlexBox justifyContent="center" mt={3}>
            <NoApplicantsFoundText>
              {t('No pending applicant requests')}
            </NoApplicantsFoundText>
          </FlexBox>
        )}
        {applicantsLoading && (
          <LoaderWrap mt={3}>
            <LoadingMoreText>
              <SmallSpinner />
            </LoadingMoreText>
          </LoaderWrap>
        )}
      </CollabApplicantsGrid>
    </>
  );
};
