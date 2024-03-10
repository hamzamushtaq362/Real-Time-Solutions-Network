import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  PublicProfileContainer,
  PublicProfileTitle,
  BottomButtonContainer,
  CopyInputContainer,
  InputHeader,
  InputBottomText,
  CoverImageContainer,
  EditCoverButtonStyle,
  EditCoverButton,
  ProfileImageContainer,
  ProfileImageTextContainer,
  ProfileNameTextLabel,
  InputInfoLabel,
} from './elements';
import {
  MarketplaceProfile,
  NormalInput,
  Spacer,
  PrimaryButton,
  OpaqueButton,
  ColorButton,
  Iconify,
  ImageIcon,
  ImageIconElement,
  Avatar,
} from '~/components';
import { UilCamera } from '@iconscout/react-unicons';

import { copyToClipBoard, openLinkInNewTab, isURL } from '~/utils';
import { getMarketPlaces } from '~/apis';
import { InstagramIcon } from '~/assets';
import { setCurrentDialog } from '~/redux';
import { useDispatch } from 'react-redux';
import { Box, useTheme } from '@mui/material';
import config from '~/config';
import { FeaturedInRow } from './FeaturedInRow';
import { AchievementRow } from './AchievementRow';
import EditCoverModal from './EditCoverModal';
import AppContext from 'context/AppContext';

const PublicProfile = ({
  patchUserDetails,
  userInfo,
  setUserInfo,
  saving,
  dataChange,
  setDataChange,
  testUserInfo,
  checkProfileDataChange,
  profileImage,
  setProfileImage,
  bannerImage,
  setBannerImage,
  uploadUserImageDirectly,
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [marketplaceList, setMarketplaceList] = useState([]);
  const [options, setOptions] = useState([]);
  const [userProfileLink, setUserProfileLink] = useState('');
  const [bioInputFocused, setBioInputFocused] = useState(false);
  const [other, setOther] = useState(false);
  const [bannerImagePreview, setBannerImagePreview] = useState('');
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [imageChange, setImageChange] = useState(false);
  const [modal, setModal] = useState(false);

  const profileImageRef = useRef();
  const bannerImageRef = useRef();

  const BIO_CHARACTER_LIMIT = 500;
  const { user } = useContext(AppContext);
  const isProfileComplete = user?.isProfileComplete;
  const dispatch = useDispatch();
  const theme = useTheme();

  const getMarketPlaceList = async () => {
    await getMarketPlaces()
      .then((res) => {
        let optionArray = [];
        if (res.data.data.marketplaces.length) {
          res.data.data.marketplaces.forEach((i) => {
            optionArray.push({
              value: i.iconName,
              label: i.iconName,
              icon: i.iconUrl,
            });
          });
        }
        setOptions(optionArray);
      })
      .catch(() => {});
  };

  const setMarketPlaceList = async () => {
    if (
      !marketplaceList.length &&
      userInfo.marketplaceIds &&
      userInfo.marketplaceIds.length
    ) {
      let setitem = [];
      userInfo.marketplaceIds.forEach((i) => {
        setitem.push({ market: i.market, id: i.id });
      });
      setMarketplaceList(setitem);
    }
  };

  useEffect(() => {
    getMarketPlaceList();
  }, []);

  useEffect(() => {
    setMarketPlaceList();

    if (userInfo?.featuredIn?.length > 0) {
      setFeaturedInList(userInfo?.featuredIn);
    }

    if (userInfo?.achievements?.length > 0) {
      setAchievementsList(userInfo?.achievements);
    }
  }, [userInfo]);

  const handlePlusClick = () => {
    setDataChange({ ...dataChange, marketplaceIds: false });
    setMarketplaceList([
      ...marketplaceList,
      {
        market: '',
        id: '',
      },
    ]);
  };

  const handleDeleteClick = (index) => () => {
    setDataChange({ ...dataChange, marketplaceIds: false });

    setMarketplaceList([
      ...marketplaceList.slice(0, index),
      ...marketplaceList.slice(index + 1),
    ]);
  };

  const handleMarketChange = (index) => (e) => {
    setDataChange({ ...dataChange, marketplaceIds: false });
    setMarketplaceList([
      ...marketplaceList.slice(0, index),
      {
        ...marketplaceList[index],
        market: e,
      },
      ...marketplaceList.slice(index + 1),
    ]);
  };

  const handleIdChange = (index) => (id) => {
    setDataChange({ ...dataChange, marketplaceIds: false });
    setMarketplaceList([
      ...marketplaceList.slice(0, index),
      {
        ...marketplaceList[index],
        id,
      },
      ...marketplaceList.slice(index + 1),
    ]);
  };

  // user info
  const handleInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    if (testUserInfo[e.target.name] !== e.target.value) {
      setDataChange({ ...dataChange, [e.target.name]: false });
    }
  };

  const defaultSocialInputProps = {
    borderOnFocus: true,
    padding: '11px 8px',
    backgroundColor: '#F7F7F7',
    fontWeight: 400,
    fontSize: '14px',
    borderRadius: '12px',
    color: '#808191',
  };

  useEffect(() => {
    if (userInfo?.username)
      setUserProfileLink(`${config?.APP_URL}/@${userInfo.username}`);
  }, [userInfo]);

  // Resetting the copy button state after 1400 ms
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1400);
    }
  }, [copied]);

  useEffect(() => {
    setUserInfo((prevState) => {
      return {
        ...prevState,
        marketplaceIds: marketplaceList,
      };
    });
  }, [marketplaceList]);

  useEffect(() => {
    const bannerReader = new FileReader();
    const profileImageReader = new FileReader();
    if (bannerImage) {
      bannerReader.onloadend = () => {
        setBannerImagePreview(bannerReader.result);
      };
      bannerReader.readAsDataURL(bannerImage);
    } else {
      setBannerImagePreview(null);
    }

    if (profileImage) {
      profileImageReader.onloadend = () => {
        setProfileImagePreview(profileImageReader.result);
      };
      profileImageReader.readAsDataURL(profileImage);
    } else {
      setProfileImagePreview(null);
    }
  }, [bannerImage, profileImage]);

  const isMarketPlaceDataValid = () => {
    if (marketplaceList?.length < 1) {
      return true;
    } else {
      let isValid = true;
      marketplaceList.forEach((marketPlace) => {
        if (!marketPlace?.id) {
          isValid = false;
        }
      });
      return isValid;
    }
  };

  const handleBannerPicture = (e, type) => {
    const file = e.target.files[0];

    if (file && file.type.substring(0, 5) === 'image') {
      if (type === 'banner') {
        uploadUserImageDirectly(file, 'banner');

        setBannerImage(file);
      } else {
        uploadUserImageDirectly(file, 'profile');

        setProfileImage(file);
      }
    } else {
      setBannerImage(null);
      setProfileImage(null);
    }
  };

  // get banner image
  const openBannerPicture = (type) => {
    if (type === 'banner') {
      bannerImageRef.current.click();
    } else {
      profileImageRef.current.click();
    }
  };

  const handleModal = () => setModal(!modal);

  const isProfileAndCoverImageComplete = () => {
    let coverImageComplete = false;
    let profileImageComplete = false;

    // Checking for cover image url
    if (userInfo?.coverImageUrl) {
      coverImageComplete = true;
    } else if (bannerImagePreview) {
      coverImageComplete = true;
    }

    // Checking for profile image url

    // Excluding the boring avatars profile image
    if (!userInfo?.imageUrl.includes('source.boringavatars')) {
      profileImageComplete = true;
    } else if (profileImagePreview) {
      profileImageComplete = true;
    }

    return coverImageComplete && profileImageComplete;
  };

  const getProfileCompleteFieldStatus = (fieldName) => {
    if (isProfileComplete) {
      return true;
    }
    switch (fieldName) {
      case 'profile-and-cover':
        return isProfileAndCoverImageComplete();
      case 'full-name':
        return !!userInfo?.fullName;
      case 'username':
        return !!userInfo?.username;
      default:
        return true;
    }
  };

  // Featured In Related Code
  const [featuredInList, setFeaturedInList] = useState([]);

  const addNewFeaturedIn = () => {
    const emptyFeaturedIn = { title: '', url: '' };
    setFeaturedInList((prevState) => {
      return [...prevState, emptyFeaturedIn];
    });
  };

  const addNewFeaturedInDisabled = () => {
    if (featuredInList?.length < 10) {
      if (featuredInList?.length > 0) {
        // 1. Checking if any url is invalid

        let allURLsValid = true;
        featuredInList.forEach((featuredIn) => {
          if (!isURL(featuredIn.url)) {
            allURLsValid = false;
            return;
          }
        });

        if (!allURLsValid) {
          return true;
        }

        // 2. Checking last added item validity
        const lastAddedItem = featuredInList[featuredInList?.length - 1];

        if (lastAddedItem.title && lastAddedItem.url) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    }
    return true;
  };

  const handleFeaturedInInput = (type, value, index) => {
    const featuredListCopy = JSON.parse(JSON.stringify(featuredInList));
    const desiredFeaturedIn = featuredListCopy[index];
    desiredFeaturedIn[type] = value;
    featuredListCopy[index] = desiredFeaturedIn;
    setFeaturedInList(featuredListCopy);
  };

  const handleDeleteFeaturedInItem = (index) => {
    setFeaturedInList((prevState) => {
      return prevState.filter((_, featuredIndex) => index !== featuredIndex);
    });
  };

  useEffect(() => {
    setUserInfo((prevState) => {
      return {
        ...prevState,
        featuredIn: featuredInList,
      };
    });
  }, [featuredInList]);

  // Achievements related code
  const [achievementsList, setAchievementsList] = useState([]);

  const addNewAchievement = () => {
    const emptyAchievement = { title: '', date: new Date().toISOString() };
    setAchievementsList((prevState) => {
      return [...prevState, emptyAchievement];
    });
  };

  const addNewAchievementDisabled = () => {
    if (achievementsList?.length < 10) {
      if (achievementsList?.length > 0) {
        // Checking last added item validity
        const lastAddedItem = achievementsList[achievementsList?.length - 1];
        if (lastAddedItem.title) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    }
    return true;
  };

  const handleDeleteAchievementItem = (index) => {
    setAchievementsList((prevState) => {
      return prevState.filter(
        (_, achievementIndex) => index !== achievementIndex,
      );
    });
    setDataChange({ ...dataChange, achievements: false });
  };

  const handleAchievementChange = (type, value, index) => {
    const achievementListCopy = JSON.parse(JSON.stringify(achievementsList));
    const desiredAchievement = achievementListCopy[index];
    desiredAchievement[type] = value;
    achievementListCopy[index] = desiredAchievement;
    setAchievementsList(achievementListCopy);
    setDataChange({ ...dataChange, achievements: false });
  };

  useEffect(() => {
    setUserInfo((prevState) => {
      return {
        ...prevState,
        achievements: achievementsList,
      };
    });
  }, [achievementsList]);

  return (<>
    <PublicProfileContainer>
      <PublicProfileTitle>{t("Profile")}</PublicProfileTitle>

      {/* Profile Image / Cover Image Section Starts */}
      <>
        <CoverImageContainer>
          <ImageIconElement
            src={
              bannerImagePreview
                ? bannerImagePreview
                : userInfo && userInfo.coverImageUrl
                ? userInfo.coverImageUrl
                : ''
            }
            sx={{ borderRadius: '6px' }}
            width="100%"
            height="159px"
            objectFit="cover"
            position="absolute"
          />

          <EditCoverButtonStyle>
            <EditCoverButton onClick={() => openBannerPicture('banner')}>
              <UilCamera color={theme.palette.grey.common} size="22" />
              <input
                onChange={(e) => handleBannerPicture(e, 'banner')}
                ref={bannerImageRef}
                style={{ visibility: 'hidden', opacity: 0, width: 0 }}
                type={'file'}
              />{t("Edit Cover")}</EditCoverButton>
          </EditCoverButtonStyle>
          <ProfileImageContainer
            onMouseEnter={() => setImageChange(true)}
            onMouseLeave={() => setImageChange(false)}
            onClick={() => openBannerPicture('profile')}
          >
            <input
              onChange={(e) => handleBannerPicture(e, 'profile')}
              ref={profileImageRef}
              style={{ visibility: 'hidden', opacity: 0, width: 0 }}
              type={'file'}
            />

            <Avatar
              size="106px"
              sx={
                imageChange && {
                  filter: 'blur(3px)',
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }
              }
              avatar={
                profileImagePreview
                  ? profileImagePreview
                  : userInfo && userInfo.imageUrl
                  ? userInfo.imageUrl
                  : ''
              }
            />
            <input
              onChange={(e) => handleBannerPicture(e, 'profile')}
              ref={profileImageRef}
              style={{ visibility: 'hidden', opacity: 0, width: 0 }}
              type={'file'}
            />
            {imageChange && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '55%',
                  left: '52%',
                  transform: 'translate(-50%, -50%)',
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
                borderRadius={'0%'}
                size="28px"
              >
                <UilCamera color={theme.palette.grey.common} size="40" />
              </Box>
            )}
            <ProfileImageTextContainer>
              <Spacer value={10} />
              <ProfileNameTextLabel>{t("Profile")}</ProfileNameTextLabel>
            </ProfileImageTextContainer>
          </ProfileImageContainer>
        </CoverImageContainer>
        {!getProfileCompleteFieldStatus('profile-and-cover') && (
          <>
            <Spacer value={50} />
            <InputInfoLabel>{t("*Profile Image and Cover Image required to complete the profile")}</InputInfoLabel>
          </>
        )}
      </>

      {/* Profile Image / Cover Image Section Ends */}

      <Spacer value={40} />

      <>
        <InputHeader
          color={theme.palette.grey.common}
          fontSize="14px"
          fontWeight="400"
          lineHeight="20px"
        >{t("Name")}</InputHeader>
        <Spacer value={24} />
        <NormalInput
          fontWeight={300}
          placeholder={t("Enter your Name")}
          borderRadius="11px"
          padding="14px 20px"
          handleChange={(e) => handleInfoChange(e)}
          value={userInfo?.fullName}
          name={'fullName'}
        />

        {!getProfileCompleteFieldStatus('full-name') && (
          <InputInfoLabel>{t("*Name is required to complete the profile")}</InputInfoLabel>
        )}
      </>

      <Spacer value={32} />
      <InputHeader
        color={theme.palette.grey.common}
        fontSize="14px"
        fontWeight="400"
        lineHeight="20px"
      >{t("Username")}</InputHeader>
      <Spacer value={24} />
      <NormalInput
        fontWeight={300}
        placeholder={t("Enter your Nickname")}
        borderRadius="11px"
        padding="14px 20px"
        handleChange={(e) => handleInfoChange(e)}
        value={userInfo.username}
        name={'username'}
      />

      {!getProfileCompleteFieldStatus('username') && (
        <InputInfoLabel>{t("*Username is required to complete the profile")}</InputInfoLabel>
      )}

      <Spacer value={32} />

      <InputHeader fontSize="16px" fontWeight="500" lineHeight="24px">{t("Bio")}</InputHeader>
      <Spacer value={24} />
      <NormalInput
        fontWeight={400}
        fontSize="14px"
        lineHeight="20px"
        placeholder={t("Enter your bio")}
        borderRadius="6px"
        multiline
        rows={4}
        name="bio"
        value={userInfo.bio}
        handleChange={handleInfoChange}
        handleFocus={() => setBioInputFocused(true)}
        handleBlur={() => setBioInputFocused(false)}
        inputProps={{ maxLength: BIO_CHARACTER_LIMIT }}
      />

      <Spacer value={32} />

      <InputHeader
        color={theme.palette.grey.common}
        fontSize="14px"
        fontWeight="400"
        lineHeight="20px"
      >{t("Email ID")}</InputHeader>
      <Spacer value={24} />
      <NormalInput
        fontWeight={300}
        placeholder={t("Enter your email id")}
        borderRadius="11px"
        padding="14px 20px"
        value={userInfo.email}
        name={'email'}
        handleChange={(e) => handleInfoChange(e)}
      />

      <Spacer value={32} />

      <InputHeader fontSize="16px" fontWeight="500" lineHeight="24px">{t("Public Profile")}</InputHeader>
      <CopyInputContainer>
        <NormalInput
          width={'70%'}
          fontWeight={300}
          borderRadius="11px"
          padding="14px 20px"
          height="48px"
          value={userProfileLink}
        />

        <Box sx={{ display: 'flex', columnGap: '10px' }}>
          <ColorButton
            backgroundColor={
              copied
                ? theme.palette.black.main
                : theme.palette.grey.normal3
            }
            width="110px"
            borderRadius="10px"
            variant="primary"
            color={
              copied
                ? theme.palette.white.main
                : theme.palette.text.primary
            }
            onClick={() => {
              copyToClipBoard(userProfileLink);
              setCopied(true);
            }}
          >
            {copied ? 'Copied' : 'Copy Link'}
          </ColorButton>

          <PrimaryButton
            width="110px"
            onClick={() => openLinkInNewTab(userProfileLink)}
            fontWeight={500}
          >{t("View Profile")}</PrimaryButton>
        </Box>
      </CopyInputContainer>

      <InputBottomText
        height="20px"
        fontWeight={300}
        fontSize="13px"
        lineHeight="19px"
      >
        {bioInputFocused && userInfo?.bio.length > 250
          ? `${userInfo?.bio.length}/${BIO_CHARACTER_LIMIT} character`
          : ''}
      </InputBottomText>
      <Spacer value={32} />

      <InputHeader fontSize="16px" fontWeight="600" lineHeight="26px">{t("Collabs")}</InputHeader>
      <Spacer value={32} />
      <OpaqueButton
        borderRadius="10px"
        onClick={() => dispatch(setCurrentDialog('add-project-dialog'))}
      >{t("+ Add Collab")}</OpaqueButton>

      <Spacer value={32} />
      <InputHeader fontSize="16px" fontWeight="600" lineHeight="26px">{t("Social Networks")}</InputHeader>
      <Spacer value={32} />

      <NormalInput
        {...defaultSocialInputProps}
        placeholder="https://twitter.com/username"
        value={userInfo.twitter}
        name="twitter"
        handleChange={handleInfoChange}
        startAdornment={
          <Iconify
            icon="akar-icons:twitter-fill"
            width="18px"
            height="18px"
            color={
              userInfo.twitter
                ? theme.palette.logos.twitter
                : theme.palette.grey.common
            }
            marginLeft={1}
          />
        }
      />

      <Spacer value={32} />

      <NormalInput
        {...defaultSocialInputProps}
        placeholder="https://instagram.com/username"
        value={userInfo.instagram}
        name="instagram"
        handleChange={handleInfoChange}
        startAdornment={
          <>
            {userInfo.instagram ? (
              <ImageIcon
                marginLeft="8px"
                icon={InstagramIcon.src}
                size="20px"
              />
            ) : (
              <Iconify
                icon="bxl:instagram-alt"
                width="20px"
                height="20px"
                color={theme.palette.grey.common}
                marginLeft={1}
              />
            )}
          </>
        }
      />

      <Spacer value={32} />

      <NormalInput
        {...defaultSocialInputProps}
        placeholder="https://facebook.com/username"
        value={userInfo.facebook}
        name="facebook"
        handleChange={handleInfoChange}
        startAdornment={
          <Iconify
            icon="akar-icons:facebook-fill"
            width="16px"
            height="16px"
            color={
              userInfo.facebook
                ? theme.palette.logos.facebook
                : theme.palette.grey.common
            }
            marginLeft={1}
          />
        }
      />
      {userInfo.otherSocialLink || other ? (
        <>
          <Spacer value={32} />
          <NormalInput
            {...defaultSocialInputProps}
            placeholder="https://yoursite.com/"
            value={userInfo.otherSocialLink}
            name="otherSocialLink"
            handleChange={handleInfoChange}
            startAdornment={
              <Iconify
                icon="akar-icons:globe"
                width="16px"
                height="16px"
                color={
                  userInfo.otherSocialLink
                    ? theme.palette.logos.globe
                    : theme.palette.grey.common
                }
                marginLeft={1}
              />
            }
          />
        </>
      ) : null}

      <Spacer value={32} />
      <OpaqueButton
        onClick={() => {
          setOther(true);
        }}
        borderRadius="10px"
      >{t("+ Add Social Links")}</OpaqueButton>
      <Spacer value={32} />

      {/* Marketplace Section Starts */}
      <>
        <InputHeader fontSize="16px" fontWeight="600" lineHeight="26px">{t("Marketplace")}</InputHeader>
        <Spacer value={32} />

        {marketplaceList.map((item, index) => (
          <MarketplaceProfile
            key={index}
            onMarketChange={handleMarketChange(index)}
            onIdChange={handleIdChange(index)}
            onDelete={handleDeleteClick(index)}
            marketplaceList={marketplaceList}
            selectedItem={item}
            options={options}
          />
        ))}

        <Spacer value={32} />
        <Box>
          {marketplaceList.length <= 5 ? (
            <OpaqueButton
              type="button"
              onClick={handlePlusClick}
              backgroundColor={theme.palette.blue.active}
              borderRadius="10px"
            >{t("+ Add Marketplace")}</OpaqueButton>
          ) : null}
        </Box>
      </>
      {/* Marketplace Section Ends */}

      <Spacer value={32} />

      {/* Featured In Section Starts */}
      <InputHeader fontSize="16px" fontWeight="600" lineHeight="26px">{t("Featured In")}</InputHeader>
      <Spacer value={32} />

      {featuredInList?.length > 0 ? (
        featuredInList.map((featuredIn, index) => (
          <FeaturedInRow
            featuredIn={featuredIn}
            key={index}
            index={index}
            handleFeaturedInInput={handleFeaturedInInput}
            handleDeleteFeaturedInItem={handleDeleteFeaturedInItem}
            onDataChange={() =>
              setDataChange({ ...dataChange, featuredIn: false })
            }
          />
        ))
      ) : (
        <></>
      )}

      <Spacer value={32} />
      <OpaqueButton
        type="button"
        backgroundColor={theme.palette.blue.active}
        borderRadius="10px"
        onClick={addNewFeaturedIn}
        disabled={addNewFeaturedInDisabled()}
      >{t("+ Add Featured links")}</OpaqueButton>

      {/* Feature In Sections Ends */}

      <Spacer value={32} />

      {/* Achievements Section Start */}

      <InputHeader fontSize="16px" fontWeight="600" lineHeight="26px">{t("Achievements")}</InputHeader>

      <Spacer value={32} />

      {achievementsList?.length > 0 ? (
        achievementsList.map((achievement, index) => (
          <AchievementRow
            achievement={achievement}
            key={index}
            index={index}
            handleDeleteAchievementItem={handleDeleteAchievementItem}
            handleAchievementChange={handleAchievementChange}
            onDataChange={() =>
              setDataChange({ ...dataChange, featuredIn: false })
            }
          />
        ))
      ) : (
        <></>
      )}

      <OpaqueButton
        type="button"
        backgroundColor={theme.palette.blue.active}
        borderRadius="10px"
        onClick={addNewAchievement}
        disabled={addNewAchievementDisabled()}
      >{t("+ Add Achievement")}</OpaqueButton>

      {/* Achievements Section End */}

      <Spacer value={64} />

      <BottomButtonContainer>
        <PrimaryButton
          onClick={async () => {
            patchUserDetails();
          }}
          width="125px"
          height="48x"
          disabled={
            saving
              ? saving
              : checkProfileDataChange() ||
                !isMarketPlaceDataValid() ||
                addNewFeaturedInDisabled() ||
                addNewAchievementDisabled()
          }
        >
          {saving ? 'Saving...' : 'Save'}
        </PrimaryButton>
      </BottomButtonContainer>
    </PublicProfileContainer>
    <EditCoverModal
      openBannerPicture={openBannerPicture}
      open={modal}
      handleModal={handleModal}
      title={t("Update Profile")}
      uploadButton={t("Upload File")}
      description="Add a picture, Recommended size 400x400"
      cancelButton="Cancel"
      width="290px"
      height="247px"
      hr
    />
  </>);
};
export default PublicProfile;
