import { Icon } from '@iconify/react';
import { Box } from '@mui/material';
import { ImageIconElement } from './element';

export const Iconify = ({ icon, sx, ...other }) => {
  return <Box component={Icon} icon={icon} sx={sx} {...other} />;
};

export const ImageIcon = ({ icon, onClick, ...props }) => (
  <ImageIconElement
    src={icon?.src ? icon?.src : icon}
    {...props}
    onClick={onClick}
  />
);
