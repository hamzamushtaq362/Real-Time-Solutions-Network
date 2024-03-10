import React from 'react';
import { Grid } from '@mui/material';
import {
  InformationDescription,
  SubHeading,
} from 'components/CollabCreate/AddProject/elements';
import { Controller } from 'react-hook-form';
import { StyledDatePicker } from '~/components';

const ControllerDatepicker = ({ control, heading, name, label }) => {
  return (
    <Grid container my={6}>
      <Grid item lg={2.5} xs={12}>
        <SubHeading mb={2}>{heading}</SubHeading>
      </Grid>
      <Grid item lg={6}>
        <InformationDescription mb={2}>{label}</InformationDescription>
        <Controller
          name={name}
          control={control}
          render={({ field }) => <StyledDatePicker {...field} />}
        />
      </Grid>
    </Grid>
  );
};

export default ControllerDatepicker;
