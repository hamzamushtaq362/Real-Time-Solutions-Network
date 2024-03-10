export const GlobeIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg
      width={width ?? '12'}
      height={height ?? '12'}
      {...rest}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_282_11500)'>
        <path
          d='M7.9987 14.6668C11.6806 14.6668 14.6654 11.6821 14.6654 8.00016C14.6654 4.31826 11.6806 1.3335 7.9987 1.3335C4.3168 1.3335 1.33203 4.31826 1.33203 8.00016C1.33203 11.6821 4.3168 14.6668 7.9987 14.6668Z'
          stroke={color ?? '#020202'}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M1.33203 8H14.6654'
          stroke={color ?? '#020202'}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7.9987 1.3335C9.66622 3.15906 10.6139 5.52819 10.6654 8.00016C10.6139 10.4721 9.66622 12.8413 7.9987 14.6668C6.33118 12.8413 5.38353 10.4721 5.33203 8.00016C5.38353 5.52819 6.33118 3.15906 7.9987 1.3335Z'
          stroke={color ?? '#020202'}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_282_11500'>
          <rect width={width ?? '12'} height={height ?? '12'} fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
