import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { HeartButton } from '~/components';
import {
  CollabTileContainer,
  CollabTitle,
  FlexContainer,
  CollabTitleRow,
  CardHeading,
  CollabHeader,
  RoleText,
  DotWrap,
  LookingForWrap,
  NearbyTag,
} from './elements';
import { CollabTileSkeleton } from './CollabTileSkeleton';
import { trackMixPanel, truncateString } from '~/utils';
import { BASE_URL } from '~/apis';
import Link from 'next/link';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import UserInfo from 'components/CollabCommon/CollabTile/UserInfo';
import { DraftIcon } from '~/assets';
import Image from 'next/image';
import { useWindowWidth } from 'hooks/useWindowWidth';
import { useHideDot } from 'hooks/useHideDot';

export const CollabTile = ({
  isLiked,
  id,
  identifier,
  key,
  index,
  sx,
  title,
  creatorName,
  creatorImage,
  isLoading,
  roles,
  statusIcon,
  connections,
  location,
  showLocation,
  showNearbyTag,
  hideRoles,
  collabHeartButtonClickSideEffect,
  isDashboardCard,
  hideLikes,
  totalCollabs = 0,
  status,
  isTemplate,
  isEvent,
}) => {
  const windowWidth = useWindowWidth();
  const [collabLiked, setCollabLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  const { containerRef } = useHideDot(roles);

  const addLikeDislike = async (id) => {
    try {
      setCollabLiked((prevState) => !prevState);
      await axios.post(`${BASE_URL}/api/v1/collab/addLikeDislike`, {
        collabId: id,
      });
    } catch (err) {
      setCollabLiked(isLiked);
    }
  };

  useEffect(() => {
    setCollabLiked(isLiked);
  }, [isLiked]);

  const onCollabClick = () => {
    trackMixPanel('Suggested_Collabs');
  };

  return (
    <>
      {!isLoading ? (
        <CollabTileContainer
          sx={{
            margin: index === 0 ? '4px 6px 4px 0 !important' : '4px 6px',
            ...sx,
          }}
          onClick={onCollabClick}
          key={id}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          hovered={isHovered}
          isDashboardCard={isDashboardCard}
          draft={status === 'draft'}
          windowWidth={windowWidth}
        >
          <Link
            href={
              isEvent ? `/collab/event/{indetifier}` : `/collab/${identifier}`
            }
            style={{ width: '100%' }}
          >
            <CollabTitleRow isDashboardCard={isDashboardCard}>
              <CollabHeader>
                <CardHeading hovered={isHovered}>
                  {t('collab')}
                  {status === 'draft' && (
                    <Image
                      width="36"
                      height="30"
                      alt="Draft Icon"
                      src={DraftIcon.src}
                      style={{ marginLeft: '8px' }}
                    />
                  )}
                </CardHeading>

                {isHovered && !hideLikes ? (
                  <HeartButton
                    onClick={(event) => {
                      event.preventDefault();
                      if (collabHeartButtonClickSideEffect)
                        collabHeartButtonClickSideEffect(id);
                      return addLikeDislike(id);
                    }}
                    isLiked={collabLiked}
                    hovered={isHovered}
                  />
                ) : (
                  <div style={{ width: 20, height: 20 }} />
                )}
              </CollabHeader>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <CollabTitle hovered={isHovered}>
                  {title && title.length > 35
                    ? truncateString(title, 32)
                    : title
                        .split(' ')
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(' ')}
                </CollabTitle>

                {showNearbyTag && <NearbyTag>Nearby</NearbyTag>}
              </Box>
            </CollabTitleRow>

            {!showLocation ? (
              <>
                {!hideRoles && roles && roles.length !== 0 ? (
                  <>
                    <CardHeading hovered={isHovered}>
                      {t('Looking for')}
                    </CardHeading>
                    <LookingForWrap isDashboardCard={isDashboardCard}>
                      <FlexContainer ref={containerRef}>
                        {roles &&
                          roles.slice(0, 4).map((role, index) => (
                            <Box key={index} display="flex" alignItems="center">
                              <RoleText key={index} hovered={isHovered}>
                                {role}
                              </RoleText>
                              <DotWrap hovered={isHovered}>
                                {index !== roles.length - 1 ? '•' : ' '}
                              </DotWrap>
                            </Box>
                          ))}
                      </FlexContainer>
                    </LookingForWrap>
                  </>
                ) : (
                  <Box height={164} />
                )}
              </>
            ) : (
              <>
                <CardHeading hovered={isHovered}>{t('Location')}</CardHeading>
                <RoleText key={index} hovered={isHovered}>
                  {location}
                </RoleText>
                <Box height={120} />
              </>
            )}

            <UserInfo
              {...{
                creatorImage,
                creatorName,
                totalCollabs,
                connections,
                statusIcon,
                isHovered,
              }}
            />
          </Link>
        </CollabTileContainer>
      ) : (
        <CollabTileSkeleton key={key} sx={sx} isTemplate={isTemplate} />
      )}
    </>
  );
};
