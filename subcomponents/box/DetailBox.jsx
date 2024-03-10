import { DetailsBoxValue } from './elements';
import { Box, Skeleton, styled } from '@mui/material';
import { getShortNumber } from '~/utils';
import { UpIcon, DownIcon } from '~/assets';
import Image from 'next/image';

export default function DetailBox({
  title,
  value,
  percent,
  isUp,
  isLoading,
  showPercent = true,
}) {
  return (
    <BoxContainer isUp={isUp}>
      <p className="heading">{title}</p>
      <div className="valueCont">
        <>
          {!isLoading ? (
            <DetailsBoxValue>
              {value ? getShortNumber(value) : '0.00'}
            </DetailsBoxValue>
          ) : (
            <Skeleton
              sx={{ marginY: '2rem' }}
              variant="rounded"
              width={60}
              height={40}
            />
          )}
        </>
        {showPercent &&
          (!isLoading ? (
            <div className="iconCont">
              <span className="up">{isUp ? percent : '-' + percent}</span>
              <div className="icon">
                <Image src={isUp ? UpIcon : DownIcon} />
              </div>
            </div>
          ) : (
            <Skeleton
              sx={{ marginY: '2rem' }}
              variant="rounded"
              width={80}
              height={20}
            />
          ))}
      </div>
    </BoxContainer>
  );
}

export const BoxContainer = styled(Box)(({ isUp, theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `0.15rem solid ${theme.palette.background.border}`,
  width: '260px',
  height: '127px',
  padding: '2rem',
  borderRadius: '10px',

  '& .heading': {
    color: theme.palette.grey.common,
    ...theme.typography.body4,
  },

  '& .valueCont': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  '& .up': {
    color: `${isUp ? '#3A974A' : '#FF754C'}`,
    fontSize: '12px',
    fontWeight: 'bold',
  },

  '& .iconCont': {
    display: 'flex',
    //   justifyContent: "center",
    alignItems: 'center',
  },

  '& .icon': {
    backgroundColor: `${
      isUp ? 'rgba(58, 151, 74, 0.1)' : 'rgba(255, 117, 76, 0.1)'
    }`,
    margin: '0 1rem',
    padding: '.5rem',
    // width: "20px",
    // height: '20px',
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: '100%',
  },
}));
