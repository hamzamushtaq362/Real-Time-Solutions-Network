import React from 'react';
import { InputAdornment, IconButton, useTheme } from '@mui/material';
import { UilSearch } from '@iconscout/react-unicons';
import { Iconify } from '../Iconify';
import { TextField } from './elements';

export const SearchInput = ({
  ref,
  variant,
  placeholder,
  color,
  width,
  value,
  defaultValue,
  padding,
  fontSize,
  backgroundColor,
  fontWeight,
  borderRadius,
  handleChange,
  handleFocus,
  handleBlur,
  onClick,
  onCross,
  borderOnFocus,
  showEndAdorment,
  placeholderStyle,
  landing,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <TextField
      onChange={handleChange}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          onClick();
        }
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      multiline={false}
      borderOnFocus={borderOnFocus}
      value={value}
      width={width}
      padding={padding}
      fontSize={fontSize}
      fontWeight={fontWeight}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      defaultValue={defaultValue}
      color={color}
      size="small"
      ref={ref}
      variant={variant ?? 'standard'}
      placeholder={placeholder ?? 'Search...'}
      placeholderStyle={placeholderStyle}
      InputProps={{
        disableUnderline: true,
        startAdornment:
          (value && value.length > 0) || placeholder === '' ? null : (
            <InputAdornment position="start">
              <UilSearch color={theme.palette.grey.common} size="20" />
            </InputAdornment>
          ),
        endAdornment: (
          <>
            {showEndAdorment && (
              <InputAdornment position="end">
                <IconButton onClick={onCross}>
                  <Iconify
                    icon="akar-icons:cross"
                    width={15}
                    height={15}
                    color="#797A7E"
                  />
                </IconButton>
              </InputAdornment>
            )}
          </>
        ),
      }}
      landing={landing}
      {...rest}
    />
  );
};

export const NormalInput = ({
  variant,
  placeholder,
  color,
  width,
  padding,
  fontSize,
  fontWeight,
  borderRadius,
  rows,
  cols,
  error,
  handleChange,
  handleFocus,
  handleBlur,
  keyDownHandler,
  multiline,
  value,
  defaultValue,
  maxRows,
  name,
  resize,
  type,
  inputProps,
  pattern,
  startAdornment,
  endAdornment,
  borderOnFocus,
  disabled,
  onKeyPress,
  onKeyUp,
  letterSpacing,
}) => {
  return (
    <TextField
      pattern={pattern}
      type={type}
      disabled={disabled}
      value={value}
      defaultValue={defaultValue}
      name={name}
      onChange={(e) => {
        if (handleChange) {
          handleChange(e);
        }
      }}
      onKeyDown={keyDownHandler}
      onBlur={handleBlur}
      onFocus={handleFocus}
      rows={rows}
      cols={cols}
      multiline={multiline}
      width={width}
      padding={padding}
      fontSize={fontSize}
      fontWeight={fontWeight}
      borderRadius={borderRadius}
      maxRows={maxRows}
      color={color}
      size="small"
      letterSpacing={letterSpacing}
      borderOnFocus={borderOnFocus}
      resize={resize}
      variant={variant ? variant : 'standard'}
      placeholder={placeholder ? placeholder : 'Search...'}
      InputProps={{
        disableUnderline: true,
        inputProps,
        startAdornment: (
          <>
            {startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : (
              <></>
            )}
          </>
        ),
        endAdornment: (
          <>
            {endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : (
              <></>
            )}
          </>
        ),
      }}
      error={error}
      onKeyPress={onKeyPress}
      onKeyUp={onKeyUp}
    />
  );
};
