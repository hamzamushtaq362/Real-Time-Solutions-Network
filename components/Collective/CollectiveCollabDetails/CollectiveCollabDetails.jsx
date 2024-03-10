import React, { useContext, useEffect, useState } from 'react';
import { getSingleCollectiveProjectDetails } from 'apis/collectiveProject';
import { CollabDetailsMain } from '~/components';
import { Box } from '@mui/material';
import AppContext from 'context/AppContext';
import { useRouter } from 'next/router';

export const CollectiveCollabDetails = ({
  collectiveCollabId,
  collectiveLink,
}) => {
  const router = useRouter();
  const { user } = useContext(AppContext);
  const [collabDetails, setCollabDetails] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const collab = await getSingleCollectiveProjectDetails(
        collectiveCollabId,
      );

      if (collab) {
        const {
          creatorId: { _id: creatorId },
        } = collab;
        setIsAdmin(creatorId === user?.userId);
        setCollabDetails(collab);
      }
    };

    getData();
  }, [collectiveCollabId]);

  return (
    <>
      {collabDetails && (
        <Box pt={0} px={4} pb={4}>
          <CollabDetailsMain
            collab={collabDetails}
            isCollabBelongsToLoginUser={isAdmin}
            showCreatorDetails={true}
            isCollectiveProject={true}
            onNavigateBack={() => router.push(`/team/${collectiveLink}`)}
          />
        </Box>
      )}
    </>
  );
};
