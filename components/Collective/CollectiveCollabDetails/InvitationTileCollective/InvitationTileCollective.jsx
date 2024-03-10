import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  InvitationTileContainer,
  InvitationTileHeader,
  InviterProfile,
  InviteTileSmallText,
  InviteTileText,
} from './elements';
import { Divider, Spacer, Avatar, OpaqueButton } from '~/components';

import { AvatarSampleImage2 } from 'assets/png';

const InvitationTileCollective = ({ inv }) => {
  const { t } = useTranslation();

  const inviteStatusMappings = {
    ACCEPTED: { text: 'Accepted', color: '#83BF6E' },
    REJECTED: { text: 'Rejected', color: '#FF754C' },
    AWAITING: { text: 'Awaiting Response', color: '#FFCE73' },
    PENDING: { text: 'Awaiting Response', color: '#FFCE73' },
  };

  const [invStatus, setInvStatus] = useState('');

  useEffect(() => {
    setInvStatus(inv.status);
  }, [inv]);

  return (
    (<InvitationTileContainer>
      <InvitationTileHeader>{t("Invite Details")}</InvitationTileHeader>
      <Spacer value={8} />
      <Divider />
      <Spacer value={16} />
      <InviteTileSmallText>{t("Invitation")}</InviteTileSmallText>
      <Spacer value={8} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          avatar={inv?.userId?.imageUrl || AvatarSampleImage2}
          size="5rem"
        />
        <Box sx={{ marginLeft: '13px' }}>
          <InviteTileText>
            {inv && inv.userId && inv.userId.username
              ? inv.userId.username
              : 'No Name'}
          </InviteTileText>
          <Spacer value={4} />
        </Box>
      </Box>
      <Spacer value={24} />
      <Link href={`@${inv && inv.userId && inv.userId.username}`}>
        <InviterProfile>{t("View Profile")}</InviterProfile>
      </Link>
      <Spacer value={24} />
      {inv.status === 'PENDING' ? (
        <>
          <InviteTileSmallText>{t("Status")}</InviteTileSmallText>
          <Spacer value={3} />
          <InviteTileText color={inviteStatusMappings[inv && inv.status].color}>
            {inviteStatusMappings[inv && inv.status].text}
          </InviteTileText>
        </>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {(inv.status === 'ACCEPTED' || invStatus === 'ACCEPTED') && (
            <OpaqueButton width="100%" height="34px">{t("Accepted")}</OpaqueButton>
          )}
          {(inv.status === 'REJECTED' || invStatus === 'REJECTED') && (
            <OpaqueButton width="100%" height="34px" variant="secondary">{t("Rejected")}</OpaqueButton>
          )}
        </Box>
      )}
      <Spacer value={8} />
    </InvitationTileContainer>)
  );
};

export default InvitationTileCollective;
