import { Box, Grid, useTheme } from '@mui/material';
import { Divider } from 'components/Divider';
import {
  LeftBox,
  RadioChipContainer,
  RightBox,
  WrapContainer,
} from './elements';
import { Controller } from 'react-hook-form';
import { PrimaryButton, StyledInput, Spacer } from '~/components';
import AvatarUpload from 'components/Avatar/AvatarUpload';
import { useEffect } from 'react';
import { uploadFile } from '~/apis';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const AddNewProfile = (props) => {
  const {
    watch,
    control,
    isManualTrigger,
    trigger,
    showAddNewProfile,
    saveHandler,
    setValue,
    disabled,
    isCollabAuthorExists,
  } = props;

  const theme = useTheme();

  const icon = <CheckBoxOutlineBlankIcon fontSize="medium" />;
  const checkedIcon = (
    <CheckBoxIcon
      sx={{
        color: theme.palette.text.inverse,
      }}
      fontSize="medium"
    />
  );

  const [uploadingImage, setUploadingImage] = useState(false);

  const image = watch('image');

  useEffect(() => {
    if (image && typeof image !== 'string') {
      setUploadingImage(true);
      uploadFile(image).then((res) => {
        setValue('image', res.data.files);
        setUploadingImage(false);
      });
    }
  }, [image]);

  return (
    showAddNewProfile && (
      <WrapContainer>
        <Grid container marginY={5}>
          <Grid item lg={2} xs={12}>
            <Controller
              name="image"
              control={control}
              render={({ field: { value, onChange } }) => (
                <AvatarUpload
                  image={value}
                  handleUpload={(files) => {
                    const file = files[0];
                    if (file) onChange(file);
                  }}
                  size={88}
                  disabled={disabled}
                />
              )}
            />
          </Grid>

          <Grid item lg={10} xs={12}>
            <Grid container gap={1}>
              <Grid item lg={5.5} xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <StyledInput
                      disabled={disabled}
                      inverse
                      value={value}
                      borderRadius={10}
                      onChange={async (e) => {
                        onChange(e);
                        if (isManualTrigger) {
                          await trigger('name');
                        }
                      }}
                      fullWidth
                      placeholder="Name"
                    />
                  )}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Controller
                  name="role"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <StyledInput
                      inverse
                      value={value}
                      borderRadius={10}
                      onChange={async (e) => {
                        onChange(e);
                        if (isManualTrigger) {
                          await trigger('role');
                        }
                      }}
                      fullWidth
                      placeholder="Role"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Spacer value={20} />

            <Grid item lg={10} xs={12} display="flex" columnGap="10px">
              <Grid item>
                <Box
                  display="flex"
                  alignItems="center"
                  borderRadius="8px"
                  overflow="hidden"
                  color={
                    theme.palette.mode === 'dark'
                      ? theme.palette.borderLightInverse35
                      : theme.palette.text.secondary
                  }
                >
                  <LeftBox>https://x.com/@</LeftBox>
                  <RightBox>
                    <Controller
                      name="twitter"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <input
                          disabled={disabled}
                          type="text"
                          placeholder={'twitter'}
                          value={value}
                          onChange={async (e) => {
                            onChange(e);
                            if (isManualTrigger) {
                              await trigger('twitter');
                            }
                          }}
                          style={{
                            border: 'none',
                            outline: 'none',
                            width: '100%',
                            padding: '2px 10px',
                            fontSize: '16px',
                            background: 'transparent',
                            color:
                              theme.palette.mode === 'dark'
                                ? theme.palette.borderLightInverse35
                                : theme.palette.text.secondary,
                          }}
                        />
                      )}
                    />
                  </RightBox>
                </Box>
              </Grid>
              <Grid item>
                <Controller
                  name="isCollabAuthor"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <RadioChipContainer
                      color={
                        theme.palette.mode === 'dark'
                          ? theme.palette.borderLightInverse35
                          : theme.palette.text.secondary
                      }
                    >
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        disabled={isCollabAuthorExists}
                        sx={{
                          fontSize: '14px',
                          color:
                            theme.palette.mode === 'dark'
                              ? theme.palette.borderLightInverse35
                              : theme.palette.text.secondary,
                        }}
                        checked={value}
                        onChange={async (e) => {
                          onChange(e.target.checked);
                          if (isManualTrigger) {
                            await trigger('isCollabAuthor');
                          }
                        }}
                      />
                      {isCollabAuthorExists ? 'Member' : 'Collab Author'}
                    </RadioChipContainer>
                  )}
                />
              </Grid>
            </Grid>

            <Grid item lg={12} xs={12} marginTop={1}>
              <PrimaryButton
                inverse
                backgroundColor={theme.palette.background.btnBackground}
                width={100}
                onClick={saveHandler}
                disabled={
                  uploadingImage ||
                  watch('name') === '' ||
                  watch('role') === '' ||
                  watch('twitter') === '' ||
                  watch('image') === ''
                }
              >
                {uploadingImage ? 'Uploading Image' : 'Save'}
              </PrimaryButton>
            </Grid>
          </Grid>
        </Grid>

        <Divider color={theme.palette.borderLightInverse} margin="32px 0" />
      </WrapContainer>
    )
  );
};

export default AddNewProfile;
