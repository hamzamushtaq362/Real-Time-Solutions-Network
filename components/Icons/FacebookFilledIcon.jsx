import React from 'react';

export const FacebookFilledIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg" width={width ?? '12'} height={height ?? '12'} {...rest}>
      <path d="M10.0007 1.16602C10.0007 0.889873 9.77679 0.666016 9.50065 0.666016H7.50065C6.39558 0.666016 5.33577 1.105 4.55437 1.8864C3.77297 2.66781 3.33398 3.72761 3.33398 4.83268V6.83268C3.33398 7.10883 3.11013 7.33268 2.83398 7.33268H1.33398C1.05784 7.33268 0.833984 7.55654 0.833984 7.83268V10.166C0.833984 10.4422 1.05784 10.666 1.33398 10.666H2.83398C3.11013 10.666 3.33398 10.8899 3.33398 11.166V16.8327C3.33398 17.1088 3.55784 17.3327 3.83398 17.3327H6.16732C6.44346 17.3327 6.66732 17.1088 6.66732 16.8327V11.166C6.66732 10.8899 6.89117 10.666 7.16732 10.666H8.77693C9.00636 10.666 9.20635 10.5099 9.262 10.2873L9.84533 7.95395C9.92423 7.63838 9.68555 7.33268 9.36026 7.33268H7.16732C6.89117 7.33268 6.66732 7.10882 6.66732 6.83268V4.83268C6.66732 4.61167 6.75511 4.39971 6.9114 4.24343C7.06768 4.08715 7.27964 3.99935 7.50065 3.99935H9.50065C9.77679 3.99935 10.0007 3.77549 10.0007 3.49935V1.16602Z" fill={color ?? '#f1f1f1'} stroke={color ?? '#f1f1f1'} strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};