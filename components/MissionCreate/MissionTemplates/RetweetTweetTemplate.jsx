import { useTranslation } from 'react-i18next';
import { InformationDescription, SubHeading } from '../elements';
import { StyledInput } from 'components/Input';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';

export const RetweetTweetTemplate = ({ control, errors }) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid container mt={5} mb={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Tweet Link')}</SubHeading>
          <InformationDescription mt={2}>
            {t('Please enter the tweet link to be retweeted')}
          </InformationDescription>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Controller
            name="metadata.retweetTweetLink"
            control={control}
            render={({ field }) => (
              <StyledInput
                {...field}
                fullWidth
                placeholder={t('Please enter the tweet link')}
              />
            )}
          />
          {errors?.metadata?.retweetTweetLink && (
            <InformationDescription type="error" my={1}>
              {errors.metadata.retweetTweetLink.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
    </>
  );
};
