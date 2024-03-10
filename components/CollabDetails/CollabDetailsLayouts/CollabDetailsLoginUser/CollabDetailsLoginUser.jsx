import React, { useContext, useEffect, useState } from 'react';
import { CollabDetailsMain, Divider } from '~/components';
import {
  CollabDetailsContainer,
  CollabWithCreatorDetailsContentContainer,
} from '../elements';
import { BASE_URL, fetchRefreshToken } from '~/apis';
import axios from 'axios';
import { useRouter } from 'next/router';
import { reFetchTokenExpire, updateCuratorsTabStatus } from '~/redux';
import { useNotistack } from '~/hooks';
import SimilarCollabs from '../SimilarCollabs';
import { CollabWorks } from '../CollabWorks';
import { CollabEvents } from '../CollabEvents';
import { useForm } from 'react-hook-form';
import { LaunchpadLanding } from '../../CollabDetailsComponents/CollabDetailsSections/CollabDetailsLaunchpad/LaunchpadLanding';
import { LoaderWrap, LoadingMoreText } from 'components/Spinner/elements';
import { LoadMore } from 'components/Loading';
import { useTranslation } from 'react-i18next';
import { Collaborators } from 'components/CollabDetails/CollabDetailsLayouts/Collaborators';
import { useTheme } from '@mui/material';
import AppContext from 'context/AppContext';
import { useDispatch } from 'react-redux';

export const CollabDetailsLoginUser = ({
  collabDetails,
  setCollabDetails,
  collabId,
  isCollabBelongsToLoginUser,
  collabLiked,
  addLikeDislike,
  loading,
  userActionsLoading,
  pendingApplicants,
  collabEventsExists,
  collabWorksExists,
  collabMissionsExists,
  collabMissionsInstancesExists,
  collabBTSExists,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();
  const { user } = useContext(AppContext);
  const dispatch = useDispatch();

  const [suggestedUsers, setSuggestedUsers] = useState();
  const [members, setMembers] = useState([]);
  const [invites, setInvites] = useState(null);
  const [invitesLoading, setInvitesLoading] = useState();
  const [applicants, setApplicants] = useState(null);
  const [applicantsLoading, setApplicantsLoading] = useState(false);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [acceptedMembers, setAcceptedMembers] = useState(
    collabDetails?.members?.filter(({ status }) => status === 'ACCEPTED'),
  );
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [membersLoading, setMembersLoading] = useState(false);

  const generateSnackbar = useNotistack();

  const [currentActiveTab, setCurrentActiveTab] = useState(
    router.query && router.query.view,
  );

  useEffect(() => {
    if (router.query && router.query.view) {
      if (!currentActiveTab) {
        setCurrentActiveTab('launchpad');
      }
      setCurrentActiveTab(router.query.view);
    }
  }, [router.query]);

  useEffect(() => {
    if (user?.notificationData) {
      setAcceptedMembers([...acceptedMembers, user?.notificationData]);
    }
  }, [user?.notificationData]);

  useEffect(() => {
    dispatch(updateCuratorsTabStatus(collabDetails?.enableCuration));
  }, [collabDetails]);

  const acceptOrRejectNegotiation = async (id, type) => {
    if (type === 'accept') {
      setLoadingAccept(true);
    }
    if (type === 'reject') {
      setLoadingReject(true);
    }
    try {
      const f1 = async () => {
        let obj = {
          acceptType: 'negotiation',
        };
        if (type === 'accept') {
          obj['acceptedBy'] = 'admin';
          obj['status'] = 'ACCEPTED';
        } else {
          obj['rejectedBy'] = 'admin';
          obj['status'] = 'REJECTED';
        }
        const res = await axios.patch(`${BASE_URL}/api/v1/collabmember`, {
          id,
          ...obj,
        });
        if (res) return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        if (type === 'accept') {
          setLoadingAccept(false);
        } else {
          setLoadingReject(false);
        }
        if (res.data.data.member.status === 'ACCEPTED') {
          generateSnackbar('Successfully accepted negotiation!', 'success');

          // Extract the Negotiated Invite from Applicant State and push it to members state
          const updatedAcceptedMember = res.data.data.member;

          const oldInvitedMemberIndex = invites.findIndex(
            ({ _id }) => _id === updatedAcceptedMember._id,
          );

          if (oldInvitedMemberIndex !== -1) {
            const updatedAcceptedMember = JSON.parse(
              JSON.stringify(invites[oldInvitedMemberIndex]),
            );

            updatedAcceptedMember.status = 'ACCEPTED';

            const updatedInvites = [...invites];
            updatedInvites[oldInvitedMemberIndex] = updatedAcceptedMember;

            setInvites(updatedInvites);
          }
        }
        if (res.data.data.member.status === 'REJECTED') {
          generateSnackbar('Successfully rejected negotiation!', 'success');
        }
      }
    } catch (error) {
      if (type === 'accept') {
        setLoadingAccept(false);
      } else {
        setLoadingReject(false);
      }
      generateSnackbar('Something went wrong!', 'error');
    }
  };

  const { control, watch, setValue } = useForm({
    defaultValues: {
      selectedCoCreators: [],
      selectedRole: '',
    },
  });

  if (!collabDetails) {
    return (
      <LoaderWrap height="100%">
        <LoadingMoreText>{<LoadMore />}</LoadingMoreText>
      </LoaderWrap>
    );
  }

  const getCollabContent = () => {
    switch (currentActiveTab) {
      case 'launchpad':
        return (
          <>
            <LaunchpadLanding
              collabIdentifier={collabDetails?.identifier}
              contentContainerStyles={{ padding: '20px' }}
              applicantsLoading={applicantsLoading}
              applicants={applicants}
              loadingAccept={loadingAccept}
              loadingReject={loadingReject}
              loading={loading}
              collabId={collabId}
              collabDetails={collabDetails}
              setCollabDetails={setCollabDetails}
              isCollabBelongsToLoginUser={isCollabBelongsToLoginUser}
              isLoginUserCoCreatorOfCollab={false}
              pendingApplicants={pendingApplicants}
              collabEventsExists={collabEventsExists}
              isArchive={collabDetails?.isArchive}
              collabWorksExists={collabWorksExists}
              collabMissionsExists={collabMissionsExists}
              collabBTSExists={collabBTSExists}
              collabMissionsInstancesExists={collabMissionsInstancesExists}
              onBack={() => setCurrentActiveTab('')}
              inviteMemberProps={{
                membersLoading,
                setMembersLoading,
                members,
                setMembers,
                collabDetails,
                suggestionsLoading,
                setSuggestionsLoading,
                suggestedUsers,
                setSuggestedUsers,
                invites,
                setInvites,
                invitesLoading,
                setInvitesLoading,
                loadingAccept,
                loadingReject,
                acceptOrRejectNegotiation,
                control,
                watch,
                setValue,
              }}
              manageApplicantsProps={{
                applicantsLoading,
                setApplicantsLoading,
                applicants,
                setApplicants,
                collabId,
                loadingAccept,
                loadingReject,
                setLoadingAccept,
                setLoadingReject,
              }}
              collaboratorsProps={{
                acceptedMembers,
                admin: collabDetails?.creatorId,
                loading,
                isCollabBelongsToLoginUser,
                adminCollaboratorRole: collabDetails?.collabCreatorRole,
                collabId,
                isLoginUserAdmin: isCollabBelongsToLoginUser,
              }}
            />
          </>
        );
      default:
        return (
          <>
            <CollabDetailsContainer>
              <>
                <CollabWithCreatorDetailsContentContainer>
                  <CollabDetailsMain
                    collab={collabDetails}
                    showCreatorDetails
                    onNavigateBack={() => router.push('/collab/explore')}
                    handleUpdateMember={(toBeAddedMember) => {
                      setAcceptedMembers([...acceptedMembers, toBeAddedMember]);
                    }}
                    {...{
                      collabLiked,
                      addLikeDislike,
                      isCollabBelongsToLoginUser,
                      userActionsLoading,
                    }}
                  />
                </CollabWithCreatorDetailsContentContainer>

                <Collaborators
                  acceptedMembers={acceptedMembers}
                  admin={collabDetails?.creatorId}
                  loading={loading}
                  isCollabBelongsToLoginUser={isCollabBelongsToLoginUser}
                  adminCollaboratorRole={collabDetails?.collabCreatorRole}
                  collabId={collabId}
                  isLoginUserAdmin={isCollabBelongsToLoginUser}
                />

                {/* Collab Events section starts */}

                <CollabEvents collabId={collabDetails?._id} />

                {/* Collab Events section ends */}

                <CollabWorks collabId={collabDetails?._id} isCollabCoCreators />

                <SimilarCollabs
                  collabDetails={collabDetails}
                  title={t('Collabs you might be interested in ')}
                  type={'similar'}
                  collabLoading={loading}
                />
                <Divider color={theme.palette.text.primary} margin={0} />
                <SimilarCollabs
                  collabDetails={collabDetails}
                  title={t('Other Collabs by you')}
                  type={'creator'}
                  collabLoading={loading}
                />
              </>
            </CollabDetailsContainer>
          </>
        );
    }
  };
  return <>{getCollabContent()}</>;
};
