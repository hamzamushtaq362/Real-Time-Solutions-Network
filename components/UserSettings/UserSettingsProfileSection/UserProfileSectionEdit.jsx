import { ProfileContentContainer } from './elements';
import {
  SectionTitle,
  SettingsHeader,
  RowContainer,
  RowLabelHeaderContainer,
  RowLabelHeader,
  InputLabel,
  RowContentContainer,
  SpinnerContainer,
  RowImageContentContainer,
} from '../elements';

import { SaveCancelButtonGroup } from '../SaveCancelButtonGroup';
import { ProfileVerification } from './ProfileVerification';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { BASE_URL, uploadFile } from '~/apis';
import {
  fetchRefreshToken,
  reFetchTokenExpire,
  setCurrentDialog,
} from '~/redux';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNotistack } from '~/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Spacer,
  StyledInput,
  ProfileVerificationDialog,
  Spinner,
  SearchSelectAutocomplete,
  FeaturedIn,
  Awards,
} from '~/components';
import AppContext from '../../../context/AppContext';
import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import AvatarUpload from 'components/Avatar/AvatarUpload';
import { tags } from '~/constants';
import { FlexBox } from 'components/common/elements';
import SocialLinks from 'components/UserSettings/UserSettingsProfileSection/SocialLinks';
import MarketplaceLinks from 'components/UserSettings/UserSettingsProfileSection/MarketplaceLinks';
import { useTranslation } from 'react-i18next';
import { updateUserCookieField, useIsMobileView } from '~/utils';
import { PanZoomImage } from 'components/Collective/CollectiveCreate/BasicInformation/PanZoomImage';
import StyledTextarea from 'components/Input/StyledTextarea';
import { SingleEditableLink } from 'components/CreatorProfile/EditableLink/SingleEditableLink';
import { PreAdornedInput } from 'components/Input/PreAdornedInput';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';
import { CoverImage } from '~/assets';

export const UserProfileSectionEdit = ({
  isContributedEdit,
  userData,
  setContributedUser,
}) => {
  const [userDetails, setUserDetails] = useState(userData ?? null);
  const [loading, setLoading] = useState(true);
  const [coverRepositioning, setCoverRepositioning] = useState(false);
  const [saving, setSaving] = useState(false);
  const { t } = useTranslation();

  const { user, setUser } = useContext(AppContext);
  const [uploadProgress, setUploadProgress] = useState(null);
  const generateSnackbar = useNotistack();

  // eslint-disable-next-line no-useless-escape
  /* eslint-disable */
  const URL =
    /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

  const dispatch = useDispatch();
  const { currentDialog } = useSelector((state) => state.dialog);

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const f1 = async () => {
        return await axios.get(`${BASE_URL}/user`);
      };

      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        setLoading(false);
        if (res.data.data.username === undefined || !res.data.data.username) {
          //
        } else {
          const userData = res.data.data;

          setUserDetails(userData);
        }
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    profilePhotoUrl: Yup.string(),
    fullName: Yup.string().required('Name is required'),
    introduction: Yup.string().max(
      260,
      'Introduction is too long, max 160 characters allowed',
    ),
    bio: Yup.string().max(700, 'Bio is too long, max 700 characters allowed'),
    coverImageUrl: Yup.string(),
    showReel: Yup.object().shape({
      url: Yup.string().url('Enter a valid URL'),
    }),
    skills: Yup.array().of(Yup.string()).max(15, 'Max 15 skills allowed'),
    achievements: Yup.array()
      .of(Yup.object())
      .max(10, 'Max 10 achievements allowed'),
    featuredIn: Yup.array()
      .of(Yup.object())
      .max(10, 'Max 10 featured links allowed'),
    verificationStatus: Yup.boolean(),
    socials: Yup.array().of(
      Yup.object().shape({
        name: Yup.string(),
        value: Yup.string(),
      }),
    ),
    marketplaces: Yup.array().of(
      Yup.object().shape({
        name: Yup.string(),
        value: Yup.string(),
      }),
    ),
  });

  const methods = useForm({
    defaultValues: {
      profilePhotoUrl: userDetails?.imageUrl ?? '',
      coverImageUrlCropped: userDetails?.coverImageUrlCropped
          ? userDetails.coverImageUrlCropped
          : CoverImage.src,
      achievements: userDetails?.achievements ?? [],
      socials: [],
      marketplaces: [],
      featuredIn: userDetails?.featuredIn ?? [],
      showReel: userDetails?.showReel,
    },
    resolver: yupResolver(validationSchema),
  });
  const { control, handleSubmit, watch, getValues, reset, setValue, trigger, formState: { errors, isDirty }, } = methods;

  const handleUploadProgress = (progressEvent) => {
    const progress = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100,
    );
    setUploadProgress(progress);
  };

  const uploadUserImageDirectly = async (
    imageFile,
    type,
    isContributedEdit,
  ) => {
    let API_URL = `${BASE_URL}/user`;

    if (isContributedEdit) {
      API_URL = `${BASE_URL}/user/contributed/${userDetails?._id}`;
    }

    if (type === 'banner') {
      let coverImageUrl;
      const response = await uploadFile(imageFile, handleUploadProgress);

      coverImageUrl = response.data.files;

      if (coverImageUrl) {
        await axios.patch(API_URL, {
          coverImageUrl,
        });
        setUploadProgress(null);
      }
      generateSnackbar('Profile updated successfully!', 'success');
      setValue('coverImageUrl', coverImageUrl);
    } else if (type === 'profile') {
      let profileImageUrl;
      profileImageUrl = await uploadFile(imageFile);

      if (profileImageUrl) {
        const res = await axios.patch(API_URL, {
          imageUrl: profileImageUrl.data.files,
        });
        generateSnackbar('Profile updated successfully!', 'success');

        const userInfo = res?.data?.data;
        const { imageUrl } = userInfo;

        if (!isContributedEdit) {
          setUser({
            ...user,
            imageUrl,
            isProfileComplete: res?.data?.data?.isProfileComplete,
          });
        } else {
          setContributedUser({
            ...userDetails,
            imageUrl: profilePhotoUrl,
          });
        }

        setValue('profilePhotoUrl', imageUrl);
      }
    }
  };

  const handleImageInputChange = async (file, type) => {
    const reader = new FileReader();
    const propertyName =
      type === 'profile' ? 'profilePhotoUrl' : 'coverImageUrl';
    reader.addEventListener('load', async function () {
      setValue(propertyName, reader.result);
      await trigger(propertyName);
    });
    reader.readAsDataURL(file);

    if (file && file.type.substring(0, 5) === 'image') {
      await uploadUserImageDirectly(file, type, isContributedEdit);
    }
  };

  useEffect(() => {
    if (userDetails) {
      setValue('profilePhotoUrl', userDetails?.imageUrl);
      setValue('fullName', userDetails?.fullName);
      setValue('introduction', userDetails?.introduction);
      setValue('coverImageUrl', userDetails?.coverImageUrl);
      setValue('coverImageUrlCropped', userDetails?.coverImageUrlCropped);
      setValue('bio', userDetails?.bio);
      setValue('showReel', userDetails?.showReel);
      setValue('skills', userDetails?.skills ? userDetails?.skills : []);
      setValue(
        'achievements',
        userDetails?.achievements ? userDetails?.achievements : [],
      );
      setValue(
        'featuredIn',
        userDetails?.featuredIn ? userDetails?.featuredIn : [],
      );
      setValue('socials', userDetails?.socials);
      setValue('marketplaces', userDetails?.marketplaces);
      setValue('verificationStatus', userDetails?.verificationStatus);
    }
  }, [userDetails]);

  useEffect(() => {
    if (!isContributedEdit) {
      getUserDetails();
    } else {
      setLoading(false);
    }
  }, []);

  const onSaveDetails = async () => {
    try {
      setSaving(true);
      let values = getValues();

      let API_URL = `${BASE_URL}/user`;

      if (isContributedEdit) {
        API_URL = `${BASE_URL}/user/contributed/${userDetails?._id}`;
      }

      const f1 = async () => {
        return await axios.patch(API_URL, values);
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res) {
        setSaving(false);
        const { fullName, profilePhotoUrl, skills, introduction, featuredIn } =
          values;
        setUserDetails({
          ...userDetails,
          ...values,
          fullName,
          specialize: skills?.[0],
          introduction,
          skills,
          featuredIn,
          imageUrl: profilePhotoUrl,
        });

        if (!isContributedEdit) {
          setUser({
            ...user,
            fullName,
            imageUrl: profilePhotoUrl,
            isProfileComplete: res?.data?.data?.isProfileComplete,
          });
        } else {
          setContributedUser({
            ...userDetails,
            ...values,
            fullName,
            specialize: skills?.[0],
            introduction,
            skills,
            featuredIn,
            imageUrl: profilePhotoUrl,
          });
        }
        await updateUserCookieField('isProfileComplete', res?.data?.data?.isProfileComplete)

        generateSnackbar('Profile updated successfully!', 'success');
        reset(getValues()); // Provide current values as the new 'initial' values
      }
    } catch (err) {
      setSaving(false);
      generateSnackbar(
        'Oops! Something went wrong. Please try again.',
        'error',
      );
    }
  };

  const { profilePhotoUrl, coverImageUrl, coverImageUrlCropped, verificationStatus } = watch();

  // Mobile view hook
  const isMobileView = useIsMobileView();

  const skills = watch('skills');

  return (
    <>
      {/* Dialog Rendering Starts */}
      {userDetails && (
        <ProfileVerificationDialog
          open={currentDialog === 'verify-profile-dialog'}
          handleClose={() => dispatch(setCurrentDialog(''))}
          noLinksClickHanlder={() => {
            dispatch(setCurrentDialog(''));
          }}
          userInfo={userDetails}
          setUserInfo={setUserDetails}
        />
      )}
      {/* Dialog Rendering Ends */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSaveDetails)}>
          <SettingsHeader>
            <SectionTitle>{t('Information')}</SectionTitle>
            {!isMobileView && (isDirty || coverRepositioning) && (
              <SaveCancelButtonGroup saving={saving} loading={loading} />
            )}
          </SettingsHeader>

          {!loading ? (
            <ProfileContentContainer>
              {/* Profile Photo Section */}

              <RowContainer>
                <RowLabelHeaderContainer>
                  <RowLabelHeader>{t('Profile Photo & Cover')}</RowLabelHeader>
                </RowLabelHeaderContainer>
                <RowImageContentContainer>
                  <FlexBox width="64%">
                    <FlexBox justifyContent="center" flexDirection="column">
                      <AvatarUpload
                        image={profilePhotoUrl}
                        handleUpload={(files) => {
                          const file = files[0];
                          if (file) handleImageInputChange(file, 'profile');
                        }}
                        size={100}
                      />
                      <InputLabel mt={2}>{t('.PNG or .JPG')}</InputLabel>
                    </FlexBox>
                    <FlexBox
                      justifyContent="center"
                      flexDirection="column"
                      flex={1}
                      ml={2}
                    >
                      <PanZoomImage
                        imageFile={coverImageUrl}
                        coverImageUrlCropped={coverImageUrlCropped}
                        width={600}
                        height={170}
                        objectFit='contain'
                        uploadProgress={uploadProgress}
                        coverRepositioning={coverRepositioning}
                        setCoverRepositioning={setCoverRepositioning}
                        setImageFile={(file) => setValue('coverImageUrl', file)}
                        setValue={setValue}
                        isAdmin={true}
                      />
                      {!coverImageUrl && (
                        <InputLabel mt={2}>
                          {t('Recommended size 3200x200 pixels')}
                        </InputLabel>
                      )}
                    </FlexBox>
                  </FlexBox>
                </RowImageContentContainer>
              </RowContainer>

              {/* Personal Section */}

              <Spacer value={50} />

              {/* Username & Email Section */}
              <RowContainer mb={2}>
                <RowLabelHeaderContainer>
                  <LeftHeaderComp
                    headerText={'Name'}
                    subheader={t('Display Name')}
                  />
                </RowLabelHeaderContainer>
                {/* Name Section */}

                <RowContentContainer>
                  <Box sx={{ width: isMobileView ? '100%' : '64%' }}>
                    <Spacer value={20} />

                    <Controller
                      name="fullName"
                      control={control}
                      render={({ field }) => (
                        <StyledInput {...field} fullWidth placeholder="Name" />
                      )}
                    />

                    {errors.fullName && (
                      <>
                        <Spacer value={10} />{' '}
                        <InputLabel type="error">
                          {errors.fullName.message}
                        </InputLabel>
                      </>
                    )}
                  </Box>
                </RowContentContainer>
              </RowContainer>

              {/* Introduction Section */}

              <RowContainer
              // onBlurCapture={debounce(handleSubmit(onSaveDetails), 2000)}
              >
                <RowLabelHeaderContainer>
                  <LeftHeaderComp
                    headerText={t('Intro')}
                    subheader={t('Describe yourself in < 160 characters')}
                  />
                </RowLabelHeaderContainer>

                <RowContentContainer>
                  <Box sx={{ width: isMobileView ? '100%' : '64%' }}>
                    <Controller
                      name="introduction"
                      control={control}
                      render={({ field }) => (
                        <StyledTextarea
                          {...field}
                          fullWidth
                          placeholder={t('Write your introduction')}
                          multiline
                          rows={4}
                          maxLength={260}
                        />
                      )}
                    />
                    {errors.introduction && (
                      <>
                        <Spacer value={10} />{' '}
                        <InputLabel type="error">
                          {errors.introduction.message}
                        </InputLabel>
                      </>
                    )}
                  </Box>
                </RowContentContainer>
              </RowContainer>

              {/* Bio Section */}
              <Spacer value={50} />

              <RowContainer>
                <RowLabelHeaderContainer>
                  <LeftHeaderComp
                    headerText={t('Bio')}
                    subheader={t(
                      'Describe Yourself. What brings you to RTSN? What makes you Unique and what you do one of a kind? What types of Collaborations are you looking to participate in?',
                    )}
                  />
                </RowLabelHeaderContainer>

                <RowContentContainer>
                  <Box sx={{ width: isMobileView ? '100%' : '64%' }}>
                    <Controller
                      name="bio"
                      control={control}
                      render={({ field }) => (
                        <StyledTextarea
                          {...field}
                          fullWidth
                          placeholder={t('Write your biography')}
                          multiline
                          rows={4}
                          maxLength={700}
                        />
                      )}
                    />
                    {errors.bio && (
                      <>
                        <Spacer value={10} />{' '}
                        <InputLabel type="error">
                          {errors.bio.message}
                        </InputLabel>
                      </>
                    )}
                  </Box>
                </RowContentContainer>
              </RowContainer>

              <Spacer value={60} />

              <RowContainer>
                <RowLabelHeaderContainer>
                  <LeftHeaderComp
                    headerText={t('Showreel')}
                    subheader={t('Link your showreel here')}
                  />
                </RowLabelHeaderContainer>

                <RowContentContainer>
                  <Box sx={{ width: isMobileView ? '100%' : '64%' }}>
                    <SingleEditableLink
                      name='showReel'
                      AddBtnContent={'Add Show reel'}
                      InputComponent={PreAdornedInput}
                    />
                    {errors.showReel && (
                      <>
                        <Spacer value={10} />
                        <InputLabel type="error">
                          {errors.showReel?.url?.message}
                        </InputLabel>
                      </>
                    )}
                  </Box>
                </RowContentContainer>
              </RowContainer>

              <Spacer value={50} />

              {/* Skills Section */}

              <RowContainer>
                <RowLabelHeaderContainer>
                  <LeftHeaderComp
                    headerText={t('Skills')}
                    subheader={t('Add your Professional Skills')}
                  />
                </RowLabelHeaderContainer>

                <RowContentContainer>
                  {skills && (
                    <Box sx={{ width: isMobileView ? '100%' : '64%' }}>
                      <Controller
                        name="skills"
                        control={control}
                        render={({ field: { value, onChange } }) => {
                          return (
                            <SearchSelectAutocomplete
                              value={value}
                              options={tags}
                              noOptionsText={t('No Results')}
                              limitTags={15}
                              placeholder={t('Add Skills to your Profile')}
                              padding="8px"
                              onChange={(e, value) =>
                                onChange(
                                  value.map((option) =>
                                    option.input
                                      ? option.label
                                          .replace('Enter to add "', '')
                                          .replace('"', '')
                                      : option,
                                  ),
                                )
                              }
                              // onBlurCapture={debounce(
                              //   handleSubmit(onSaveDetails),
                              //   2000,
                              // )}
                            />
                          );
                        }}
                      />

                      {errors.skills && (
                        <>
                          <Spacer value={10} />{' '}
                          <InputLabel type="error">
                            {errors.skills.message}
                          </InputLabel>
                          <Spacer value={10} />
                        </>
                      )}
                    </Box>
                  )}
                </RowContentContainer>
              </RowContainer>

              <SectionTitle mt={4} mb={3}>
                {t('Achievements')}
              </SectionTitle>

              {/* Achievements Section */}

              <Awards
                title="Awards"
                description="Share your craft’s recognition by adding awards earned by you."
              />

              {/* Featured In Section Starts */}

              <Spacer value={60} />

              <FeaturedIn
                description="Highlight your professional achievements by adding online coverage of your work."
              />

              <SectionTitle mt={4} mb={3}>
                {t('Social')}
              </SectionTitle>

              <SocialLinks
                description="Boost your social presence by enable visitors to follow you on Socials by adding your Social links."
              />

              <Spacer value={100} />

              {/* Verify Profile Section */}

              <>
                <ProfileVerification
                  verifyClickHandler={() =>
                    dispatch(setCurrentDialog('verify-profile-dialog'))
                  }
                  status={verificationStatus}
                />
              </>

              <Spacer value={50} />

              {/* Marketplace section */}

              <MarketplaceLinks
                title="Storefronts"
                description="Increase sales of your work by displaying links to your storefronts on your Profile page."
              />
            </ProfileContentContainer>
          ) : (
            <SpinnerContainer>
              <Spinner size={30} />
            </SpinnerContainer>
          )}
          <SettingsHeader>
            {isMobileView && (
              <SaveCancelButtonGroup saving={saving} loading={loading} />
            )}
          </SettingsHeader>
        </form>
      </FormProvider>
    </>
  );
};
