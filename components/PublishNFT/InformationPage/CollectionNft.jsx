import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Controller, useFieldArray } from 'react-hook-form';
import { DropzoneMultipleFiles } from './DropzoneMultipleFiles';
import ControllerInput from './ControllerInput';
import ControllerTextArea from './ControllerTextArea';
import { StyledInput } from '~/components';
import {
  AddProjectMainHeader,
  InformationDescription,
  SubHeading,
} from 'components/CollabCreate/AddProject/elements';
import { FlexBox } from 'components/common/elements';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { DropzoneJSON } from 'components/DropzoneFiles/DropzoneJSON';

const CollectionNft = ({ control, watch, setValue, resetField }) => {
  const [uploadType, setUploadType] = useState(null);
  const { t } = useTranslation();

  const { fields, update } = useFieldArray({
    control,
    name: 'collectionDetails',
  });

  useEffect(() => {
    resetField('collectionDetails');
  }, [uploadType]);

  return (
    <>
      <AddProjectMainHeader mb={5}>
        {t('Collection Information')}
      </AddProjectMainHeader>
      <Grid container my={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Upload method')}</SubHeading>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Dropdown
            options={['Manual', 'JSON/SVG Upload']}
            selectedItem={uploadType ?? 'Choose type'}
            setSelectedItem={setUploadType}
            width="100%"
          />
        </Grid>
      </Grid>
      {fields?.[0]?.image ? (
        fields.map((field, index) => (
          <>
            <Grid container mb={6}>
              <Grid item lg={2.5} xs={12}></Grid>
              <Grid item lg={6} xs={12}>
                <Grid container spacing={2} my={2}>
                  <Grid item lg={2}>
                    <FlexBox height="100%" alignItems="flex-end">
                      <Box
                        component="img"
                        width={80}
                        height={80}
                        alt="NFTImages"
                        src={field?.compressedImage ?? field?.image}
                        sx={{ borderRadius: '100px' }}
                      />
                    </FlexBox>
                  </Grid>
                  <Grid item lg={10 / 3}>
                    <InformationDescription mb={2}>
                      {t('Name')}
                    </InformationDescription>
                    <Controller
                      name={`collectionDetails[${index}].name`}
                      control={control}
                      render={({ field }) => (
                        <StyledInput
                          {...field}
                          fullWidth
                          placeholder={t('Collection Name')}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={10 / 3}>
                    <InformationDescription mb={2}>
                      {t('Description')}
                    </InformationDescription>
                    <Controller
                      name={`collectionDetails[${index}].description`}
                      control={control}
                      render={({ field }) => (
                        <StyledInput
                          {...field}
                          fullWidth
                          placeholder={t('Collection Description')}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={10 / 3}>
                    <InformationDescription mb={2}>
                      {t('Attribute')}
                    </InformationDescription>
                    <Controller
                      name={`collectionDetails[${index}].attribute`}
                      control={control}
                      render={({ field }) => (
                        <StyledInput
                          {...field}
                          fullWidth
                          placeholder={t('Collection Attribute')}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        ))
      ) : uploadType === 'Manual' ? (
        <>
          <ControllerInput
            control={control}
            name="initialCollectionName"
            heading={t('Collection Name')}
            placeholder={t('Name')}
          />
          <ControllerTextArea
            control={control}
            name="initialCollectionDescription"
            heading={t('Collection Description')}
            placeholder="Description"
          />
          <ControllerInput
            control={control}
            name="initialCollectionAttribute"
            heading={t('Collection Attribute')}
            placeholder="Attribute"
          />

          {!fields?.[0]?.image && uploadType === 'Manual' && (
            <Grid container my={6}>
              <Grid item lg={2.5} xs={12}>
                <SubHeading>{t('Multiple Images')}</SubHeading>
              </Grid>
              <Grid item lg={6} xs={12}>
                {
                  <Box display="flex" alignItems="center">
                    <DropzoneMultipleFiles
                      setImageFiles={(files, compressedFiles) => {
                        files.map((file, index) =>
                          update(index, {
                            image: file,
                            compressedImage: compressedFiles[index],
                            name: `${watch('initialCollectionName')} # ${
                              index + 1
                            }`,
                            description: `${watch(
                              'initialCollectionDescription',
                            )} # ${index + 1}`,
                            attribute: `${watch(
                              'initialCollectionAttribute',
                            )} # ${index + 1}`,
                          }),
                        );
                      }}
                    />
                  </Box>
                }
              </Grid>
            </Grid>
          )}
        </>
      ) : (
        <>
          <Grid container mb={6}>
            <Grid item lg={2.5} xs={12} />
            <Grid item lg={6} xs={12}>
              <DropzoneJSON
                setValue={(data) => setValue('collectionDetails', data)}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default CollectionNft;
