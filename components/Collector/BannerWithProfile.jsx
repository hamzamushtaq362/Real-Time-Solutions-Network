import {
  SectionBannerContainer,
  SectionBannerCoverImage,
} from 'components/UserProfile/SectionBanner/elements';
import React from 'react';
import { BannerGradient, RoundedGradient } from './element';

export default function BannerWithProfile({ url, gradient }) {
  return (
    <SectionBannerContainer>
      {url ? (
        <SectionBannerCoverImage
          src={url}
          alt="banner"
          sx={{
            width: '100%',
            borderRadius: '1.5rem',
            height: '35rem',
            objectFit: "cover",
          }}
        />
      ) : (
        <BannerGradient background={gradient} />
      )}

      <RoundedGradient background={gradient} />
    </SectionBannerContainer>
  );
}
