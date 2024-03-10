import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StyledBox = styled(Box)(({ theme, inverse }) => ({
  position: 'relative',
  width: '30px',
  height: '30px',
  '& .ispinner-blade': {
    position: 'absolute',
    top: '11px',
    left: '14px',
    width: '2.5px',
    height: '6.5px',
    backgroundColor: inverse ? theme.palette.background.inverse : theme.palette.background.paper,
    borderRadius: '1.25px',
    animation: 'iSpinnerBlade 1s linear infinite',
    willChange: 'opacity',
  },
  '& .ispinner-blade:nth-child(1)': {
    transform: 'rotate(45deg) translateY(-6.5px)',
    animationDelay: '-1.625s',
  },
  '& .ispinner-blade:nth-child(2)': {
    transform: 'rotate(90deg) translateY(-6.5px)',
    animationDelay: '-1.5s',
  },
  '& .ispinner-blade:nth-child(3)': {
    transform: 'rotate(135deg) translateY(-6.5px)',
    animationDelay: '-1.375s',
  },
  '& .ispinner-blade:nth-child(4)': {
    transform: 'rotate(180deg) translateY(-6.5px)',
    animationDelay: '-1.25s',
  },
  '& .ispinner-blade:nth-child(5)': {
    transform: 'rotate(225deg) translateY(-6.5px)',
    animationDelay: '-1.125s',
  },
  '& .ispinner-blade:nth-child(6)': {
    transform: 'rotate(270deg) translateY(-6.5px)',
    animationDelay: '-1s',
  },
  '& .ispinner-blade:nth-child(7)': {
    transform: 'rotate(315deg) translateY(-6.5px)',
    animationDelay: '-0.875s',
  },
  '& .ispinner-blade:nth-child(8)': {
    transform: 'rotate(360deg) translateY(-6.5px)',
    animationDelay: '-0.75s',
  },

  '@keyframes iSpinnerBlade': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.40,
    },
    '100%': {
      opacity: 0.4,
    },
  },
  
  '@media (min-width: 600px)': {
    width: '50px',
    height: '50px',
    '& .ispinner-blade': {
      top: '19.5px',
      left: '24px',
      width: '3.5px',
      height: '12px',
      borderRadius: '2.5px',
    },
    '& .ispinner-blade:nth-child(1)': {
      transform: 'rotate(45deg) translateY(-11.5px)',
    },
    '& .ispinner-blade:nth-child(2)': {
      transform: 'rotate(90deg) translateY(-11.5px)',
    },
    '& .ispinner-blade:nth-child(3)': {
      transform: 'rotate(135deg) translateY(-11.5px)',
    },
    '& .ispinner-blade:nth-child(4)': {
      transform: 'rotate(180deg) translateY(-11.5px)',
    },
    '& .ispinner-blade:nth-child(5)': {
      transform: 'rotate(225deg) translateY(-11.5px)',
    },
    '& .ispinner-blade:nth-child(6)': {
      transform: 'rotate(270deg) translateY(-11.5px)',
    },
    '& .ispinner-blade:nth-child(7)': {
      transform: 'rotate(315deg) translateY(-11.5px)',
    },
    '& .ispinner-blade:nth-child(8)': {
      transform: 'rotate(360deg) translateY(-11.5px)',
    },
  },
}));

export const StyledSmallSpinner = styled(Box)(({ theme, inverse, color }) => ({
  position: 'relative',
  width: '30px',
  height: '30px',
  '& .small-spinner-blade': {
    position: 'absolute',
    top: '11px',
    left: '14px',
    width: '2.5px',
    height: '6.5px',
    backgroundColor: color ?? inverse ? theme.palette.background.inverse : theme.palette.background.paper,
    borderRadius: '1.25px',
    animation: 'iSpinnerBlade 1s linear infinite',
    willChange: 'opacity',
  },
  '& .small-spinner-blade:nth-child(1)': {
    transform: 'rotate(45deg) translateY(-6.5px)',
    animationDelay: '-1.625s',
  },
  '& .small-spinner-blade:nth-child(2)': {
    transform: 'rotate(90deg) translateY(-6.5px)',
    animationDelay: '-1.5s',
  },
  '& .small-spinner-blade:nth-child(3)': {
    transform: 'rotate(135deg) translateY(-6.5px)',
    animationDelay: '-1.375s',
  },
  '& .small-spinner-blade:nth-child(4)': {
    transform: 'rotate(180deg) translateY(-6.5px)',
    animationDelay: '-1.25s',
  },
  '& .small-spinner-blade:nth-child(5)': {
    transform: 'rotate(225deg) translateY(-6.5px)',
    animationDelay: '-1.125s',
  },
  '& .small-spinner-blade:nth-child(6)': {
    transform: 'rotate(270deg) translateY(-6.5px)',
    animationDelay: '-1s',
  },
  '& .small-spinner-blade:nth-child(7)': {
    transform: 'rotate(315deg) translateY(-6.5px)',
    animationDelay: '-0.875s',
  },
  '& .small-spinner-blade:nth-child(8)': {
    transform: 'rotate(360deg) translateY(-6.5px)',
    animationDelay: '-0.75s',
  },

  '@keyframes iSpinnerBlade': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.40,
    },
    '100%': {
      opacity: 0.4,
    },
  },
}));


export const LoaderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  color: '#020202',
}));
