import * as React from 'react';
import { Tooltip } from '~/components';
import { useTheme, IconButton } from '@mui/material';
import { DropdownMenuSolo } from './DropdownMenuSolo';
import { UilPlusCircle } from '@iconscout/react-unicons';

export const LaunchpadAddDropdown = ({
  setSelectedItem,
  inverse,
  options,
  menuWidth,
  onBlurCapture,
  OptionComponent,
  disabled,
  disabledTooltip,
  placement,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip title={disabled ? disabledTooltip : 'Add to collab'}>
        <IconButton
          onClick={!disabled ? handleClick : () => {}}
          sx={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          <UilPlusCircle size={26} color={theme.palette.grey.common} />
        </IconButton>
      </Tooltip>

      {!disabled && (
        <DropdownMenuSolo
          anchorEl={anchorEl}
          handleClose={handleClose}
          onBlurCapture={onBlurCapture}
          open={open}
          menuWidth={menuWidth}
          inverse={inverse}
          theme={theme}
          options={options}
          placement={placement}
          OptionComponent={OptionComponent}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  );
};
