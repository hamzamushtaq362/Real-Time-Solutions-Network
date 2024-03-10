import { Menu } from '@mui/material';
import { FilterDropdownItemWrap, Tooltip } from '~/components';

export const DropdownMenuSolo = ({
  anchorEl,
  handleClose,
  onBlurCapture,
  open,
  menuWidth,
  inverse,
  theme,
  options,
  placement,
  OptionComponent,
  setSelectedItem,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      disableScrollLock={false}
      onClose={handleClose}
      onClick={handleClose}
      onBlurCapture={onBlurCapture}
      PaperProps={{
        elevation: 0,
        sx: {
          ml: 0,
          maxWidth: menuWidth ?? 350,
          maxHeight: 'auto',
          width: '100%',
          // height: 'auto',
          borderRadius: '10px',
          backgroundColor: inverse
            ? theme.palette.background.paper
            : theme.palette.background.inverse,
          color: inverse
            ? theme.palette.text.primary
            : theme.palette.text.inverse,
        },
      }}
    >
      {options?.length > 0 &&
        options.map((option) => (
          <Tooltip
            key={option.value || option}
            title={option?.tooltip}
            placement={placement}
            disabled={!option?.tooltip}
          >
            <FilterDropdownItemWrap
              onClick={() =>
                setSelectedItem(option.value ? option.value : option)
              }
              inverse={inverse}
            >
              {OptionComponent ? (
                <OptionComponent option={option} />
              ) : (
                (option.label ?? option.value) || option
              )}
            </FilterDropdownItemWrap>
          </Tooltip>
        ))}
    </Menu>
  );
};
