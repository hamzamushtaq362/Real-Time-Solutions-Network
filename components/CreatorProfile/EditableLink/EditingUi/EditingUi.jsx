import { Grid, Box, IconButton, useTheme } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Dropdown, PrimaryButton, SmallSpinner } from '~/components';
import CloseIcon from 'components/Icons/CloseIcon';
import { PreAdornedInput } from 'components/Input/PreAdornedInput';
import { getInputStartText } from '~/constants';
import { getRefinedValue, getRefinedValueForCustomLink } from '~/utils';

export const EditingUi = ({
  control,
  dropdownArray,
  index,
  onSave,
  remove,
  watch,
  loading,
  parentName,
}) => {
  const theme = useTheme();
  const type = watch(`${parentName}[${index}].name`);
  const preText = getInputStartText(type);
  const titleName = `${parentName}[${index}].name`;
  const urlName = `${parentName}[${index}].value`;
  const titleValue = watch(titleName);
  return (
    <>
      <Grid
        item
        lg={titleValue ? 2.5 : 4}
        xs={12}
        style={{ transition: 'all 200ms' }}
      >
        <Controller
          name={titleName}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Dropdown
              selectedItem={value}
              setSelectedItem={(text) => onChange(text)}
              options={dropdownArray}
              placeholder="Select"
              width="100%"
              height={60}
            />
          )}
        />
      </Grid>

      {titleValue && (
        <>
          <Grid item lg={6} xs={12}>
            <Controller
              name={urlName}
              control={control}
              render={({
                field: { value, onChange },
                formState: { errors },
              }) => (
                <PreAdornedInput
                  value={value}
                  fullWidth
                  placeholder="Value"
                  onChange={async (e) => {
                    if (type === 'Personal Website') {
                      onChange(getRefinedValueForCustomLink(e.target.value));
                    }else {
                      onChange(getRefinedValue(e.target.value));
                    }
                  }}
                  error={errors?.[parentName]?.[index]?.value}
                  helperText={errors?.[parentName]?.[index]?.value?.message}
                  startAdornment={preText}
                  onKeyPress={(e) => {
                    e.stopPropagation();
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      onSave();
                    }
                  }}
                />
              )}
            />
          </Grid>
          <Grid item lg={2.5} xs={12}>
            <PrimaryButton onClick={onSave} restrictHoverStyles>
              {loading === index ? <SmallSpinner /> : 'Save'}
            </PrimaryButton>
          </Grid>
          <Grid item lg={1} xs={12}>
            <Box>
              <IconButton
                onClick={() => remove(index)}
                sx={{ width: 54, height: '100%' }}
              >
                <CloseIcon
                  width={26}
                  height={26}
                  color={theme.palette.text.primary}
                />
              </IconButton>
            </Box>
          </Grid>
        </>
      )}
    </>
  );
};
