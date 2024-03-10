import React from 'react';
import {
  AddProjectMainHeader,
  MainInformationWrap,
} from 'components/CollabCreate/AddProject/elements';
import { Avatar, SearchSelectAutocomplete } from '~/components';
import { Controller } from 'react-hook-form';
import { Box, Grid, useTheme } from '@mui/material';
import { UilTimes } from '@iconscout/react-unicons';
import { useNotistack } from '~/hooks';
import { DropdownUser } from 'components/Dropdown/DropdownUser';
import { isValidEmail } from 'utils/utils';
import { StyledChip } from 'components/Chip';
import { InformationDescription } from 'components/CollabCreate/elements';
import { FlexBox } from 'components/common/elements';
import DropdownEmailAvatar from 'components/Dropdown/DropdownEmailAvatar';
import { useTranslation } from 'react-i18next';
import useSearch from 'hooks/useSearch';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

const InviteCoCreators = ({ control, trigger, errors, singleInvitation }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { userSearchItems, setSearchString, loading } = useSearch();
  const generateSnackbar = useNotistack();

  const handleChangeCoCreators = (_, updated, onChange) => {
    const newValue = updated.map((option) =>
      option.input
        ? option.label.replace('Enter to add "', '').replace('"', '')
        : option,
    );
    const lastValue = newValue[newValue.length - 1];

    if (typeof lastValue === 'string') {
      if (isValidEmail(lastValue)) {
        onChange(newValue);
      } else {
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
    setSearchString('');
    trigger('selectedCoCreators');
  };

  const handleChangeCoCreatorsSingle = (_, newValue, onChange) => {
    const lastValue = newValue[newValue.length - 1];
    if (newValue.length === 1 || newValue.length === 0) {
      if (typeof lastValue === 'string') {
        if (isValidEmail(lastValue)) {
          // Update the state with the new valid email value
          onChange(newValue);
        } else if (newValue.length === 0) {
          // Allow removing the existing value
          onChange(newValue);
        } else {
          generateSnackbar(
            'Enter a valid email or select from dropdown',
            'error',
          );
        }
      } else {
        // If it's not a custom input (an option from the list), update the state
        onChange(newValue);
      }
    } else {
      generateSnackbar(
        'Please enter only one email or select one user',
        'error',
      );
    }
    setSearchString('');
    trigger('selectedCoCreators');
  };

  return !singleInvitation ? (
    <MainInformationWrap>
      <AddProjectMainHeader>{t('Co-Creators')}</AddProjectMainHeader>
      <Grid container my={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Invite new co-creators')}
            subheader={t('Enter a member name or email')}
          />
        </Grid>
        <Grid item lg={7} xs={12}>
          <Controller
            name="selectedCoCreators"
            control={control}
            render={({ field: { value, onChange } }) => (
              <SearchSelectAutocomplete
                freeSolo
                value={value}
                options={userSearchItems}
                getOptionLabel={(option) =>
                  option.input ? option.label : option
                }
                onChange={async (e, value) => {
                  await handleChangeCoCreators(e, value, onChange);
                  // const filterSearch = allCoCreators.filter((creator) => {
                  //   return !value.some((selectedCreator) => {
                  //     return creator._id === selectedCreator._id;
                  //   });
                  // });
                  // setAllCoCreators(filterSearch);
                  // onChange(value);
                }}
                loading={loading}
                onInputChange={(event) => {
                  setSearchString(event?.target?.value);
                }}
                placeholder={t('Write a name or email')}
                noOptionsText={t('No Results')}
                renderOption={(props, option) => (
                  <DropdownUser props={props} option={option} />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <StyledChip
                      key={index}
                      variant="outlined"
                      label={
                        <FlexBox>
                          <Avatar
                            size={22}
                            avatar={
                              option.image || (
                                <DropdownEmailAvatar size={22} />
                              )
                            }
                            withBorder={true}
                            borderColor={theme.palette.grey.common}
                          />
                          <Box ml={1}>{option.fullName || option}</Box>
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
                limitTags={3}
                listItemPadding="28px 16px"
              />
            )}
          />
          {errors && errors.selectedCoCreators && (
            <InformationDescription type="error" my={2} ml={3}>
              {errors?.selectedCoCreators?.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
    </MainInformationWrap>
  ) : (
    <Grid item lg={7} xs={12}>
      <InformationDescription mb={2}>
        {t('Enter a member name or email')}
      </InformationDescription>

      <Controller
        name="selectedCoCreators"
        control={control}
        render={({ field: { value, onChange } }) => (
          <SearchSelectAutocomplete
            freeSolo
            value={value}
            options={userSearchItems}
            getOptionLabel={(option) => option.label}
            onChange={(e, value) => {
              handleChangeCoCreatorsSingle(e, value, onChange);
            }}
            onInputChange={(event) => {
              const value = event?.target?.value;
              setSearchString(value);
            }}
            placeholder={t('Write a name or email')}
            noOptionsText={t('No Results')}
            renderOption={(props, option) => (
              <DropdownUser props={props} option={option} />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <StyledChip
                  key={index}
                  variant="outlined"
                  label={option.label || option}
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
      {errors && errors.selectedCoCreators && (
        <InformationDescription type="error" my={2} ml={3}>
          {errors?.selectedCoCreators?.message}
        </InformationDescription>
      )}
    </Grid>
  );
};

export default InviteCoCreators;
