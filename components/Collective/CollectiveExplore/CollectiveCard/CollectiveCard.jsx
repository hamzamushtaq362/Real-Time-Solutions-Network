import { Avatar } from 'components/Avatar';
import React, { useEffect, useState } from 'react';
import {
  AvatarWrap,
  CollectiveDescription,
  CollectiveTileContainer,
  HeadingWrap,
  MembersWrap,
  SeeAllWrap,
} from './elements';
import {
  NFTDetailsContainer,
  NFTImage,
  NFTTitleText,
} from 'components/NFTTile/elements';
import Link from 'next/link';
import { NFTTileSkeleton } from 'components/NFTTile/NFTTileSkeleton';
import { Divider, Tooltip } from '~/components';
import { truncateString } from '~/utils';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';

export const CollectiveCard = ({ collective, skeleton }) => {
  const theme = useTheme();
  const router = useRouter();
  const [acceptedMembers, setAcceptedMembers] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  const {
    title,
    introduction,
    collectiveBanner,
    collectiveLink,
    image,
    admin,
    members,
  } = collective || {};
  useEffect(() => {
    if (members) {
      const acceptedMembers = members.filter((user) => {
        if (user.status === 'ACCEPTED') {
          return user.userId;
        }
      });
      setAcceptedMembers([{ userId: admin }, ...acceptedMembers]);
    }
  }, [members]);

  const handleSeeAllMembers = () =>
    router.push(`/team/${collectiveLink}?view=members`);

  const remainingCount =
    acceptedMembers?.length > 6 ? acceptedMembers?.length - 6 : null;

  return !skeleton ? (
    <Link href={`/team/${collectiveLink}`}>
      <CollectiveTileContainer
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        hovered={isHovered}
      >
        <NFTImage src={collectiveBanner} alt="nft-image" />
        <NFTDetailsContainer p="0 !important">
          <>
            <HeadingWrap>
              <Avatar size={42} avatar={image} />
              <NFTTitleText px={2.3}>
                {title
                  ? title.length > 23
                    ? truncateString(title, 23)
                    : title
                  : 'No Title Found'}
              </NFTTitleText>
            </HeadingWrap>

            <Divider hovered={isHovered} />

            <CollectiveDescription>{introduction}</CollectiveDescription>

            <Divider />

            <MembersWrap>
              {acceptedMembers?.length > 0 &&
                acceptedMembers
                  .slice(0, 6)
                  ?.map(({ userId: memberDetails }) => (
                    <Tooltip
                      title={memberDetails?.fullName}
                      key={memberDetails?._id}
                    >
                      <AvatarWrap>
                        <Avatar
                          size={38}
                          avatar={memberDetails?.imageUrl}
                          showRing
                          ringColor={'transparent'}
                          filledColor={theme.palette.text.primary}
                          withBorder={false}
                          ringWidth={8}
                        />
                      </AvatarWrap>
                    </Tooltip>
                  ))}
              {remainingCount && (
                <SeeAllWrap onClick={handleSeeAllMembers} hovered={isHovered}>
                  {t('See all')} {remainingCount} {t('members')}
                </SeeAllWrap>
              )}
            </MembersWrap>
          </>
        </NFTDetailsContainer>
      </CollectiveTileContainer>
    </Link>
  ) : (
    <NFTTileSkeleton />
  );
};
