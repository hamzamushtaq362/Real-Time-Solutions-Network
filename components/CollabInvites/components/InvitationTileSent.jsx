import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { BASE_URL } from '~/apis';
import { AvatarSampleImage2 } from '~/assets';
import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';
import { getAmountAndType } from '~/utils';
import {
  CollabName,
  CollabText,
  InvitationTileContainer,
  InvitationTileHeader,
  InviterProfile,
  InviteTileSmallText,
  InviteTileText,
} from './elements';
import { Divider, Spacer, Avatar, OpaqueButton } from '~/components';
import { StyledTooltip } from '../../DashboardHome/elements';
import AppContext from 'context/AppContext';

const InvitationTileSent = ({ inv }) => {
  const { t } = useTranslation();

  const inviteStatusMappings = {
    ACCEPTED: { text: 'Accepted', color: '#83BF6E' },
    REJECTED: { text: 'Rejected', color: '#FF754C' },
    AWAITING: { text: 'Awaiting Response', color: '#FFCE73' },
    PENDING: { text: 'Awaiting Response', color: '#FFCE73' },
  };

  const [invStatus, setInvStatus] = useState('');
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const { user } = useContext(AppContext);
  const isProfileComplete = user?.isProfileComplete;

  const acceptOrRejectNegotiation = async (id, type) => {
    if (type === 'accept') {
      setLoadingAccept(true);
    }
    if (type === 'reject') {
      setLoadingReject(true);
    }
    try {
      const f1 = async () => {
        let obj = {};
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
          setInvStatus('ACCEPTED');
        }
        if (res.data.data.member.status === 'REJECTED') {
          setInvStatus('REJECTED');
        }
      }
    } catch (error) {
      if (type === 'accept') {
        setLoadingAccept(false);
      } else {
        setLoadingReject(false);
      }
    }
  };

  return (
    (<InvitationTileContainer>
      <InvitationTileHeader>{t("Invite Details")}</InvitationTileHeader>
      <Spacer value={8} />
      <Divider />
      <Spacer value={16} />
      <InviteTileSmallText>{t("Your Invitation for")}</InviteTileSmallText>
      <Spacer value={8} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          avatar={inv?.userId?.imageUrl || AvatarSampleImage2}
          size="5rem"
        />
        <Box sx={{ marginLeft: '13px' }}>
          <InviteTileText>
            {inv && inv.userId && inv.userId.fullName
              ? inv.userId.fullName
              : 'No Name'}
          </InviteTileText>
          <Spacer value={4} />
          <InviteTileSmallText>
            {inv && inv.userId && inv.userId.skills
              ? inv.userId.skills[0]
              : 'Product Designer'}
          </InviteTileSmallText>
        </Box>
      </Box>
      <Spacer value={5} />
      <Link href={`@${inv && inv.userId && inv.userId.username}`}>
        <InviterProfile>{t("View Profile")}</InviterProfile>
      </Link>
      <Spacer value={24} />
      <CollabText>{t("Collab")}</CollabText>
      <Link href={`/collab/${inv && inv.collabId && inv.collabId._id}`}>
        <CollabName>
          {inv && inv.collabId && inv.collabId.title
            ? inv.collabId.title
            : 'Women Ape Yacht Club'}
        </CollabName>
      </Link>
      <Spacer value={24} />
      <>
        <InviteTileSmallText>{t("Role")}</InviteTileSmallText>
        <Spacer value={3} />
        <InviteTileText>
          {inv && inv.memberRole && inv.memberRole.skill
            ? inv.memberRole.skill
            : '3D Artist'}
        </InviteTileText>
      </>
      <Spacer value={24} />
      <>
        <InviteTileSmallText>{t("Original")}</InviteTileSmallText>
        <Spacer value={3} />
        <InviteTileText>
          {getAmountAndType(
            inv && inv.memberRole ? inv.memberRole : inv.memberRole,
          )}
        </InviteTileText>
        <Spacer value={8} />

        {inv && inv.memberNegotiation && (
          <>
            <InviteTileSmallText>{t("Negotiated")}</InviteTileSmallText>
            <Spacer value={3} />
            <InviteTileText>
              {getAmountAndType(
                inv && inv.memberNegotiation
                  ? inv.memberNegotiation
                  : inv.memberNegotiation,
              )}
            </InviteTileText>
          </>
        )}
      </>
      <Spacer value={24} />
      {inv.status === 'PENDING' && !inv.memberNegotiation ? (
        <>
          <InviteTileSmallText>{t("Status")}</InviteTileSmallText>
          <Spacer value={3} />
          <InviteTileText color={inviteStatusMappings[inv && inv.status].color}>
            {inviteStatusMappings[inv && inv.status].text}
          </InviteTileText>
        </>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {(inv.status === 'ACCEPTED' || invStatus === 'ACCEPTED') &&
            inv.memberNegotiation && (
              <OpaqueButton width="100%" height="34px">{t("Accepted")}</OpaqueButton>
            )}
          {(inv.status === 'REJECTED' || invStatus === 'REJECTED') &&
            inv.memberNegotiation && (
              <OpaqueButton width="100%" height="34px" variant="secondary">{t("Rejected")}</OpaqueButton>
            )}
          {inv.status === 'PENDING' && !invStatus && inv.memberNegotiation && (
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
                    onClick={() => acceptOrRejectNegotiation(inv._id, 'accept')}
                    width="50%"
                    height="34px"
                    sx={{ marginRight: '10px' }}
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
                    onClick={() => acceptOrRejectNegotiation(inv._id, 'reject')}
                    width="50%"
                    height="34px"
                    variant="secondary"
                  >
                    {loadingReject ? 'Rejecting' : 'Reject'}
                  </OpaqueButton>
                </span>
              </StyledTooltip>
            </>
          )}
        </Box>
      )}
      <Spacer value={8} />
    </InvitationTileContainer>)
  );
};

export default InvitationTileSent;
