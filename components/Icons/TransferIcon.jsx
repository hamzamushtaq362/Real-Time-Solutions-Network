import React from 'react';

const TransferIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path d="M15.4883 4.01172L12.5 0.988281V3.23828H1.25V4.75H12.5V7L15.4883 4.01172ZM0.511719 9.98828L3.5 13.0117V10.7617H14.75V9.25H3.5V7L0.511719 9.98828Z" fill={color ?? 'black'} />
    </svg>
  );
};

export default TransferIcon;