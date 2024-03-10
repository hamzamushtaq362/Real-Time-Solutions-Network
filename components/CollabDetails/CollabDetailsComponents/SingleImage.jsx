import { useState } from 'react';
import { SmallSpinner } from '~/components';
import {
  CollabDetailsImage,
  CollabDetailsImageFullRes,
  CollabImageWrapper,
} from 'components/CollabDetails/CollabDetailsComponents/elements';
import { MuiModal } from 'components/Dialog/MuiModal/MuiModal';
import { FlexBox } from 'components/common/elements';
import { openLinkInNewTab } from '~/utils';

const SingleImage = ({ image, videoUrl }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleModal = () => {
    if (!open) {
      setLoading(true);
    }
    setOpen(!open);
  };

  return (
    <CollabImageWrapper>
      <CollabDetailsImage src={image} onClick={() => videoUrl ? openLinkInNewTab(videoUrl) : toggleModal()} />
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
    </CollabImageWrapper>
  );
};

export default SingleImage;
