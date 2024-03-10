import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { StyledTextArea } from '~/components';

import { CounterText, CounterWrap } from 'components/common/elements';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

const ControllerTextArea = ({
  heading,
  name,
  placeholder,
  leftDescription,
  maxLength,
  isManualTrigger,
  errorMessage,
  ...rest
}) => {
  const {control, trigger} = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
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
            <Box position="relative">
              <StyledTextArea
                value={value}
                onChange={async (e) => {
                  if (e.target.value.length <= maxLength) {
                    onChange(e);
                    if (isManualTrigger) {
                      await trigger(name);
                    }
                  }
                }}
                onFocus={() => setIsFocused(true)}
                inputProps={{ onBlur: () => setIsFocused(false) }}
                multiline
                fullWidth
                placeholder={placeholder}
                rows={4}
                error={!!(errorMessage ?? errors[name]?.message)}
                helperText={errorMessage ?? errors[name]?.message}
                maxLength={maxLength}
                {...rest}
              />
              {isFocused && maxLength && value.length > 50 && (
                <CounterWrap>
                  <CounterText>
                    {value.length}/{maxLength}
                  </CounterText>
                </CounterWrap>
              )}
            </Box>
          )}
        />
      </Grid>
    </Grid>
  );
};

export default ControllerTextArea;
