import { CircularProgress, Box, useTheme } from '@mui/material';

export const Spinner = ({ size, color, justifyContent, fullHeight, inverse }) => {
  const theme = useTheme();

  const getFullHeightStyles = (fullHeight) => {
    return fullHeight
      ? {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }
      : {};
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: justifyContent ? justifyContent : 'center',
        ...getFullHeightStyles(fullHeight),
      }}
    >
      <CircularProgress
        sx={{ color: color ? color : inverse ? theme.palette.background.paper : theme.palette.background.inverse }}
        size={size}
      />
    </Box>
  );
};
