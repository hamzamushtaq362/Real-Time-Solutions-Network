import { styled, Typography } from '@mui/material';

export const FormikInputInfoText = styled(Typography)(
  ({ variant, theme, pointerCursor }) => ({
    color:
      variant === 'error'
        ? theme.palette.red.main
        : theme.palette.grey.common,

    ...theme.typography.body6,
    lineHeight: '20px',
    cursor: pointerCursor ? 'cursor' : '',
  }),
);
