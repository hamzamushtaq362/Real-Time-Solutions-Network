import {
  CollabTileAddPlaceholderContainer,
  PlaceholderContentContainer,
  PlaceholderText,
} from './elements';
import PlusIcon from 'components/Icons/PlusIcon';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const TileAddPlaceholder = ({
  sx,
  onClick,
  cardTitle,
  iconSize,
  ...rest
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);

  return (
    <CollabTileAddPlaceholderContainer
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      hovered={hovered}
      sx={sx}
      onClick={onClick}
      {...rest}
    >
      <PlaceholderContentContainer>
        <PlusIcon
          color={theme.palette.text.primary}
          width={iconSize ?? 80}
          height={iconSize ?? 80}
        />

        <PlaceholderText>{t(cardTitle)}</PlaceholderText>
      </PlaceholderContentContainer>
    </CollabTileAddPlaceholderContainer>
  );
};
