import { MissionCardWrap } from './elements';
import { Skeleton } from '@mui/material';

export const MissionCardSkeleton = () => {
  return (
    <MissionCardWrap>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={20} />
    </MissionCardWrap>
  );
};
