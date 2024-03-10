import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import Link from 'next/link';
import { getAmountAndType } from '~/utils';
import {
  CollabMemberMessageButton,
  InviteTileSmallText,
  InviteTileText,
  CollabName,
  CollabText,
  InvitationTileContainer,
  InvitationTileHeader,
  InviteAcceptButton,
  InviteTileBlueText,
  InviteTileTextSeperate,
} from './elements';
import { NegotiateCollabDialog, Spacer, Divider } from '~/components';
import { useTheme } from '@mui/material';

const InvitationTileReceived = ({ inv }) => {
  const { t } = useTranslation();

  const inviteStatusMappings = {
    ACCEPTED: { text: 'Accepted', color: '#83BF6E' },
    REJECTED: { text: 'Rejected', color: '#FF754C' },
    AWAITING: { text: 'Awaiting Response', color: '#FFCE73' },
    PENDING: { text: 'Awaiting Response', color: '#FFCE73' },
  };

  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    (<InvitationTileContainer>
      <InvitationTileHeader>{t("Accept Collab Request")}</InvitationTileHeader>
      <Spacer value={8} />
      <InviteTileSmallText>{t("Please confirm the details to join the collab")}</InviteTileSmallText>
      <Spacer value={16} />
      <InviteTileText>{t("Collab Details")}</InviteTileText>
      <Spacer value={16} />
      <CollabText>{t("Collab")}</CollabText>
      <CollabName>
        {inv && inv.collabId && inv.collabId.title
          ? inv.collabId.title
          : 'Women Ape Yacht Club'}
      </CollabName>
      <Spacer value={24} />
      <>
        <InviteTileSmallText>{t("Created by")}</InviteTileSmallText>
        <Spacer value={3} />
        <InviteTileText>
          {inv && inv.senderId && inv.senderId.username
            ? inv.senderId.username
            : 'No Name'}
        </InviteTileText>
      </>
      <Spacer value={8} />
      <Divider />
      <Spacer value={8} />
      {open && (
        <NegotiateCollabDialog
          id={inv._id}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          memberRoleDetails={inv?.memberRole || null}
        />
      )}
      <InviteTileTextSeperate>
        <InviteTileText>{t("Compensation")}</InviteTileText>
        {inv &&
          inv.status &&
          inv.memberNegotiation &&
          inv.memberNegotiation &&
          inv.memberNegotiation.amount &&
          inv.status === 'PENDING' && (
            <InviteTileBlueText onClick={() => setOpen(true)}>{t("Negotiate")}</InviteTileBlueText>
          )}
      </InviteTileTextSeperate>
      <Spacer value={24} />
      <InviteTileTextSeperate>
        <Box sx={{ fontSize: '14px', color: theme.palette.grey.common }}>{t("Original")}</Box>
        <InviteTileText>
          {getAmountAndType(
            inv && inv.memberRole ? inv.memberRole : inv.memberRole,
          )}
        </InviteTileText>
      </InviteTileTextSeperate>
      <InviteTileTextSeperate>
        <Box sx={{ fontSize: '14px', color: theme.palette.grey.common }}>{t("Negotiated")}</Box>
        <InviteTileText>
          {getAmountAndType(
            inv && inv.memberNegotiation
              ? inv.memberNegotiation
              : inv.memberNegotiation,
          )}
        </InviteTileText>
      </InviteTileTextSeperate>
      <Spacer value={24} />
      {inv.status === 'PENDING' && !inv.memberNegotiation ? (
        <Link
          style={{ width: '100%' }}
          href={`/collab/${inv && inv.collabId && inv.collabId._id}`}
        >
          <InviteAcceptButton>{t("Accept Invite")}</InviteAcceptButton>
        </Link>
      ) : (
        <>
          <InviteTileSmallText>{t("Status")}</InviteTileSmallText>
          <Spacer value={3} />
          <InviteTileText color={inviteStatusMappings[inv && inv.status].color}>
            {inviteStatusMappings[inv && inv.status].text}
          </InviteTileText>
          {inv && inv.status === 'PENDING' && (
            <Box sx={{ width: '100%' }} id="heart-button-hover">
              <Link
                style={{ width: '100%' }}
                href={`/collab/${inv && inv.collabId && inv.collabId._id}`}
              >
                <CollabMemberMessageButton
                  id="CollabMemberMessageButton"
                  width="90%"
                  height="40px"
                  sx={{
                    left: 0,
                    marginLeft: '5%',
                    display: 'none',
                  }}
                >{t("View Collab")}</CollabMemberMessageButton>
              </Link>
            </Box>
          )}
        </>
      )}
    </InvitationTileContainer>)
  );
};

export default InvitationTileReceived;
