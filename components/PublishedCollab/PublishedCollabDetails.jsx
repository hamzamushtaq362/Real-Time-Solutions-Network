import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import {
  Spacer,
  ArrowLeftIcon,
  PrimaryButton,
  InviteCollaboratorDialog,
} from '~/components';
import { Box, Grid, useTheme } from '@mui/material';
import Platforms from 'components/CollabDetails/CollabDetailsComponents/Platforms';
import CollabStats from 'components/CollabDetails/CollabDetailsComponents/CollabStats';
import { useRouter } from 'next/router';
import ShareMenu from 'components/SecondaryNavbar/ShareMenu';
import { useForm } from 'react-hook-form';
import {
  CollabDescription,
  CollabDetailsDescription,
  CollabDetailsLeftContainer,
  CollabDetailsMainContainer,
  CollabDetailsRightContainer,
  CollabSectionWrap,
  CollabSubHeader,
  CollabTitle,
  RoleLabel,
  RoleValue,
  TextandImageContentContainer,
  TextBox,
  RightPaneLabel,
} from 'components/CollabDetails/CollabDetailsComponents/elements';
import {
  BackText,
  NavigateBack,
} from 'components/CollabDetails/CollabDetailsLayouts/elements';
import {
  ImagePreview,
  ImagesContainer,
  ImageWrap,
} from 'components/CollabCreate/AddProject/elements';
import User from 'components/CollabDetails/CollabDetailsComponents/Author';
import { NotFoundText } from 'components/Creator/CreatorProfileCard/elements';
import Themes from 'components/CollabDetails/CollabDetailsComponents/Themes';
import {
  ArrowRightUpLongIconStyled,
  FlexBox,
} from 'components/common/elements';
import { LinkIcon } from 'components/Icons/LinkIcon';
import ArrowRightUpLongIcon from 'components/Icons/ArrowRightUpLongIcon';
import { CollabLink } from './elements';
import { useDispatch } from 'react-redux';
import { setCurrentDialog } from '~/redux';

export const PublishedCollabDetails = ({
  collab,
  showCreatorDetails,
  isAdmin,
  suggestUserForCollab,
  isPublic,
  onNavigateBack,
  isNFTPublished,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [creatorDetails, setCreatorDetails] = useState(null);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [inviteCollaboratorDialogOpen, setInviteCollaboratorDialogOpen] =
    useState(false);
  const theme = useTheme();
  const router = useRouter();
  const [shareAnchorEl, setShareAnchorEl] = React.useState(null);
  const [collabUrl, setCollabUrl] = useState('');
  const [collabId, setCollabId] = useState('');

  useEffect(() => {
    if (collab && showCreatorDetails) {
      setCreatorDetails(collab?.creatorId);
    }
  }, [collab, showCreatorDetails]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCollabUrl(window.location.href);
    }
  }, [collabId]);

  useEffect(() => {
    if (router.query.collabId) {
      setCollabId(router.query.collabId);
    }
  }, [router]);

  const { control, watch, setValue } = useForm({
    defaultValues: {
      selectedCoCreators: [],
      selectedRole: '',
    },
  });

  return (
    <>
      <form>
        <InviteCollaboratorDialog
          open={inviteCollaboratorDialogOpen}
          collabRoles={collab?.roles || []}
          collabId={collab?._id}
          handleClose={() => setInviteCollaboratorDialogOpen(false)}
          suggestUserForCollab={suggestUserForCollab}
          control={control}
          setValue={setValue}
          watch={watch}
        />
      </form>
      <Box>
        <CollabDetailsMainContainer>
          <Grid container>
            <Grid item md={8.5}>
              <CollabDetailsLeftContainer>
                <Box p={theme.spacing(isAdmin ? 5 : 5, 1, 7, 1)}>
                  {!isPublic && (
                    <NavigateBack onClick={onNavigateBack}>
                      <ArrowLeftIcon
                        width={20}
                        height={20}
                        color={theme.palette.text.label}
                      />
                      <BackText>{t('Back')}</BackText>
                    </NavigateBack>
                  )}
                  {collab && (
                    <Box sx={{ width: '100%' }}>
                      <Spacer value={16} />
                      <CollabTitle>
                        {collab ? collab?.collabNFTTitle : 'Title not found'}
                      </CollabTitle>

                      <CollabStats createdAt={collab?.createdAt} />

                      <TextandImageContentContainer>
                        <ImagesContainer mb={4}>
                          {collab?.media?.length > 0 &&
                            collab?.media.map((item, index) => (
                              <ImageWrap key={index}>
                                {item.type?.includes('image') ? (
                                  <ImagePreview alt="media" src={item?.url} />
                                ) : (
                                  <video width="100%" controls>
                                    <source src={item?.url} />
                                  </video>
                                )}
                              </ImageWrap>
                            ))}
                        </ImagesContainer>

                        <Grid container>
                          <Grid item md={6}>
                            <CollabDetailsDescription>
                              <CollabSubHeader>
                                {t('Description')}
                              </CollabSubHeader>
                              {collab?.collabNFTDescription ? (
                                <CollabDescription>
                                  {collab?.collabNFTDescription}
                                </CollabDescription>
                              ) : (
                                <NotFoundText>
                                  {t('No Description Found')}
                                </NotFoundText>
                              )}
                            </CollabDetailsDescription>
                          </Grid>

                          <Grid item md={6}>
                            <Box>
                              <CollabSubHeader>{t('Category')}</CollabSubHeader>

                              <CollabSectionWrap>
                                {collab?.platformType &&
                                  collab?.platformType.map(
                                    (platform, index) => (
                                      <TextBox key={index}>{platform}</TextBox>
                                    ),
                                  )}
                              </CollabSectionWrap>
                            </Box>
                            {collab?.tags?.length !== 0 && (
                              <Themes themes={collab?.tags} />
                            )}

                            {collab?.links?.length !== 0 &&
                              collab?.links[0] && (
                                <Box mt={3}>
                                  <CollabSubHeader>
                                    {t('Links')}
                                  </CollabSubHeader>
                                  {collab?.links?.map((link, index) => (
                                    <FlexBox key={index}>
                                      <LinkIcon
                                        width={24}
                                        height={24}
                                        color="black"
                                      />
                                      <CollabLink
                                        href={link}
                                        target="_blank"
                                        component="a"
                                      >
                                        <Box mr={1}>{link}</Box>
                                        <ArrowRightUpLongIcon
                                          width={16}
                                          height={16}
                                          color={theme.palette.text.primary}
                                        />
                                      </CollabLink>
                                    </FlexBox>
                                  ))}
                                </Box>
                              )}
                          </Grid>
                        </Grid>
                      </TextandImageContentContainer>
                    </Box>
                  )}
                </Box>
              </CollabDetailsLeftContainer>
            </Grid>
            <Grid item md={3.5}>
              {showCreatorDetails && creatorDetails && (
                <CollabDetailsRightContainer p={theme.spacing(2, 0, 7, 4)}>
                  <User label="Author" users={[creatorDetails]} />

                  <User
                    label="Collaborators"
                    users={collab?.members
                      ?.filter((m) => m.status === 'ACCEPTED')
                      ?.map((member) => member.user)}
                    noFoundText={
                      isAdmin
                        ? 'No Collaborators Yet'
                        : 'Be the first one to join'
                    }
                  />

                  {isPublic && (
                    <>
                      <Spacer value={10} />
                      <PrimaryButton
                        width="150px"
                        onClick={() =>
                          dispatch(setCurrentDialog('signup-open-dialog'))
                        }
                      >
                        {t('Join RTSN.')}
                      </PrimaryButton>
                    </>
                  )}

                  <Platforms platform={collab.platform} />

                  <>
                    <RightPaneLabel>{t('NFT')}</RightPaneLabel>
                    <FlexBox justifyContent="space-between">
                      <RoleLabel>{collab?.nftTitle}</RoleLabel>
                      {isNFTPublished || collab?.isNFTPublished ? (
                        <PrimaryButton
                          width="100px"
                          onClick={() =>
                            router.push(
                              `/nft/${collab?.nftDropContractAddress}`,
                            )
                          }
                          onMouseEnter={() => setButtonHovered(true)}
                          onMouseLeave={() => setButtonHovered(false)}
                        >
                          {t('Visit')}
                          <Box ml={1} display="flex">
                            <ArrowRightUpLongIconStyled
                              width={20}
                              height={20}
                              color={
                                buttonHovered
                                  ? theme.palette.text.primary
                                  : theme.palette.text.inverse
                              }
                              hovered={buttonHovered}
                            />
                          </Box>
                        </PrimaryButton>
                      ) : (
                        <RoleValue>{t('Pending')}</RoleValue>
                      )}
                    </FlexBox>
                  </>
                </CollabDetailsRightContainer>
              )}
            </Grid>
          </Grid>
        </CollabDetailsMainContainer>
      </Box>
      <ShareMenu
        shareAnchorEl={shareAnchorEl}
        setShareAnchorEl={setShareAnchorEl}
        collabBelongsToLoginUser={isAdmin}
        collabUrl={collabUrl}
      />
    </>
  );
};
