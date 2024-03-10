import { useTranslation } from 'react-i18next';
import React from 'react';
import { Box, Grid, IconButton, useTheme } from '@mui/material';
import {
  InformationDescription,
  SubHeading,
} from 'components/CollabCreate/AddProject/elements';
import { Controller, useFieldArray } from 'react-hook-form';
import { PrimaryButton, StyledInput } from '~/components';
import { FlexBox } from 'components/common/elements';
import CloseIcon from 'components/Icons/CloseIcon';

const Links = ({ control }) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  return (
    <Grid container mb={6}>
      <Grid item lg={2.5} xs={12}>
        <SubHeading>{t('Additional Links')}</SubHeading>
        <InformationDescription width={100}>
          {t('Show links where this collab is present.')}
        </InformationDescription>
      </Grid>
      <Grid item lg={6} xs={12}>
        {fields &&
          fields.map((field, index) => (
            <Box key={field.id} mb={3}>
              <InformationDescription mb={1}>
                {t('Link')}
              </InformationDescription>
              <FlexBox>
                <Box flex={1} mr={1}>
                  <Controller
                    name={`links[${index}].value`}
                    control={control}
                    render={({ field }) => (
                      <StyledInput
                        {...field}
                        fullWidth
                        placeholder="https://"
                      />
                    )}
                  />
                </Box>
                <IconButton onClick={() => remove(index)} size="large">
                  <CloseIcon
                    width={26}
                    height={26}
                    color={theme.palette.text.primary}
                  />
                </IconButton>
              </FlexBox>
            </Box>
          ))}
        <Grid item lg={6}>
          <PrimaryButton onClick={() => append({ value: '' })} height={60}>
            {t('Add link')}
          </PrimaryButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Links;
