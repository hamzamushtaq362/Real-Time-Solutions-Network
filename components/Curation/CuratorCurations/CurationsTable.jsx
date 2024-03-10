import {
  CurationsTableHead,
  CuratorsTableRow,
} from './CurationsTableComponents';
import { Spinner, TableNavbar, NoResultsComponent } from '~/components';

import { LoadingContainer, TableContainer } from '../elements';
import { Table, Box, useTheme } from '@mui/material';

export const CurationsTable = ({
  filteredCurations,
  loading,
  updatedFilteredCurationStatusOnNegotiation,
  filterBy,
  setFilterBy,
  onAcceptedCuration,
}) => {
  const theme = useTheme();

  return (
    <>
      <TableContainer>
        <TableNavbar filterBy={filterBy} setFilterBy={setFilterBy} />

        <Table sx={{ width: '100%' }}>
          {!loading ? (
            <>
              {filteredCurations?.length > 0 ? (
                <>
                  <CurationsTableHead />

                  <>
                    {filteredCurations.map((curation) => (
                      <CuratorsTableRow
                        curation={curation}
                        key={curation._id}
                        updatedFilteredCurationStatusOnNegotiation={
                          updatedFilteredCurationStatusOnNegotiation
                        }
                        onAcceptedCuration={onAcceptedCuration}
                      />
                    ))}
                  </>
                </>
              ) : (
                <NoResultsComponent />
              )}
            </>
          ) : (
            <LoadingContainer>
              <Spinner size={25} fullHeight />
            </LoadingContainer>
          )}
        </Table>

        <Box
          sx={{
            width: '100%',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        ></Box>
      </TableContainer>
    </>
  );
};
