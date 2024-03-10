import React from 'react';

const ArrowRightUpIcon = ({ color, width, height, strokeWidth, ...rest }) => {
  return (
    <svg
      version="1.1"
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? '12'}
      height={height ?? '12'}
      {...rest}
    >
      <g
        fill="none"
        stroke={color ?? '#000'}
        strokeMiterlimit="10"
        strokeWidth={strokeWidth ?? '2'}
      >
        <path transform="scale(50)" d="m5 6h13v13" />
        <path transform="scale(50)" d="M 4.8 19.2 L 18 6 " />
      </g>
    </svg>
  );
};

export default ArrowRightUpIcon;
