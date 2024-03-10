import React from 'react';

const CollectiveMoreHorizontalIcon = ({ color }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10Z"
        stroke={color ? color : '#020202'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 10C14.5523 10 15 9.55228 15 9C15 8.44772 14.5523 8 14 8C13.4477 8 13 8.44772 13 9C13 9.55228 13.4477 10 14 10Z"
        stroke={color ? color : '#020202'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 10C4.55228 10 5 9.55228 5 9C5 8.44772 4.55228 8 4 8C3.44772 8 3 8.44772 3 9C3 9.55228 3.44772 10 4 10Z"
        stroke={color ? color : '#020202'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CollectiveMoreHorizontalIcon;
