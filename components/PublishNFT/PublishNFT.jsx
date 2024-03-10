import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useLocalStorage, useNotistack } from '~/hooks';
import { BASE_URL, fetchRefreshToken, uploadMultipleFiles } from '~/apis';
// import UploadPage from './UploadPage/UploadPage';
import InformationPage from './InformationPage/InformationPage';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ActionsWrap } from 'components/CollabCreate/AddProject/elements';
import { OutlinedButton, PrimaryButton } from '~/components';
import { LoadMore, SmallSpinner } from 'components/Loading';
import { useIsMobileView } from '~/utils';
import CreateStepperHeader from 'components/CreateStepper/CreateStepperHeader';
import { useForm } from 'react-hook-form';
import { useStorageUpload } from '@thirdweb-dev/react';
import { reFetchTokenExpire } from '~/redux';
import { FlexBox } from 'components/common/elements';

function PublishNFT() {
  const { t } = useTranslation();
  const router = useRouter();
  const isMobileView = useIsMobileView();
  const [nftData, setNFTData] = useLocalStorage('nftData');
  const generateSnackbar = useNotistack();
  const collabId = router.query.collabId;
  const { mutateAsync: upload } = useStorageUpload();
  const [loading, setLoading] = useState(true);

  const [files, setFiles] = useState([]);
  const [savingDraft, setSavingDraft] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [publishLoading, setPublishLoading] = useState(false);
  const [, setIsManualTrigger] = useState(false);

  const { control, resetField, watch, getValues, setValue, trigger } = useForm({
    defaultValues: {
      chainType: nftData?.chainType ?? 'On-Chain',
      nftType: nftData?.nftType ?? 'Single',
      collabNFTTitle: nftData?.collabNFTTitle ?? '',
      collabNFTDescription: nftData?.collabNFTDescription ?? '',
      links: nftData?.links ?? [{ value: '' }],
      nftName: nftData?.nftName ?? '',
      nftDescription: nftData?.nftDescription ?? '',
      singleImage: nftData?.singleImage ?? '',
      initialCollectionName: nftData?.initialCollectionName ?? '',
      initialCollectionDescription: nftData?.initialCollectionDescription ?? '',
      initialCollectionAttribute: nftData?.initialCollectionAttribute ?? '',
      collectionDetails: nftData?.collectionDetails ?? [],
      price: nftData?.price ?? 0,
      quantity: nftData?.quantity ?? 1,
      royalty: nftData?.royalty ?? 0,
    },
  });
  const steps = ['Information', 'Media'];

  const [page, setPage] = useState(nftData?.page ?? 0);

  const fetchCollaborationDetails = async () => {
    try {
      setLoading(true);
      const f1 = async () => {
        return await axios.get(`${BASE_URL}/api/v1/collab/${collabId}`);
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      if (res.data.status === 'success') {
        const { collab } = res.data.data;
        const { isCollabPublished } = collab;
        if (isCollabPublished) {
          router.push(`/published-collab/${collabId}`);
        }
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollaborationDetails();
  }, []);

  const uploadSingleIPFSFile = async (singleImage) => {
    const url = await upload({
      data: [singleImage],
      options: { uploadWithGatewayUrl: true },
    });
    return { url: url[0] };
  };
  const uploadIPFSFiles = async (images) => {
    return await upload({
      data: [...images],
      options: { uploadWithGatewayUrl: true },
    });
  };

  const uploadFiles = async () => {
    const objectFiles = files.filter((file) => !file.url);
    const urlFiles = files.filter((file) => !!file.url);
    const { singleImage, nftType, collectionDetails } = getValues();

    let updatedFiles = {
      singleImage,
      media: urlFiles,
    };
    let ipfsUploadType = '';

    const promises = [];

    if (singleImage && !singleImage.url) {
      // selectedImage is not uploaded yet
      generateSnackbar('Uploading images...', 'info');
      ipfsUploadType = 'single';
      promises.push(uploadSingleIPFSFile(singleImage));
    }

    if (
      nftType !== 'Single' &&
      typeof collectionDetails[0].image !== 'string'
    ) {
      generateSnackbar('Uploading collection images...', 'info');
      ipfsUploadType = 'multi';
      promises.push(
        uploadIPFSFiles(
          collectionDetails.map((collection) => collection.image),
        ),
      );
    }

    if (objectFiles && objectFiles.length > 0) {
      promises.push(uploadMultipleFiles(objectFiles, handleUploadProgress));
    }

    try {
      const results = await Promise.all(promises);

      const mediaIndex = ipfsUploadType ? 1 : 0;

      if (ipfsUploadType && ipfsUploadType === 'single') {
        updatedFiles.singleImage = results[0];
      }

      if (ipfsUploadType && ipfsUploadType === 'multi') {
        updatedFiles.collectionDetails = collectionDetails.map(
          (collection, index) => {
            return {
              name: collection.name,
              description: collection.description,
              image: results[0][index],
            };
          },
        );
      }

      if (results[mediaIndex]) {
        setUploadProgress(null);
        updatedFiles.media = [...urlFiles, ...results[mediaIndex].files];
        setFiles(updatedFiles.media);
      }

      return updatedFiles;
    } catch (e) {
      generateSnackbar(
        'There was an error saving files. Please try again later.',
        'error',
      );
    }
  };

  const handleDraftSave = async () => {
    setSavingDraft(true);
    const updatedFiles = await uploadFiles();
    setNFTData({
      ...getValues(),
      media: updatedFiles.media,
      collectionDetails: updatedFiles.collectionDetails,
      singleImage: updatedFiles.singleImage,
    });
    generateSnackbar('Draft saved successfully', 'success');
    setSavingDraft(false);
  };

  const handleUploadProgress = (progressEvent) => {
    const progress = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100,
    );
    setUploadProgress(progress);
  };
  // const handleRemoveFile = (currentUrl) => {
  //   const updatedFiles = files.filter((file) =>
  //     file.url
  //       ? file.url !== currentUrl
  //       : URL.createObjectURL(file) !== currentUrl,
  //   );
  //   setFiles(updatedFiles);
  // };

  const handlePublish = async () => {
    try {
      setPublishLoading(true);
      const updatedFiles = await uploadFiles();
      const {
        chainType,
        nftType,
        collabNFTTitle,
        collabNFTDescription,
        links,
        initialCollectionName,
        initialCollectionDescription,
        initialCollectionAttribute,
        price,
        quantity,
        royalty,
        nftName,
        nftDescription,
      } = getValues();

      const data = {
        collabId,
        selectedPublishMode:
          chainType === 'Off-Chain' ? 'nonNftPublish' : 'userMintNft',
        uploadType: nftType === 'Single' ? 'single' : 'multi',
        collabNFTTitle,
        collabNFTDescription,
        links: links.map((link) => link.value),
        nftTitle: nftName,
        nftDescription: nftDescription,
        nftImage: updatedFiles.singleImage.url,
        nftMintPrice: price,
        nftMintquantity: quantity,
        nftRoyalty: royalty,
        nftMetadataArr: updatedFiles.collectionDetails,
        collectionMetadata: {
          name: initialCollectionName,
          description: initialCollectionDescription,
          attribute: initialCollectionAttribute,
        },
        media: updatedFiles.media,
      };

      const res = await axios.post(
        `${BASE_URL}/api/v1/collab/addNftDetailsInCollab`,
        data,
      );
      if (res.data.status === 'success') {
        setNFTData(null);
        generateSnackbar('Collab published successfully', 'success');
        router.push(`/published-collab/${collabId}`);
      }
      setPublishLoading(false);
    } catch (err) {
      setPublishLoading(false);
    }
  };
  const handleNextClick = async () => {
    if (steps?.length - 1 === page) {
      await handlePublish();
    } else {
      setNFTData({ page: page + 1 });
      setPage(page + 1);
    }
  };

  const disabledDraft = savingDraft || publishLoading;
  const disabledNext = publishLoading || savingDraft;
  const isFinalStep = steps?.length - 1 === page;

  if (loading) {
    return (
      <FlexBox justifyContent="center" width="100%" height="100%">
        <LoadMore inverse />
      </FlexBox>
    );
  }

  return (
    <>
      <Box>
        <CreateStepperHeader
          headerTitle={t('Publish NFT')}
          steps={steps}
          currentStepIndex={page}
          setCurrentStepIndex={setPage}
          finalStepText="Publish"
          handleDraftSave={handleDraftSave}
          disabledDraft={disabledDraft}
          disabledNext={disabledNext}
          loadingDraft={savingDraft}
          loadingNext={publishLoading}
          handleNextClick={handleNextClick}
          setIsManualTrigger={setIsManualTrigger}
          trigger={trigger}
        />

        {page === 0 && (
          <InformationPage
            {...{ watch, control, setValue, uploadProgress, resetField }}
          />
        )}

        {/* {page === 1 && (
          <UploadPage
            files={files}
            setFiles={setFiles}
            uploadProgress={uploadProgress}
            handleRemoveFile={handleRemoveFile}
          />
        )} */}
        {isMobileView && (
          <Box p={3} mb={2}>
            <ActionsWrap>
              <OutlinedButton
                disabled={disabledDraft}
                width="190px"
                height={50}
                fontSize={16}
                onClick={handleDraftSave}
              >
                {savingDraft ? <SmallSpinner inverse={true} /> : 'Save Draft'}
              </OutlinedButton>
              <PrimaryButton
                width="190px"
                height={50}
                disabled={disabledNext}
                marginLeft={8}
                fontSize={16}
                onClick={handleNextClick}
              >
                {publishLoading ? (
                  <SmallSpinner />
                ) : isFinalStep ? (
                  'Publish'
                ) : (
                  'Next Step'
                )}
              </PrimaryButton>
            </ActionsWrap>
          </Box>
        )}
      </Box>
    </>
  );
}

export default PublishNFT;
