import React, { useContext, useEffect, useState } from 'react';
import { LoadingMore } from '~/components';

import { reFetchTokenExpire, fetchRefreshToken } from '~/redux';

import { useWindowSize } from '~/hooks';
import { getLimitRecordsByScreenSize } from '~/utils';
import { BASE_URL } from '~/apis';
import { CollabsLoadingGrid } from '../CollabsLoadingGrid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CollabsMapping } from '../CollabsMapping';
import axios from 'axios';
import AppContext from 'context/AppContext';

export const ExploreAllCollabsWithCollaborators = () => {
  const [collabs, setCollabs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitRecords, setLimitRecords] = useState(30);
  const { user } = useContext(AppContext);

  const [noMoreRemainingCollabs, setNoMoreRemainingRecords] = useState(false);
  const windowSize = useWindowSize();

  const fetchInitialCollabs = async (initialLimitRecords) => {
    try {
      setLoading(true);
      const f1 = async () => {
        const res = await axios.post(
          `${BASE_URL}/api/v1/recommender/collabs?page=${currentPage}&limit=${initialLimitRecords}`,
          {
            sources: ['internal'],
            liked: true,
            user: user?.userId
          }
        );
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        const collabs = res?.data?.data?.collabs;

        const filteredCollabs = collabs.filter(
          (collab) => collab.members.length > 0,
        );
        setCollabs(filteredCollabs);

        if (collabs?.length < initialLimitRecords) {
          setNoMoreRemainingRecords(true);
        }
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      //
    }
  };

  const fetchNextCollabs = async () => {
    try {
      const f1 = async () => {
        const res = await axios.post(
          `${BASE_URL}/api/v1/recommender/collabs?page=${currentPage + 1}&limit=${limitRecords}`,
          {
            sources: ['internal']
          }
        );
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        const collabs = res?.data?.data?.collabs;

        if (collabs?.length === 0) {
          setNoMoreRemainingRecords(true);
        }

        const filteredCollabs = collabs.filter(
          (collab) => collab.members.length > 0,
        );

        setCollabs((prevState) => {
          return [...prevState, ...filteredCollabs];
        });
        setCurrentPage((prevState) => prevState + 1);
      }
    } catch (err) {
      //
    }
  };

  useEffect(() => {
    if (windowSize?.width) {
      const records = getLimitRecordsByScreenSize(windowSize?.width);
      setLimitRecords(records);
      fetchInitialCollabs(records);
    }
  }, [windowSize]);

  return (
    <>
      {!loading ? (
        <InfiniteScroll
          dataLength={collabs?.length || 0}
          next={fetchNextCollabs}
          hasMore={!noMoreRemainingCollabs}
          loader={<LoadingMore />}
          endMessage={<></>}
        >
          <CollabsMapping collaborations={collabs} />
        </InfiniteScroll>
      ) : (
        <CollabsLoadingGrid />
      )}
    </>
  );
};
