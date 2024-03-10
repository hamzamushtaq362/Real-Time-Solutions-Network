import { useState } from 'react';
import { CollabDetailsImageFullRes } from 'components/CollabDetails/CollabDetailsComponents/elements';
import { MuiModal } from 'components/Dialog/MuiModal/MuiModal';
import { FlexBox } from 'components/common/elements';
import { SmallSpinner } from '~/components';

export const ImageLightBox = ({ open, setOpen, image }) => {
  const [loading, setLoading] = useState(true);
  return (
    <MuiModal open={open} handleModal={() => setOpen(false)}>
      {loading && (
        <FlexBox justifyContent="center" width={500} height="80vh">
          <SmallSpinner inverse />
        </FlexBox>
      )}
      <CollabDetailsImageFullRes
        loading={loading}
        src={image}
        onLoad={() => setLoading(false)}
      />
    </MuiModal>
  );
};
