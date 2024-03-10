import {
  NoChatSelectedContainer,
  NoChatSelectedContentContainer,
  NoChatSelectedText,
} from './elements';

import { UilCommentsAlt } from '@iconscout/react-unicons';
import { useTheme } from '@mui/material';

export const NoChatSelected = () => {
  const theme = useTheme();

  return (
    <NoChatSelectedContainer>
      <NoChatSelectedContentContainer>
        <UilCommentsAlt size="80" color={theme.palette.grey.common} />
        <NoChatSelectedText>No Chat Selected</NoChatSelectedText>
      </NoChatSelectedContentContainer>
    </NoChatSelectedContainer>
  );
};
