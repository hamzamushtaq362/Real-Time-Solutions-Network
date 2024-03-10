import * as React from 'react';
import { Box, Menu, useTheme } from '@mui/material';
import { FilterDropdownItemWrap } from '~/components';
import { UilCheck } from '@iconscout/react-unicons';
import { ConversationDropdownItemContainer } from './elements';

export const ConversationsDropdown = ({
  selectedOptions,
  setSelectedOptions,
  inverse,
  options,
  menuWidth,
  onBlurCapture,
  disabled,
  children,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [dropdownOptionHoveredIndex, setDropdownOptionHoveredIndex] =
    React.useState(-1);

  const theme = useTheme();

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      // at least one option should be selected
      if (selectedOptions.length > 1) {
        setSelectedOptions(selectedOptions.filter((i) => i !== option));
      }
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <>
      <Box onClick={handleClick}>{children}</Box>
      {!disabled && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          disableScrollLock={false}
          onClose={handleClose}
          onBlurCapture={onBlurCapture}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          getContentAnchorEl={null}
          PaperProps={{
            elevation: 0,
            sx: {
              top: '120px !important',
              left: '0px !important',
              ml: 0,
              maxWidth: menuWidth ?? 350,
              maxHeight: 'auto',
              width: '100%',
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
          {options && options.length > 0
            ? options.map((option, index) => (
                <FilterDropdownItemWrap
                  key={option.key || option}
                  onClick={() => onOptionClick(option)}
                  onMouseEnter={() => setDropdownOptionHoveredIndex(index)}
                  onMouseLeave={() => setDropdownOptionHoveredIndex(-1)}
                  inverse={inverse}
                >
                  <ConversationDropdownItemContainer>
                    {selectedOptions.includes(option) ? (
                      <UilCheck
                        size={20}
                        color={
                          dropdownOptionHoveredIndex === index
                            ? theme.palette.text.primary
                            : theme.palette.text.inverse
                        }
                      />
                    ) : (
                      <Box sx={{ width: '20px' }}></Box>
                    )}
                    {option}
                  </ConversationDropdownItemContainer>
                </FilterDropdownItemWrap>
              ))
            : null}
        </Menu>
      )}
    </>
  );
};
