import React from 'react';
import {
  CollabDetailsImage,
  CollabDetailsMainContainer,
  TextandImageContentContainer,
  CollabImageWrapper,
  CollabTitle,
  CollabDetailsLeftContainer,
  CollabDetailsRightContainer,
  CollabDescription,
  CollabSubtitle,
  InfoSection,
  InfoTitle,
  Circle,
  InfoItemWrap,
  InfoLabel,
  InfoValue,
  ActionsWrap,
  ShareWrap,
} from './elements';
import { FlexBox } from 'components/common/elements';
import { Spacer, OutlinedButton, CollabDetailsSkeleton } from '~/components';
import { Box, Grid, useTheme } from '@mui/material';
import { ShareHorizontalMenu } from 'components/ShareHorizontalMenu';
import { NotFoundText } from '../../Creator/CreatorProfileCard/elements';
import CarouselWithThumbnails from 'components/Carousel/CarouselWithThumbnails';
import ShareIcon2 from 'components/Icons/ShareIcon2';
import { useTranslation } from 'react-i18next';
import { setSessionData } from '~/utils';
import { useRouter } from 'next/router';

export const CollabTemplateDetails = ({ collabTemplate }) => {
  const templateLoading = false;
  const collabTemplateUrl = '';
  const [shareAnchorEl, setShareAnchorEl] = React.useState(null);
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const handleShareCollab = (event) => {
    setShareAnchorEl(event.currentTarget);
  };

  const cloneTemplateInitiate = () => {
    setSessionData('collab-template-details', collabTemplate);
    router.push('/collab/create?isClone=true');
  };

  return (
    <>
      {!templateLoading ? (
        <CollabDetailsMainContainer>
          <Grid container>
            <Grid item md={8.5}>
              <CollabDetailsLeftContainer>
                <Box p={theme.spacing(5, 1, 7, 4)} position="relative">
                  {collabTemplate && (
                    <Box sx={{ width: '100%' }}>
                      <Spacer value={16} />
                      <CollabTitle>
                        {collabTemplate
                          ? collabTemplate?.title
                          : 'Title not found'}
                      </CollabTitle>
                      {collabTemplate?.subTitle && (
                        <CollabSubtitle>
                          {collabTemplate?.subTitle}
                        </CollabSubtitle>
                      )}
                      <TextandImageContentContainer>
                        {collabTemplate?.compressedImages ? (
                          collabTemplate.compressedImages.length === 1 ? (
                            <CollabImageWrapper>
                              <CollabDetailsImage
                                src={collabTemplate.images[0]}
                              />
                            </CollabImageWrapper>
                          ) : (
                            <CarouselWithThumbnails
                              settings={{
                                infinite: true,
                                speed: 500,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                              }}
                              mb={6}
                              images={collabTemplate.images}
                            >
                              {collabTemplate?.compressedImages.map(
                                (image, index) => (
                                  <CollabDetailsImage key={index} src={image} />
                                ),
                              )}
                            </CarouselWithThumbnails>
                          )
                        ) : null}

                        {collabTemplate?.description ? (
                          <CollabDescription>
                            {collabTemplate?.description}
                          </CollabDescription>
                        ) : (
                          <NotFoundText>
                            {t('No Description Found')}
                          </NotFoundText>
                        )}
                      </TextandImageContentContainer>
                    </Box>
                  )}
                </Box>
              </CollabDetailsLeftContainer>
            </Grid>
            <Grid item md={3.5}>
              <CollabDetailsRightContainer p={theme.spacing(0, 0, 7, 0)}>
                <ActionsWrap height={60}>
                  <ShareWrap hideBorderRight>
                    <FlexBox
                      onClick={handleShareCollab}
                      sx={{ cursor: 'pointer', marginTop: '10px' }}
                    >
                      <ShareIcon2
                        width={20}
                        height={20}
                        color={theme.palette.text.primary}
                      />
                      <Box ml={1}>Share</Box>
                    </FlexBox>
                  </ShareWrap>
                </ActionsWrap>

                <Spacer value={46} />

                <InfoSection>
                  <Circle />
                  <InfoTitle>Info</InfoTitle>
                </InfoSection>

                {collabTemplate?.tags?.length !== 0 && (
                  <InfoItemWrap>
                    <InfoLabel>Themes</InfoLabel>
                    <InfoValue>{collabTemplate?.tags?.join(', ')}</InfoValue>
                  </InfoItemWrap>
                )}

                {collabTemplate?.platformType?.length !== 0 && (
                  <InfoItemWrap>
                    <InfoLabel>Category</InfoLabel>
                    <InfoValue>
                      {collabTemplate?.platformType?.join(', ')}
                    </InfoValue>
                  </InfoItemWrap>
                )}

                {collabTemplate?.platform?.length !== 0 && (
                  <InfoItemWrap>
                    <InfoLabel>Platform</InfoLabel>
                    <InfoValue>
                      {collabTemplate?.platform?.join(', ')}
                    </InfoValue>
                  </InfoItemWrap>
                )}

                <Spacer value={30} />

                <FlexBox justifyContent="center">
                  <OutlinedButton
                    textTransform="none"
                    width="300px"
                    onClick={cloneTemplateInitiate}
                    height={54}
                  >
                    {t('Clone this template')}
                  </OutlinedButton>
                </FlexBox>
              </CollabDetailsRightContainer>
            </Grid>
          </Grid>
        </CollabDetailsMainContainer>
      ) : (
        <CollabDetailsSkeleton />
      )}
      <ShareHorizontalMenu
        shareAnchorEl={shareAnchorEl}
        setShareAnchorEl={setShareAnchorEl}
        url={collabTemplateUrl}
        subject='Template'
      />
    </>
  );
};
