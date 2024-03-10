import {
  ONBOARD_COVER_PLACEHOLDER_IMAGE,
  ONBOARD_PROFILE_PLACEHOLDER_IMAGE,
  ONBOARD_COVER_PLACEHOLDER_IMAGE_DARK,
  ONBOARD_PROFILE_PLACEHOLDER_IMAGE_DARK,
  BRAND_LOGO_LIGHT,
  BRAND_LOGO_DARK,
} from '~/constants';

import {
  VerifyMarkDark,
  VerifyMarkLight,
  ShareBlackIcon,
  ShareWhiteIcon,
} from '~/assets';

import { useTheme } from '@mui/material';

// A hook to manage light and dark theme images as some images require separate version for dark and light theme images
export const useThemeVariantImage = (imageName) => {
  const theme = useTheme();

  const imagesData = {
    dark: {
      'onboard-profile-placeholder-image':
        ONBOARD_PROFILE_PLACEHOLDER_IMAGE_DARK,
      'onboard-cover-placeholder-image': ONBOARD_COVER_PLACEHOLDER_IMAGE_DARK,
      'brand-logo': BRAND_LOGO_LIGHT,
      'verify-mark': VerifyMarkLight,
      'verify-mark-inverse': VerifyMarkDark,
      'share-icon': ShareWhiteIcon,
    },
    light: {
      'onboard-profile-placeholder-image': ONBOARD_PROFILE_PLACEHOLDER_IMAGE,
      'onboard-cover-placeholder-image': ONBOARD_COVER_PLACEHOLDER_IMAGE,
      'brand-logo': BRAND_LOGO_DARK,
      'verify-mark': VerifyMarkDark,
      'verify-mark-inverse': VerifyMarkLight,
      'share-icon': ShareBlackIcon,
    },
  };

  return imagesData[theme.palette.mode || 'light'][imageName];
};
