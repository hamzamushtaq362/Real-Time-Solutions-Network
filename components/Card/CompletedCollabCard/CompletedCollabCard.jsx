import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import {
  ImagePanelCardContainer,
  PanelImage,
  CardTitleText,
  PanelDetailsContainer,
  CreatorInfo,
  CardImageWrap,
  CreatorsWrap,
} from './elements';
import { Avatar } from '~/components';
import { truncateString } from '~/utils';
import Link from 'next/link';
import {
  AvatarWrap,
  SeeAllWrap,
} from 'components/Collective/CollectiveExplore/CollectiveCard/elements';
import { FlexBox } from 'components/common/elements';

export const CompletedCollabCard = ({
  image,
  title,
  user,
  isLoading,
  handleClick,
  cardClickHref,
  members,
  sx,
  onClick,
}) => {
  const { t } = useTranslation();
  const [acceptedMembers, setAcceptedMembers] = useState();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (members) {
      const acceptedMembers = members.filter((user) => {
        if (user.status === 'ACCEPTED') {
          return user.user;
        }
      });
      if (acceptedMembers.length > 0) {
        acceptedMembers.push({ user });
      }
      setAcceptedMembers(acceptedMembers);
    }
  }, [members]);

  const remainingCount =
    acceptedMembers?.length > 6 ? acceptedMembers?.length - 6 : null;

  const CustomLink = ({ children }) => {
    if (cardClickHref) {
      return (
        <Link href={cardClickHref} onClick={onClick}>
          {children}
        </Link>
      );
    } else {
      return <div onClick={onClick}>{children}</div>;
    }
  };

  return (
    <>
      {!isLoading ? (
        <CustomLink>
          <ImagePanelCardContainer
            {...sx}
            onClick={handleClick ? handleClick : () => {}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            hovered={isHovered}
          >
            <CardImageWrap>
              <PanelImage src={image} alt="image" />
              {isHovered && <CreatorsWrap>
                {acceptedMembers && acceptedMembers.length > 0 ? (
                  <FlexBox>
                    {acceptedMembers?.length > 0 &&
                      acceptedMembers.slice(0, 6)?.map(({ user }) => (
                        <AvatarWrap key={user?.imageUrl}>
                          <Avatar
                            size={36}
                            avatar={user?.imageUrl}
                            tooltip={user?.fullName}
                            tooltipPlacement='top'

                          />
                        </AvatarWrap>
                      ))}
                    {remainingCount && (
                      <SeeAllWrap>
                        {t('See all')}
                        {remainingCount}
                        {t('members')}
                      </SeeAllWrap>
                    )}
                  </FlexBox>
                ) : (
                  <CreatorInfo>
                    <AvatarWrap key={user?.imageUrl}>
                      <Avatar
                        size={36}
                        avatar={user?.imageUrl}
                        tooltip={user?.fullName}
                        tooltipPlacement='top'
                      />
                    </AvatarWrap>
                  </CreatorInfo>
                )}
              </CreatorsWrap>}
            </CardImageWrap>


            <PanelDetailsContainer>
              <>
                {title.length > 25 ? (
                  <CardTitleText hovered={isHovered}>
                    {title
                      ? title.length > 25
                        ? truncateString(title, 25)
                        : title
                      : 'No Title Found'}
                  </CardTitleText>
                ) : (
                  <CardTitleText hovered={isHovered}>
                    {title ? title : 'No Title Found'}
                  </CardTitleText>
                )}
              </>
            </PanelDetailsContainer>
          </ImagePanelCardContainer>
        </CustomLink>
      ) : (
        <>{t('Loading ...')}</>
      )}
    </>
  );
};
