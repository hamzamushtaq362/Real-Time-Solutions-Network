import React from 'react';

const NotificationBellIcon = ({ color, width, height }) => {
  return (
    <svg
      width={width ?? 18}
      height={height ?? 18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 6C13.5 4.80653 13.0259 3.66193 12.182 2.81802C11.3381 1.97411 10.1935 1.5 9 1.5C7.80653 1.5 6.66193 1.97411 5.81802 2.81802C4.97411 3.66193 4.5 4.80653 4.5 6C4.5 11.25 2.25 12.75 2.25 12.75H15.75C15.75 12.75 13.5 11.25 13.5 6Z"
        fill={color ? color : '#020202'}
        stroke={color ? color : '#020202'}
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2962 15.75C10.1643 15.9773 9.97505 16.166 9.74734 16.2971C9.51963 16.4283 9.26146 16.4973 8.99867 16.4973C8.73589 16.4973 8.47771 16.4283 8.25 16.2971C8.02229 16.166 7.83303 15.9773 7.70117 15.75"
        stroke={color ? color : '#020202'}
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NotificationBellIcon;
