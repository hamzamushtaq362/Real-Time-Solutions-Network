import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import {
  CollabWorkCard,
  AddWorkPlaceholder,
  CollabWorksDetailsDrawer,
  ImagePanelWorkCardSkeleton,
} from '~/components';
import { WorksGridContainer } from './elements';
import { getCollabWorks } from 'apis';

export const WorksSection = ({
  collabId,
  collabIdentifier,
  hideAddWorkPlaceholder,
}) => {
  const [loading, setLoading] = useState(false);
  const [collabWorks, setCollabWorks] = useState([]);

  const [currentCollabWorkDetails, setCurrentCollabWorkDetails] =
    useState(null);

  const [collabWorkDetailsDrawerOpen, setCollabWorkDetailsDrawerOpen] =
    useState(false);

  const fetchCollabWorks = async () => {
    try {
      setLoading(true);
      const response = await getCollabWorks(collabId);
      if (response.data.status === 'success') {
        setCollabWorks(response.data.subCollabs);
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollabWorks();
  }, [collabId]);

  return (
    <>
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

      <WorksGridContainer>
        {!hideAddWorkPlaceholder && (
          <AddWorkPlaceholder collabIdentifier={collabIdentifier} />
        )}

        {!loading ? (
          <>
            {collabWorks.length > 0 &&
              collabWorks.map((collabWork, index) => (
                <CollabWorkCard
                  key={index}
                  title={collabWork?.title}
                  description={collabWork?.description}
                  image={collabWork?.files[0]?.url}
                  user={collabWork?.addedBy}
                  onClick={() => {
                    setCurrentCollabWorkDetails(collabWork);
                    setCollabWorkDetailsDrawerOpen(true);
                  }}
                />
              ))}
          </>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                columnGap: '10px',
                rowGap: '10px',
              }}
            >
              {[...Array(3)].map((index) => (
                <ImagePanelWorkCardSkeleton key={index} />
              ))}
            </Box>
          </>
        )}
      </WorksGridContainer>
    </>
  );
};
