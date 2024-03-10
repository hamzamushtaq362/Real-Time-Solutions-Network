import { useTranslation } from 'react-i18next';
import {
  MainContainer,
  CreateMissionMainHeader,
  InformationDescription,
} from './elements';
import { StyledInput, RadioGroup } from '~/components';
import { Grid, Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import StyledTextarea from 'components/Input/StyledTextarea';
import React from 'react';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

export const MissionDetailsStep = ({
  control,
  errors,
  setValue,
  watch,
  trigger,
  isManualTrigger,
}) => {
  const { t } = useTranslation();

  const maximumEligibilityOptions = [
    {
      value: 'yes',
      label: 'Yes',
    },
    {
      value: 'no',
      label: 'No',
    },
  ];

  const limitedParticipants = watch('limitedParticipants');

  return (
    <MainContainer>
      <CreateMissionMainHeader>{t('Mission Details')}</CreateMissionMainHeader>
      <Grid container mt={5} mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Mission Name')}
            subheader={t('Write the name of the mission.')}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Controller
            name="title"
            control={control}
            render={({ field: { value, onChange } }) => (
              <StyledInput
                value={value}
                onChange={async (e) => {
                  onChange(e);
                  if (isManualTrigger) {
                    await trigger('title');
                  }
                }}
                fullWidth
                placeholder="Title"
              />
            )}
          />
          {errors && errors.title && (
            <InformationDescription type="error" my={1}>
              {errors.title.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
      <Grid container mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Description')}
            subheader={t(
              'Write a description of the mission, explaining what it’s about or\n              it’s objectives.',
            )}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange } }) => (
              <StyledTextarea
                value={value}
                onChange={async (e) => {
                  onChange(e);
                  if (isManualTrigger) {
                    await trigger('description');
                  }
                }}
                fullWidth
                placeholder={t('Description')}
                rows={4}
                maxLength={3500}
              />
            )}
          />
          {errors && errors.description && (
            <InformationDescription type="error" my={1}>
              {errors.description.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
      <Grid container mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Maximum Eligibility')}
            subheader={t(
              'Choose whether you want to put a limit on the total submissions.',
            )}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <RadioGroup
            options={maximumEligibilityOptions}
            currentValue={limitedParticipants ? 'yes' : 'no'}
            updateCurrentValue={async (updatedValue) => {
              setValue('limitedParticipants', updatedValue === 'yes');
              if (isManualTrigger) {
                await trigger('limitedParticipants');
              }
            }}
          />
        </Grid>
      </Grid>
      {limitedParticipants && (
        <Grid container mt={5} mb={6}>
          <Grid item lg={2.5} xs={12}>
            <Box sx={{ maxWidth: '210px' }}>
              <LeftHeaderComp
                headerText={t('Maximum users eligible for the mission')}
                subheader={t(
                  'Enter maximum number of users who are eligible for the mission',
                )}
              />
            </Box>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Controller
              name="maxParticipants"
              control={control}
              render={({ field: { value, onChange } }) => (
                <StyledInput
                  value={value}
                  onChange={async (e) => {
                    onChange(e);
                    if (isManualTrigger) {
                      await trigger('maxParticipants');
                    }
                  }}
                  type="number"
                  fullWidth
                  placeholder={t('Enter Number')}
                />
              )}
            />
            {errors && errors.maxParticipants && (
              <InformationDescription type="error" my={1}>
                {errors.maxParticipants.message}
              </InformationDescription>
            )}
          </Grid>
        </Grid>
      )}
    </MainContainer>
  );
};
