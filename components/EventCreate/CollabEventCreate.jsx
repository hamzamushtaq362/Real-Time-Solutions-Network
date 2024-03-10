import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import {
  ContentContainer,
  CreateEventMainHeader,
  MainContainer,
} from './elements';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useNotistack } from 'hooks';
import {
  BASE_URL,
  fetchRefreshToken,
  getCollabIdByTitleIdentifier,
  reFetchTokenExpire,
} from 'apis';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PrimaryButton, SmallSpinner } from '~/components';
import { CollabEventDurationType, CollabEventType } from '~/constants';
import { isValidURL } from '~/utils';
import { SecondarybarHeader } from 'components/SecondaryNavbar/elements';
import CreateEventForm from 'components/EventCreate/CreateEventForm';

export const CollabEventCreate = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [collabIdentifier, setCollabIdentifier] = useState('');
  const [collabId, setCollabId] = useState('');
  const [addressString, setAddressString] = useState('');
  const [addressChanged, setAddressChanged] = useState(false);

  const fetchCollabDetails = async () => {
    try {
      setCollabIdentifier(router.query.collabId);
      const gettingCollabId = await getCollabIdByTitleIdentifier(
        router.query.collabId,
      );
      setCollabId(gettingCollabId);
    } catch (error) {
      generateSnackbar('Error fetching collab title', 'error');
    }
  };

  useEffect(() => {
    fetchCollabDetails();
  }, []);

  // Loading states

  const [postingCollabEvent, setPostingCollabEvent] = useState(false);
  const generateSnackbar = useNotistack();

  const linkSchema = Yup.string().test('valid-link', 'Invalid URL', (value) =>
    isValidURL(value),
  );

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Event title is required')
      .min(5, 'Title is too short!')
      .max(50, 'Too Long!'),

    description: Yup.string()
      .required('Description is required')
      .min(30, 'Description is too short!')
      .max(3500, 'Too Long!'),
    link: Yup.lazy((value) => {
      if (value && value.trim().length > 0) {
        return linkSchema;
      }
      return Yup.string().notRequired();
    }),
    mode: Yup.string().required('Mode is required'),
    location: Yup.string().when('mode', {
      is: (modeValue) => ['physical', 'hybrid'].includes(modeValue),
      then: Yup.string().required('Location is required'),
      otherwise: Yup.string().nullable(),
    }),
    locationCoordinates: Yup.object().when('location', {
      is: (location) => !!location, // Apply validation when collabLocation is present
      then: Yup.object().shape({
        latitude: Yup.number().required('Latitude is required'),
        longitude: Yup.number().required('Longitude is required'),
      }),
    }),
    locationPlaceId: Yup.string().when('location', {
      is: (location) => !!location, // Apply validation when collabLocation is present
      then: Yup.string().required('Place ID is required'),
    }),
    durationType: Yup.string().required('Duration type is required'),
    duration: Yup.array()
      .when('durationType', {
        is: 'timeBound',
        then: Yup.array().of(
          Yup.object().shape({
            startDate: Yup.date()
              .required('Duration date is required')
              .nullable(),
            endDate: Yup.date().required('Duration date is required'),
          }),
        ),
        otherwise: Yup.array().of(
          Yup.object().shape({
            startDate: Yup.date().nullable(),
            endDate: Yup.date().nullable(),
          }),
        ),
      })
      .required('Duration is required')
      .min(1, 'Duration is required')
      .max(1, 'Only one duration object is allowed'),
    currentParticipantDetails: Yup.object()
      .nullable()
      .shape({
        type: Yup.string(),
        email: Yup.string(),
        role: Yup.string().when('email', {
          is: (emailValue) => !!emailValue && emailValue.trim().length > 0,
          then: Yup.string().required('Role is required'),
          otherwise: Yup.string().notRequired(),
        }),
        user: Yup.mixed().nullable(),
      }),
  });

  const methods = useForm({
    defaultValues: {
      title: '',
      description: '',
      link: '',
      mode: CollabEventType.physical,
      location: '',
      durationType: CollabEventDurationType.timeBound,
      duration: [
        {
          startDate: null,
          endDate: null,
          key: 'selection',
        },
      ],
      participants: [],
      currentParticipantDetails: {
        type: 'email',
        email: '',
        role: '',
        user: null,
      },
    },
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, getValues, setValue } = methods;

  const createCollabEvent = async () => {
    try {
      setPostingCollabEvent(true);
      const {
        title,
        description,
        link,
        mode,
        location,
        locationCoordinates,
        locationPlaceId,
        durationType,
        duration,
        participants,
      } = getValues();

      const eventPayload = {
        title,
        description,
        link,
        mode,
        durationType,
        durationStart: duration[0]?.startDate,
        durationEnd: duration[0]?.endDate,
        participants,
        collabId: collabId,
      };

      if (mode !== CollabEventType.virtual) {
        if (location) {
          eventPayload.location = location;
          eventPayload.locationCoordinates = locationCoordinates;
          eventPayload.locationPlaceId = locationPlaceId;
        }
      }

      const f1 = async () => {
        return await axios.post(
          `${BASE_URL}/api/v1/collab-event`,
          eventPayload,
        );
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        generateSnackbar('Collab Event posted successfully', 'success');
        router.push(
          `/collab/${collabIdentifier}?view=launchpad&subview=events`,
        );
      }
    } catch (err) {
      generateSnackbar('Error posting event', 'error');
      setPostingCollabEvent(false);
    }
  };

  const onCreateCollabEvent = () => {
    handleSubmit(createCollabEvent)();
  };

  useEffect(() => {
    setValue('location', addressString);
  }, [addressChanged]);

  return (
    <FormProvider {...methods}>
      <ContentContainer>
        <SecondarybarHeader>
          <CreateEventMainHeader>{t('Add New Event')}</CreateEventMainHeader>

          <PrimaryButton
            restrictHoverStyles
            disabled={postingCollabEvent}
            width="120px"
            onClick={onCreateCollabEvent}
          >
            {postingCollabEvent ? <SmallSpinner /> : 'Create Event'}
          </PrimaryButton>
        </SecondarybarHeader>
        <MainContainer>
          <CreateEventForm
            {...{
              addressString,
              setAddressString,
              addressChanged,
              setAddressChanged,
            }}
          />
        </MainContainer>
      </ContentContainer>
    </FormProvider>
  );
};
