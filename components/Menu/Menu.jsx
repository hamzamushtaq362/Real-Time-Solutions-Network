import React from 'react';
import { Select } from './elements';

import { Iconify } from '~/components';
import { FormControl } from '@mui/material';

export const Menu = ({
  width,
  children,
  setValue,
  value,
  iconSize,
  type,
  borderRadius,
  borderColor,
  overflow,
  height,
  disabled,

  onBlurCapture,
  ...rest
}) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        width: width ? `${width}px` : '324px',
        marginLeft: '14px',
        borderRadius: '12px',
        paddingTop: '6px',
        paddingBottom: '6px',
        overflowY: overflow,
        height: height,
      },
    },
  };

  return (
    <FormControl disabled={disabled} sx={{ width: '100%' }}>
      <Select
        {...rest}
        borderRadius={borderRadius}
        borderColor={borderColor}
        type={type}
        onBlurCapture={onBlurCapture}
        width={width}
        MenuProps={MenuProps}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        disableUnderline
        placeholder="Select"
        SelectProps={{ autoWidth: true }}
        onChange={handleChange}
        IconComponent={() => (
          <Iconify
            color="#92929D"
            icon="akar-icons:chevron-down"
            width={iconSize ? iconSize : 20}
            height={iconSize ? iconSize : 20}
          />
        )}
      >
        {children}
      </Select>
    </FormControl>
  );
};
