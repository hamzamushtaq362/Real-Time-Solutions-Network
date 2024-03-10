import { Tooltip as MuiTooltip, styled, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';

export const TooltipWrapper = styled(MuiTooltip)({});

export const TooltipText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: 'system-ui',
  letterSpacing: 'unset'
}));

export const StyledTooltipElement = withStyles({
  tooltip: {
    fontSize: 12,
  },
})(MuiTooltip);
