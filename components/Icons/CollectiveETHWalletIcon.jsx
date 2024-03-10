import React from 'react';

const CollectiveETHWalletIcon = ({ theme, color, width, height, ...rest }) => {
  return (
    <svg
      width={width ?? '16'}
      height={height ?? '16'}
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g clipPath="url(#clip0_1853_31052)">
        <path
          d="M4.39986 0L4.30371 0.364619V10.9441L4.39986 11.0512L8.79846 8.14837L4.39986 0Z"
          fill={color ? color : theme.pallete?.background?.paper}
        />
        <path
          d="M4.39871 0L0 8.14837L4.39871 11.0512V5.91619V0Z"
          fill={color ? color : theme.pallete?.background?.paper}
        />
        <path
          d="M4.39794 11.9811L4.34375 12.0549V15.8235L4.39794 16.0001L8.79923 9.07983L4.39794 11.9811Z"
          fill={color ? color : theme.pallete?.background?.paper}
        />
        <path
          d="M4.39871 15.9997V11.9808L0 9.07947L4.39871 15.9997Z"
          fill={color ? color : theme.pallete?.background?.paper}
        />
        <path
          d="M4.39941 11.0507L8.79801 8.14795L4.39941 5.91577V11.0507Z"
          fill={color ? color : theme.pallete?.background?.paper}
        />
        <path
          d="M0 8.14844L4.39871 11.0512V5.91626L0 8.14844Z"
          fill={color ? color : theme.pallete?.background?.paper}
        />
      </g>
      <defs>
        <clipPath id="clip0_1853_31052">
          <rect width="8.8" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CollectiveETHWalletIcon;
