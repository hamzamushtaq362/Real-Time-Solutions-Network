import { useTranslation } from 'react-i18next';
import React from 'react';
import {
  AddProjectMainHeader,
  InformationDescription,
  MainInformationWrap,
  SubHeading,
} from 'components/CollabCreate/AddProject/elements';
import { Grid } from '@mui/material';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { Controller } from 'react-hook-form';
import SingleNft from './SingleNFT';
import CollectionNft from './CollectionNft';
import ControllerInput from 'components/PublishNFT/InformationPage/ControllerInput';
import ControllerTextArea from 'components/PublishNFT/InformationPage/ControllerTextArea';
import Links from 'components/PublishNFT/InformationPage/Links';

const InformationPage = ({
  watch,
  control,
  setValue,
  uploadProgress,
  resetField,
}) => {
  const { t } = useTranslation();

  const chainType = watch('chainType');
  const nftType = watch('nftType');

  return (
    <MainInformationWrap>
      <AddProjectMainHeader>{t('Main Information')}</AddProjectMainHeader>
      <Grid container my={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading mb={2}>{t('Type')}</SubHeading>
        </Grid>
        <Grid item lg={6}>
          <Controller
            name="chainType"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Dropdown
                options={['Off-Chain', 'On-Chain']}
                selectedItem={value ?? 'Choose type'}
                setSelectedItem={(text) => onChange(text)}
                width="100%"
              />
            )}
          />
        </Grid>
      </Grid>
      {chainType === 'On-Chain' && (
        <>
          <Grid container mb={6}>
            <Grid item lg={2.5} xs={12}>
              <SubHeading>{t('NFT Type')}</SubHeading>
            </Grid>
            <Grid item lg={6} xs={12}>
              <InformationDescription mb={2}>
                {t('Select NFT Type')}
              </InformationDescription>
              <Controller
                name="nftType"
                control={control}
                render={({ field: { value } }) => (
                  <Dropdown
                    options={['Single', 'Collection']}
                    selectedItem={value ?? 'Choose type'}
                    setSelectedItem={(text) => {
                      setValue('nftType', text);
                    }}
                    width="100%"
                  />
                )}
              />
            </Grid>
          </Grid>

          <AddProjectMainHeader mb={5}>
            {t('Collab Information')}
          </AddProjectMainHeader>
          <ControllerInput
            control={control}
            name="collabNFTTitle"
            heading={t('Collab Title')}
            placeholder="Title"
          />
          <ControllerTextArea
            control={control}
            name="collabNFTDescription"
            heading={t('Collab Description')}
            placeholder="Description"
          />
          <Links control={control} />

          {nftType === 'Single' ? (
            <SingleNft {...{ control, watch, uploadProgress }} />
          ) : (
            <CollectionNft {...{ control, watch, setValue, resetField }} />
          )}
        </>
      )}
    </MainInformationWrap>
  );
};

export default InformationPage;
