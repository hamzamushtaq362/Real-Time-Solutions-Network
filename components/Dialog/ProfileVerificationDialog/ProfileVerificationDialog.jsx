import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  ProfileVerificationContainer,
  ProfileVerficationHeader,
  SectionHeader,
  NormalText,
  ClickHereToAddLink,
} from './elements';
import { Dialog } from '../elements';
import { Box, useTheme } from '@mui/material';
import { getSocialMediaLogoMappings, getPlatformMappings } from '~/constants';
import {
  openLinkInNewTab,
  parseSocialMediaLinks,
  parseSocialHandle,
} from '~/utils';
import axios from 'axios';
import {
  Spinner,
  PrimaryButton,
  Tooltip,
  ImageIcon,
  IconBadgeLabel,
  Spacer,
  Divider,
} from '~/components';
import { BASE_URL } from '~/apis';
import { useNotistack } from '~/hooks';

export const ProfileVerificationDialog = ({
  open,
  userInfo,
  setUserInfo,
  handleClose,
  noLinksClickHanlder,
}) => {
  const { t } = useTranslation();

  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [marketPlaces, setMarketPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateSnackbar = useNotistack();
  const theme = useTheme();

  useEffect(() => {
    const socialMediaLinks = parseSocialMediaLinks(userInfo);

    setSocialMediaLinks(socialMediaLinks);

    const marketPlaces = userInfo?.marketplaceIds;
    if (marketPlaces && marketPlaces?.length > 0) {
      setMarketPlaces(marketPlaces);
    }
  }, [userInfo]);

  const applyForVerification = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/v1/verification/apply`,
      );
      if (response?.data?.status === 'success') {
        const { user, message } = response?.data;
        generateSnackbar(message, 'success');
        setUserInfo(user);
        handleClose();
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      generateSnackbar('Something went wrong! Please try again', 'error');
      handleClose();
    }
  };

  const getDisableStatus = () => {
    if (marketPlaces.length === 0 || socialMediaLinks.length === 0) {
      return true;
    } else return false;
  };

  return (
    (<Dialog open={open} onClose={handleClose} width="900px">
      <ProfileVerificationContainer>
        <Spacer value={8} />
        <ProfileVerficationHeader>{t("Apply for Verification")}</ProfileVerficationHeader>
        <Spacer value={16} />

        <Spacer value={32} />

        {/* Social Section Starts */}

        <SectionHeader>{t("Social")}</SectionHeader>
        <Spacer value={16} />

        <Box
          sx={{
            display: 'flex',
            columnGap: '20px',
            rowGap: '10px',
            flexWrap: 'wrap',
          }}
        >
          {socialMediaLinks.length > 0 ? (
            <>
              {socialMediaLinks.map(({ platform, link }) => {


                return (
                  <IconBadgeLabel
                    key={link}
                    onClick={() => openLinkInNewTab(link)}
                    icon={
                      <ImageIcon
                        icon={getSocialMediaLogoMappings(platform).image.src}
                        size="26px"
                      />
                    }
                    text={`@${parseSocialHandle(link)}`}
                  />
                );
              })}
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <NormalText>{t(
                "No Social Media handles found, please add social media handles\n                to apply for verification"
              )}</NormalText>

              <ClickHereToAddLink onClick={noLinksClickHanlder}>{t("+ Click here to add")}</ClickHereToAddLink>
            </Box>
          )}
        </Box>

        {/* Social Section Starts */}
        <Spacer value={32} />
        <Divider />
        <Spacer value={32} />

        {/* Marketplaces Sections Starts */}

        <SectionHeader>{t("Marketplaces")}</SectionHeader>
        <Spacer value={16} />

        <Box
          sx={{
            display: 'flex',
            columnGap: '20px',
            rowGap: '10px',
            flexWrap: 'wrap',
          }}
        >
          {marketPlaces?.length > 0 ? (
            <>
              {marketPlaces.map(({ id, _id, market }) => (
                <Tooltip title={market} key={_id}>
                  <Box>
                    <IconBadgeLabel
                      key={_id}
                      icon={
                        <ImageIcon
                          icon={getPlatformMappings(market).image.src}
                          size="22px"
                        />
                      }
                      text={id}
                    />
                  </Box>
                </Tooltip>
              ))}
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <NormalText>{t(
                "No market places found, please add market places to apply for\n                verification"
              )}</NormalText>

              <ClickHereToAddLink onClick={noLinksClickHanlder}>{t("+ Click here to add")}</ClickHereToAddLink>
            </Box>
          )}
        </Box>

        {/* Platform Sections Ends */}

        <Spacer value={32} />

        <PrimaryButton
          onClick={applyForVerification}
          disabled={loading || getDisableStatus()}
          width="200px"
          fontWeight={500}
          fontSize="16px"
        >
          {!loading ? (
            'Submit'
          ) : (
            <Spinner size="20px" color={theme.palette.white.main} />
          )}
        </PrimaryButton>

        <Spacer value={8} />
      </ProfileVerificationContainer>
    </Dialog>)
  );
};
