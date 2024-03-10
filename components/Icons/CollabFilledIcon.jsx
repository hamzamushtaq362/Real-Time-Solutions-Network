import React from 'react';

const CollabFilled = ({ width, height, color }) => {
  return (
    <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 11C3.35015 11 5.5341 11.74 6.89706 13.1029C8.26002 14.4659 9 16.6498 9 20H11C11 16.6498 11.74 14.4659 13.1029 13.1029C14.4659 11.74 16.6498 11 20 11V9C16.6498 9 14.4659 8.26002 13.1029 6.89706C11.74 5.5341 11 3.35015 11 0H9C9 3.35015 8.26002 5.5341 6.89706 6.89706C5.5341 8.26002 3.35015 9 0 9V11Z" fill={color}/>

    </svg>
  );
};

export default CollabFilled;
