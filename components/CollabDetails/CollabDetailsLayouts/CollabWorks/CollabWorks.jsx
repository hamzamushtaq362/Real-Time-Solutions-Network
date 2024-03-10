import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {
  ImagePanelCardSkeleton,
  SectionHeader,
  Spacer,
  Divider,
  CollabWorksDetailsDrawer,
} from 'components';
import { CollabWorkCard } from './CollabWorkCard';
import { getCollabWorks } from '~/apis';
import { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

export const CollabWorks = ({ collabId, hideDivider }) => {
  const [collabWorks, setCollabWorks] = useState([]);
  const [currentCollabWorkDetails, setCurrentCollabWorkDetails] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const [collabWorkDetailsDrawerOpen, setCollabWorkDetailsDrawerOpen] =
    useState(router?.query?.workId);

  const fetchCollabWorks = async () => {
    try {
      setLoading(true);
      const response = await getCollabWorks(collabId);

      if (response.data.status === 'success') {
        setCollabWorks(response.data.subCollabs);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const appendQuery = (id) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('workId', id);

    // Update the URL
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  };

  const removeQueryParameter = () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete('workId');

    // Update the URL
    let newUrl = window.location.pathname;
    // Check if there are any remaining query parameters
    if (queryParams.toString()) {
      newUrl += `?${queryParams.toString()}`;
    }
    window.history.replaceState(null, '', newUrl);
  };

  useEffect(() => {
    fetchCollabWorks();
  }, [collabId]);

  useEffect(() => {
    const { workId } = router.query;
    if (workId) {
      const collabWork = collabWorks.find((item) => item._id === workId);
      setCurrentCollabWorkDetails(collabWork);
      setCollabWorkDetailsDrawerOpen(true);
    } else {
      setCollabWorkDetailsDrawerOpen(false);
    }
  }, [router, loading]);

  useEffect(() => {
    if (!collabWorkDetailsDrawerOpen) {
      removeQueryParameter();
    }
  }, [collabWorkDetailsDrawerOpen]);

  return (
    <>
      {!loading ?
        <>
          {collabWorks?.length > 0 &&
            <>
              <Box p={theme.spacing(2, 4)}>
                {/* Dialogs rendering start */}

                {currentCollabWorkDetails && (
                  <CollabWorksDetailsDrawer
                    collabWorkDetails={currentCollabWorkDetails}
                    drawerOpen={collabWorkDetailsDrawerOpen}
                    toggleDrawer={() =>
                      setCollabWorkDetailsDrawerOpen((prevState) => !prevState)
                    }
                  />
                )}
                {/* Dialogs rendering end */}
                <>
                  <SectionHeader text={t('Works')} />

                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      columnGap: '20px',
                      rowGap: '20px',
                    }}
                  >
                    {collabWorks?.length > 0 &&
                      collabWorks?.map((collabWork, index) => {
                        return (
                          <CollabWorkCard
                            key={index}
                            title={collabWork?.title}
                            description={collabWork?.description}
                            image={collabWork?.files[0]?.url}
                            user={collabWork?.addedBy}
                            onClick={() => {
                              setCurrentCollabWorkDetails(collabWork);
                              appendQuery(collabWork?._id);
                              setCollabWorkDetailsDrawerOpen(true);
                            }}
                          />
                        );
                      })}
                  </Box>
                </>
              </Box>
              {!hideDivider && collabWorks?.length > 0 && <Divider color={theme.palette.text.primary} margin={0} />}
            </>
          }
        </> :
        <Box p={theme.spacing(2, 4)}>
          <Spacer />
          <SectionHeader text={t('Works')} />
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              columnGap: '10px',
              rowGap: '10px',
            }}
          >
            {[...Array(3)].map((index) => (
              <ImagePanelCardSkeleton key={index} />
            ))}
          </Box>
        </Box>
        }
    </>
  );
};
