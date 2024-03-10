import React, { useContext, useEffect, useState } from 'react';
import { LoadingMore } from '~/components';

import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';

import { useWindowSize } from '~/hooks';
import { getLimitRecordsByScreenSize, removeDraftCollabs } from '~/utils';
import { BASE_URL } from '~/apis';
import { CollabsLoadingGrid } from '../CollabsLoadingGrid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CollabsMapping } from '../CollabsMapping';
import axios from 'axios';
import AppContext from 'context/AppContext';

export const ExploreAllCollabs = () => {
  const [collabs, setCollabs] = useState([]);
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
        return await axios.post(
          `${BASE_URL}/api/v1/recommender/collabs?page=${currentPage}&limit=${initialLimitRecords}`,
          {
            sources: ['internal'],
            liked: true,
            userId: user?.userId,
          },
        );
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        const collabs = removeDraftCollabs(
          res?.data?.data?.collabs,
          user?.userId,
        );
        setCollabs(collabs);

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
          `${BASE_URL}/api/v1/recommender/collabs?page=${
            currentPage + 1
          }&limit=${limitRecords}`,
          {
            sources: ['internal'],
            liked: true,
            userId: user?.userId,
          },
        );
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        const collabs = removeDraftCollabs(
          res?.data?.data?.collabs,
          user?.userId,
        );

        if (collabs?.length === 0) {
          setNoMoreRemainingRecords(true);
        }

        setCollabs((prevState) => {
          return [...prevState, ...collabs];
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
          style={{ overflowX: 'hidden' }}
        >
          <CollabsMapping collaborations={collabs} />
        </InfiniteScroll>
      ) : (
        <CollabsLoadingGrid />
      )}
    </>
  );
};
