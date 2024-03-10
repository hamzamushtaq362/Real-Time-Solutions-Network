import React, { useEffect, useState } from 'react';
import { DiscoveryMainContainer } from './elements';
import {
  LoadingMore,
  CreatorProfileCard,
  CreatorProfileCardSkeleton,
} from '~/components';

import { reFetchTokenExpire, fetchRefreshToken } from '~/redux';

import { useWindowSize } from '~/hooks';
import { getLimitRecordsByScreenSize } from '~/utils';
import { BASE_URL } from '~/apis';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { gridProps } from '~/constants';
import { SecondaryNavbar } from 'components/SecondaryNavbar';

export const Discovery = () => {
  const [creators, setCreators] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitRecords, setLimitRecords] = useState(30);
  const { t } = useTranslation();

  const [totalCreatorsCount, setTotalCreatorsCount] = useState(0);
  const windowSize = useWindowSize();

  const fetchInitialCreators = async (initialLimitRecords) => {
    try {
      setLoading(true);
      const f1 = async () => {
        return await axios.get(
          `${BASE_URL}/creator?page=${currentPage}&limit=${initialLimitRecords}`,
        );
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        const totalCreatorsCount = res.data?.totalCreatorsCount || 0;

        const creators = res.data?.creators?.sort(
          (creator) => !!creator.introduction,
        );

        const creatorsSorted = creators.sort((a, b) => {
          const aIntro = a.introduction || '';
          const bIntro = b.introduction || '';

          if (aIntro && !bIntro) return -1;
          if (!aIntro && bIntro) return 1;
          return 0;
        });
        setTotalCreatorsCount(totalCreatorsCount);
        setCreators(creatorsSorted);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      //
    }
  };

  const fetchNextCreators = async () => {
    try {
      const f1 = async () => {
        return await axios.get(
          `${BASE_URL}/creator?page=${currentPage + 1}&limit=${limitRecords}`,
        );
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        const creators = res.data?.creators;

        setCreators((prevState) => {
          return [...prevState, ...creators];
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
      fetchInitialCreators(records);
    }
  }, [windowSize]);

  return (
    <>
      <SecondaryNavbar title={t('Creators')} />
      <DiscoveryMainContainer>
        {!loading && creators ? (
          <InfiniteScroll
            dataLength={creators?.length || 0}
            next={fetchNextCreators}
            hasMore={creators?.length < totalCreatorsCount}
            loader={<LoadingMore />}
            endMessage={<></>}
          >
            <Grid container columnSpacing={2.5} rowSpacing={2.5}>
              {creators &&
                creators?.map((user) => (
                  <Grid key={user?._id} item {...gridProps}>
                    <Link href={`/@${user?.username}`}>
                      <CreatorProfileCard key={user?._id} user={user} />
                    </Link>
                  </Grid>
                ))}
            </Grid>
          </InfiniteScroll>
        ) : (
          <Grid container columnSpacing={2.5} rowSpacing={2.5}>
            {[...Array(50)].map((index) => (
              <Grid key={index} {...gridProps}>
                <CreatorProfileCardSkeleton
                  key={index}
                  sx={{ width: '100%' }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </DiscoveryMainContainer>
    </>
  );
};
