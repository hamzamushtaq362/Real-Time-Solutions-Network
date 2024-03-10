import { useTranslation } from 'react-i18next';
import React from 'react';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import {
  CollabApplicantsGrid,
  Commentary,
  HeaderTableCell,
  NoApplicantsFoundText,
  StyledTableCell,
  StyledTableRow,
} from 'components/CollabDetails/CollabDetailsComponents/CollabDetailsSections/CollabDetailsApplicants/elements';
import { User } from '~/components';
import { SmallSpinner } from 'components';
import { LoaderWrap, LoadingMoreText } from 'components/Spinner/elements';
import { EmailUserLabel } from 'components/Chip/EmailChip';

const CollabInvitesTable = ({ loading, invites, collabType }) => {
  const { t } = useTranslation();
  return (
    <>
      <CollabApplicantsGrid>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <HeaderTableCell>{t('Creator')}</HeaderTableCell>
              {collabType === 'internal' && (
                <HeaderTableCell>{t('Role')}</HeaderTableCell>
              )}
              <HeaderTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              (invites?.length > 0 ? (
                <>
                  {invites?.map((invite, index) => {
                    const { userId } = invite || {};
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell sx={{ width: '26%' }}>
                          {!userId && invite.emailInvite ? (
                            <EmailUserLabel email={invite.emailInvite.email} />
                          ) : (
                            <User
                              fullName={userId?.fullName}
                              imageUrl={userId?.imageUrl}
                              totalCollabs={userId?.totalCollabs}
                              connections={userId?.connections}
                              username={userId?.username || userId?.label}
                            />
                          )}
                        </StyledTableCell>
                        {/* <StyledTableCell sx={{ width: '20%' }}>
                          <RoleText>
                            {getAmountAndType(invite?.memberRole)}
                          </RoleText>
                        </StyledTableCell>

                        <StyledTableCell sx={{ width: '20%' }}>
                          <RoleText>
                            {invite?.memberNegotiation
                              ? getAmountAndType(invite?.memberNegotiation)
                              : '-'}
                          </RoleText>
                        </StyledTableCell> */}
                        <StyledTableCell sx={{ width: '30%' }}>
                          <Commentary>{invite?.memberRole?.skill}</Commentary>
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ width: '22%' }}
                        ></StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </>
              ) : (
                <>
                  <NoApplicantsFoundText>
                    {t('No Invites')}
                  </NoApplicantsFoundText>
                </>
              ))}
          </TableBody>
        </Table>
        {loading && (
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

export default CollabInvitesTable;
