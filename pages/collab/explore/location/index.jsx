import { useEffect, useState } from 'react';
import { MainLayout, AuthLayout } from 'layouts';
import { CollabExploreLocation } from '~/components';
import { getExploreCollabsMetaInformation } from '~/utils';
import { useRouter } from 'next/router';

export default function ExplorePage() {
  const router = useRouter();
  // const [placeId, setPlaceId] = useState('');
  const [place, setPlace] = useState('');

  // useEffect(() => {
  //   const placeId = router.query.placeId;
  //   setPlaceId(placeId);
  // }, [router]);

  useEffect(() => {
    const place = router.query.place;
    setPlace(place);
  }, [router]);

  return (
    <>
      <CollabExploreLocation
        // placeId={placeId}
        place={place}
      />
    </>
  );
}

ExplorePage.getLayout = function getLayout(page) {
  const { title, description, image, keywords } =
    getExploreCollabsMetaInformation();

  return (
    <MainLayout
      title={title}
      description={description}
      image={image}
      keywords={keywords}
    >
      <AuthLayout>{page}</AuthLayout>
    </MainLayout>
  );
};
