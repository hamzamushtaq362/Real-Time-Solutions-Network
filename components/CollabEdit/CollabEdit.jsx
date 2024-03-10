import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { COLLAB_SOURCE } from '~/constants';

import { CollabCreate, CreateCollabExternal } from '../CollabCreate';
import CreateCollectiveProject from 'components/Collective/CreateCollectiveProject/CreateCollectiveProject';

export const CollabEdit = ({ collabId }) => {
  const [collabSource, setCollabSource] = useState('');

  const router = useRouter();

  useEffect(() => {
    switch (router.query.source) {
      case COLLAB_SOURCE.internal:
        setCollabSource(COLLAB_SOURCE.internal);
        return;
      case COLLAB_SOURCE.external:
        setCollabSource(COLLAB_SOURCE.external);
        return;
      case COLLAB_SOURCE.collective:
        setCollabSource(COLLAB_SOURCE.collective);
        return;
      default:
        setCollabSource(COLLAB_SOURCE.internal);
        return;
    }
  }, [router.query.source]);


  return (
    <>
      {collabSource === COLLAB_SOURCE.internal && (
        <>
          <CollabCreate isEdit editCollabIdentifier={collabId} />
        </>
      )}

      {collabSource === COLLAB_SOURCE.external && (
        <>
          <CreateCollabExternal
            isEdit
            editCollabIdentifier={collabId}
          />
        </>
      )}

      {collabSource === COLLAB_SOURCE.collective && (
        <>
          <CreateCollectiveProject
            isEdit
            editCollabIdentifier={collabId}
            collectiveLink={router.query.collective}
          />
        </>
      )}
    </>
  );
};
