import * as React from 'react';
import { useTheme } from '@mui/material';
import { FilterDropdownItemWrap, Select, Tooltip } from '~/components';
import { useState } from 'react';
import TickIcon from '../Icons/TickIcon';

export const Dropdown = ({
  selectedItem,
  setSelectedItem,
  inverse,
  options,
  width,
  height,
  menuWidth,
  OptionComponent,
  placeholder,
  disabled,
  placement,
  multiple,
}) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Select
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        multiple={multiple}
        value={selectedItem}
        renderValue={(selected) =>
          multiple
            ? Array.isArray(selected)
              ? selected.join(', ')
              : ''
            : selected
        }
        placeholder={placeholder}
        disabled={disabled}
        MenuProps={{
          PaperProps: {
            style: {
              boxShadow: 'none',
              width: menuWidth ?? 250,
              backgroundColor: inverse
                ? theme.palette.background.paper
                : theme.palette.background.inverse,
              color: inverse
                ? theme.palette.text.primary
                : theme.palette.text.inverse,
              transform: 'translateY(4px)',
            },
          },
        }}
        inverse={inverse}
        height={height}
        width={width}
      >
        {options?.length > 0 &&
          options.map((option) => {
            const value = option.value || option;
            return (
              <Tooltip
                key={option.value || option}
                title={option?.tooltip}
                placement={placement}
                disabled={!option?.tooltip}
              >
                <FilterDropdownItemWrap
                  value={value}
                  inverse={inverse}
                  onMouseEnter={() => setHovered(value)}
                  onMouseLeave={() => setHovered(false)}
                  onClick={() => {
                    if (multiple) {
                      if (selectedItem.includes(value)) {
                        if (selectedItem.length !== 1) {
                          setSelectedItem(
                            selectedItem.filter((item) => item !== value),
                          );
                        }
                      } else {
                        setSelectedItem([...selectedItem, value]);
                      }
                    } else {
                      setSelectedItem(value);
                      setOpen(false);
                    }
                  }}
                >
                  {OptionComponent ? (
                    <OptionComponent option={option} />
                  ) : (
                    (option.label ?? option.value) || option
                  )}
                  {multiple && selectedItem.includes(value) && (
                    <TickIcon
                      width={18}
                      height={18}
                      color={
                        hovered === value
                          ? theme.palette.text.primary
                          : theme.palette.text.inverse
                      }
                    />
                  )}
                </FilterDropdownItemWrap>
              </Tooltip>
            );
          })}
      </Select>
    </>
  );
};
