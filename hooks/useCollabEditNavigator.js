import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { COLLAB_SOURCE } from 'constants/collab';

export const useCollabEditNavigator = () => {
  const router = useRouter();

  const onCollabEdit = async (collabDetails) => {
    if (collabDetails?.source === COLLAB_SOURCE.collective) {
      router.push(
        `/collab/${collabDetails?.identifier}/edit?source=${collabDetails?.source}&collective=${collabDetails?.collective}`,
      );
    } else {
      router.push(
        `/collab/${collabDetails?.identifier}/edit?source=${collabDetails?.source}`,
      );
    }
  };

  useEffect(() => {
    // Can add any side effects or logic related to this functionality
    // For example, you might want to do something after the navigation.
  }, []);

  return { onCollabEdit };
};
