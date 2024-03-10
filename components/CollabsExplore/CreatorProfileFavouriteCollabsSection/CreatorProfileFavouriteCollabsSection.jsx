import React, { useContext, useEffect, useState } from 'react';
import { LoadingMore } from '~/components';
import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';
import { useWindowSize } from '~/hooks';
import { getLimitRecordsByScreenSize } from '~/utils';
import { BASE_URL } from '~/apis';
import { CollabsLoadingGrid } from '../CollabsLoadingGrid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CollabsMapping } from '../CollabsMapping';
import axios from 'axios';
import AppContext from 'context/AppContext';

export const CreatorProfileFavouriteCollabsSection = ({setActiveTab}) => {
  const [collabs, setCollabs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitRecords, setLimitRecords] = useState(30);
  const [noMoreRemainingCollabs, setNoMoreRemainingRecords] = useState(false);
  const { user } = useContext(AppContext);

  const windowSize = useWindowSize();

  const fetchInitialCollabs = async (initialLimitRecords) => {
    try {
      setLoading(true);

      const f1 = async () => {
        return await axios.post(
          `${BASE_URL}/api/v1/recommender/collabs?page=${currentPage}&limit=${initialLimitRecords}`,
          {
            userId: user?.userId,
            sources: ['internal', 'external', 'collective'],
            liked: true,
          }
        );
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res?.data?.status === 'success') {
        const collabReferences = res?.data?.data?.likedCollabs;
        if (collabReferences?.length > 0) {
          setCollabs(collabReferences);
        } else {
          setCollabs([]);
        }

        if (collabReferences?.length < initialLimitRecords) {
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
        const res = await axios.get(
          `${BASE_URL}/api/v1/recommender/collabs?page=${currentPage + 1}&limit=${limitRecords}`,
          {
            userId: user?.userId,
            liked: true,
            sources: ['internal', 'external', 'collective'],
          }
        );
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        const collabReferences = res?.data?.data?.collabs;
        let collabs = [];
        if (collabReferences?.length > 0) {
          collabs = collabReferences.map(({ collabId }) => collabId);
        }

        if (collabReferences?.length === 0) {
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
          <CollabsMapping
            collaborations={collabs}
            collabsType='favourite'
            setActiveTab={setActiveTab}
            emptyStateText='You have not favorited any Collabs yet. Explore Collabs to favorite to show up here.'
            buttonText='Explore Collabs'
          />
        </InfiniteScroll>
      ) : (
        <CollabsLoadingGrid />
      )}
    </>
  );
};
