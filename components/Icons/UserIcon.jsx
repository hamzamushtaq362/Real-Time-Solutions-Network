import React from 'react';

const UserIcon = ({ color, width, fill, height, strokeWidth, ...rest }) => {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path d="M5.99999 7.5C4.41495 7.5 3.00539 8.26532 2.10798 9.45298C1.91484 9.7086 1.81827 9.83641 1.82143 10.0091C1.82387 10.1426 1.90767 10.3109 2.01267 10.3933C2.14858 10.5 2.33692 10.5 2.7136 10.5H9.28637C9.66305 10.5 9.85139 10.5 9.9873 10.3933C10.0923 10.3109 10.1761 10.1426 10.1785 10.0091C10.1817 9.83641 10.0851 9.7086 9.89199 9.45298C8.99459 8.26532 7.58502 7.5 5.99999 7.5Z" strokeWidth={strokeWidth ?? '0.9'} fill={fill || ""} stroke={color ?? 'black'} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.99999 6C7.24263 6 8.24999 4.99264 8.24999 3.75C8.24999 2.50736 7.24263 1.5 5.99999 1.5C4.75735 1.5 3.74999 2.50736 3.74999 3.75C3.74999 4.99264 4.75735 6 5.99999 6Z" strokeWidth={strokeWidth ?? '0.9'} stroke={color ?? 'black'} strokeLinecap="round" strokeLinejoin="round" fill={fill || ""} />
    </svg>
  );
};

export default UserIcon;