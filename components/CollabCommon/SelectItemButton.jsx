import { Box } from '@mui/material';
import {
  SelectItemContainer,
  SelectItemContainerOnBoardInvite,
  SelectItemImage,
  SelectItemOnBoardInviteImage,
  SelectItemText,
} from './elements';
import { Spacer } from '~/components';

export const SelectItemButton = ({
  active,
  image,
  name,
  selectItemClickHandler,
  source,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {source === 'OnBoardInvite' ? (
        <SelectItemContainerOnBoardInvite
          onClick={selectItemClickHandler}
          variant="contained"
          active={active}
        >
          <SelectItemOnBoardInviteImage src={image} />
        </SelectItemContainerOnBoardInvite>
      ) : (
        <SelectItemContainer
          onClick={selectItemClickHandler}
          variant="contained"
          active={active}
        >
          <SelectItemImage src={image} />
        </SelectItemContainer>
      )}
      <Spacer value={8} />
      <SelectItemText>{name}</SelectItemText>
    </Box>
  );
};
