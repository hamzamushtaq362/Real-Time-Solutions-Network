// import { makeStyles } from '@mui/styles';
import { BadgeFrameBorderBoxInner, BadgeFrameBorderBoxOuter } from './elements';
import { ImageIcon } from '~/components';

export const BadgePreview = ({ selectedImageBase64Value }) => {
  return (
    <>
      {selectedImageBase64Value && (
        <BadgeFrameBorderBoxOuter>
          <BadgeFrameBorderBoxInner>
            <ImageIcon
              src={`data:image/png;base64,${selectedImageBase64Value}`}
              width={'100%'}
              height={'100%'}
              sx={{ objectFit: 'cover' }}
              alt="add-icon"
            />
          </BadgeFrameBorderBoxInner>
        </BadgeFrameBorderBoxOuter>
      )}
    </>
  );
};
