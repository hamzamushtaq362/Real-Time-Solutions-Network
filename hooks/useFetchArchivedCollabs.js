import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL, fetchRefreshToken, reFetchTokenExpire } from '~/apis';
import { getLimitRecordsByScreenSize, removeDraftCollabs } from '~/utils';
import AppContext from '../context/AppContext';
import { useWindowSize } from './useWindowSize';

const useFetchArchivedCollabs = () => {
  const { user } = useContext(AppContext);
  const windowSize = useWindowSize();

  const [limitRecords, setLimitRecords] = useState(30);
  const [collabs, setCollabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [noMoreRemainingRecords, setNoMoreRemainingRecords] = useState(false);

  const fetchCollabs = async (initialLimitRecords) => {
    try {
      setLoading(true);

      const f1 = async () => {
        return await axios.post(
          `${BASE_URL}/api/v1/recommender/collabs?page=${currentPage}&limit=${initialLimitRecords}`,
          {
            type: 'archive',
            userId: user?.userId,
            sources: ['internal', 'external', 'collective'],
          },
        );
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res) {
        const collabs = removeDraftCollabs(
          res?.data?.data?.collabs,
          user?.userId,
        );

        setCollabs(collabs);
        setLoading(false);

        if (collabs?.length < initialLimitRecords) {
          setNoMoreRemainingRecords(true);
        }
      }
    } catch (err) {
      setLoading(false);
      //
    }
  };


  useEffect(() => {
    if (windowSize?.width) {
      const records = getLimitRecordsByScreenSize(windowSize?.width);
      setLimitRecords(records);
      fetchCollabs(records);
    }
  }, [windowSize]);


  return { limitRecords, loading, collabs, currentPage, setCurrentPage, setCollabs, noMoreRemainingRecords, setNoMoreRemainingRecords };
};

export default useFetchArchivedCollabs;
