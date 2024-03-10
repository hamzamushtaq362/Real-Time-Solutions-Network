import { useTranslation } from 'react-i18next';
import React from 'react';
import {
  MainContainer,
  CreateMissionMainHeader,
  InformationDescription,
} from './elements';
import { RadioGroup, StyledInput } from '~/components';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';
import { DatePicker } from 'components/Calendar';

export const MissionScheduleStep = ({ control, errors, watch, trigger, setValue }) => {
  const { t } = useTranslation();

  const scheduleTypeOptions = [
    {
      value: 'start-end-date',
      label: 'Start - End Date',
    },
    // {
    //   value: 'post-publish',
    //   label: 'Post Publish',
    // },
    {
      value: 'number-of-days',
      label: 'Number of days',
    },
  ];

  const selectedScheduleType = watch('scheduleType');

  return (
    <MainContainer>
      <CreateMissionMainHeader>{t('Schedule')}</CreateMissionMainHeader>
      <Grid container mt={5} mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Schedule Type')}
            subheader={t('Select schedule type to schedule a mission')}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <RadioGroup
            radioChipWidth="160px"
            options={scheduleTypeOptions}
            currentValue={selectedScheduleType}
            updateCurrentValue={(updatedValue) =>
              setValue('scheduleType', updatedValue)
            }
          />
        </Grid>
      </Grid>
      {selectedScheduleType === 'start-end-date' && (
        <Grid container mt={5} mb={6}>
          <Grid item lg={2.5} xs={12}>
            <LeftHeaderComp
              headerText={t('Select Date')}
              subheader={t('Select start date and end date')}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Grid display="flex" columnGap={1}>
              <Grid>
                <InformationDescription mb={1}>
                  {t('Select Date')}
                </InformationDescription>
                <DatePicker duration={watch('duration')} {...{ trigger, setValue }} />
              </Grid>
              {errors && errors.duration && (
                <InformationDescription type="error" my={1}>
                  {errors?.duration?.message}
                </InformationDescription>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
      {selectedScheduleType === 'number-of-days' && (
        <Grid container mt={5} mb={6}>
          <Grid item lg={2.5} xs={12}>
            <LeftHeaderComp
              headerText={t('Number of Days')}
              subheader={t('Enter number of days')}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <InformationDescription mb={2}>{t('Days')}</InformationDescription>

            <Controller
              name="numberOfDays"
              control={control}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  fullWidth
                  type="number"
                  placeholder={t('Enter number of days')}
                />
              )}
            />
            {errors && errors.numberOfDays && (
              <InformationDescription type="error" my={1}>
                {errors?.numberOfDays?.message}
              </InformationDescription>
            )}
          </Grid>
        </Grid>
      )}
    </MainContainer>
  );
};
