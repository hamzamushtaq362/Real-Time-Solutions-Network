import { useTranslation } from 'react-i18next';
import { NFTBannerBox, NFTBannerText } from './elements';
import { ColorButton } from '~/components';
import { useTheme } from '@mui/material';

export const NFTTopBanner = ({ setShowNFTDetails, message }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (<>
    <NFTBannerBox>
      <NFTBannerText>{message}</NFTBannerText>
      <ColorButton
        backgroundColor={theme.palette.grey.grey2A2C33}
        width="140px"
        height="42px"
        variant="primary"
        hoverColor={theme.palette.grey.grey2A2C33}
        color={theme.palette.white.main}
        onClick={() => {
          setShowNFTDetails(true);
        }}
      >{t("Check Status")}</ColorButton>
    </NFTBannerBox>
  </>);
};
