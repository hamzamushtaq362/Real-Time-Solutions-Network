import React from 'react';
const MessageUnreadIcon = ({ width, height, stroke, fill, ...rest }) => {
  return (
    <svg
      width={width ?? '12'} 
      height={height ?? '12'} 
      viewBox="0 0 21 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M20 14.0889V2.68889C20 2.09772 20 1.80214 19.885 1.57634C19.7838 1.37773 19.6223 1.21625 19.4237 1.11505C19.1979 1 18.9023 1 18.3111 1H2.68889C2.09772 1 1.80214 1 1.57634 1.11505C1.37773 1.21625 1.21625 1.37773 1.11505 1.57634C1 1.80214 1 2.09772 1 2.68889V14.0889C1 14.6801 1 14.9756 1.11505 15.2014C1.21625 15.4 1.37773 15.5615 1.57634 15.6627C1.80214 15.7778 2.09772 15.7778 2.68889 15.7778H18.3111C18.9023 15.7778 19.1979 15.7778 19.4237 15.6627C19.6223 15.5615 19.7838 15.4 19.885 15.2014C20 14.9756 20 14.6801 20 14.0889Z"
        fill={fill ?? 'black'}
      />
      <path
        d="M1.57634 15.6627L1.80334 15.2172L1.80334 15.2172L1.57634 15.6627ZM1.11505 15.2014L0.669545 15.4284L0.669546 15.4284L1.11505 15.2014ZM19.885 15.2014L19.4394 14.9744L19.4394 14.9744L19.885 15.2014ZM19.4237 15.6627L19.6507 16.1082L19.4237 15.6627ZM19.4237 1.11505L19.6507 0.669546L19.6507 0.669545L19.4237 1.11505ZM1.11505 1.57634L0.669545 1.34935L0.669545 1.34935L1.11505 1.57634ZM1.57634 1.11505L1.34935 0.669545L1.34935 0.669545L1.57634 1.11505ZM11.1684 8.89756L11.4851 9.28457L11.49 9.28043L11.1684 8.89756ZM9.83158 8.89756L9.50998 9.28046L9.51496 9.28454L9.83158 8.89756ZM19.5 2.68889V14.0889H20.5V2.68889H19.5ZM18.3111 15.2778H2.68889V16.2778H18.3111V15.2778ZM1.5 14.0889V2.68889H0.5V14.0889H1.5ZM2.68889 1.5H18.3111V0.5H2.68889V1.5ZM2.68889 15.2778C2.38506 15.2778 2.18725 15.2774 2.03632 15.2651C1.89122 15.2532 1.834 15.2328 1.80334 15.2172L1.34935 16.1082C1.54448 16.2077 1.74795 16.2448 1.95489 16.2617C2.15599 16.2782 2.40156 16.2778 2.68889 16.2778V15.2778ZM0.5 14.0889C0.5 14.3762 0.499611 14.6218 0.516042 14.8229C0.532949 15.0298 0.570121 15.2333 0.669545 15.4284L1.56055 14.9744C1.54493 14.9438 1.52458 14.8866 1.51272 14.7415C1.50039 14.5905 1.5 14.3927 1.5 14.0889H0.5ZM1.80334 15.2172C1.6988 15.164 1.61382 15.079 1.56055 14.9744L0.669546 15.4284C0.818682 15.7211 1.05665 15.9591 1.34935 16.1082L1.80334 15.2172ZM19.5 14.0889C19.5 14.3927 19.4996 14.5905 19.4873 14.7415C19.4754 14.8866 19.4551 14.9438 19.4394 14.9744L20.3305 15.4284C20.4299 15.2333 20.4671 15.0298 20.484 14.8229C20.5004 14.6218 20.5 14.3762 20.5 14.0889H19.5ZM18.3111 16.2778C18.5984 16.2778 18.844 16.2782 19.0451 16.2617C19.2521 16.2448 19.4555 16.2077 19.6507 16.1082L19.1967 15.2172C19.166 15.2328 19.1088 15.2532 18.9637 15.2651C18.8127 15.2774 18.6149 15.2778 18.3111 15.2778V16.2778ZM19.4394 14.9744C19.3862 15.079 19.3012 15.164 19.1967 15.2172L19.6507 16.1082C19.9433 15.9591 20.1813 15.7211 20.3305 15.4284L19.4394 14.9744ZM20.5 2.68889C20.5 2.40156 20.5004 2.15599 20.484 1.95489C20.4671 1.74795 20.4299 1.54448 20.3305 1.34935L19.4394 1.80334C19.4551 1.834 19.4754 1.89122 19.4873 2.03632C19.4996 2.18725 19.5 2.38506 19.5 2.68889H20.5ZM18.3111 1.5C18.6149 1.5 18.8127 1.50039 18.9637 1.51272C19.1088 1.52458 19.166 1.54493 19.1967 1.56055L19.6507 0.669545C19.4555 0.570121 19.2521 0.532949 19.0451 0.516042C18.844 0.499611 18.5984 0.5 18.3111 0.5V1.5ZM20.3305 1.34935C20.1813 1.05665 19.9433 0.818682 19.6507 0.669546L19.1967 1.56055C19.3012 1.61382 19.3862 1.6988 19.4394 1.80334L20.3305 1.34935ZM1.5 2.68889C1.5 2.38506 1.50039 2.18725 1.51272 2.03632C1.52458 1.89122 1.54493 1.834 1.56055 1.80334L0.669545 1.34935C0.570121 1.54448 0.532949 1.74795 0.516042 1.95489C0.499611 2.15599 0.5 2.40156 0.5 2.68889H1.5ZM2.68889 0.5C2.40156 0.5 2.15599 0.499611 1.95489 0.516042C1.74795 0.532949 1.54448 0.570121 1.34935 0.669545L1.80334 1.56055C1.834 1.54493 1.89122 1.52458 2.03632 1.51272C2.18725 1.50039 2.38506 1.5 2.68889 1.5V0.5ZM1.56055 1.80334C1.61381 1.6988 1.6988 1.61381 1.80334 1.56055L1.34935 0.669545C1.05665 0.818682 0.818682 1.05665 0.669545 1.34935L1.56055 1.80334ZM19.5634 1.19348L10.8468 8.51469L11.49 9.28043L20.2065 1.95921L19.5634 1.19348ZM10.1532 8.5147L1.43663 1.19348L0.79347 1.95921L9.51 9.28043L10.1532 8.5147ZM10.8518 8.51058C10.6472 8.67802 10.3528 8.67802 10.1482 8.51058L9.51496 9.28454C10.088 9.75337 10.912 9.75337 11.485 9.28454L10.8518 8.51058Z"
        fill="white" stroke={stroke ?? 'black'}
      />
    </svg>
  );
};

export default MessageUnreadIcon;