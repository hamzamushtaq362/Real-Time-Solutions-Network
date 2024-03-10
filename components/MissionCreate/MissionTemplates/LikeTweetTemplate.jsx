import { useTranslation } from 'react-i18next';
import { InformationDescription, SubHeading } from '../elements';
import { StyledInput } from 'components/Input';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';

export const LikeTweetTemplate = ({ control, errors }) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid container mt={5} mb={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Like tweet')}</SubHeading>
          <InformationDescription mt={2}>
            {t('Please enter the tweet link to be liked')}
          </InformationDescription>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Controller
            name="metadata.likeTweetLink"
            control={control}
            render={({ field }) => (
              <StyledInput
                {...field}
                fullWidth
                placeholder={t('Please enter the tweet link')}
              />
            )}
          />
          {errors?.metadata?.likeTweetLink && (
            <InformationDescription type="error" my={1}>
              {errors.metadata.likeTweetLink.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
    </>
  );
};
