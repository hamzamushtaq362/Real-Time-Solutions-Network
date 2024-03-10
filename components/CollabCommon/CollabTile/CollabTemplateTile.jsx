import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  CollabTileContainer,
  CollabTitle,
  CollabTitleRow,
  CardHeading,
  CollabHeader,
  LookingForWrap,
} from './elements';
import { CollabTileSkeleton } from './CollabTileSkeleton';
import { truncateString } from '~/utils';
import { useRouter } from 'next/router';

import { useTranslation } from 'react-i18next';
import { useWindowWidth } from 'hooks/useWindowWidth';
import Categories from 'components/CollabCommon/CollabTile/Categories';
import Tags from 'components/CollabCommon/CollabTile/Tags';

export const CollabTemplateTile = ({
  id,
  identifier,
  key,
  index,
  sx,
  title,
  isLoading,
  hideRoles,
  tags,
  platformType,
  isDashboardCard,
}) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const windowWidth = useWindowWidth();
  const router = useRouter();

  return (
    <>
      {!isLoading ? (
        <CollabTileContainer
          sx={{
            margin: index === 0 ? '4px 6px 4px 0 !important' : '4px 6px',
            height: hideRoles && '40rem',
            ...sx,
          }}
          onClick={() => router.push(`/collab/template/${identifier}`)}
          key={id}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          hovered={isHovered}
          isDashboardCard={isDashboardCard}
          windowWidth={windowWidth}
        >
          <CollabTitleRow isDashboardCard={isDashboardCard}>
            <CollabHeader>
              <CardHeading hovered={isHovered}>{t('Template')}</CardHeading>
            </CollabHeader>
            <CollabTitle hovered={isHovered}>
              {title && title.length > 35 ? truncateString(title, 32) : title}
            </CollabTitle>
          </CollabTitleRow>

          {tags && tags.length !== 0 ? (
            <>
              <CardHeading hovered={isHovered}>{t('Themes')}</CardHeading>
              <LookingForWrap isDashboardCard={isDashboardCard}>
                <Tags {...{isHovered, tags}} />
              </LookingForWrap>
            </>
          ) : (
            <Box height={100} />
          )}

          {platformType && platformType.length !== 0 ? (
            <>
              <CardHeading hovered={isHovered}>{t('Category')}</CardHeading>
              <LookingForWrap isDashboardCard={isDashboardCard} height={35}>
                <Categories {...{isHovered, platformType}} />
              </LookingForWrap>
            </>
          ) : (
            <Box height={30} />
          )}
        </CollabTileContainer>
      ) : (
        <CollabTileSkeleton key={key} sx={sx} />
      )}
    </>
  );
};
