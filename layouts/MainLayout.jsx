import React from 'react';
import Header from 'subcomponents/Header';
import { PREVIEW_BRAND_LOGO } from '~/constants';

export const MainLayout = ({
  title,
  description,
  image,
  keywords,
  children,
}) => {
  return (
    <div>
      <Header
        title={title || 'rtsn. - Platform for Metaverse Creators'}
        description={
          description ||
          'Join to discover exciting Metaverse Creators to Collaborate and launch NFTs. Find opportunities to Build exciting Virtual worlds, Avatars, Wearables.'
        }
        image={image || PREVIEW_BRAND_LOGO}
        keywords={keywords || 'Metaverse, NFTs, Virtual worlds'}
      />
      <main>{children}</main>
    </div>
  );
};
