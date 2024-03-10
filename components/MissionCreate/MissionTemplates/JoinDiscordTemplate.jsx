import { useTranslation } from 'react-i18next';
import { InformationDescription, SubHeading } from '../elements';
import { StyledInput } from 'components/Input';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';

export const JoinDiscordTemplate = ({ control, errors }) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid container mt={5} mb={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Server Invite URL')}</SubHeading>
          <InformationDescription mt={2}>
            {t('Enter the discord server invite URL')}
          </InformationDescription>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Controller
            name="metadata.discordServerLink"
            control={control}
            render={({ field }) => (
              <StyledInput {...field} fullWidth placeholder={t('Server URL')} />
            )}
          />
          {errors?.metadata?.discordServerLink && (
            <InformationDescription type="error" my={1}>
              {errors.metadata.discordServerLink.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
      <Grid container mt={5} mb={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Server Name')}</SubHeading>
          <InformationDescription mt={2}>
            {t('Enter the discord server name')}
          </InformationDescription>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Controller
            name="metadata.discordServerName"
            control={control}
            render={({ field }) => (
              <StyledInput
                {...field}
                fullWidth
                placeholder={t('Server Name')}
              />
            )}
          />
          {errors?.metadata?.discordServerName && (
            <InformationDescription type="error" my={1}>
              {errors.metadata.discordServerName.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
    </>
  );
};
