import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';
import { Controller, useFormContext } from 'react-hook-form';
import { PlacesAutocompleteInput, RadioGroup, StyledInput } from '~/components';
import { InformationDescription } from 'components/EventCreate/elements';
import StyledTextarea from 'components/Input/StyledTextarea';
import { CollabEventDurationType, CollabEventType } from '~/constants';
import { DatePicker } from 'components/Calendar';
import {
  EventCollaborator,
  EventCollaboratorInput,
} from 'components/EventCreate/EventCollaborator';
import { useTranslation } from 'react-i18next';
import { AddProjectMainHeader } from 'components/CollabCreate/AddProject/elements';

const CreateEventForm = ({
  isManualTrigger,
  setAddressChanged,
  addressString,
  setAddressString,
}) => {
  const {
    control,
    watch,
    formState: { errors },
    trigger,
    setValue,
    getValues,
  } = useFormContext();
  const [userAutocompleteValue, setUserAutocompleteValue] = useState(null);
  const { t } = useTranslation();
  const { mode, durationType, participants, currentParticipantDetails } =
    watch();

  const eventTypeOptions = [
    {
      value: CollabEventType.hybrid,
      label: 'Hybrid',
    },
    {
      value: CollabEventType.virtual,
      label: 'Virtual Only',
    },
    {
      value: CollabEventType.physical,
      label: 'Physical',
    },
  ];

  const eventDurationOptions = [
    {
      value: CollabEventDurationType.timeBound,
      label: 'Time Bound',
    },
    {
      value: CollabEventDurationType.noTimeBound,
      label: 'No Start End Date',
    },
  ];

  const removeParticipant = (index) => {
    const participants = getValues().participants;
    participants.splice(index, 1);
    setValue('participants', participants);
  };

  return (
    <>
      <AddProjectMainHeader mb={4}>{t('Event Details')}</AddProjectMainHeader>

      <Grid container mt={5} mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Event Title')}
            subheader={t('Write the name of the Event')}
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
                  if (isManualTrigger && trigger) {
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
              'Write a description of the sub-collab, explaining what it’s about.',
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
                  if (isManualTrigger && trigger) {
                    await trigger('description');
                  }
                }}
                fullWidth
                placeholder={t('Description')}
                multiline
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

      <Grid container mt={5} mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Event Type')}
            subheader={t('Select event type')}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <RadioGroup
            options={eventTypeOptions}
            currentValue={mode}
            updateCurrentValue={async (updatedValue) => {
              setValue('mode', updatedValue);
              if (isManualTrigger && trigger) {
                await trigger('mode');
              }
            }}
          />
        </Grid>
      </Grid>

      {mode === CollabEventType.hybrid || mode === CollabEventType.virtual ? (
        <Grid container mt={5} mb={6}>
          <Grid item lg={2.5} xs={12}>
            <LeftHeaderComp
              headerText={t('Event Link')}
              subheader={t('(Optional)')}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Controller
              name="link"
              control={control}
              render={({ field }) => (
                <StyledInput {...field} fullWidth placeholder="https://" />
              )}
            />
            {errors && errors.link && (
              <InformationDescription type="error" my={1}>
                {errors.link.message}
              </InformationDescription>
            )}
          </Grid>
        </Grid>
      ) : (
        <></>
      )}

      {mode !== CollabEventType.virtual && (
        <Grid container mt={5} mb={6}>
          <Grid item lg={2.5} xs={12}>
            <LeftHeaderComp
              headerText={t('Physical Location Link')}
              subheader={t('Enter google map location link')}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <PlacesAutocompleteInput
              addressString={addressString}
              setAddressString={(address) => {
                setAddressString(address);
                if (isManualTrigger && trigger) {
                  trigger('location');
                }
              }}
              setAddressChanged={setAddressChanged}
              setCoordinates={(coordinates) =>
                setValue('locationCoordinates', coordinates)
              }
              setPlaceId={(placeId) => setValue('locationPlaceId', placeId)}
            />

            {errors && errors.location && (
              <InformationDescription type="error" my={1}>
                {errors.location.message}
              </InformationDescription>
            )}
          </Grid>
        </Grid>
      )}

      <Grid container mt={5} mb={2}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Event Duration')}
            subheader={t('Select event type')}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <RadioGroup
            options={eventDurationOptions}
            currentValue={durationType}
            updateCurrentValue={(updatedValue) => {
              setValue('durationType', updatedValue);
              if (isManualTrigger && trigger) {
                trigger('durationType');
              }
            }}
          />
        </Grid>
      </Grid>

      {durationType === CollabEventDurationType.timeBound && (
        <Grid container mb={6}>
          <Grid item lg={2.5} xs={12}></Grid>
          <Grid item lg={6} xs={12}>
            <Grid display="flex" columnGap={1}>
              <Grid flex={1} columnGap={2}>
                <InformationDescription mb={1}>
                  {t('Select Duration*')}
                </InformationDescription>
                <DatePicker
                  duration={watch('duration')}
                  {...{ trigger, setValue }}
                />
                {errors?.duration && (
                  <InformationDescription type="error" my={1}>
                    {errors.duration[0]?.startDate?.message}
                  </InformationDescription>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Grid container mt={5} mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Collaborator')}
            subheader={t('Select collaborators to add to the event')}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          {participants &&
            participants.length > 0 &&
            participants.map((participant, index) => (
              <EventCollaborator
                key={index}
                participant={participant}
                removeParticipant={() => removeParticipant(index)}
              />
            ))}
          <EventCollaboratorInput
            {...{
              currentParticipantDetails,
              userAutocompleteValue,
              setUserAutocompleteValue,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CreateEventForm;
