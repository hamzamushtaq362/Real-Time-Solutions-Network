import { useTranslation } from 'react-i18next';
import {
  TableNavbar,
  Avatar,
  OutlinedButton,
  PrimaryButton,
  SmallSpinner,
} from '~/components';
import { Table, Box, TableHead, TableRow, TableBody } from '@mui/material';
import {
  CollabApplicantsGrid,
  Commentary,
  HeaderTableCell,
  NoApplicantsFoundText,
  RoleText,
  StyledTableCell,
  StyledTableRow,
} from 'components/CollabDetails/CollabDetailsComponents/CollabDetailsSections/CollabDetailsApplicants/elements';
import React, { useState } from 'react';
import { AvatarSampleImage2 } from '~/assets';
import {
  RenderItemText,
  UserFullName,
} from 'components/CollabCreate/AddProject/elements';
import { LoaderWrap, LoadingMoreText } from 'components/Spinner/elements';
import { acceptRejectCurationRequest } from '~/apis';
import { useNotistack } from '~/hooks';
import { FlexBox } from 'components/common/elements';

export const CuratorsTable = ({
  filteredCurations,
  loading,
  filterBy,
  setFilterBy,
  totalPercentForCurators,
  updateRecordStatusFromFilterCurations,
  updateTotalAndUsedPercentage,
}) => {
  const [loadingButton, setLoadingButton] = useState('');
  const { t } = useTranslation();

  const generateSnackbar = useNotistack();
  const acceptRejectCuration = async (curation, status, curationFee) => {
    if (curationFee > totalPercentForCurators) {
      generateSnackbar(
        'Curation Fee is greater than the available total percentage for curators',
        'info',
      );
    } else {
      if (status === 'ACCEPTED' || status === 'REJECTED') {
        try {
          setLoadingButton(status);
          const response = await acceptRejectCurationRequest(curation, status);

          if (response.status === 'success') {
            updateRecordStatusFromFilterCurations(curation, status);

            if (status === 'ACCEPTED') {
              updateTotalAndUsedPercentage(curationFee);
              generateSnackbar('Accepted Curation request', 'success');
            } else if (status === 'REJECTED') {
              generateSnackbar('Reject curation request', 'info');
            }
          }
        } catch (error) {
          setLoadingButton('');
          generateSnackbar('Something went wrong!', 'error');
        }
        setLoadingButton('');
      } else {
        setLoadingButton('');
        generateSnackbar('Invalid value of Curation Status', 'error');
      }
    }
  };

  return (
    <>
      <CollabApplicantsGrid>
        {filteredCurations && filteredCurations.length !== 0 && (
          <TableNavbar filterBy={filterBy} setFilterBy={setFilterBy} />
        )}
        <Table sx={{ width: '100%', marginTop: 4 }}>
          <TableHead>
            <TableRow>
              <HeaderTableCell>{t('Curator')}</HeaderTableCell>
              <HeaderTableCell>{t('Curation Fee')}</HeaderTableCell>
              <HeaderTableCell>{t('Note')}</HeaderTableCell>
              <HeaderTableCell />
            </TableRow>
          </TableHead>
          {!loading && (
            <TableBody>
              {filteredCurations?.length > 0 && (
                <>
                  {filteredCurations.map((curation, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell sx={{ width: '26%' }}>
                        <Box display="flex" alignItems="center">
                          <Box mr={1} display="flex">
                            <Avatar
                              size={42}
                              avatar={
                                curation?.curatedBy?.imageUrl ||
                                AvatarSampleImage2
                              }
                              showRing={true}
                            />
                          </Box>
                          <Box display="flex" flexDirection="column">
                            <UserFullName>
                              {curation?.curatedBy?.fullName}
                            </UserFullName>
                            <RenderItemText>
                              {curation?.curatedBy?.username}
                            </RenderItemText>
                          </Box>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: '22%' }}>
                        <RoleText>{curation?.curatorDemandedEarning}%</RoleText>
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: '36%' }}>
                        <Commentary>
                          {curation?.noteToAdmin
                            ? curation?.noteToAdmin
                            : 'Not Indicated'}
                        </Commentary>
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: '22%' }}>
                        <Box display="flex" alignItems="center">
                          <OutlinedButton
                            width={120}
                            disabled={loadingButton === 'REJECTED'}
                            onClick={() =>
                              acceptRejectCuration(
                                curation?._id,
                                'REJECTED',
                                curation?.curatorDemandedEarning,
                              )
                            }
                          >
                            {loadingButton === 'REJECTED' ? (
                              <SmallSpinner />
                            ) : (
                              'Deny'
                            )}
                          </OutlinedButton>
                          <PrimaryButton
                            width={120}
                            sx={{ marginLeft: 1 }}
                            disabled={loadingButton === 'ACCEPTED'}
                            onClick={() =>
                              acceptRejectCuration(
                                curation?._id,
                                'ACCEPTED',
                                curation?.curatorDemandedEarning,
                              )
                            }
                          >
                            {loadingButton === 'ACCEPTED' ? (
                              <SmallSpinner />
                            ) : (
                              'Accept'
                            )}
                          </PrimaryButton>
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </>
              )}
            </TableBody>
          )}
        </Table>
        {!loading && filteredCurations?.length === 0 && (
          <FlexBox justifyContent="center" mt={3}>
            <NoApplicantsFoundText>
              {t('No pending curator requests')}
            </NoApplicantsFoundText>
          </FlexBox>
        )}
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
