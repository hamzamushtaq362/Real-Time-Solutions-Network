import React from 'react';
const MessageDropDownIcon = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <rect
        x="0.199951"
        y="0.399994"
        width="40"
        height="40"
        rx="20"
        fill="white"
      /> */}
      <path
        d="M19.2 24.9H21.2V26.9H19.2V24.9ZM17.2 23.4H23.2V21.4H17.2V23.4ZM15.2 19.9H25.2V17.9H15.2V19.9ZM13.2 14.4V16.4H27.2V14.4H13.2Z"
        fill= {fill ? fill : "#222222"}
        transform="translate(10, -3)"
      />
    </svg>
  );
};

export default MessageDropDownIcon;
