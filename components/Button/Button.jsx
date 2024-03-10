import React from 'react';
import { PushButtonContainer, DefaultButtonContainer } from './elements';
import { Iconify } from '../Iconify';
import HeartIcon from '../Icons/HeartIcon';
import { useTheme } from '@mui/material';

const Button = ({
  position,
  children,
  margin,
  marginLeft,
  marginBottom,
  marginRight,
  marginTop,
  padding,
  paddingLeft,
  paddingBottom,
  paddingRight,
  paddingTop,
  backgroundColor,
  width,
  textAlign,
  color,
  borderRadius,
  border,
  boxShadow,
  className,
  disable,
  hoverCancel,
  fontSize,
  onClick,
}) => {
  const btnStyles = {
    display: 'inline-block',
    margin: margin ? margin : '1rem',
    marginLeft: marginLeft ? marginLeft : '1rem',
    marginBottom: marginBottom ? marginBottom : '1rem',
    marginRight: marginRight ? marginRight : '1rem',
    marginTop: marginTop ? marginTop : '1rem',
    padding: padding ? padding : '1rem',
    paddingLeft: paddingLeft ? paddingLeft : '1rem',
    paddingBottom: paddingBottom ? paddingBottom : '1rem',
    paddingRight: paddingRight ? paddingRight : '1rem',
    paddingTop: paddingTop ? paddingTop : 'rem',
    backgroundColor: backgroundColor ? backgroundColor : 'blue',
    width: width && width,
    textAlign: textAlign ? textAlign : 'center',
    color: color ? color : '#fff',
    borderRadius: borderRadius ? borderRadius : '.5rem',
    border: border && border,
    cursor: 'pointer',
    boxShadow: boxShadow && boxShadow,
    position: position && position,
    fontSize: fontSize && fontSize,
  };

  return (
    <DefaultButtonContainer
      onClick={onClick}
      disabled={disable}
      className={`${hoverCancel && hoverCancel} ${className && className}`}
      style={btnStyles}
    >
      {children}
    </DefaultButtonContainer>
  );
};

export default Button;

export const HeartButton = ({ isLiked, onClick, size, ...rest }) => {
  const theme = useTheme();
  const iconSize = size === 'medium' ? 25 : 20;
  return (
    <PushButtonContainer onClick={onClick} size={size} {...rest}>
      <HeartIcon width={iconSize} height={iconSize} color={theme.palette.text.primary} fill={isLiked ? theme.palette.text.primary: 'transparent'} />
    </PushButtonContainer>
  );
};

export const StarButton = ({ isStarred, onClick, size }) => {
  const iconSize = size === 'medium' ? 23 : 18;
  return (
    <PushButtonContainer onClick={onClick} size={size}>
      {isStarred ? (
        <Iconify
          color="#faaf00"
          icon="clarity:star-solid"
          width={iconSize}
          height={iconSize}
        />
      ) : (
        <Iconify
          color="#757D8A"
          icon="akar-icons:star"
          width={iconSize}
          height={iconSize}
        />
      )}
    </PushButtonContainer>
  );
};
