import React from 'react';

const ListIcon = ({ color, width, height, ...rest }) => {
  return (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
    <rect width="7.82352" height="7.82352" rx="1" stroke={color ?? 'black'} />
    <rect y="10.0883" width="7.82352" height="7.82352" rx="1" stroke={color ?? 'black'} />
    <rect y="20.1765" width="7.82352" height="7.82352" rx="1" stroke={color ?? 'black'} />
    <rect x="10" width="18" height="8" rx="1" stroke={color ?? 'black'} />
    <rect x="10" y="10" width="18" height="8" rx="1" stroke={color ?? 'black'} />
    <rect x="10" y="20" width="18" height="8" rx="1" stroke={color ?? 'black'} />
  </svg>

);
};

export default ListIcon;