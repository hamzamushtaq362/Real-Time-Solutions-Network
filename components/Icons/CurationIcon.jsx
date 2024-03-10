export const CurationIcon = ({ color, width, height, ...rest }) => {
  return (
    <svg
      width={width ?? '22'}
      height={height ?? '22'}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M17 9L13.5657 12.4343C13.3677 12.6323 13.2687 12.7313 13.1545 12.7684C13.0541 12.8011 12.9459 12.8011 12.8455 12.7684C12.7313 12.7313 12.6323 12.6323 12.4343 12.4343L9.56569 9.56569C9.36768 9.36768 9.26867 9.26867 9.15451 9.23158C9.05409 9.19895 8.94591 9.19895 8.84549 9.23158C8.73133 9.26867 8.63232 9.36768 8.43431 9.56569L5 13M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};