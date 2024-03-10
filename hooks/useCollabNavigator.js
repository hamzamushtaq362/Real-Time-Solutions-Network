import { useRouter } from 'next/router';

export const useCollabNavigator = () => {
  const router = useRouter();

  const addToCollabNavigator = (collabIdentifier, type) => {
    switch (type) {
      case 'mission':
        router.push(`/collab/${collabIdentifier}/mission/create`);
        break;
      case 'event':
        router.push(`/collab/${collabIdentifier}/event/create`);
        break;
      case 'work':
        router.push(`/collab/${collabIdentifier}/work/create`);
        break;
      case 'bts':
        router.push(`/collab/${collabIdentifier}/bts/create`);
        break;
      default:
        // Handle default case if needed
        break;
    }
  };

  return addToCollabNavigator;
};
