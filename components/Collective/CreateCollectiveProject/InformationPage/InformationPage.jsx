import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import {
  SearchSelectAutocomplete,
  Avatar,
  DropzoneImagesMultiple,
  PlacesAutocompleteInput,
  FeaturedIn,
  Awards,
} from '~/components';
import { UilTimes } from '@iconscout/react-unicons';
import { DropdownUser } from 'components/Dropdown/DropdownUser';
import { isValidEmail, useIsMobileView } from '~/utils';
import { useNotistack } from '~/hooks';
import ChoosePlatform from 'components/CollabCreate/AddProject/ChoosePlatform/ChoosePlatform';
import TeamsAddCategories from 'components/CollabCreate/AddProject/TeamsAddCategories/TeamsAddCategories';
import useSearch from 'hooks/useSearch';
import {
  AddProjectMainHeader,
  MainInformationWrap,
  SubHeading,
} from 'components/CollabCreate/AddProject/elements';
import { StyledChip } from 'components/Chip';
import {
  CollectiveChipText,
  CollectiveHeadingChip,
} from 'components/Collective/CreateCollectiveProject/elements';
import ControllerInput from 'components/PublishNFT/InformationPage/ControllerInput';
import ControllerTextArea from 'components/PublishNFT/InformationPage/ControllerTextArea';
import { Controller } from 'react-hook-form';
import { InformationDescription } from 'components/CollabCreate/elements';
import { FlexBox } from 'components/common/elements';
import DropdownEmailAvatar from 'components/Dropdown/DropdownEmailAvatar';
import themes from '../../../../constants/themesDefault';

// Teams Collab Information Page
const InformationPage = ({
  collectiveData,
  setValue,
  control,
  watch,
  trigger,
  errors,
  isManualTrigger,
  isEdit,
}) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const generateSnackbar = useNotistack();
  const isMobileView = useIsMobileView();
  const { userSearchItems, setSearchString } = useSearch();

  const [addressString, setAddressString] = useState('');
  const [addressChanged, setAddressChanged] = useState(false);
  useEffect(() => {
    setValue('collabLocation', addressString);
  }, [addressChanged]);

  const handleChangeCoCreators = async (_, updated, onChange) => {
    const newValue = updated.map((option) =>
      option.input
        ? option.label.replace('Enter to add "', '').replace('"', '')
        : option,
    );

    const lastValue = newValue[newValue.length - 1];

    if (typeof lastValue === 'string') {
      if (isValidEmail(lastValue)) {
        // Update the state with the new valid email value
        onChange(newValue);
      } else {
        // Remove the non-email input from the newValue array
        newValue.pop();
        generateSnackbar(
          'Enter a valid email or select from dropdown',
          'error',
        );
        onChange(newValue);
      }
    } else {
      // If it's not a custom input (an option from the list), update the state
      onChange(newValue);
    }
    if (isManualTrigger) {
      await trigger('selectedCoCreators');
    }
    setSearchString('');
  };

  const handleThemesChange = (_, updatedSelectedThemes) => {
    setValue('selectedThemes', updatedSelectedThemes);
    trigger('selectedThemes');
  };

  const selectedCategories = watch('selectedSuggestions');
  const collabLocation = watch('collabLocation');
  const selectedThemes = watch('selectedThemes');

  useEffect(() => {
    if (isEdit && collabLocation) {
      setAddressString(collabLocation);
    }
  }, [isEdit, collabLocation]);

  return (
    <MainInformationWrap>
      <AddProjectMainHeader>{t('Team Information')}</AddProjectMainHeader>
      <CollectiveHeadingChip>
        <Avatar size={42} avatar={collectiveData?.image} />
        <CollectiveChipText>{collectiveData?.title}</CollectiveChipText>
      </CollectiveHeadingChip>
      <AddProjectMainHeader mb={4}>
        {t('Main Information')}
      </AddProjectMainHeader>

      <ControllerInput
        control={control}
        heading="Title"
        name="title"
        placeholder={t('Write title')}
        leftDescription={t('Write the name of the collab.')}
        rightDescription={t('Collab Name')}
        isManualTrigger={isManualTrigger}
        trigger={trigger}
      />
      <ControllerTextArea
        control={control}
        heading="Description"
        name="description"
        placeholder={t('Write description')}
        leftDescription={t(
          'Write a description of the collab, explaining what it’s about or it’s objectives.',
        )}
        rightDescription="Description"
        isManualTrigger={isManualTrigger}
        trigger={trigger}
        maxLength={700}
      />

      <Grid container my={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Themes')}</SubHeading>
          <InformationDescription>
            {t('Select themes that are related to the collab')}
          </InformationDescription>
        </Grid>
        <Grid item lg={6}>
          <SearchSelectAutocomplete
            freeSolo
            value={selectedThemes}
            options={themes}
            onChange={handleThemesChange}
            noOptionsText={t('No Results')}
            defaultValue={selectedThemes}
            limitTags={10}
            placeholder="Themes (max 10)"
          />
          {errors && errors.selectedTags && (
            <InformationDescription type="error" my={2} ml={1}>
              {errors?.selectedTags?.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>

      <Grid container my={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading mb={2}>{t('Media')}</SubHeading>
        </Grid>
        <Grid item lg={6}>
          <DropzoneImagesMultiple
            maxImages={5}
            imageFiles={watch('selectedImages')}
            setImageFiles={(images) => setValue('selectedImages', images)}
          />
        </Grid>
      </Grid>

      <ControllerInput
        control={control}
        name="link"
        heading={t('Collab Link')}
        placeholder="https://"
        rightDescription="Link"
      />

      <AddProjectMainHeader mb={4}>{t('Collaborators')}</AddProjectMainHeader>

      <Grid container my={isMobileView ? 4 : 6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Co-Creators')}</SubHeading>
          <InformationDescription>
            {t('Add here collaborators by name or email')}
          </InformationDescription>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Controller
            name="selectedCoCreators"
            control={control}
            render={({ field: { value, onChange } }) => (
              <SearchSelectAutocomplete
                freeSolo
                value={value}
                options={userSearchItems}
                getOptionLabel={(option) => option.label}
                onChange={(e, value) =>
                  handleChangeCoCreators(e, value, onChange)
                }
                onInputChange={(event) => {
                  setSearchString(event.target.value);
                }}
                placeholder={t('Add collaborators')}
                noOptionsText={t('No Results')}
                renderOption={(props, option) => (
                  <DropdownUser props={props} option={option} />
                )}
                renderTags={(creators, getTagProps) =>
                  creators.map((creator, index) => (
                    <StyledChip
                      key={index}
                      variant="outlined"
                      label={
                        <FlexBox>
                          <Avatar
                            size={22}
                            avatar={
                              creator.image || <DropdownEmailAvatar size={22} />
                            }
                            withBorder={true}
                            borderColor={theme.palette.grey.common}
                          />
                          <Box ml={1}>{creator.fullName || creator}</Box>
                        </FlexBox>
                      }
                      size="small"
                      deleteIcon={
                        <UilTimes color={theme.palette.text.label} size="22" />
                      }
                      {...getTagProps({ index })}
                    />
                  ))
                }
                listItemPadding="28px 16px"
              />
            )}
          />
        </Grid>
      </Grid>

      <AddProjectMainHeader>{t('Additional Information')}</AddProjectMainHeader>

      <Grid container mb={6} mt={4}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Categories')}</SubHeading>
          <InformationDescription width={isMobileView ? '100%' : '80%'}>
            {t(
              'Select categories which represent the collab, these will\n            be used to help people search for specific things on the platform.',
            )}
          </InformationDescription>
        </Grid>
        <Grid item lg={7} xs={12}>
          <TeamsAddCategories {...{ watch, setValue, errors, trigger }} />
        </Grid>
      </Grid>
      {!(
        selectedCategories.includes('Physical') &&
        selectedCategories.length === 1
      ) && (
        <Grid container mb={6}>
          <Grid item lg={2.5} xs={12}>
            <SubHeading>{t('Choose Platforms')}</SubHeading>
            <InformationDescription mb={isMobileView ? 2 : 0} width="80%">
              {t('You can choose up to 5 platforms.')}
            </InformationDescription>
          </Grid>
          <Grid item lg={7} xs={12}>
            <ChoosePlatform
              name='selectedPlatforms'
            />
          </Grid>
        </Grid>
      )}
      {selectedCategories.includes('Physical') && (
        <Grid container mb={6}>
          <Grid item lg={2.5}>
            <SubHeading>{t('Add Location')}</SubHeading>
            <InformationDescription width="80%">
              {t('Add location of the Collab')}
            </InformationDescription>
          </Grid>
          <Grid item lg={6}>
            <PlacesAutocompleteInput
              addressString={addressString}
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

      {/* Spotlight section starts */}
      <AddProjectMainHeader mb={4}>{t('Spotlight')}</AddProjectMainHeader>
      <FeaturedIn
        {...{ control, watch }}
        description={t('Add featured in for the collab')}
      />

      <Awards
        {...{ control, watch }}
        title="Awards"
        description={t('Add awards for the collab')}
      />
    </MainInformationWrap>
  );
};

export default InformationPage;
