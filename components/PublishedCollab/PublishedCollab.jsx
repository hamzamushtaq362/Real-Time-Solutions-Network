import React, { useContext, useEffect, useState } from 'react';

import { BASE_URL, fetchRefreshToken } from '~/apis';
import axios from 'axios';
import { useRouter } from 'next/router';
import { reFetchTokenExpire } from '~/redux';
import AppContext from 'context/AppContext';
import { FlexBox } from 'components/common/elements';
import { LoadMore } from 'components/Loading';
import { PublishedCollabDetails } from 'components/PublishedCollab/PublishedCollabDetails';
import { CollabDetailsContainer } from 'components/CollabDetails/CollabDetailsLayouts/elements';
import { useSelector } from 'react-redux';

export const PublishedCollab = () => {
  const router = useRouter();
  const { user } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const collabId = router.query.collabId;
  const [collabData, setCollabData] = useState(null);
  const [collabIdentifier, setCollabIdentifier] = useState(null);
  const { isNFTPublished } = useSelector((state) => state.collab);

  const getCollaboration = async () => {
    try {
      setLoading(true);
      const f1 = async () => {
        const res = await axios.get(`${BASE_URL}/api/v1/collab/${collabId}`);
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        const collab = res.data.data.collab;
        setCollabData(collab);
        setCollabIdentifier(collab?.identifier);
        const {
          creatorId: { _id: creatorId },
        } = collab;
        setIsAdmin(creatorId === user.userId);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (collabId) {
      getCollaboration();
    }
  }, [collabId]);

  if (loading && !collabData) {
    return (
      <FlexBox justifyContent="center" width="100%" height="100%">
        <LoadMore inverse />
      </FlexBox>
    );
  }

  return (
    <>
      <CollabDetailsContainer>
        <PublishedCollabDetails
          collab={collabData}
          showCreatorDetails={true}
          isAdmin={isAdmin}
          onNavigateBack={() => router.push(`/collab/${collabIdentifier}`)}
          isNFTPublished={isNFTPublished}
        />
      </CollabDetailsContainer>
    </>
  );
};
