import {
  StatTitle,
  StatSubTitle,
  StatsContainer,
  StatsSubContainer,
} from './elements';
import { Spacer } from '~/components';
import { Skeleton } from '@mui/material';

export const StatBox = ({
  title,
  subTitle,
  isLoading,
}) => {
  return (
    <StatsContainer>
      {!isLoading ? (
        <StatsSubContainer>
          <div>
            <StatTitle>{title}</StatTitle>
          </div>
          <StatSubTitle>{subTitle}</StatSubTitle>
        </StatsSubContainer>
      ) : (
        <>
          <Skeleton width={300} variant="rectangular" height={130} />
          <Spacer value={20} />
          <Skeleton width={100} variant="rectangular" height={50} />
        </>
      )}
    </StatsContainer>
  );
};
