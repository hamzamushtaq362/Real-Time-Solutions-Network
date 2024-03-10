import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import {
  InformationSectionContainer,
  InformationLeftContainer,
  InformationRightContainer,
  BiographyContainer,
  InformationHeader,
  InformationLabel,
  LabelValueRow,
  SmallLabel,
  LabelBox,
  InformationPara,
  GroupItemsContainer,
  SmallLink,
  AchievementsContainer,
  FeaturedInContainer,
} from './elements';

import { Spacer, Tooltip, Avatar, DoubleEllipseIcon } from '~/components';
import { useTheme, Box, Grid } from '@mui/material';

import { format } from 'date-fns';

import { useRouter } from 'next/router';
import { FlexBox } from 'components/common/elements';
import {
  FeaturedInLink,
  InformationSubText, RightLink,
} from 'components/CreatorProfile/CreatorProfileInformationSection/elements';
import { openLinkInNewTab } from 'utils/utils';

export const CollectiveProfileInformationSection = ({
  collective,
  setActiveButton,
}) => {
  const { t } = useTranslation();

  const [memberSinceDate, setMemberSinceDate] = useState('-');
  const [acceptedMembers, setAcceptedMembers] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (collective.createdAt) {
      const createdAtDate = new Date(collective.createdAt);
      if (createdAtDate) {
        const formattedDate = format(createdAtDate, 'MMMM, yyyy');
        setMemberSinceDate(formattedDate);
      }
    }

    // Filtering out the accepted collective members
    const acceptedMembers = collective?.members
      ?.filter((member) => member?.status === 'ACCEPTED')
      .map((member) => member);
    setAcceptedMembers([{ userId: collective?.admin }, ...acceptedMembers]);
  }, [collective]);

  const theme = useTheme();
  return (
    <InformationSectionContainer>
      <InformationLeftContainer>
        <Grid container columnSpacing={'2'} rowSpacing={'10'}>
          <Grid item xs={12} md={6}>
            <BiographyContainer>
              {/* Biography Section */}
              <Grid item xs={12}>
                <InformationHeader>{t('Description')}</InformationHeader>
                <Spacer value={50} />
                <InformationPara>{collective?.biography}</InformationPara>
              </Grid>
              <Spacer value={50} />
              <Grid item xs={12}>
                <InformationHeader>{t('Introduction')}</InformationHeader>
                <Spacer value={50} />
                <InformationPara>{collective?.introduction}</InformationPara>
              </Grid>
              <Spacer value={50} />
            </BiographyContainer>
          </Grid>
          <AchievementsContainer>
            {collective?.achievements?.length > 0 ? (
              <>
                <InformationHeader>{t('Achievements')}</InformationHeader>
                <Spacer value={50} />
                {collective?.achievements?.map(({ title, date, _id }) => (
                  <>
                    <FlexBox key={_id}>
                      <InformationSubText flex={2}>
                        {title ? title : '-'}
                      </InformationSubText>

                      <InformationSubText sx={{ marginLeft: '4px' }}>
                        {date ? format(new Date(date), 'MMMM, yyyy') : '-'}
                      </InformationSubText>
                    </FlexBox>
                  </>
                ))}{' '}
              </>
            ) : (
              <></>
            )}
          </AchievementsContainer>

          <FeaturedInContainer>
            {collective?.featuredIn?.length > 0 ? (
              <>
                <InformationHeader>{t('Featured In')}</InformationHeader>
                <Spacer value={50} />
                {collective?.featuredIn?.map(({ title, url, metaTitle, _id }) => (
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
                  </>
                ))}{' '}
              </>
            ) : (
              <></>
            )}
          </FeaturedInContainer>
          <FeaturedInContainer>
            {collective?.marketplaces?.length > 0 ? (
              <>
                <InformationHeader>{t('Marketplaces In')}</InformationHeader>
                <Spacer value={50} />
                {collective?.marketplaces?.map(({ name, value, _id }) => (
                  <>
                    <LabelBox key={_id}>
                      <InformationSubText>
                        {name ? name : '-'}
                      </InformationSubText>

                      <FeaturedInLink
                        onClick={() =>
                          openLinkInNewTab(
                            value.includes('http') ? value : `http://${value}`,
                          )
                        }
                        sx={{ marginLeft: '4px' }}
                      >
                        {value} ↗
                      </FeaturedInLink>
                    </LabelBox>
                  </>
                ))}{' '}
              </>
            ) : (
              <></>
            )}
          </FeaturedInContainer>
        </Grid>
      </InformationLeftContainer>
      <InformationRightContainer>
        {/* Label Value Rows Starts */}
        <>
          <LabelValueRow mb={2}>
            <LabelBox>
              <DoubleEllipseIcon
                width="15px"
                height="15px"
                color={theme.palette.grey.common}
              />
              <SmallLabel>{t('Member Since')}</SmallLabel>
            </LabelBox>

            <SmallLabel color={theme.palette.text.primary}>
              {memberSinceDate}
            </SmallLabel>
          </LabelValueRow>
        </>
        {/* Label Value Rows Ends */}
        {/* Members Start */}
        <InformationLabel mb={0.5}>{t('Members')}</InformationLabel>
        {acceptedMembers?.length > 0 ? (
          <>
            <GroupItemsContainer>
              {acceptedMembers.map(({ userId }) => (
                <Tooltip
                  title={userId?.fullName ? userId?.fullName : userId?.username}
                  key={userId?._id}
                >
                  <Box>
                    <Avatar avatar={userId?.imageUrl} />
                  </Box>
                </Tooltip>
              ))}
            </GroupItemsContainer>

            <SmallLink
              onClick={() => {
                router.push(`/team/${collective?.collectiveLink}?view=members`);
                setActiveButton('members');
              }}
              mt={0.5}
            >
              {t('See all members')}
            </SmallLink>
          </>
        ) : (
          <>
            <SmallLabel>{t('No Members found')}</SmallLabel>
          </>
        )}
        <FeaturedInContainer mt={2} padding='24px 0 24px 24px'>
          {collective?.socials?.length > 0 ? (
            <>
              <InformationLabel sx={{ marginLeft: '-1.5rem' }}>
                {' '}
                {t('Socials')}
              </InformationLabel>
              <Spacer value={10} />
              {collective?.socials?.map(({ name, value, metaTitle, _id }) => (
                <>
                  <LabelBox sx={{ marginLeft: '-1.5rem' }} key={_id} justifyContent='space-between'>
                    <InformationSubText>{name ? name : '-'}</InformationSubText>
                    <RightLink
                      onClick={() =>
                        openLinkInNewTab(
                          value.includes('http') ? value : `http://${value}`,
                        )
                      }
                      sx={{ marginLeft: '4px' }}
                    >
                      {metaTitle || value} ↗
                    </RightLink>
                  </LabelBox>
                </>
              ))}{' '}
            </>
          ) : (
            <></>
          )}
        </FeaturedInContainer>

        {collective?.showReel && (
          <>
            <FlexBox sx={{ gap: '5rem' }}>
              <InformationLabel>{t('Showreel')}</InformationLabel>

              <RightLink
                onClick={() =>
                  openLinkInNewTab(
                    collective?.showReel.includes('http')
                      ? collective?.showReel
                      : `http://${collective?.showReel}`,
                  )
                }
                sx={{ marginLeft: '4px' }}
              >
                {collective?.showReel} ↗
              </RightLink>

              {/* <LinkText
                onClick={() =>
                  openLinkInNewTab(
                    collective?.showReel?.includes('http')
                      ? collective?.showReel
                      : `http://${collective?.showReel}`,
                  )
                }
              >
                {collective?.showReel ? collective?.showReel : '-'}
              </LinkText> */}
            </FlexBox>
          </>
        )}

        {/* Platforms End */}
      </InformationRightContainer>
    </InformationSectionContainer>
  );
};
