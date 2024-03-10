import React, { useEffect, useState } from 'react';
import { NameAvatarDescription, SectionHeader, Spacer } from '~/components';
import {
  CollabsContentContainer,
  CreatorsSkeletonContainer,
  DashboardSectionContainer,
} from './elements';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BASE_URL, fetchRefreshToken } from '~/apis';
import { reFetchTokenExpire } from '~/redux';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const RisingCreators = () => {
  const [loading, setLoading] = useState(false);
  const [risingCreators, setRisingCreators] = useState([]);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    getRisingsCreators();
  }, []);

  const getRisingsCreators = async () => {
    try {
      setLoading(true);
      const fetchRisingCreators = async () => {
        return await axios.get(`${BASE_URL}/creator/get-rising-creators`);
      };
      const res = await reFetchTokenExpire(
        fetchRisingCreators,
        fetchRefreshToken,
      );
      if (res.data.status === 'success') {
        setRisingCreators(res.data.creators);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <DashboardSectionContainer>
      <SectionHeader
        text={t('Rising Creators')}
        buttonText={t('See All')}
        buttonOnClickHandler={() => router.push('/discovery')}
        pl={4}
      />
      {!loading ? (
        <>
          {risingCreators?.length > 0 ? (
            <>
              <CollabsContentContainer container>
                {risingCreators
                  .slice(0, 10)
                  .map(
                    (
                      {
                        fullName,
                        username,
                        imageUrl,
                        skills,
                        numberOfFollowers,
                        totalCollabs
                      },
                      index,
                    ) => {
                      return (
                        <Grid item lg={12 / 5} md={12 / 4} sm={6} xs={12} key={index}>
                          <NameAvatarDescription
                            key={fullName}
                            onClick={() => router.push(`/@${username}`)}
                            isVerified
                            avatar={imageUrl}
                            name={fullName}
                            isNew={index === 1 || index === 2}
                            totalCollabs={totalCollabs}
                            followers={numberOfFollowers}
                            subTitle={
                              skills.length > 0 ? skills[0] : t('No Skill found')
                            }
                          />
                        </Grid>
                      );
                    },
                  )}
              </CollabsContentContainer>

              <Spacer value={32} />
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <CreatorsSkeletonContainer>
          {[...Array(5)].map((index) => (
            <NameAvatarDescription isLoading key={index} />
          ))}
        </CreatorsSkeletonContainer>
      )}
    </DashboardSectionContainer>
  );
};

export default RisingCreators;
