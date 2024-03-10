import React from 'react';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import { StyledInput } from '~/components';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

const ControllerInput = ({
  heading,
  name,
  placeholder,
  control,
  leftDescription,
  isManualTrigger,
  trigger,
  errorMessage,
  ...rest
}) => {
  return (
    <Grid container mb={6}>
      <Grid item lg={2.5} xs={12}>
        <LeftHeaderComp headerText={heading} subheader={leftDescription} />
      </Grid>
      <Grid item lg={6} xs={12}>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <StyledInput
              value={value}
              onChange={async (e) => {
                onChange(e);
                if (isManualTrigger && trigger) {
                  await trigger(name);
                }
              }}
              fullWidth
              placeholder={placeholder}
              error={!!(errorMessage ?? errors[name]?.message)}
              helperText={errorMessage ?? errors[name]?.message}
              {...rest}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default ControllerInput;
