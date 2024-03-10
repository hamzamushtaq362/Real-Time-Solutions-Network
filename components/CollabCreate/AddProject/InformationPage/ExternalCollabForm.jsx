import React, { useContext, useEffect, useState } from 'react';
import ControllerInput from 'components/PublishNFT/InformationPage/ControllerInput';
import ControllerTextArea from 'components/PublishNFT/InformationPage/ControllerTextArea';
import { Box, Grid, useTheme } from '@mui/material';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Avatar,
  DropzoneImagesMultiple,
  PlacesAutocompleteInput,
  SearchSelectAutocomplete,
} from '~/components';
import themes from 'constants/themesDefault';
import {
  AddProjectMainHeader,
  InformationDescription,
  SubHeading,
} from 'components/CollabCreate/AddProject/elements';
import CanRender from 'components/CanRender';
import { UserAction } from '~/config';
import { DropdownUser } from 'components/Dropdown/DropdownUser';
import { StyledChip } from 'components/Chip';
import { FlexBox } from 'components/common/elements';
import DropdownEmailAvatar from 'components/Dropdown/DropdownEmailAvatar';
import { UilTimes } from '@iconscout/react-unicons';
import ChoosePlatform from 'components/CollabCreate/AddProject/ChoosePlatform/ChoosePlatform';
import CollabReleases from 'components/CollabCreate/AddProject/InformationPage/CollabReleases';
import FeaturedIn from 'components/CollabCreate/AddProject/InformationPage/FeaturedIn';
import Achievements from 'components/CollabCreate/AddProject/InformationPage/Achievements';
import useSearch from 'hooks/useSearch';
import { isValidEmail, useIsMobileView } from '~/utils';
import { useNotistack } from '~/hooks';
import { useTranslation } from 'react-i18next';
import AppContext from 'context/AppContext';
import { uploadMultipleFiles } from '~/apis';
import UploadAndLink from '../../../DropzoneFiles/UploadAndLink';

const suggestions = [
  '3D',
  'Virtual Avatar',
  'Virtual Worlds',
  'AR/VR/XR',
  'Physical',
  'Others',
];

const ExternalCollabForm = ({
  isManualTrigger,
  isEdit,
  invitedMembersUserIds,
  toggleContributedCollaboratorsDrawer,
  item,
  index,
}) => {
  const { user } = useContext(AppContext);
  const {
    control,
    watch,
    formState: { errors },
    trigger,
    setValue,
  } = useFormContext();

  const { collabList, role } = watch();
  const selectedImages = item
    ? collabList?.[index]?.selectedImages
    : watch('selectedImages');
  const selectedSuggestions = item
    ? collabList?.[index].selectedSuggestions
    : watch('selectedSuggestions');
  const collabLocation = item
    ? collabList?.[index].collabLocation
    : watch('collabLocation');
  const errorData = item ? errors?.collabList?.[index] : errors;

  const { t } = useTranslation();
  const theme = useTheme();
  const generateSnackbar = useNotistack();
  const isMobileView = useIsMobileView();

  const [autocompleteValue, setAutocompleteValue] = useState([]);

  const { userSearchItems, setSearchString, loading } = useSearch();

  const handleChangeCoCreators = async (_, updated, onChange) => {
    const newValue = updated.map((option) =>
      option.input
        ? option.label.replace('Enter to add "', '').replace('"', '')
        : option,
    );
    const lastValue = newValue[newValue.length - 1];

    if (typeof lastValue === 'string') {
      if (isValidEmail(lastValue)) {
        setAutocompleteValue(newValue);
        onChange(newValue);
      } else {
        newValue.pop();
        generateSnackbar(
          'Enter a valid email or select from dropdown',
          'error',
        );
        setAutocompleteValue(newValue);
        onChange(newValue);
      }
    } else {
      // If it's not a custom input (an option from the list), update the state
      setAutocompleteValue(newValue);
      onChange(newValue);
    }
    await trigger(
      item ? `collabList[${index}].selectedCoCreators` : 'selectedCoCreators',
    );
  };

  const getFilteredUsersFromInvitedUsers = () => {
    return userSearchItems.filter(
      (user) => !invitedMembersUserIds.includes(user?._id),
    );
  };
  const uploadCollabImagesOnSelect = async () => {
    const fileImages = selectedImages.filter(
      (image) => typeof image !== 'string' && !image.imageUrl,
    ); // Filter out URL strings
    const urlImages = selectedImages.filter(
      (image) => typeof image === 'string' || image.imageUrl,
    );

    const result = await uploadMultipleFiles(fileImages);
    if (result?.files && result?.files?.length > 0) {
      const uploadedUrls = result.files.map((file) => file.url);
      setValue(getFieldName('selectedImages'), uploadedUrls.concat(urlImages));
    } else if (urlImages.length > 0) {
      setValue(getFieldName('selectedImages'), urlImages);
    } else {
      setValue(getFieldName('selectedImages'), []);
    }
  };

  useEffect(() => {
    if (selectedImages.some((image) => typeof image !== 'string' && !image.imageUrl)) {
      uploadCollabImagesOnSelect();
    }
  }, [selectedImages]);

  const getFieldName = (fieldName) => {
    return item ? `collabList[${index}].${fieldName}` : fieldName;
  };

  return (
    <>
      <ControllerInput
        control={control}
        heading={t('Title')}
        placeholder={t('Write title')}
        name={getFieldName('collabTitle')}
        leftDescription={t('Write the name of the collab.')}
        rightDescription={t('Collab Name')}
        isManualTrigger={isManualTrigger}
        trigger={trigger}
        errorMessage={errorData?.collabTitle?.message}
      />
      <ControllerTextArea
        control={control}
        heading={t('Description')}
        placeholder={t('Write description')}
        name={getFieldName('collabDescription')}
        leftDescription={t(
          'Write a description of the collab, explaining what it’s about or it’s objectives.',
        )}
        rightDescription="Description"
        isManualTrigger={isManualTrigger}
        trigger={trigger}
        maxLength={3500}
        errorMessage={errorData?.collabDescription?.message}
      />
      <Grid container my={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Themes')}
            subheader={t('Select themes that are related to the collab.')}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Box mt={2}>
            <Controller
              name={getFieldName('themes')}
              control={control}
              render={({ field: { value, onChange } }) => (
                <SearchSelectAutocomplete
                  freeSolo
                  options={themes}
                  getOptionLabel={(option) =>
                    option.input ? option.label : option
                  }
                  onChange={async (e, newValue) => {
                    onChange(
                      newValue.map((option) =>
                        option.input
                          ? option.label
                              .replace('Enter to add "', '')
                              .replace('"', '')
                          : option,
                      ),
                    );
                    if (isManualTrigger) {
                      await trigger(getFieldName('themes'));
                    }
                  }}
                  noOptionsText={t('No Results')}
                  value={value}
                  placeholder="Themes (max 5)"
                />
              )}
            />
          </Box>
          {errorData && (
            <InformationDescription type="error" my={1}>
              {errorData?.themes?.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>

      <Grid container my={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading mb={2}>{t('Media')}</SubHeading>
        </Grid>
        <Grid item lg={6}>
          <UploadAndLink
            maxImages={5}
            imageFiles={selectedImages}
            setImageFiles={(images) =>
              setValue(getFieldName('selectedImages'), images)
            }
          />
        </Grid>
      </Grid>

      <ControllerInput
        control={control}
        heading={t('Collab Link')}
        placeholder="https://"
        name={getFieldName('link')}
        rightDescription="Link"
      />

      <AddProjectMainHeader>{t('Collaborators')}</AddProjectMainHeader>
      <Grid container my={isMobileView ? 4 : 6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Co-Creators')}</SubHeading>

          {role !== 'Collaborator' && (
            <CanRender
              currentRole={user?.userRole}
              action={UserAction.CREATE_CONTRIBUTE_COLLAB}
              yes={() => (
                <SubHeading
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={toggleContributedCollaboratorsDrawer}
                >
                  {t('Contribute Collaborators')}
                </SubHeading>
              )}
            />
          )}
        </Grid>
        <Grid item lg={6} xs={12}>
          <Controller
            name={getFieldName('selectedCoCreators')}
            control={control}
            render={({ field: { onChange } }) => (
              <SearchSelectAutocomplete
                freeSolo
                onChange={(_, value) =>
                  handleChangeCoCreators(_, value, onChange)
                }
                loading={loading}
                value={autocompleteValue}
                options={
                  !isEdit ? userSearchItems : getFilteredUsersFromInvitedUsers()
                }
                getOptionLabel={(option) =>
                  option.input ? option.label : option
                }
                onInputChange={(event) => {
                  setSearchString(event.target.value);
                }}
                placeholder={t('Search to add')}
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

      <AddProjectMainHeader mb={4}>
        {t('Additional Information')}
      </AddProjectMainHeader>
      <Grid container mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Categories')}
            subheader={t(
              'Select categories which represent the collab, these will\n            be used to help people search for specific things on the platform.',
            )}
          />
        </Grid>
        <Grid item lg={7} xs={12}>
          <Box mb={5}>
            <Controller
              name={getFieldName('selectedSuggestions')}
              control={control}
              render={({ field: { value, onChange } }) => (
                <SearchSelectAutocomplete
                  freeSolo
                  value={value}
                  options={suggestions}
                  getOptionLabel={(option) =>
                    option.input ? option.label : option
                  }
                  onChange={async (e, newValue) => {
                    onChange(
                      newValue.map((option) =>
                        option.input
                          ? option.label
                              .replace('Enter to add "', '')
                              .replace('"', '')
                          : option,
                      ),
                    );
                    if (isManualTrigger) {
                      await trigger(getFieldName('selectedSuggestions'));
                    }
                  }}
                  noOptionsText={t('No Results')}
                  placeholder="Categories (max 5)"
                />
              )}
            />
          </Box>
          {errorData && (
            <InformationDescription type="error" my={2} ml={1}>
              {errorData?.selectedSuggestions?.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
      {selectedSuggestions?.length !== 0 &&
        !(
          selectedSuggestions?.includes('Physical') &&
          selectedSuggestions?.length === 1
        ) && (
          <Grid container mb={6}>
            <Grid item lg={2.5} xs={12}>
              <LeftHeaderComp
                headerText={t('Choose Platforms')}
                subheader={t('You can choose up to 5 platforms.')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <ChoosePlatform
                name={getFieldName('selectedPlatforms')}
                errorMessage={errorData?.selectedPlatforms?.message}
                {...{ isManualTrigger }}
              />
            </Grid>
          </Grid>
        )}
      {selectedSuggestions?.includes('Physical') && (
        <Grid container mb={6}>
          <Grid item lg={2.5}>
            <LeftHeaderComp
              headerText={t('Add Location')}
              subheader={t('Add location of the Collab')}
            />
          </Grid>
          <Grid item lg={6}>
            <PlacesAutocompleteInput
              addressString={collabLocation}
              setAddressString={(newValue) =>
                setValue('collabLocation', newValue)
              }
              setCoordinates={(coordinates) =>
                setValue(getFieldName('collabLocationCoordinates'), coordinates)
              }
              setPlaceId={(placeId) => setValue('locationPlaceId', placeId)}
            />

            {errorData && (
              <InformationDescription type="error" my={1}>
                {errorData?.collabLocation?.message}
              </InformationDescription>
            )}
          </Grid>
        </Grid>
      )}
      <AddProjectMainHeader mb={4}>{t('Releases')}</AddProjectMainHeader>
      <CollabReleases {...{ isManualTrigger, item, index, errorData }} />
      <AddProjectMainHeader mb={4}>{t('Spotlight')}</AddProjectMainHeader>
      <FeaturedIn
        {...{ item, index, errorData }}
        description={t('Add featured in for the collab')}
      />
      <Achievements
        {...{ item, index }}
        title="Awards"
        description={t('Add awards for the collab')}
      />
    </>
  );
};

export default ExternalCollabForm;
