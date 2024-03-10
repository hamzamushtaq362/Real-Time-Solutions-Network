import { Box, Grid, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { LinkText } from '../elements';
import { InformationDescription } from '../../elements';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { StyledInput, StyledTextArea } from 'components/Input';
import { ActionText } from 'components/DashboardHome/elements';
import PlusIcon from 'components/Icons/PlusIcon';
import { useTranslation } from 'react-i18next';

import { Spacer } from 'components/Spacer';
import { PrimaryButton } from 'components/Button';

import { EditIcon } from '~/components';
import CloseIcon from 'components/Icons/CloseIcon';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

const CollabReleases = ({ isManualTrigger, item, index, errorData }) => {
  const {control, trigger, watch } = useFormContext();
  const getFieldName = (fieldName) => {
    return item ? `collabList[${index}].${fieldName}` : fieldName;
  }
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: getFieldName('releases'),
  });

  const [showAdd, setShowAdd] = useState(true);


  const handleAddInput = () => {
    append({
      title: '',
      link: '',
      instructions: '',
      isSaved: false,
    });

    setShowAdd(false);
  };

  const handleSave = (index) => {
    const item = watch(getFieldName(`releases[${index}]`));
    update(index, {
      ...item,
      isSaved: true,
    });
    setShowAdd(true);
  };

  const [hovered, setHovered] = useState(-1);
  const theme = useTheme();
  const { t } = useTranslation();

  const addReleaseCheck = (index) => {
    return (
      !watch(getFieldName(`releases[${index}].title`)) ||
      !watch(getFieldName(`releases[${index}].link`)) ||
      !watch(getFieldName(`releases[${index}].instructions`))
    );
  };

  return (
    <Grid container mb={6}>
      <Grid item lg={2.5} xs={12}>
        <LeftHeaderComp
          headerText={t('Releases')}
          subheader={t('Releases are the final outputs of a collaboration')}
        />
      </Grid>
      <Grid item lg={6} xs={12}>
        {fields?.length > 0 &&
          fields.map((item, index) => {
            return item.isSaved ? (
              <>
                <Box
                  display="flex"
                  alignItems="center"
                  position="relative"
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(-1)}
                >
                  <LinkText ml={1} my={2}>
                    <Box>{item.title}</Box>
                  </LinkText>

                  {hovered === index && (
                    <Box
                      marginLeft="1rem"
                      display={'flex'}
                      gap="1rem"
                      alignItems={'center'}
                    >
                      <Box
                        onClick={() => {
                          update(index, {
                            ...watch(getFieldName(`releases[${index}]`)),
                            isSaved: false,
                          });
                          setShowAdd(false);
                        }}
                        mr={0.5}
                        sx={{ cursor: 'pointer' }}
                      >
                        <EditIcon
                          width={18}
                          height={18}
                          color={
                            hovered === 'edit'
                              ? theme.palette.text.primary
                              : theme.palette.grey.greyC2
                          }
                        />
                      </Box>
                      <Box
                        onClick={() => remove(index)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <CloseIcon
                          width={26}
                          height={26}
                          color={
                            hovered === 'close'
                              ? theme.palette.text.primary
                              : '#C2C2C2'
                          }
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              </>
            ) : (
              <Box key={item.id} my={4}>
                <Controller
                  name={getFieldName(`releases[${index}].title`)}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <StyledInput
                        value={value}
                        onChange={async (e) => {
                          onChange(e);
                          if (isManualTrigger && trigger) {
                            await trigger(getFieldName(`releases[${index}].title`));
                          }
                        }}
                        fullWidth
                        placeholder={'Title'}
                      />

                      <Spacer value={20} />

                      {errorData?.releases?.[index]?.title && (
                          <InformationDescription type="error" my={1}>
                            {errorData.releases[index].title.message}
                          </InformationDescription>
                        )}
                    </>
                  )}
                />

                <Spacer value={40} />

                <>
                  <Controller
                    key={item.id}
                    name={getFieldName(`releases[${index}].link`)}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <>
                        <StyledInput
                          value={value}
                          onChange={async (e) => {
                            onChange(e);
                            if (isManualTrigger && trigger) {
                              await trigger(getFieldName(`releases[${index}].link`));
                            }
                          }}
                          fullWidth
                          placeholder={'Link'}
                          textArea
                        />

                        <Spacer value={20} />

                        {errorData?.releases?.[index]?.link && (
                          <InformationDescription type="error" my={1}>
                            {errorData.releases[index].link.message}
                          </InformationDescription>
                          )}
                      </>
                    )}
                  />
                </>

                <Spacer value={40} />
                <Controller
                  key={item.id}
                  name={getFieldName(`releases[${index}].instructions`)}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <StyledTextArea
                        value={value}
                        onChange={async (e) => {
                          onChange(e);
                          if (isManualTrigger && trigger) {
                            await trigger(getFieldName(`releases[${index}].instructions`));
                          }
                        }}
                        multiline
                        fullWidth
                        placeholder={'Instructions'}
                        rows={4}
                        maxLength={500}
                      />

                      <Spacer value={20} />
                        {errorData?.releases?.[index]?.instructions && (
                        <InformationDescription type="error" my={1}>
                          {errorData.releases[index].instructions.message}
                        </InformationDescription>
                      )}
                    </>
                  )}
                />
                <PrimaryButton
                  marginTop={'1rem'}
                  onClick={() => handleSave(index)}
                  disabled={addReleaseCheck(index)}
                >
                  Done
                </PrimaryButton>
              </Box>
            );
          })}
        <Spacer value={40} />
        {showAdd && (
          <ActionText onClick={handleAddInput} underlineHeight={1.5}>
            <PlusIcon
              color={theme.palette.text.primary}
              width={16}
              height={16}
            />
            <Box ml={1}>{t('Add Release')}</Box>
          </ActionText>
        )}
      </Grid>
    </Grid>
  );
};

export default CollabReleases;
