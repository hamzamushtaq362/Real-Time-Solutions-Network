import { useTranslation } from 'react-i18next';
import {
  MainContainer,
  CreateCollabMainHeader,
  InformationDescription,
} from './elements';
import { Grid } from '@mui/material';
import { ChoosePlatform } from './CollabCreateComponents';
import {
  RadioGroup,
  SearchSelectAutocomplete,
  Autocomplete,
  PlacesAutocompleteInput,
  StyledInput,
} from '~/components';
import { Controller } from 'react-hook-form';
import { Dropdown } from 'components/Dropdown/Dropdown';
import React, { useState } from 'react';
import { useDebounce } from 'react-use';
import { searchCollab } from 'apis/collab';

import { useEffect } from 'react';
import { LeftHeaderComp } from './LeftHeaderComp';

export const CollabInformationStep = ({
  control,
  setValue,
  watch,
  errors,
  trigger,
  isManualTrigger,
  isCollabBased,
  setIsCollabBased,
  reimaginedCollabDetails,
  isEdit,
}) => {
  const { t } = useTranslation();
  const [selectedBasedOnValue, setSelectedBasedOnValue] = useState(null);

  const categories = [
    '3D',
    'Virtual Avatar',
    'Virtual Worlds',
    'AR/VR/XR',
    'Physical',
    'Others',
  ];

  const [loading, setLoading] = useState(false);
  const [userSearchedItems, setUserSearchItems] = useState([]);
  const [searchCollabString, setSearchCollabString] = useState('');

  const handleSelectingCollab = (value) => {
    if (value) {
      setSelectedBasedOnValue(value);
      const { id } = value;

      setValue('basedOn', id);
    } else {
      setValue('associatedMissions', {});
    }
  };

  useDebounce(
    async () => {
      setLoading(true);

      if (searchCollabString) {
        const collabSearchRes = await searchCollab(searchCollabString);

        setUserSearchItems(collabSearchRes);
      }

      setLoading(false);
    },
    500,
    [searchCollabString],
  );

  const isCollabBasedOption = [
    {
      value: 'yes',
      label: 'Yes',
    },
    {
      value: 'no',
      label: 'No',
    },
  ];

  const platforms = watch('platform');
  const selectedCategories = watch('platformType');
  const privateCollab = watch('privateCollab');

  const [addressString, setAddressString] = useState('');
  const [addressChanged, setAddressChanged] = useState(false);

  useEffect(() => {
    setValue('collabLocation', addressString);
  }, [addressChanged]);

  const collabLocation = watch('collabLocation');

  useEffect(() => {
    if (reimaginedCollabDetails) {
      setSelectedBasedOnValue({
        id: reimaginedCollabDetails?._id,
        title: reimaginedCollabDetails?.title,
      });
    }
  }, [reimaginedCollabDetails]);

  useEffect(() => {
    if (isEdit && collabLocation) {
      setAddressString(collabLocation);
    }
  }, [isEdit, collabLocation]);

  const [inputLength, setInputLength] = useState(0);

  return (
    <MainContainer>
      <CreateCollabMainHeader>{t('Information')}</CreateCollabMainHeader>
      <Grid container my={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Categories')}
            subheader={t(
              'Select categories that represent the collab, these will be used to help people search for specific things on the platform.',
            )}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Controller
            name="platformType"
            control={control}
            render={({ field: { value, onChange } }) => (
              <SearchSelectAutocomplete
                freeSolo
                value={value}
                options={categories}
                getOptionLabel={(option) =>
                  option.input ? option.label : option
                }
                onInputChange={(event, newInputValue) => {
                  setInputLength(newInputValue.length);
                }}
                onChange={async (e, newValue) => {
                  const validTags = newValue.filter((option) => {
                    const tag = option.input
                      ? option.label
                          .replace('Enter to add "', '')
                          .replace('"', '')
                      : option;

                    return tag.length <= 50;
                  });

                  onChange(validTags);
                  if (isManualTrigger) {
                    await trigger('platformType');
                  }
                }}
                noOptionsText={t('No Results')}
                placeholder="Categories (max 5)"
              />
            )}
          />

          {errors && errors.platformType && (
            <InformationDescription type="error" my={1}>
              {errors.platformType.message}
            </InformationDescription>
          )}
          {inputLength > 50 && (
            <InformationDescription type="error" my={1}>
              Maximum length of 50 characters exceeded for each tags
            </InformationDescription>
          )}
        </Grid>
      </Grid>
      {selectedCategories &&
        selectedCategories.length !== 0 &&
        !(
          selectedCategories.includes('Physical') &&
          selectedCategories.length === 1
        ) && (
          <Grid container mb={6}>
            <Grid item lg={2.5}>
              <LeftHeaderComp
                headerText={t('Choose Platforms')}
                subheader={t('You can choose up to 5 platforms.')}
              />
            </Grid>
            <Grid item lg={7}>
              <ChoosePlatform
                selectedPlatforms={platforms}
                setNewPlatform={async (platform) => {
                  setValue('platform', [...platforms, platform]);
                  if (isManualTrigger) {
                    await trigger('platform');
                  }
                }}
                removePlatform={async (platform) => {
                  setValue(
                    'platform',
                    platforms.filter((p) => p !== platform),
                  );
                  if (isManualTrigger) {
                    await trigger('platform');
                  }
                }}
              />
              {errors && errors.platform && (
                <InformationDescription type="error" my={1}>
                  {errors.platform.message}
                </InformationDescription>
              )}
            </Grid>
          </Grid>
        )}
      {selectedCategories.includes('Physical') && (
        <Grid container mb={6}>
          <Grid item lg={2.5}>
            <LeftHeaderComp
              headerText={t('Add Location')}
              subheader={t('Add location of the Collab')}
            />
          </Grid>
          <Grid item lg={6}>
            <PlacesAutocompleteInput
              addressString={addressString || ''}
              setAddressString={setAddressString}
              setAddressChanged={setAddressChanged}
              setCoordinates={(coordinates) =>
                setValue('locationCoordinates', coordinates)
              }
              setPlaceId={(placeId) => setValue('locationPlaceId', placeId)}
            />
            {errors && errors.collabLocation && (
              <InformationDescription type="error" my={1}>
                {errors.collabLocation.message}
              </InformationDescription>
            )}
          </Grid>
        </Grid>
      )}

      {(!reimaginedCollabDetails || isEdit) && (
        <Grid container mb={6}>
          <Grid item lg={2.5} xs={12}>
            <LeftHeaderComp
              headerText={t('Reimagined from')}
              subheader={t('Is this Collab related to another Collab on RTSN')}
            />
          </Grid>
          <Grid item lg={3} xs={12}>
            <RadioGroup
              radioChipWidth="200px"
              options={isCollabBasedOption}
              currentValue={isCollabBased}
              updateCurrentValue={(updatedValue) =>
                setIsCollabBased(updatedValue)
              }
            />
          </Grid>
        </Grid>
      )}

      {isCollabBased === 'yes' && (
        <Grid container mb={6}>
          {!reimaginedCollabDetails || isEdit ? (
            <>
              <Grid item lg={2.5} xs={12}>
                <LeftHeaderComp
                  headerText={t('Reimagined from')}
                  subheader={t(
                    'Choose a collab from which this current collab has been reimagined',
                  )}
                />
              </Grid>
              <Grid item lg={3} xs={12}>
                <Controller
                  name="basedOn"
                  control={control}
                  render={() => (
                    <Autocomplete
                      variant="outlined"
                      padding="7px 10px"
                      borderRadius="8px"
                      id="autocomplete"
                      loading={loading}
                      autoCompleteItems={userSearchedItems}
                      value={selectedBasedOnValue}
                      onInputChange={(event) => {
                        setSearchCollabString(event?.target?.value);
                      }}
                      getOptionLabel={(option) => option.title}
                      onChange={(event, value) => handleSelectingCollab(value)}
                      placeholder={t('Search Collab')}
                      clearOnBlur
                      onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                          event.preventDefault();
                        }
                      }}
                    />
                  )}
                />
              </Grid>{' '}
            </>
          ) : (
            <>
              <Grid item lg={2.5} xs={12}>
                <LeftHeaderComp
                  headerText={t('Reimagined from')}
                  subheader={t(
                    'Current collab has been reimagined from a selected collab',
                  )}
                />
              </Grid>
              <Grid item lg={3} xs={12}>
                <StyledInput value={reimaginedCollabDetails?.title} />
              </Grid>
            </>
          )}
        </Grid>
      )}
      <Grid container mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Visibility')}
            subheader={t('Collab Visibility')}
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <Dropdown
            selectedItem={privateCollab ? 'Private' : 'Visible for everyone'}
            setSelectedItem={(value) => {
              setValue('privateCollab', value !== 'Visible for everyone');
              if (value === 'Private') {
                setValue('enableCuration', false);
                setValue('totalPercentageForCurators', 0);
              }
            }}
            options={['Visible for everyone', 'Private']}
            width="100%"
          />
        </Grid>
      </Grid>
    </MainContainer>
  );
};
