import React from 'react';
import { TooltipWrapper, TooltipText, StyledTooltipElement } from './elements';
import { Zoom } from '@mui/material';

export const Tooltip = ({ children, title, disabled, ...props }) => (
  <>
    {!disabled ? (
      <TooltipWrapper
        title={<TooltipText>{title || ''}</TooltipText>}
        TransitionComponent={Zoom}
        TransitionProps={{ timeout: 50 }}
        {...props}
      >
        {children}
      </TooltipWrapper>
    ) : (
      <>{children}</>
    )}
  </>
);

export const StyledTooltip = ({ children, title, disabled, ...props }) => (
  <>
    {!disabled ? (
      <StyledTooltipElement
        title={<TooltipText>{title || ''}</TooltipText>}
        {...props}
      >
        {children}
      </StyledTooltipElement>
    ) : (
      <>{children}</>
    )}
  </>
);
