import {
  FeaturedPreviewDialogContainer,
  FeaturedInPreviewTitle,
  FeaturedInLinkContainer,
  FeaturedInURLText,
} from './elements';
import { Dialog } from '../elements';
import { Spacer } from '~/components';
import { UilLink } from '@iconscout/react-unicons';
import { truncateString } from '~/utils';
import { useTheme } from '@mui/material';

export const FeaturedInPreviewDialog = ({ open, handleClose, title, url }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={handleClose} width="650px">
      <FeaturedPreviewDialogContainer>
        <FeaturedInPreviewTitle>{title}</FeaturedInPreviewTitle>

        <Spacer value={30} />

        <FeaturedInLinkContainer>
          <FeaturedInURLText
            onClick={() => {
              if (!(url.includes('https://') && url.includesA('http://'))) {
                const formalUrl = `https://${url}`;
                window.open(formalUrl, '_blank');
              } else {
                window.open(url, '_blank');
              }
            }}
          >
            {url?.length > 200 ? truncateString(url, 197) : url}
          </FeaturedInURLText>

          <UilLink color={theme.palette.text.primary} size={40} />
        </FeaturedInLinkContainer>
      </FeaturedPreviewDialogContainer>
    </Dialog>
  );
};
