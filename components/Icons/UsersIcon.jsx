import React from 'react';

// const UsersIcon = ({ color, width, height, ...rest }) => {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
//       <path d="M16 3.46776C17.4817 4.20411 18.5 5.73314 18.5 7.5C18.5 9.26686 17.4817 10.7959 16 11.5322M18 16.7664C19.5115 17.4503 20.8725 18.565 22 20M2 20C3.94649 17.5226 6.58918 16 9.5 16C12.4108 16 15.0535 17.5226 17 20M14 7.5C14 9.98528 11.9853 12 9.5 12C7.01472 12 5 9.98528 5 7.5C5 5.01472 7.01472 3 9.5 3C11.9853 3 14 5.01472 14 7.5Z" stroke={color ?? 'black'} strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   );
// };
const UsersIcon = ({ color, width, height,fill, ...rest }) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path d="M15 1C16.933 1 18.5 2.567 18.5 4.5C18.5 6.433 16.933 8 15 8M20.5 18H23C23 15.0623 20.9318 12.5472 18 11.5088M9 8C7.067 8 5.5 6.433 5.5 4.5C5.5 2.567 7.067 1 9 1C10.933 1 12.5 2.567 12.5 4.5C12.5 6.433 10.933 8 9 8ZM1 18C1 14.134 4.58172 11 9 11C13.4183 11 17 14.134 17 18H1Z" fill={fill || ""} stroke={color ?? 'black'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
    </svg>
  );
};

export default UsersIcon;