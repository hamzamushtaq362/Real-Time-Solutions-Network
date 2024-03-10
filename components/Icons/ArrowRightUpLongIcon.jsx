import React from 'react';

const ArrowRightUpLongIcon = ({ color, width, height, ...rest }) => {
  return (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
    <path d="M13.0637 1.34303C13.0637 0.928817 12.7279 0.59303 12.3137 0.59303L5.56371 0.59303C5.14949 0.59303 4.81371 0.928816 4.81371 1.34303C4.81371 1.75724 5.14949 2.09303 5.56371 2.09303H11.5637V8.09303C11.5637 8.50724 11.8995 8.84303 12.3137 8.84303C12.7279 8.84303 13.0637 8.50724 13.0637 8.09303L13.0637 1.34303ZM1.53033 13.1871L12.844 1.87336L11.7834 0.8127L0.46967 12.1264L1.53033 13.1871Z" fill={color ?? '#020202'} />
  </svg>
  );
};

export default ArrowRightUpLongIcon;