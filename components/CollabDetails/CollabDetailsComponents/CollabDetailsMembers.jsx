import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';

import {
  CollabDetailsMemberTileContainer,
  CollabMemberName,
  CollabMemberSubText,
  CollabMemberSubTextDetails,
  CollabMemberMessageButton,
  ApplicantsButtonGroupContainer,
} from './elements';

import {
  Avatar,
  Divider,
  Spacer,
  OpaqueButton,
  Spinner,
  WalletSelectionDialog,
} from '~/components';

import { AvatarSampleImage2 } from '~/assets';
import { getAmountAndType } from '~/utils';
import { BASE_URL, fetchRefreshToken } from '~/apis';
import { reFetchTokenExpire } from '~/redux';
import { useNotistack } from '~/hooks';

import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, useTheme } from '@mui/material';
import { StyledTooltip } from '../../DashboardHome/elements';
import AppContext from 'context/AppContext';

export const CollabMemberTileForCollective = ({ userType, member }) => {
  const [messageButtonLoading, setMessageButtonLoading] = useState(false);

  const generateSnackbar = useNotistack();
  const router = useRouter();
  const theme = useTheme();

  const messageButtonClickHandler = async () => {
    if (member) {
      try {
        setMessageButtonLoading(true);
        const userId = member?.userId?._id;

        const { data } = await axios.get(
          `${BASE_URL}/api/v1/chats/is-conversation-exist/${userId}`,
        );

        if (data?.conversationExist) {
          const conversationId = data?.conversationId;
          if (conversationId) {
            router.push(`/inbox?conversation=${conversationId}`);
          } else {
            router.push('/inbox');
          }
        } else {
          router.push(`/inbox?user=${userId}`);
        }
        setMessageButtonLoading(false);
      } catch (err) {
        setMessageButtonLoading(false);
        generateSnackbar('Something went wrong!', 'error');
      }
    }
  };

  return (<>
    <CollabDetailsMemberTileContainer>
      {userType !== 'applicant' && (
        <CollabMemberMessageButton
          disabled={messageButtonLoading}
          onClick={messageButtonClickHandler}
          id="message-button"
          width="178px"
          height="36px"
        >
          {messageButtonLoading ? (
            <Spinner color={theme.palette.white.main} size={20} />
          ) : (
            'Message'
          )}
        </CollabMemberMessageButton>
      )}

      <Avatar
        size="90px"
        avatar={
          member && member.userId
            ? member.userId.imageUrl
            : member.user
            ? member.user.imageUrl
            : AvatarSampleImage2
        }
      />

      <Spacer value={8} />
      <CollabMemberName>
        {member && member.userId
          ? member.userId.username
          : member.user
          ? member.user.username
          : 'Jacob Jones'}
      </CollabMemberName>
      <Spacer value={8} />
      <CollabMemberSubText>
        {" "}
        {member && member.userId && member.userId.skills
          ? member.userId.skills[0]
          : 'Artist / Creative Director'}
      </CollabMemberSubText>

      <Spacer value={16} />

      <Divider />

      <Spacer value={16} />
    </CollabDetailsMemberTileContainer>
  </>);
};
export const CollabMemberTile = ({
  userType,
  member,
  acceptOrRejectApplicant,
  loadingAccept,
  loadingReject,
  invStatus,
  collabDetails,
}) => {
  const { t } = useTranslation();
  const [selectedWalletForCollab, setSelectedWalletForCollab] = useState('');
  const [showWalletComponent, setShowWalletComponent] = useState(false);
  const [isAdminSelectedWalletForCollab, setIsAdminSelectedWalletForCollab] =
    useState(false);
  const [messageButtonLoading, setMessageButtonLoading] = useState(false);

  const { user } = useContext(AppContext);
  const isProfileComplete = user?.isProfileComplete;
  const generateSnackbar = useNotistack();
  const router = useRouter();
  const theme = useTheme();

  const selectedWalletForCollabOfAdmin = async () => {
    try {
      const f1 = async () => {
        const res = await axios.patch(`${BASE_URL}/api/v1/collab`, {
          id: collabDetails?._id,
          selectedWalletForCollab: selectedWalletForCollab,
        });
        return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        setShowWalletComponent(false);
        setIsAdminSelectedWalletForCollab(true);
        acceptOrRejectApplicant(member?._id, 'accept');
      }
    } catch (err) {
      //TODO: Also add snackbar here
    }
  };

  const messageButtonClickHandler = async () => {
    if (member) {
      try {
        setMessageButtonLoading(true);
        const userId = member?.userId?._id;

        const { data } = await axios.get(
          `${BASE_URL}/api/v1/chats/is-conversation-exist/${userId}`,
        );

        if (data?.conversationExist) {
          const conversationId = data?.conversationId;
          if (conversationId) {
            router.push(`/inbox?conversation=${conversationId}`);
          } else {
            router.push('/inbox');
          }
        } else {
          router.push(`/inbox?user=${userId}`);
        }
        setMessageButtonLoading(false);
      } catch (err) {
        setMessageButtonLoading(false);
        generateSnackbar('Something went wrong!', 'error');
      }
    }
  };

  useEffect(() => {
    if (collabDetails && collabDetails?.selectedWalletForCollab) {
      setIsAdminSelectedWalletForCollab(true);
    } else {
      setIsAdminSelectedWalletForCollab(false);
    }
  }, [collabDetails]);

  return (<>
    <WalletSelectionDialog
      open={showWalletComponent}
      handleClose={() => {
        setShowWalletComponent(false);
      }}
      setWalletValue={setSelectedWalletForCollab}
      onSubmit={selectedWalletForCollabOfAdmin}
    />
    <CollabDetailsMemberTileContainer userType={userType}>
      {userType !== 'applicant' && (
        <CollabMemberMessageButton
          disabled={messageButtonLoading}
          onClick={messageButtonClickHandler}
          id="message-button"
          width="178px"
          height="36px"
        >
          {messageButtonLoading ? (
            <Spinner color={theme.palette.white.main} size={20} />
          ) : (
            'Message'
          )}
        </CollabMemberMessageButton>
      )}

      {userType === 'applicant' && (
        <ApplicantsButtonGroupContainer id="applicant-button-group">
          {(member.status === 'ACCEPTED' || invStatus === 'ACCEPTED') && (
            <OpaqueButton
              disabled
              sx={{ marginBottom: '10px' }}
              width="100%"
              height="34px"
            >{t("Accepted")}</OpaqueButton>
          )}
          {(member.status === 'REJECTED' || invStatus === 'REJECTED') && (
            <OpaqueButton
              sx={{ marginBottom: '10px' }}
              width="100%"
              height="34px"
              variant="secondary"
            >{t("Rejected")}</OpaqueButton>
          )}
          {member.status === 'PENDING' && !invStatus && (
            <>
              <StyledTooltip
                title={
                  isProfileComplete
                    ? null
                    : 'Complete your profile first to create/join Collabs'
                }
              >
                <span>
                  <OpaqueButton
                    onClick={() => {
                      if (isAdminSelectedWalletForCollab) {
                        acceptOrRejectApplicant(
                          member._id,
                          'accept',
                          member?.userId?._id,
                        );
                      } else {
                        setShowWalletComponent(true);
                      }
                    }}
                    disabled={!isProfileComplete}
                    width="45%"
                    height="34px"
                    sx={{ marginRight: '10px', marginBottom: '10px' }}
                  >
                    {loadingAccept ? 'Accepting' : 'Accept'}
                  </OpaqueButton>
                </span>
              </StyledTooltip>

              <StyledTooltip
                title={
                  isProfileComplete
                    ? null
                    : 'Complete your profile first to create/join Collabs'
                }
              >
                <span>
                  <OpaqueButton
                    sx={{ marginBottom: '10px' }}
                    onClick={() =>
                      acceptOrRejectApplicant(member._id, 'reject')
                    }
                    width="45%"
                    height="34px"
                    variant="secondary"
                    disabled={!isProfileComplete}
                  >
                    {loadingReject ? 'Rejecting' : 'Reject'}
                  </OpaqueButton>
                </span>
              </StyledTooltip>
            </>
          )}

          <Box
            onClick={() => {
              router.push(
                `/inbox?user=${member && member.userId && member.userId}`,
              );
            }}
            sx={{ textAlign: 'center' }}
          >
            <OpaqueButton width="50%" height="34px">{t("Message")}</OpaqueButton>
          </Box>
        </ApplicantsButtonGroupContainer>
      )}
      <Avatar
        size="90px"
        avatar={
          member && member.userId
            ? member.userId.imageUrl
            : AvatarSampleImage2
        }
      />

      <Spacer value={8} />
      <CollabMemberName>
        {member && member.userId ? member.userId.username : 'Jacob Jones'}
      </CollabMemberName>
      <Spacer value={8} />
      <CollabMemberSubText>
        {" "}
        {member && member.userId && member.userId.skills
          ? member.userId.skills[0]
          : 'Artist / Creative Director'}
      </CollabMemberSubText>

      <Spacer value={16} />

      <Divider />

      <Spacer value={16} />

      <Box
        id="upper-text-container"
        sx={{ alignSelf: 'flex-start', marginLeft: '10px' }}
      >
        <CollabMemberSubText>{t("Applied Role:")}</CollabMemberSubText>
        <Spacer value={8} />
        <CollabMemberSubTextDetails>
          {member && member.memberRole && member.memberRole.skill
            ? member.memberRole.skill
            : 'Artist / Creative Director'}
        </CollabMemberSubTextDetails>
      </Box>

      <Spacer value={16} />

      <Box
        id="lower-text-container"
        sx={{ alignSelf: 'flex-start', marginLeft: '10px' }}
      >
        <CollabMemberSubText>{t("Compensation Offered :")}</CollabMemberSubText>
        <Spacer value={8} />
        <CollabMemberSubTextDetails>
          {getAmountAndType(
            member && member.memberRole
              ? member.memberRole
              : member.memberRole,
          )}
        </CollabMemberSubTextDetails>
        {member && member.memberNegotiation && (
          <>
            <Spacer value={24} />
            <CollabMemberSubText>{t("Applicant negotiation:")}</CollabMemberSubText>
            <Spacer value={8} />
            <CollabMemberSubTextDetails>
              {getAmountAndType(
                member && member.memberNegotiation
                  ? member.memberNegotiation
                  : member.memberNegotiation,
              )}
            </CollabMemberSubTextDetails>
          </>
        )}
      </Box>
    </CollabDetailsMemberTileContainer>
  </>);
};
