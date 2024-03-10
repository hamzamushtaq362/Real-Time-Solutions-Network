const NotificationOutlinedIcon = ({ width, height, strokeWidth, stroke, ...rest }) => {
    return (
      <svg
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? '24'}
        height={height ?? '24'}
        {...rest}
      >
        <path
          d="M8.82353 2.11765H4.35294C2.50116 2.11765 1 3.61881 1 5.47059V16.6471C1 18.4988 2.50116 20 4.35294 20H15.5294C17.3812 20 18.8824 18.4988 18.8824 16.6471V12.1765M19.0179 1.98205C20.3274 3.29146 20.3274 5.41442 19.0179 6.72383C17.7085 8.03323 15.5856 8.03323 14.2762 6.72383C12.9668 5.41442 12.9668 3.29146 14.2762 1.98205C15.5856 0.672649 17.7085 0.672649 19.0179 1.98205Z"
          stroke={stroke || "black"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth ?? 2}
          // fill={color || 'black'}
        />
      </svg>
    );
  };
export default NotificationOutlinedIcon;