import { useTranslation } from 'react-i18next';
import {
  CollabInviteTileContainer,
  InviteTileSmallText,
  InviteTileText,
  InviteAgainButton,
} from './elements';

import { Spacer, Avatar, OpaqueButton, ErrorOpaqueButton } from '~/components';
import { inviteStatusMappings } from '~/constants';

import { Box } from '@mui/material';

export const CollabDetailsInviteTile = ({
  inviteId,
  inviteStatus,
  name,
  subTitle,
  role,
  compensation,
  avatar,
  negotiation,
  loadingAccept,
  loadingReject,
  acceptOrRejectNegotiation,
}) => {
  const { t } = useTranslation();

  return (
    (<CollabInviteTileContainer>
      {inviteStatus === 'PENDING' && !negotiation && (
        <InviteAgainButton id="invite-again-button" height="38px" width="216px">{t("Invite Again")}</InviteAgainButton>
      )}
      {inviteStatus === 'PENDING' && negotiation && (
        <Box
          id="invite-again-button"
          sx={{
            width: '100%',
            position: 'absolute',
            bottom: 16,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <OpaqueButton
            onClick={() => acceptOrRejectNegotiation(inviteId, 'accept')}
            disabled={loadingAccept || loadingReject}
            height="36px"
            width="40%"
          >{t("Accept")}</OpaqueButton>
          <ErrorOpaqueButton
            onClick={() => acceptOrRejectNegotiation(inviteId, 'reject')}
            disabled={loadingAccept || loadingReject}
            height="36px"
            width="40%"
            sx={{ marginLeft: '5px' }}
          >{t("Reject")}</ErrorOpaqueButton>
        </Box>
      )}
      <InviteTileSmallText>{t("Your Invitation for")}</InviteTileSmallText>
      <Spacer value={8} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar avatar={avatar} size="50px" />
        <Box sx={{ marginLeft: '13px' }}>
          <InviteTileText>{name}</InviteTileText>
          <Spacer value={4} />
          <InviteTileSmallText>{subTitle}</InviteTileSmallText>
        </Box>
      </Box>
      <Spacer value={24} />
      <>
        <InviteTileSmallText>{t("Role")}</InviteTileSmallText>
        <Spacer value={3} />
        <InviteTileText fontSize={role.length > 27 ? '12px' : '14px'}>
          {role}
        </InviteTileText>
      </>
      <Spacer value={24} />
      {!negotiation ? (
        <>
          <InviteTileSmallText>{t("Compensation")}</InviteTileSmallText>
          <Spacer value={3} />
          <InviteTileText>{compensation}</InviteTileText>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <InviteTileSmallText>{t("Compensation")}</InviteTileSmallText>

            <InviteTileText>{compensation}</InviteTileText>
          </Box>
        </>
      )}
      {negotiation && (
        <>
          <Spacer value={24} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <InviteTileSmallText>{t("Negotiation")}</InviteTileSmallText>
            <InviteTileText>{negotiation}</InviteTileText>
          </Box>
        </>
      )}
      <Spacer value={negotiation ? 25 : 44} />
      <Box>
        <InviteTileSmallText>{t("Status")}</InviteTileSmallText>
        <Spacer value={3} />

        {!negotiation && (
          <InviteTileText color={inviteStatusMappings[inviteStatus].color}>
            {inviteStatusMappings[inviteStatus].text}
          </InviteTileText>
        )}
        {negotiation && inviteStatus === 'ACCEPTED' && (
          <InviteTileText color={inviteStatusMappings['ACCEPTED'].color}>
            {inviteStatusMappings['ACCEPTED'].text}
          </InviteTileText>
        )}

        {negotiation && inviteStatus === 'PENDING' && (
          <InviteTileText color={inviteStatusMappings['NEGOTIATED'].color}>
            {inviteStatusMappings['NEGOTIATED'].text}
          </InviteTileText>
        )}
      </Box>
    </CollabInviteTileContainer>)
  );
};