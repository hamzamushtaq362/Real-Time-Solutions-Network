import React, { createContext, useState } from 'react';
import { Autocomplete as MuiAutocomplete, Box, useTheme } from '@mui/material';
import { Iconify } from '../Iconify';
import { SmallSpinner } from '~/components';
import {
  AutocompleteStylesWrapper,
  PaperComponentContainer,
  TextField,
} from './elements';
import { StyledAutocomplete } from '../Label/elements';
import { UilTimes } from '@iconscout/react-unicons';
import { StyledChip } from 'components/Chip';

export const Autocomplete = ({
  id,
  autoCompleteItems,
  onInputChange,
  onChange,
  onBlur,
  value,
  defaultValue,
  placeholder,
  borderRadius,
  loading,
  padding,
  disabled,
  clearOnBlur,
  variant,
  iconSize,
  onBlurCapture,
  renderOption,
  keyDownHandler,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <AutocompleteStylesWrapper>
      <MuiAutocomplete
        classes={{
          noOptions: { fontSize: '1.5rem' },
        }}
        onKeyDown={keyDownHandler}
        disabled={disabled}
        id={id}
        value={value}
        onBlurCapture={onBlurCapture}
        defaultValue={defaultValue}
        onBlur={onBlur}
        onInputChange={(event, value, reason) => {
          setInputValue(value);
          onInputChange && onInputChange(event, value, reason);
        }}
        renderOption={renderOption}
        popupIcon={
          <Iconify
            marginTop="2px"
            color="#92929D"
            icon="akar-icons:chevron-down"
            width={iconSize ? iconSize : 18}
            height={iconSize ? iconSize : 18}
          />
        }
        PaperComponent={PaperComponentContainer}
        clearOnBlur={clearOnBlur}
        onChange={onChange}
        autoHighlight
        noOptionsText={
          inputValue && inputValue.length > 0 && !inputValue.includes('@')
            ? 'No Results'
            : ''
        }
        options={autoCompleteItems}
        loading={loading}
        {...rest}
        renderInput={(params) => (
          <TextField
            borderRadius={borderRadius}
            variant={variant ? variant : 'standard'}
            placeholder={placeholder}
            padding={padding}
            {...params}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              endAdornment: (
                <Box marginRight={8}>{params.InputProps.endAdornment}</Box>
              ),
            }}
          />
        )}
      />
    </AutocompleteStylesWrapper>
  );
};

export const ListItemPaddingContext = createContext();

export const SearchSelectAutocomplete = ({
  padding,
  borderRadius,
  value,
  placeholder,
  listItemPadding,
  loading,
  options,
  isSingleSelect,
  ...rest
}) => {
  const theme = useTheme();

  const filterOptions = (options, params) => {
    const filtered = options?.filter((option) => {
      if (
        Array.isArray(value) &&
        value?.some((selected) =>
          typeof option === 'string'
            ? selected === option
            : selected._id === option._id,
        )
      ) {
        // Skip the current option if it's already selected
        return false;
      }
      return typeof option === 'string'
        ? option.toLowerCase()?.includes(params.inputValue.toLowerCase())
        : option.label
            ?.toLowerCase()
            ?.includes(params.inputValue.toLowerCase()) ||
            option.fullName
              ?.toLowerCase()
              ?.includes(params.inputValue.toLowerCase());
    });
    if (params.inputValue !== '') {
      const customOption = {
        input: true,
        label: `Enter to add "${params.inputValue}"`,
      };
      filtered.push(customOption);
    }

    return filtered;
  };

  return (
    <ListItemPaddingContext.Provider value={listItemPadding}>
      <StyledAutocomplete
        value={value}
        multiple={!isSingleSelect}
        filterSelectedOptions
        options={options}
        popupIcon={null}
        clearIcon={null}
        loading={loading}
        renderInput={(params) => {
          return (
            <TextField
              padding={padding}
              borderRadius={borderRadius}
              {...params}
              placeholder={value?.length > 0 ? '' : placeholder}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <SmallSpinner inverse /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          );
        }}
        PaperComponent={PaperComponentContainer}
        ListboxProps={{
          style: {
            maxHeight: 250,
          },
        }}
        sx={{
          '& li': {
            padding: `${listItemPadding} !important`,
          },
        }}
        filterOptions={filterOptions}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <StyledChip
              key={index}
              variant="outlined"
              label={
                typeof option === 'string'
                  ? option
                  : option.label.replace('Enter to add "', '').replace('"', '')
              }
              size="small"
              deleteIcon={
                <UilTimes color={theme.palette.text.label} size="22" />
              }
              {...getTagProps({ index })}
            />
          ))
        }
        padding={theme.spacing(2)}
        {...rest}
      />
    </ListItemPaddingContext.Provider>
  );
};
