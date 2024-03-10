import React from 'react';
import { StyledBox, StyledSmallSpinner } from './elements';

export const LoadMore = ({inverse}) => {
  return (
    <StyledBox inverse={inverse} className="ispinner">
      <StyledBox inverse={inverse} className="ispinner-blade" />
      <StyledBox inverse={inverse} className="ispinner-blade" />
      <StyledBox inverse={inverse} className="ispinner-blade" />
      <StyledBox inverse={inverse} className="ispinner-blade" />
      <StyledBox inverse={inverse} className="ispinner-blade" />
      <StyledBox inverse={inverse} className="ispinner-blade" />
      <StyledBox inverse={inverse} className="ispinner-blade" />
      <StyledBox inverse={inverse} className="ispinner-blade" />
    </StyledBox>
  );
};

export const SmallSpinner = ({inverse, color}) => {
  return (
    <StyledSmallSpinner inverse={inverse} className="small-spinner" color={color}>
      <StyledSmallSpinner inverse={inverse} className="small-spinner-blade" color={color} />
      <StyledSmallSpinner inverse={inverse} className="small-spinner-blade" color={color} />
      <StyledSmallSpinner inverse={inverse} className="small-spinner-blade" color={color} />
      <StyledSmallSpinner inverse={inverse} className="small-spinner-blade" color={color} />
      <StyledSmallSpinner inverse={inverse} className="small-spinner-blade" color={color} />
      <StyledSmallSpinner inverse={inverse} className="small-spinner-blade" color={color} />
      <StyledSmallSpinner inverse={inverse} className="small-spinner-blade" color={color} />
      <StyledSmallSpinner inverse={inverse} className="small-spinner-blade" color={color} />
    </StyledSmallSpinner>
  )
}