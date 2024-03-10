import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { CuratorsStatsSection } from './CuratorsStatsSection';
import { CuratorsTable } from './CuratorsTable';
import { CuratorsTablePadder, EnableCuration } from './elements';
import { useNotistack } from '~/hooks';

import { fetchCollabCurations } from '~/apis';
import { CollabOverviewTitle } from 'components/CollabDetails/CollabDetailsLayouts/elements';
import { Box } from '@mui/material';

export const CollabCurators = ({
  totalPercentageForCurators,
  usedPercentageForCurators,
  collabId,
  enableCuration,
}) => {
  const { t } = useTranslation();

  const [allCurations, setAllCurations] = useState([]);
  const [filteredCurations, setFilteredCurations] = useState([]);
  const [filterBy, setFilterBy] = useState('all'); // all, pending, approved, denied

  const [totalPercentForCurators] = useState(totalPercentageForCurators);
  const [usedPercentForCurators, setUsedPercentForCurator] = useState(
    usedPercentageForCurators,
  );
  const [loading, setLoading] = useState(false);
  const generateSnackbar = useNotistack();

  const getCollabCurations = async () => {
    try {
      setLoading(true);
      const response = await fetchCollabCurations(collabId);
      if (response.status === 'success') {
        setAllCurations(response.curations);
        setFilteredCurations(
          response.curations.filter(
            (curation) => curation.status === 'PENDING',
          ),
        );
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      generateSnackbar(
        'Something went wrong while fetching curations',
        'error',
      );
    }
  };

  const updateRecordsOnFilterByPropertyChange = () => {
    if (filterBy === 'all') {
      setFilteredCurations(allCurations);
    } else if (filterBy === 'pending') {
      const pendingCurations = allCurations.filter(
        (curation) => curation.status === 'PENDING',
      );
      setFilteredCurations(pendingCurations);
    } else if (filterBy === 'denied') {
      const pendingCurations = allCurations.filter(
        (curation) => curation.status === 'REJECTED',
      );
      setFilteredCurations(pendingCurations);
    } else if (filterBy === 'approved') {
      const pendingCurations = allCurations.filter(
        (curation) => curation.status === 'ACCEPTED',
      );
      setFilteredCurations(pendingCurations);
    }
  };

  useEffect(() => {
    updateRecordsOnFilterByPropertyChange();
  }, [filterBy]);

  useEffect(() => {
    getCollabCurations();
  }, [collabId]);

  const updateRecordStatusFromFilterCurations = (curationId, status) => {
    if (
      status === 'ACCEPTED' ||
      status === 'REJECTED' ||
      status === 'NEGOTIATED'
    ) {
      const filteredCurationsCopy = JSON.parse(
        JSON.stringify(filteredCurations),
      );

      const updatedFilteredCurations = filteredCurationsCopy.map((curation) => {
        if (curation._id === curationId) {
          return { ...curation, status };
        } else {
          return curation;
        }
      });
      setFilteredCurations(updatedFilteredCurations);
    }
  };

  const updateTotalAndUsedPercentage = (amount) => {
    setUsedPercentForCurator((prevState) => {
      return prevState + amount;
    });
  };

  return (
    (<Box p={4} pt={0}>
      <CollabOverviewTitle>{t("Curators")}</CollabOverviewTitle>
      <CuratorsStatsSection
        totalPercentForCurators={totalPercentForCurators}
        usedPercentForCurators={usedPercentForCurators}
      />
      {enableCuration && (
        <>
          <CuratorsTablePadder>
            <CuratorsTable
              filteredCurations={filteredCurations}
              totalPercentForCurators={totalPercentForCurators}
              updateRecordStatusFromFilterCurations={
                updateRecordStatusFromFilterCurations
              }
              updateTotalAndUsedPercentage={updateTotalAndUsedPercentage}
              loading={loading}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
          </CuratorsTablePadder>
        </>
      )}
      {!enableCuration && (
        <EnableCuration>{t("No pending curator requests")}</EnableCuration>
      )}
    </Box>)
  );
};
