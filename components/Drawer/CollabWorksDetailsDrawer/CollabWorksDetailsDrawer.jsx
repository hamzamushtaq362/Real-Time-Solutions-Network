import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  HeaderContainer,
  DrawerTitle,
  DescriptionContainer,
  DescriptionText,
  MediaContainer,
  FooterContainer,
  SubHeader,
  MediaGridContainer,
  AvatarText,
  SubFooterText,
  IconBox,
  ImagePreviewContainer,
  NameAvatarContainer,
} from './elements';
import { RoundedBorderedContainer } from 'components/Dropdown/elements';
import CloseIcon from 'components/Icons/CloseIcon';
import {
  Divider,
  FacebookFilledIcon,
  LinkedInFilledIcon,
  TwitterFilledIcon,
  Avatar,
  ImageLightBox,
} from '~/components';
import { useTheme } from '@mui/material';
import { RightDrawer } from '../RightDrawer';
import { truncateString, shareLinkHandler } from '~/utils';
import { Box } from '@mui/material';

export const CollabWorksDetailsDrawer = ({
  drawerOpen,
  toggleDrawer,
  collabWorkDetails,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [openImageLightBox, setOpenImageLightBox] = useState(false);
  const [currentLightBoxImage, setCurrentLightBoxImage] = useState('');

  const onImageClick = (image) => {
    setCurrentLightBoxImage(image);
    setOpenImageLightBox(true);
  };

  return (
    <>
      <ImageLightBox
        open={openImageLightBox}
        setOpen={setOpenImageLightBox}
        image={currentLightBoxImage}
      />

      <RightDrawer open={drawerOpen} handleClose={toggleDrawer}>
        <HeaderContainer>
          <DrawerTitle>{collabWorkDetails?.title}</DrawerTitle>
          <RoundedBorderedContainer
            onClick={toggleDrawer}
            borderColor={theme.palette.borderLightInverse}
            boxShadow="none"
            background="transparent"
          >
            <CloseIcon
              width={20}
              height={20}
              color={theme.palette.text.inverse}
            />
          </RoundedBorderedContainer>
        </HeaderContainer>

        <Divider color={theme.palette.borderLightInverse} margin="6px 0" />

        <NameAvatarContainer>
          <Avatar avatar={collabWorkDetails?.addedBy?.imageUrl} />
          <AvatarText>{collabWorkDetails?.addedBy?.fullName || ''}</AvatarText>
        </NameAvatarContainer>

        <Divider color={theme.palette.borderLightInverse} margin="6px 0" />

        <DescriptionContainer>
          <SubHeader>About</SubHeader>
          {collabWorkDetails?.description && (
            <DescriptionText>
              {collabWorkDetails?.description?.length < 700
                ? collabWorkDetails?.description
                : `${truncateString(collabWorkDetails?.description, 700)}...`}
            </DescriptionText>
          )}
        </DescriptionContainer>

        <Divider color={theme.palette.borderLightInverse} margin="6px 0" />

        {collabWorkDetails?.files && collabWorkDetails?.files?.length > 0 && (
          <>
            <MediaContainer>
              <SubHeader>Media</SubHeader>

              <MediaGridContainer mt={2}>
                {collabWorkDetails?.files?.map((file, index) => {
                  return (
                    <ImagePreviewContainer
                      onClick={() => onImageClick(file.url)}
                      key={index}
                      width={200}
                      height={170}
                      alt="media"
                      src={file.url}
                    />
                  );
                })}
              </MediaGridContainer>
            </MediaContainer>
            <Divider color={theme.palette.borderLightInverse} margin="6px 0" />
          </>
        )}

        <FooterContainer>
          <SubFooterText>{t('Share')}:</SubFooterText>

          <Box sx={{ display: 'flex', columnGap: '1rem' }}>
            <IconBox>
              <FacebookFilledIcon
                onClick={() =>
                  shareLinkHandler('facebook', window?.location?.href)
                }
                width={20}
                height={20}
                color={theme.palette.background.default}
              />
            </IconBox>

            <IconBox>
              <TwitterFilledIcon
                onClick={() =>
                  shareLinkHandler('twitter', window?.location?.href)
                }
                width={20}
                height={20}
                color={theme.palette.background.default}
              />
            </IconBox>

            <IconBox>
              <LinkedInFilledIcon
                onClick={() =>
                  shareLinkHandler('linkedin', window?.location?.href)
                }
                width={20}
                height={20}
                color={theme.palette.background.default}
              />
            </IconBox>
          </Box>
        </FooterContainer>
      </RightDrawer>
    </>
  );
};
