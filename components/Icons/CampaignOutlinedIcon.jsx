import React from 'react';

const CampaignOutlined = ({ color, width, height }) => {
  return (
    <svg width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 0.75H7.25V7.25H0.75V0.75Z" stroke={color ??"black" } strokeWidth="1.5" strokeLinecap="round"/> 
<path d="M10.75 0.75H17.25V7.25H10.75V0.75Z" stroke={color ??"black" } strokeWidth="1.5" strokeLinecap="round"/>
<path d="M0.75 10.75H7.25V17.25H0.75V10.75Z" stroke={color ??"black" } strokeWidth="1.5" strokeLinecap="round"/>
<path d="M10.75 10.75H17.25V17.25H10.75V10.75Z" stroke={color ??"black" } strokeWidth="1.5" strokeLinecap="round"/>    </svg>
  );
};

export default CampaignOutlined;
