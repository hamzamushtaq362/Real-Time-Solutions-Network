import { useState, useEffect } from 'react';
import { CurationsTablePadder } from './elements';
import { CurationsStatsSection } from './CurationsStatsSection';
import { CurationsTable } from './CurationsTable';
import { fetchCollabCurationsByCurator, fetchCuratorDetails } from '~/apis';
import { useNotistack } from '~/hooks';

export const CurationsLayout = () => {
  const [allCurations, setAllCurations] = useState([]);
  const [filteredCurations, setFilteredCurations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [curatorDetails, setCuratorDetails] = useState(null);
  const [curatorDetailsLoading, setCuratorDetailsLoading] = useState(false);
  const [filterBy, setFilterBy] = useState('all'); // all, pending, approved, denied

  const generateSnackbar = useNotistack();

  const getCollabCurationsByCurator = async () => {
    try {
      setLoading(true);

      const response = await fetchCollabCurationsByCurator();

      if (response.status === 'success') {
        const collabCurations = response.curatorCurations;
        setAllCurations(collabCurations);
        setFilteredCurations(collabCurations);
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

  const getCuratorDetails = async () => {
    try {
      setCuratorDetailsLoading(true);
      const response = await fetchCuratorDetails();
      if (response.status === 'success') {
        setCuratorDetails(response.curator);
      }
      setCuratorDetailsLoading(false);
    } catch (error) {
      setCuratorDetailsLoading(false);
    }
  };

  const onAcceptedCuration = () => {
    setCuratorDetails((prevState) => {
      return {
        ...prevState,
        acceptedCurations: prevState?.acceptedCurations + 1,
      };
    });
  };

  const updatedFilteredCurationStatusOnNegotiation = (curationId, status) => {
    if (status === 'ACCEPTED' || status === 'REJECTED') {
      const filteredCurationsCopy = JSON.parse(
        JSON.stringify(filteredCurations),
      );

      const updatedFilteredCurations = filteredCurationsCopy.map((curation) => {
        if (curation._id === curationId) {
          return {
            ...curation,
            status,
            finalEarning: curation?.subsequentNegotiationEarning,
          };
        } else {
          return curation;
        }
      });

      setFilteredCurations(updatedFilteredCurations);
    }
  };

  useEffect(() => {
    getCollabCurationsByCurator();
    getCuratorDetails();
  }, []);

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

  return (
    <>
      {/* Stats Section Starts */}
      <CurationsStatsSection
        curatorDetails={curatorDetails}
        curatorDetailsLoading={curatorDetailsLoading}
      />
      {/* Stats Section Ends */}

      {/* Table Section Starts */}
      <CurationsTablePadder>
        <CurationsTable
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          loading={loading}
          filteredCurations={filteredCurations}
          updatedFilteredCurationStatusOnNegotiation={
            updatedFilteredCurationStatusOnNegotiation
          }
          onAcceptedCuration={onAcceptedCuration}
        />
      </CurationsTablePadder>
      {/* Table Section Ends */}
    </>
  );
};
