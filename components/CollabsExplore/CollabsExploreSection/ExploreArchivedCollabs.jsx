import React, { useContext } from 'react';
import { LoadingMore } from '~/components';

import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';

import { removeDraftCollabs } from '~/utils';
import { BASE_URL } from '~/apis';
import { CollabsLoadingGrid } from '../CollabsLoadingGrid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CollabsMapping } from '../CollabsMapping';
import axios from 'axios';
import AppContext from 'context/AppContext';

export const ExploreArchivedCollabs = ({ collabs, setCollabs, loading, limitRecords, setCurrentPage, currentPage, noMoreRemainingRecords, setNoMoreRemainingRecords }) => {
  const { user } = useContext(AppContext);


  const fetchNextCollabs = async () => {
    try {
      const f1 = async () => {
        const res = await axios.post(
          `${BASE_URL}/api/v1/recommender/collabs?page=${
            currentPage + 1
          }&limit=${limitRecords}`,
          {
            type: 'archive',
            userId: user?.userId,
            sources: ['internal', 'external', 'collective'],
            liked: true,
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

  return (
    <>
      {!loading ? (
        <InfiniteScroll
          dataLength={collabs?.length || 0}
          next={fetchNextCollabs}
          hasMore={!noMoreRemainingRecords}
          loader={<LoadingMore />}
          endMessage={<></>}
          style={{ overflowX: 'hidden' }}
        >
          <CollabsMapping
            collaborations={collabs}
            emptyStateText="There are no archived collabs. Start exploring collabs."
          />
        </InfiniteScroll>
      ) : (
        <CollabsLoadingGrid />
      )}
    </>
  );
};
