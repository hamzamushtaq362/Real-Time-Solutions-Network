import React, { useState } from 'react';
import {
  InformationSectionContainer,
  BiographyContainer,
  SkillsContainer,
  InformationHeader,
  InformationLabel,
  LabelChipsContainer,
  LabelValueRow,
  SmallLabel,
  LabelBox,
  InformationPara,
  InformationSubText,
  PlatformsContainer,
  AchievementsContainer,
  FeaturedInContainer,
  FeaturedInLink,
  BioSkillWrap,
  InformationContainer1,
  InformationContainer2,
  InformationContainer3,
  LinkText,
} from './elements';
import {
  Spacer,
  Tooltip,
  Avatar,
  MailIcon,
  GlobeIcon,
  DoubleEllipseIcon,
} from '~/components';
import { useTheme, Box } from '@mui/material';

import { format } from 'date-fns';

import { getPlatformMappings } from '~/constants';

import { openLinkInNewTab } from '~/utils';

import { useEffect } from 'react';
import { FlexBox } from 'components/common/elements';
import VerticalDivider from 'components/Divider/VerticalDivider';
import { ActionText } from 'components/DashboardHome/elements';
import { useTranslation } from 'react-i18next';
import { _renderSocialLink } from '../EditableLink/DisplayLinkUi/DisplayLinkUi';

export const CreatorProfileInformationSection = ({
  user,
  platforms,
  profileBelongsToLoggedInUser,
}) => {
  const { t } = useTranslation();
  const [memberSinceDate, setMemberSinceDate] = useState('-');
  const badges = user?.assignedBadges || [];

  useEffect(() => {
    if (user.createdAt) {
      const createdAtDate = new Date(user.createdAt);
      if (createdAtDate) {
        const formattedDate = format(createdAtDate, 'MMMM, yyyy');
        setMemberSinceDate(formattedDate);
      }
    }
  }, [user]);

  const theme = useTheme();
  return (
    <InformationSectionContainer>
      <InformationContainer1>
        <BioSkillWrap>
          {user?.bio && <BiographyContainer>
            {/* Biography Section */}
            <>
              <InformationHeader>{t('Biography')}</InformationHeader>

              <Spacer value={30} />
              <InformationPara>{user?.bio}</InformationPara>
            </>

            <Spacer value={60} />
          </BiographyContainer>}

          {/* Skills */}

          {user?.skills?.length > 0 &&
            <SkillsContainer>
              <InformationHeader>{t('Skills')}</InformationHeader>

              <Spacer value={30} />

              <LabelChipsContainer>
                {user?.skills?.map((skill, index) => [
                  <ActionText key={skill} mx={0.7} hoverMb={-1}>
                    {skill}
                  </ActionText>,
                  index !== user?.skills?.length - 1 && (
                    <VerticalDivider color={theme.palette.text.primary} />
                  ),
                ])}
              </LabelChipsContainer>
            </SkillsContainer>
          }
        </BioSkillWrap>

        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          {/*Achievements  */}
          <AchievementsContainer>
            {user?.achievements?.length > 0 ? (
              <>
                <InformationHeader>{t('Achievements')}</InformationHeader>
                <Spacer value={30} />
                {user?.achievements?.map(({ title, date, _id }) => (
                  <>
                    <FlexBox key={_id}>
                      <InformationSubText flex={2}>
                        {title ? title : '-'}
                      </InformationSubText>

                      <InformationSubText sx={{ marginLeft: '4px' }}>
                        {date ? format(new Date(date), 'MMMM, yyyy') : '-'}
                      </InformationSubText>
                    </FlexBox>
                    <Spacer value={10} />
                  </>
                ))}{' '}
              </>
            ) : (
              <></>
            )}
          </AchievementsContainer>

          <FeaturedInContainer>
            {user?.featuredIn?.length > 0 ? (
              <>
                <InformationHeader>{t('Featured In')}</InformationHeader>
                <Spacer value={30} />
                {user?.featuredIn?.map(({ title, url, metaTitle, _id }) => (
                  <>
                    <LabelBox key={_id}>
                      <InformationSubText>
                        {title ? title : '-'}
                      </InformationSubText>

                      <FeaturedInLink
                        onClick={() =>
                          openLinkInNewTab(
                            url.includes('http') ? url : `http://${url}`,
                          )
                        }
                        sx={{ marginLeft: '4px' }}
                      >
                        {metaTitle || url} ↗
                      </FeaturedInLink>
                    </LabelBox>
                    <Spacer value={10} />
                  </>
                ))}{' '}
              </>
            ) : (
              <></>
            )}
          </FeaturedInContainer>
        </Box>
      </InformationContainer1>
      {badges?.length !== 0 && (
        <InformationContainer2>
          <InformationHeader>{t('Badges')}</InformationHeader>
          <Spacer value={30} />
          <FlexBox mt={2} flexWrap="wrap">
            {badges?.map((badge, index) => (
              <Avatar
                key={index}
                borderSize="1px"
                size={50}
                marginRight="10px"
                avatar={badge?.badgeObjectId?.image}
                statusIconSize="36px"
                borderRadius={'50%'}
                statusIconRightPosition={-6}
                statusIconBottomPosition={-6}
              />
            ))}
          </FlexBox>
        </InformationContainer2>
      )}
      <InformationContainer3>
        {/* Label Value Rows Starts */}
        <>
          <LabelValueRow>
            <LabelBox>
              <DoubleEllipseIcon
                width="15px"
                height="15px"
                color={theme.palette.grey.common}
              />{' '}
              <SmallLabel>{t('Member Since')}</SmallLabel>
            </LabelBox>

            <SmallLabel color={theme.palette.text.primary}>
              {memberSinceDate}
            </SmallLabel>
          </LabelValueRow>

          {profileBelongsToLoggedInUser && (
            <>
              <Spacer value={18} />

              {user?.email && (
                <LabelValueRow>
                  <LabelBox>
                    <MailIcon
                      width="15px"
                      height="15px"
                      color={theme.palette.grey.common}
                    />{' '}
                    <SmallLabel>{t('Email')}</SmallLabel>
                  </LabelBox>

                  <SmallLabel color={theme.palette.text.primary}>
                    {user?.email ? user.email : '-'}
                  </SmallLabel>
                </LabelValueRow>
              )}
            </>
          )}

          <Spacer value={18} />

          {user?.otherSocialLink && (
            <LabelValueRow>
              <LabelBox>
                <GlobeIcon
                  width="15px"
                  height="15px"
                  color={theme.palette.grey.common}
                />{' '}
                <SmallLabel>{t('Website')}</SmallLabel>
              </LabelBox>

              <LinkText
                onClick={() =>
                  openLinkInNewTab(
                    user?.otherSocialLink.includes('http')
                      ? user?.otherSocialLink
                      : `http://${user?.otherSocialLink}`,
                  )
                }
              >
                {user?.otherSocialLink ? user?.otherSocialLink : '-'}
              </LinkText>
            </LabelValueRow>
          )}
        </>
        {/* Label Value Rows Ends */}
        <Spacer value={50} />

        {user?.showReel?.url && (
          <>
            <InformationLabel>{t('Showreel')}</InformationLabel>

            <LinkText
              onClick={() =>
                openLinkInNewTab(
                  user.showReel.url?.includes('http')
                    ? user.showReel.url
                    : `http://${user.showReel.url}`,
                )
              }
            >
              {user.showReel.metaTitle || user.showReel.url} ↗
            </LinkText>
          </>
        )}

        <Spacer value={50} />

        {user?.socials?.length > 0 && (
          <>
            <InformationHeader sx={{fontSize: 16}}>{t('Socials')}</InformationHeader>
            {user?.socials?.map(({ metaTitle, value }, index) =>
              <Box key={index} my={1}>
                {_renderSocialLink(metaTitle, value)}
              </Box>
            )}
          </>
        )}

        <Spacer value={50} />

        {user?.marketplaces?.length > 0 && (
          <>
            <InformationHeader sx={{fontSize: 16}}>{t('Storefronts')}</InformationHeader>
            {user?.marketplaces?.map((marketplace, index) =>
              <LabelValueRow key={index}>
                <LinkText onClick={() => openLinkInNewTab(marketplace?.value)}>
                  {marketplace?.metaTitle || marketplace?.value}  ↗
                </LinkText>
              </LabelValueRow>
            )}
          </>
        )}

        <Spacer value={50} />
        {/* Platforms Start */}

        {platforms?.length > 0 && (
          <>
            <InformationLabel>{t('Platforms')}</InformationLabel>

            <PlatformsContainer>
              {platforms?.map((platform) => (
                <Tooltip title={platform} key={platform}>
                  <Box>
                    <Avatar avatar={getPlatformMappings(platform).image.src} />
                  </Box>
                </Tooltip>
              ))}
            </PlatformsContainer>
          </>
        )}

        {/* Platforms End */}
      </InformationContainer3>
    </InformationSectionContainer>
  );
};
