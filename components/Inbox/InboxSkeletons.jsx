import { Skeleton, Box } from '@mui/material';
import {
  MessageMenuItemContainer,
  ChatItemContainer,
  ChatItemRowContainer,
  MessageNavigationsContainerSkeleton,
} from './elements';
import { Spacer } from '~/components';
import { FlexBox } from 'components/common/elements';

const chatSkeletonItems = [
  {
    isSender: false,
  },
  {
    isSender: false,
  },
  {
    isSender: true,
  },
  {
    isSender: false,
  },
  {
    isSender: true,
  },
  {
    isSender: false,
  },
  {
    isSender: true,
  },
  {
    isSender: true,
  },
  {
    isSender: false,
  },
  {
    isSender: true,
  },
  {
    isSender: false,
  },
  {
    isSender: false,
  },
];

export const MessageMenuItemSkeleton = ({ avatarSize }) => {
  return (
    <MessageMenuItemContainer width="100%" sx={{ marginLeft: '-10px' }}>
      <Box>
        <Skeleton
          variant="circular"
          width={avatarSize || 60}
          height={avatarSize || 60}
        />
      </Box>

      <Box sx={{ width: '400px', marginLeft: '10px' }}>
        <Skeleton variant="rounded" width="100%" height={30} />
      </Box>
    </MessageMenuItemContainer>
  );
};

export const ChatItemSkeleton = ({ isSender }) => {
  const getRandomWidth = () => {
    const minWidth = 500;
    const maxWidth = 1000;
    return `${Math.floor(
      Math.random() * (maxWidth - minWidth + 1) + minWidth,
    )}px`;
  };
  const getRandomDimension = (min, max) => {
    return `${Math.floor(Math.random() * (max - min + 1) + min)}px`;
  };

  const getRandomHeight = () => {
    const minHeight = 50;
    const maxHeight = 200;
    return getRandomDimension(minHeight, maxHeight);
  };
  const boxWidth = getRandomWidth();
  const messageHeight = getRandomHeight();
  return (
    <ChatItemContainer isSender={isSender}>
      <Box sx={{ width: boxWidth, margin: '10px 50%' }}>
        <Skeleton variant="rounded" width="100px" height={'10px'} />
      </Box>

      <ChatItemRowContainer isSender={isSender}>
        <FlexBox sx={{ gap: '.5rem' }}>
          <Skeleton variant="circular" width={35} height={35} />
          <Box sx={{ width: boxWidth }}>
            <Skeleton variant="rounded" width="100px" height={'20px'} />
          </Box>
        </FlexBox>

        <Spacer value={10} type="horizontal" />
        <Box sx={{ width: boxWidth, marginTop: '10px' }}>
          <Skeleton variant="rounded" width="100%" height={messageHeight} />
        </Box>
      </ChatItemRowContainer>
    </ChatItemContainer>
  );
};

export const ChatBoxRandomizedSkeleton = () => {
  return (
    <MessageNavigationsContainerSkeleton sx={{ marginTop: '20px' }}>
      {chatSkeletonItems.map(({ isSender }, index) => (
        <>
          <ChatItemSkeleton key={index} isSender={isSender} />
        </>
      ))}
    </MessageNavigationsContainerSkeleton>
  );
};
