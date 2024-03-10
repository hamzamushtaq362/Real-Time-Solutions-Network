import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import {
  CollabWorkCard,
  AddWorkPlaceholder,
  CollabBTSDetailsDrawer,
  ImagePanelWorkCardSkeleton,
} from '~/components';
import { WorksGridContainer } from './elements';
import { getCollabBTS } from 'apis';

export const BTSSection = ({
  collabId,
  collabIdentifier,
  hideAddWorkPlaceholder,
}) => {
  const [loading, setLoading] = useState(false);
  const [collabBTS, setCollabBTS] = useState([]);

  const [currentCollabBTSDetails, setCurrentCollabBTSDetails] = useState(null);

  const [collabBTSDetailsDrawerOpen, setCollabBTSDetailsDrawerOpen] =
    useState(false);

  const fetchCollabBTS = async () => {
    try {
      setLoading(true);
      const response = await getCollabBTS(collabId);
      if (response.data.status === 'success') {
        setCollabBTS(response.data.collabBTS);
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollabBTS();
  }, [collabId]);

  return (
    <>
      {/* Dialogs rendering start */}
      {currentCollabBTSDetails && (
        <CollabBTSDetailsDrawer
          collabBTSDetails={currentCollabBTSDetails}
          drawerOpen={collabBTSDetailsDrawerOpen}
          toggleDrawer={() =>
            setCollabBTSDetailsDrawerOpen((prevState) => !prevState)
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
            {collabBTS.length > 0 &&
              collabBTS.map((collabBTS, index) => (
                <CollabWorkCard
                  key={index}
                  title={collabBTS?.title}
                  description={collabBTS?.description}
                  image={collabBTS?.files[0]?.url}
                  user={collabBTS?.addedBy}
                  onClick={() => {
                    setCurrentCollabBTSDetails(collabBTS);
                    setCollabBTSDetailsDrawerOpen(true);
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
