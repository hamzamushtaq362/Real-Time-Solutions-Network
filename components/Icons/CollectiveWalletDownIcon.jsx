import React from 'react';

const CollectiveWalletDownIcon = ({ theme, color, width, height, ...rest }) => {
  return (
    <svg
      width={width ?? 16}
      height={height ?? 16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="m3 4 4 4 4-4"
        stroke={color ? color : '#fff'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CollectiveWalletDownIcon;
