import React, { useContext, useEffect, useState } from 'react';

import {
  CollabDetailsImage,
  CollabDetailsMainContainer,
  TextandImageContentContainer,
  CollabTitle,
  CollabDetailsLeftContainer,
  CollabDetailsRightContainer,
  CollabDescription,
  ArrowRightUpLongIconStyled,
  ActionsWrap,
  LikeWrap,
  FollowWrap,
  ShareWrap,
  InfoSection,
  InfoTitle,
  Circle,
  InfoItemWrap,
  InfoLabel,
  InfoValue,
  LookingForTitle,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  PlusIconWrap,
  UserActionsLoadingContainer,
  CollabStatusLabel,
} from './elements';

import {
  Spacer,
  PrimaryButton,
  OutlinedButton,
  InviteCollaboratorDialog,
  CurateCollabDialog,
  HeartButton,
  AwardsIcon,
  Tooltip,
  FollowIcon,
  ClaimProfileDialog,
  CommonLinkLabel,
  StyledTooltip,
  Spinner,
  SmallSpinner,
} from '~/components';
import { useTranslation } from 'react-i18next';
import { Box, Grid, useTheme } from '@mui/material';
import { CollabOfferDetails } from './CollabOfferDetails';
import { CollabEventParticipationDetails } from './CollabEventParticipationDetails';
import { Missions } from './Missions';
import {
  fetchRefreshToken,
  reFetchTokenExpire,
  setCurrentDialog,
} from '~/redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { getCollabMemberStatusMappings } from '~/constants';
import AppContext from 'context/AppContext';
import axios from 'axios';
import {
  BASE_URL,
  isCollabCollaboratorsFollowed,
  followCollabCollaborators,
  acceptRejectCollabEventInvitation,
} from '~/apis';
import { useNotistack } from '~/hooks';
import { ShareHorizontalMenu } from 'components/ShareHorizontalMenu';
import { FlexBox } from 'components/common/elements';
import CarouselWithThumbnails from 'components/Carousel/CarouselWithThumbnails';
import {
  getMonthYear,
  openLinkInNewTab,
  getDomainName,
  ensureHttpsPrefix,
} from '~/utils';
import { ContributedCollabEditOption } from './CollabDetailsComponents';
import ShareIcon2 from 'components/Icons/ShareIcon2';
import CirclesIcon from 'components/Icons/CirclesIcon';
import PlusMinusIcon from 'components/Icons/PlusMinusIcon';
import InfoIcon from 'components/Icons/InfoIcon';
import dynamic from 'next/dynamic';
import config from '~/config';
import { COLLAB_SOURCE } from '~/constants';
import SingleImage from 'components/CollabDetails/CollabDetailsComponents/SingleImage';
import InfoWithTooltip from './InfoWithTooltip';
import { useProtectedAction } from 'hooks';

const Tour = dynamic(() => import('reactour'), { ssr: false });

const steps = [
  {
    selector: '[data-tour="collabs"]',
    content: 'Find your newly added Collaborations here.',
  },
];

export const CollabDetailsMain = ({
  collab,
  collabEventParticipationDetails,
  setCollabEventParticipationDetails,
  showCreatorDetails,
  isLoginUserCoCreatorOfCollab,
  setIsLoginUserCoCreatorOfCollab,
  isCollabBelongsToLoginUser,
  children,
  isPublic,
  collabAssociationDetails,
  setCollabAssociationDetails,
  handleUpdateMember,
  selectedWalletForCollab,
  setSelectedWalletForCollab,
  collabLiked,
  addLikeDislike,
  userActionsLoading,
}) => {
  const { user, setUser } = useContext(AppContext);
  const [creatorDetails, setCreatorDetails] = useState(null);
  const [inviteCollaboratorDialogOpen, setInviteCollaboratorDialogOpen] =
    useState(false);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [, setShowChooseWallet] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [curateCollabDialogOpen, setCurateCollabDialogOpen] = useState(false);

  const [claimProfileDialog, setClaimProfileDialog] = useState('');
  const generateSnackbar = useNotistack();
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const [shareAnchorEl, setShareAnchorEl] = React.useState(null);
  const [collabUrl, setCollabUrl] = useState('');
  const [expandedRole, setExpandedRole] = useState(false);
  const [showFollowAllCollaborators, setShowFollowAllCollaborators] =
    useState(false);
  const [collaboratorsFollowingLoading, setCollaboratorsFollowingLoading] =
    useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [basedOnHovered, setBasedOnHovered] = useState(false);
  const [loadingEventAcceptRejectIndex, setLoadingEventAcceptRejectIndex] =
    useState(-1);
  const isProfileComplete = user?.isProfileComplete;

  const { t } = useTranslation();

  const [collabId, setCollabId] = useState('');
  const [collabIdentifier, setCollabIdentifier] = useState('');

  const [isHovered, setIsHovered] = useState('');
  useEffect(() => {
    if (collab && showCreatorDetails) {
      setCreatorDetails(collab?.creatorId);
    }
  }, [collab, showCreatorDetails]);

  useEffect(() => {
    if (user && user.addresses.length === 1 && setSelectedWalletForCollab) {
      setSelectedWalletForCollab(user.addresses[0]);
    }
  }, []);

  const getToolTipTitle = (conditions) => {
    for (let condition of conditions) {
      if (!condition[0]) return condition[1];
    }
    return null;
  };

  const handleApplyCollabClick = useProtectedAction(() => {
    dispatch(setCurrentDialog('apply-collab-dialog'));
  });

  const handleReimageCollabClick = useProtectedAction(
    () => {
      router.push(`/collab/create?reimagine=${collabIdentifier}`);
    },
    () => {
      router.push(`/collab/create?signup=true&reimagine=${collabIdentifier}`);
    },
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCollabUrl(window.location.href);
    }
  }, [collabId]);

  useEffect(() => {
    if (collab) {
      setCollabId(collab?._id);
      setCollabIdentifier(collab?.identifier);
    }
  }, [router]);

  const handleShareCollab = (event) => {
    setShareAnchorEl(event.currentTarget);
  };

  const handleCollabLikeButton = () => {
    if (isPublic) {
      router.push(`/collab/${collabIdentifier}?signup=true`);
    } else {
      addLikeDislike();
    }
  };

  const acceptOrRejectInvite = async (memberId, type) => {
    if (type === 'accept') {
      setLoadingAccept(true);
    }
    if (type === 'reject') {
      setLoadingReject(true);
    }
    try {
      const f1 = async () => {
        const res = await axios.patch(
          `${BASE_URL}/api/v1/collabmember/accept-collab-invite`,
          {
            collabMemberId: memberId,
            collabId: collabId,
            type,
            selectedWalletForCollab,
          },
        );
        if (res) return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        if (type === 'accept') {
          setShowChooseWallet(false);
          const { collabMember, message, user } = res.data;
          setShowCollabStatus(true);
          setIsLoginUserCoCreatorOfCollab(true);
          handleUpdateMember({ member: collabMember, user });
          generateSnackbar(message, 'success');
          setLoadingAccept(false);
          setCollabAssociationDetails(collabMember);
        } else if (type === 'reject') {
          const { collabMember, message } = res.data;
          setCollabAssociationDetails(collabMember);
          setLoadingReject(false);
          generateSnackbar(message, 'error');
        }
      }
    } catch (error) {
      setLoadingAccept(false);
      setLoadingReject(false);
      generateSnackbar('An error occurred, please try again', 'error');
    }
  };

  const launchpadClickHandler = () => {
    router.push(`/collab/${collabIdentifier}?view=${'launchpad'}`);
  };

  const negotiateInvite = async () => {
    if (collabAssociationDetails?.memberNegotiation) {
      setSelectedWalletForCollab(
        collabAssociationDetails?.selectedWalletForCollab,
      );
      dispatch(setCurrentDialog('negotiate-collab-dialog'));
    } else {
      if (user && user.addresses?.length > 1) {
        setShowChooseWallet(true);
      } else {
        dispatch(setCurrentDialog('negotiate-collab-dialog'));
      }
    }
  };

  const { control, watch, setValue } = useForm({
    defaultValues: {
      selectedCoCreators: [],
      selectedRole: '',
    },
  });
  const status = collabAssociationDetails?.status;

  const [showCollabStatus, setShowCollabStatus] = useState(false);

  useEffect(() => {
    if (status === 'PENDING') {
      if (collabAssociationDetails && !collabAssociationDetails?.isInvite) {
        setShowCollabStatus(true);
      }
    } else if (collabAssociationDetails) {
      setShowCollabStatus(true);
    }
  }, [collabAssociationDetails]);

  const handleRoleClick = (role) => {
    if (expandedRole === role) {
      setExpandedRole(false);
    } else {
      setExpandedRole(role);
    }
  };

  const fetchFollowAllCollaboratorsStatus = async () => {
    try {
      const result = await isCollabCollaboratorsFollowed(collabId);
      setShowFollowAllCollaborators(result);
    } catch {}
  };

  const followAllCollaboratorsFromCollab = async () => {
    try {
      setCollaboratorsFollowingLoading(true);
      const data = await followCollabCollaborators(collabId);

      if (data.status === 'success') {
        generateSnackbar(data.message, 'success');
      }
      setCollaboratorsFollowingLoading(false);
      setShowFollowAllCollaborators(false);
    } catch {
      setCollaboratorsFollowingLoading(false);
    }
  };

  const acceptRejectCollabEventInvitationHandler = async (
    collabEventId,
    status,
    index,
  ) => {
    try {
      setLoadingEventAcceptRejectIndex(index);
      const response = await acceptRejectCollabEventInvitation(
        collabEventId,
        status,
      );

      if (response.data.status === 'success') {
        generateSnackbar(response.data.message, 'success');

        let desiredEventParticipationDetails = JSON.parse(
          JSON.stringify(collabEventParticipationDetails[index]),
        );

        desiredEventParticipationDetails.status = status;

        setCollabEventParticipationDetails((prevState) => {
          const updatedState = JSON.parse(JSON.stringify(prevState));
          updatedState[index] = desiredEventParticipationDetails;
          return updatedState;
        });
      }

      setLoadingEventAcceptRejectIndex(-1);
    } catch {
      setLoadingEventAcceptRejectIndex(-1);
      generateSnackbar('Something went wrong', 'error');
    }
  };

  useEffect(() => {
    if (!isCollabBelongsToLoginUser && collabId) {
      fetchFollowAllCollaboratorsStatus();
    }
  }, [isLoginUserCoCreatorOfCollab, isCollabBelongsToLoginUser, collabId]);

  const handleTourClose = async () => {
    setIsTourOpen(false);
    setUser({ ...user, hasSeenClaimTour: true });
    // setAuth({ ...auth, hasSeenClaimTour: true });
    try {
      const f1 = async () => {
        return await axios.patch(`${BASE_URL}/user`, {
          hasSeenClaimTour: true,
        });
      };
      await reFetchTokenExpire(f1, fetchRefreshToken);
    } catch (e) {}
  };

  const [featuredLinks, setFeaturedLinks] = useState([]);
  const [spotlightLink, setSpotlightLink] = useState({
    url: '',
    domain: '',
  });
  const [releases, setReleases] = useState([{}]);

  useEffect(() => {
    if (collab?.featuredIn) {
      const temp = collab?.featuredIn.map((item) => {
        const prefixedUrl = ensureHttpsPrefix(item?.url); // Ensure the URL has https prefix
        const domain = getDomainName(prefixedUrl); // Now extract the domain name

        return { ...item, url: prefixedUrl, domain: domain }; // Use the prefixed URL
      });
      setFeaturedLinks(temp);
    }
    if (collab?.projectLink) {
      const prefixedUrl = ensureHttpsPrefix(collab?.projectLink); // Ensure the URL has https prefix
      const temp = getDomainName(prefixedUrl); // Now extract the domain name
      setSpotlightLink({ url: prefixedUrl, domain: temp }); // Use the prefixed URL
    }

    if (collab?.releases) {
      const temp = collab?.releases.map((item) => {
        const prefixedUrl = ensureHttpsPrefix(item?.link); // Ensure the URL has https prefix
        const domain = getDomainName(prefixedUrl); // Now extract the domain name

        return { ...item, link: prefixedUrl, domain: domain }; // domain field now has the correct domain
      });
      setReleases(temp);
    }
  }, [collab]);

  // create function for this conditions :

  const followButtonText = () => {
    if (showFollowAllCollaborators) {
      if (isLoginUserCoCreatorOfCollab) {
        return 'Follow other collaborators';
      } else {
        return 'Follow all Collaborators';
      }
    } else {
      if (user) {
        return 'Following';
      } else {
        return 'Follow all Collaborators';
      }
    }
  };

  return (
    <>
      <form>
        <InviteCollaboratorDialog
          open={inviteCollaboratorDialogOpen}
          collabRoles={collab?.roles || []}
          collabId={collabId}
          handleClose={() => setInviteCollaboratorDialogOpen(false)}
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
                <Box p={theme.spacing(1, 1, 7, 4)} position="relative">
                  {collab && (
                    <Box sx={{ width: '100%' }}>
                      <Spacer value={16} />
                      <CollabTitle>
                        {collab ? collab?.title : 'Title not found'}
                      </CollabTitle>

                      <TextandImageContentContainer>
                        {collab?.compressedImages ? (
                          collab.compressedImages.length === 1 ? (
                            <SingleImage
                              image={
                                collab.images?.[0]?.imageUrl ??
                                collab.images?.[0]
                              }
                              videoUrl={collab.images?.[0]?.videoUrl}
                            />
                          ) : (
                            <CarouselWithThumbnails
                              settings={{
                                infinite: true,
                                speed: 500,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                              }}
                              mb={6}
                              images={collab.images}
                            >
                              {collab?.compressedImages.map((image, index) => (
                                <CollabDetailsImage key={index} src={image} />
                              ))}
                            </CarouselWithThumbnails>
                          )
                        ) : null}

                        {collab?.description && (
                          <CollabDescription>
                            {collab?.description}
                          </CollabDescription>
                        )}
                      </TextandImageContentContainer>
                    </Box>
                  )}
                </Box>
              </CollabDetailsLeftContainer>
            </Grid>
            <Grid item md={3.5}>
              {showCreatorDetails && creatorDetails && (
                <CollabDetailsRightContainer p={theme.spacing(0, 0, 7, 0)}>
                  <ActionsWrap height={60}>
                    <LikeWrap hideBorderRight={!!isCollabBelongsToLoginUser}>
                      <HeartButton
                        onClick={handleCollabLikeButton}
                        isLiked={collabLiked}
                        sx={{ cursor: 'pointer' }}
                      />
                    </LikeWrap>
                    {!isCollabBelongsToLoginUser && (
                      <>
                        <FollowWrap
                          cursorDisabled={collaboratorsFollowingLoading}
                          onClick={async () => {
                            if (!user) {
                              dispatch(setCurrentDialog('signup-open-dialog'));
                              return;
                            }
                            if (showFollowAllCollaborators) {
                              await followAllCollaboratorsFromCollab();
                            }
                          }}
                        >
                          <FlexBox>
                            {!collaboratorsFollowingLoading ? (
                              <>
                                <Box mr={0.5}>
                                  <FollowIcon
                                    width={20}
                                    height={20}
                                    color={theme.palette.text.primary}
                                  />
                                </Box>
                                {followButtonText()}
                              </>
                            ) : (
                              <Spinner size={20} />
                            )}
                          </FlexBox>
                        </FollowWrap>
                      </>
                    )}
                    <ShareWrap>
                      <FlexBox
                        onClick={handleShareCollab}
                        sx={{ cursor: 'pointer' }}
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
                  <Spacer value={50} />

                  <InfoSection>
                    <Circle />
                    <InfoTitle>Info</InfoTitle>
                  </InfoSection>

                  {collab?.tags?.length !== 0 && (
                    <InfoWithTooltip label="Themes" items={collab?.tags} />
                  )}

                  {collab?.platformType?.length !== 0 && (
                    <InfoWithTooltip
                      label="Category"
                      items={collab?.platformType}
                    />
                  )}

                  {collab?.platform?.length !== 0 && (
                    <InfoWithTooltip
                      label="Platform"
                      items={collab?.platform}
                    />
                  )}

                  {collab?.basedOn && (
                    <InfoItemWrap>
                      <InfoLabel>Reimagined</InfoLabel>

                      <Box
                        onClick={() =>
                          openLinkInNewTab(
                            `${config?.APP_URL}/collab/${collab?.basedOn?.identifier}`,
                          )
                        }
                        onMouseEnter={() => setBasedOnHovered(true)}
                        onMouseLeave={() => setBasedOnHovered(false)}
                        style={{
                          display: 'flex',
                          columnGap: '5px',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <InfoValue>{collab?.basedOn?.title}</InfoValue>
                        <ArrowRightUpLongIconStyled
                          width={15}
                          height={15}
                          marginTop={1}
                          hovered={basedOnHovered}
                        />
                      </Box>
                    </InfoItemWrap>
                  )}

                  {collab?.projectLink && (
                    <InfoItemWrap>
                      <InfoLabel>Link</InfoLabel>
                      <Box
                        style={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => {
                          window.open(spotlightLink.url, '_blank');
                        }}
                      >
                        <InfoValue>{spotlightLink.domain}</InfoValue>
                        <Box
                          style={{
                            marginLeft: '.5rem',
                            marginTop: '.5rem',
                          }}
                        >
                          <ArrowRightUpLongIconStyled
                            width={15}
                            height={15}
                            hovered={isHovered}
                            color={theme.palette.text.primary}
                          />
                        </Box>
                      </Box>
                    </InfoItemWrap>
                  )}
                  {collab?.associatedTeam && (
                    <InfoItemWrap
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={() => {
                        router.push(
                          `/team/${collab?.associatedTeam?.collectiveLink}`,
                        );
                      }}
                    >
                      <InfoLabel>Team</InfoLabel>
                      <InfoValue>{collab?.associatedTeam?.title}</InfoValue>
                      <Box style={{ marginLeft: '.5rem', marginTop: '.5rem' }}>
                        <ArrowRightUpLongIconStyled
                          width={15}
                          height={15}
                          hovered={isHovered}
                          color={theme.palette.text.primary}
                        />
                      </Box>
                    </InfoItemWrap>
                  )}
                  {collab?.collabLocation && (
                    <InfoItemWrap>
                      <InfoLabel>Location</InfoLabel>
                      <InfoValue>{collab?.collabLocation}</InfoValue>
                    </InfoItemWrap>
                  )}

                  {collab?.isContributedCollab && (
                    <InfoItemWrap padding={theme.spacing(2, 2, 2, 1)}>
                      <InfoValue display="flex" alignItems="center" ml={4}>
                        Community Contributed
                        <Tooltip
                          title={
                            <span>
                              {
                                'Information about this Collaboration has been provided by our Community.'
                              }
                              {/*<Box*/}
                              {/*  component="span"*/}
                              {/*  onClick={() =>*/}
                              {/*    setClaimProfileDialog('claim-profile-dialog')*/}
                              {/*  }*/}
                              {/*  style={{*/}
                              {/*    textDecoration: 'underline',*/}
                              {/*    color: 'inherit',*/}
                              {/*    cursor: 'pointer',*/}
                              {/*  }}*/}
                              {/*>*/}
                              {/*  Claim your Collaborator spot*/}
                              {/*</Box>*/}.
                            </span>
                          }
                        >
                          <Box ml={1}>
                            <InfoIcon
                              width={20}
                              height={20}
                              color={theme.palette.text.primary}
                            />
                          </Box>
                        </Tooltip>
                      </InfoValue>
                    </InfoItemWrap>
                  )}

                  <Spacer value={50} />

                  {collab?.roles?.length !== 0 && (
                    <>
                      <InfoSection>
                        <CirclesIcon
                          width={24}
                          height={24}
                          color={theme.palette.text.primary}
                        />
                        <InfoTitle>{t('Looking for')}</InfoTitle>
                      </InfoSection>
                      {collab?.roles?.map((role, index) => (
                        <InfoItemWrap
                          key={index}
                          padding={0}
                          borderBottom={
                            expandedRole === role.skill
                              ? 'none'
                              : `1px solid ${theme.palette.borderLight35}`
                          }
                          style={{ width: '100%' }}
                        >
                          {role.about || role?.subRoles?.length > 0 ? (
                            <Accordion
                              key={role.skill}
                              expanded={expandedRole === role.skill}
                              onChange={() => handleRoleClick(role.skill)}
                            >
                              <AccordionSummary>
                                <FlexBox
                                  justifyContent="space-between"
                                  width="95%"
                                >
                                  <LookingForTitle>
                                    {role.skill}
                                  </LookingForTitle>
                                  <PlusIconWrap
                                    isRotated={expandedRole === role.skill}
                                  >
                                    <PlusMinusIcon
                                      width={18}
                                      height={18}
                                      color={theme.palette.borderLight35}
                                      isRotated={expandedRole === role.skill}
                                    />
                                  </PlusIconWrap>
                                </FlexBox>
                              </AccordionSummary>
                              <AccordionDetails>
                                {role?.about && (
                                  <InfoItemWrap paddingTop={0}>
                                    <InfoLabel>About</InfoLabel>
                                    <InfoValue>{role?.about}</InfoValue>
                                  </InfoItemWrap>
                                )}

                                {role?.subRoles?.length > 0 && (
                                  <InfoItemWrap paddingTop={0}>
                                    <InfoLabel>Skill</InfoLabel>
                                    <InfoValue>
                                      {role?.subRoles.map((subRole, index) => (
                                        <span key={index}>
                                          {subRole}
                                          {index < role.subRoles.length - 1 &&
                                            ', '}
                                        </span>
                                      ))}
                                    </InfoValue>
                                  </InfoItemWrap>
                                )}
                              </AccordionDetails>
                            </Accordion>
                          ) : (
                            <LookingForTitle
                              padding={theme.spacing(2.5, 3, 2.5, 5)}
                            >
                              {role.skill}
                            </LookingForTitle>
                          )}
                        </InfoItemWrap>
                      ))}
                    </>
                  )}
                  {releases?.length !== 0 && (
                    <>
                      <InfoSection>
                        <CirclesIcon
                          width={24}
                          height={24}
                          color={theme.palette.text.primary}
                        />
                        <InfoTitle>{t('Collab Releases')}</InfoTitle>
                      </InfoSection>
                      {releases?.map((release, index) => (
                        <InfoItemWrap
                          key={index}
                          padding={0}
                          borderBottom={
                            expandedRole === release.title
                              ? 'none'
                              : `1px solid ${theme.palette.borderLight35}`
                          }
                          style={{ width: '100%' }}
                        >
                          {release.title ? (
                            <Accordion
                              key={release.title}
                              expanded={expandedRole === release.title}
                              onChange={() => handleRoleClick(release.title)}
                            >
                              <AccordionSummary>
                                <FlexBox
                                  justifyContent="space-between"
                                  width="95%"
                                >
                                  <LookingForTitle>
                                    {release.title}
                                  </LookingForTitle>
                                  <PlusIconWrap
                                    isRotated={expandedRole === release.title}
                                  >
                                    <PlusMinusIcon
                                      width={18}
                                      height={18}
                                      color={theme.palette.borderLight35}
                                      isRotated={expandedRole === release.title}
                                    />
                                  </PlusIconWrap>
                                </FlexBox>
                              </AccordionSummary>
                              <AccordionDetails>
                                {release?.link && (
                                  <InfoItemWrap paddingTop={0}>
                                    <InfoLabel>Link</InfoLabel>
                                    <Box>
                                      <Box
                                        style={{
                                          cursor: 'pointer',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'flex-start',
                                        }}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        onClick={() => {
                                          window.open(release?.link, '_blank');
                                        }}
                                      >
                                        <InfoValue>{release?.domain}</InfoValue>
                                        <Box
                                          style={{
                                            marginLeft: '.5rem',
                                            marginTop: '.5rem',
                                          }}
                                        >
                                          <ArrowRightUpLongIconStyled
                                            width={15}
                                            height={15}
                                            hovered={isHovered}
                                            color={theme.palette.text.primary}
                                          />
                                        </Box>
                                      </Box>
                                    </Box>
                                  </InfoItemWrap>
                                )}

                                {release?.instructions && (
                                  <InfoItemWrap paddingTop={0}>
                                    <InfoLabel>Instructions</InfoLabel>
                                    <InfoValue>
                                      {release?.instructions}
                                    </InfoValue>
                                  </InfoItemWrap>
                                )}
                              </AccordionDetails>
                            </Accordion>
                          ) : (
                            <LookingForTitle
                              padding={theme.spacing(2.5, 3, 2.5, 5)}
                            >
                              {release.title}
                            </LookingForTitle>
                          )}
                        </InfoItemWrap>
                      ))}
                    </>
                  )}

                  <Spacer value={50} />

                  {collab?.achievements?.length !== 0 &&
                    collab?.achievements.every((award) => award.title) && (
                      <>
                        <InfoSection>
                          <AwardsIcon
                            width={24}
                            height={24}
                            color={theme.palette.text.primary}
                          />
                          <InfoTitle>Awards</InfoTitle>
                        </InfoSection>
                        {collab?.achievements.map(({ title, date }, index) => (
                          <InfoItemWrap
                            key={index}
                            padding={theme.spacing(2, 2, 2, 1)}
                          >
                            <InfoValue ml={4}>
                              {title +
                                `${date ? ' - ' + getMonthYear(date) : ''}`}
                            </InfoValue>
                          </InfoItemWrap>
                        ))}
                      </>
                    )}
                  {collab?.featuredIn?.length !== 0 && (
                    <>
                      <InfoSection>
                        <AwardsIcon
                          width={24}
                          height={24}
                          color={theme.palette.text.primary}
                        />
                        <InfoTitle>Featured in</InfoTitle>
                      </InfoSection>
                      {featuredLinks?.map(({ title, url, domain }, index) => (
                        <InfoItemWrap
                          key={index}
                          padding={theme.spacing(2, 2, 2, 5)}
                        >
                          <CommonLinkLabel
                            title={title}
                            url={url}
                            domain={domain}
                          />
                        </InfoItemWrap>
                      ))}
                    </>
                  )}

                  <Spacer value={50} />

                  <Missions
                    collabId={collabId}
                    isAMember={isLoginUserCoCreatorOfCollab}
                    isCollabBelongsToLoginUser={isCollabBelongsToLoginUser}
                  />

                  {/* TODO: Refactor this JSX / logic into its own component */}

                  {/* Start: Grouping the user actions related JSX */}
                  {!userActionsLoading ? (
                    <>
                      <ActionsWrap
                        borderBottom="none"
                        mt={3}
                        padding={theme.spacing(0, 4, 2, 4)}
                        sx={{ columnGap: '4px' }}
                      >
                        {isCollabBelongsToLoginUser ? (
                          <>
                            {!collab?.isContributedCollab && (
                              <OutlinedButton
                                sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                                onClick={launchpadClickHandler}
                                width="100%"
                              >
                                {t('Launchpad')}
                              </OutlinedButton>
                            )}
                          </>
                        ) : (
                          <>
                            {showCollabStatus &&
                              collabAssociationDetails?.status !==
                                'ACCEPTED' && (
                                <CollabStatusLabel mr={1}>
                                  {getCollabMemberStatusMappings(
                                    collabAssociationDetails?.status,
                                  )}
                                </CollabStatusLabel>
                              )}

                            {isLoginUserCoCreatorOfCollab && (
                              <PrimaryButton
                                onClick={() =>
                                  router.push(
                                    `/collab/${collabIdentifier}?view=launchpad`,
                                  )
                                }
                                height={52}
                                sx={{ marginLeft: '10px' }}
                              >
                                {t('Launchpad')}
                              </PrimaryButton>
                            )}

                            {collab?.source === COLLAB_SOURCE.internal && (
                              <>
                                {!collabAssociationDetails?.isInvite &&
                                  !collabAssociationDetails?.status &&
                                  !collab?.isContributedCollab &&
                                  !collab?.source !== COLLAB_SOURCE.internal &&
                                  !collab?.collective && (
                                    <StyledTooltip
                                      disabled={isPublic || isProfileComplete}
                                      title={getToolTipTitle([
                                        [
                                          isProfileComplete,
                                          'Complete your profile first to create/join Collabs',
                                        ],
                                        [
                                          collab?.acceptingMembers,
                                          'Not accepting new members',
                                        ],
                                      ])}
                                    >
                                      <OutlinedButton
                                        onClick={() =>
                                          handleApplyCollabClick(null, true)
                                        }
                                        disabled={!collab?.acceptingMembers}
                                        height={54}
                                      >
                                        {t('Apply')}
                                      </OutlinedButton>
                                    </StyledTooltip>
                                  )}
                              </>
                            )}

                            {(collab?.isContributedCollab ||
                              collab?.source === COLLAB_SOURCE.external) && (
                              <>
                                <OutlinedButton
                                  onClick={handleReimageCollabClick}
                                  disabled={!collab?.acceptingMembers}
                                  height={54}
                                >
                                  {t('Reimagine')}
                                </OutlinedButton>
                              </>
                            )}
                          </>
                        )}
                      </ActionsWrap>

                      {collab?.isContributedCollab && (
                        <ContributedCollabEditOption
                          user={user}
                          collabDetails={collab}
                        />
                      )}

                      <CollabOfferDetails
                        collabSource={collab?.source}
                        collabAssociationDetails={collabAssociationDetails}
                        acceptOrRejectInvite={acceptOrRejectInvite}
                        setShowChooseWallet={setShowChooseWallet}
                        loadingAccept={loadingAccept}
                        loadingReject={loadingReject}
                        negotiateInvite={negotiateInvite}
                      />

                      <CollabEventParticipationDetails
                        collabDetails={collab}
                        collabEventParticipationDetails={
                          collabEventParticipationDetails
                        }
                        acceptRejectCollabEventInvitationHandler={
                          acceptRejectCollabEventInvitationHandler
                        }
                        loadingEventAcceptRejectIndex={
                          loadingEventAcceptRejectIndex
                        }
                      />
                    </>
                  ) : (
                    <UserActionsLoadingContainer>
                      <SmallSpinner inverse />
                    </UserActionsLoadingContainer>
                  )}
                  {/* End */}

                  {/* Collab Offer Details Ends */}
                </CollabDetailsRightContainer>
              )}
            </Grid>
          </Grid>
        </CollabDetailsMainContainer>
        {children}
      </Box>
      <ShareHorizontalMenu
        shareAnchorEl={shareAnchorEl}
        setShareAnchorEl={setShareAnchorEl}
        url={collabUrl}
      />
      <CurateCollabDialog
        open={curateCollabDialogOpen}
        collab={collab}
        handleClose={() => setCurateCollabDialogOpen(false)}
      />
      <ClaimProfileDialog
        // preSelectedProfile={preSelectedClaimProfile}
        open={claimProfileDialog === 'claim-profile-dialog'}
        handleClose={() => setClaimProfileDialog('')}
        userName={user?.username}
        onComplete={() => {
          setClaimProfileDialog('');
          setTimeout(() => {
            setIsTourOpen(!user?.hasSeenClaimTour);
          }, 1000);
        }}
        claimingFromUserProfile={false}
        collabMembers={[
          {
            user: {
              _id: collab.creatorId._id,
            },
          },
          ...collab?.members,
        ]}
      />
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={handleTourClose}
        rounded={5}
        accentColor="#0073e6"
        showNumber={false}
      />
    </>
  );
};
