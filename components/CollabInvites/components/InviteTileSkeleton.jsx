import { Skeleton } from '@mui/material';
import { InvitationTileContainer } from './elements';
import { Spacer } from '~/components';

export const InvitationTileSkeleton = ({ inviteType }) => (
  <InvitationTileContainer>
    <Skeleton variant="rounded" width={'100%'} height={60} />
    <Spacer value={24} />
    {inviteType === 'sent' ? (
      <Skeleton variant="circular" width={50} height={50} />
    ) : (
      <>
        <Skeleton variant="rounded" width={'60%'} height={25} />
        <Spacer value={8} />
        <Skeleton variant="rounded" width={'80%'} height={25} />
      </>
    )}
    <Spacer value={24} />
    <Skeleton variant="rounded" width={'100%'} height={80} />
    <Spacer value={24} />
    <Skeleton variant="rounded" width={'100%'} height={80} />
    <Spacer value={24} />
    <Skeleton variant="rounded" width={'100%'} height={30} />
  </InvitationTileContainer>
);
