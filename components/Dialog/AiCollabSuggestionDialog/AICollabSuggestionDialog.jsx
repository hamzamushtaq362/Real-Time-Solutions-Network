import { useTranslation } from 'react-i18next';
import { PrimaryButton, StyledTextArea, SmallSpinner } from '~/components';
import { Grid } from '@mui/material';
import { Dialog } from '../elements';
import {
  ConfirmDialogContainer,
  SubHeading,
  InformationDescription,
} from './elements';
import { Controller } from 'react-hook-form';
import { FlexBox } from 'components/common/elements';

export const AICollabSuggestionDialog = ({
  open,
  handleClose,
  watch,
  control,
  errors,
  handleSubmit,
  page,
  setPage,
  loadingSuggestions,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={handleClose}>
      <ConfirmDialogContainer>
        {page == 0 && (
          <>
            <SubHeading>{t('Your Input Regarding Collab')}</SubHeading>
            <InformationDescription>
              {t(
                'Please Enter your inputs for collabs to better understanding what\n              you want',
              )}
            </InformationDescription>

            <Grid container spacing={2}>
              <Grid item lg={12} xs={12}>
                <Grid container columnGap={1}>
                  <InformationDescription my={1}>
                    {t('Your Input')}
                  </InformationDescription>
                  <InformationDescription type="error" my={1}>
                    {t('Necessarily')}
                  </InformationDescription>
                </Grid>
                <Controller
                  name="aiCollabBrief"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <StyledTextArea
                      value={value}
                      onChange={async (e) => {
                        onChange(e);
                      }}
                      fullWidth
                      placeholder={t('Brief about your collab')}
                      rows={4}
                    />
                  )}
                />
                {errors && errors.description && (
                  <InformationDescription type="error" my={1}>
                    {errors?.aiCollabBrief?.message}
                  </InformationDescription>
                )}
              </Grid>
              <Grid item lg={6} xs={12}>
                <PrimaryButton onClick={handleClose} inverse>
                  {t('Cancel')}
                </PrimaryButton>
              </Grid>
              <Grid item lg={6} xs={12}>
                <PrimaryButton
                  disabled={loadingSuggestions || !watch('aiCollabBrief')}
                  onClick={() => {
                    setPage(1);
                    handleSubmit();
                  }}
                  inverse
                >
                  {t('Submit')}
                </PrimaryButton>
              </Grid>
            </Grid>
          </>
        )}
        {page == 1 && (
          <Grid
            container
            spacing={3}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Grid item alignItems="center">
              <SubHeading>{t('We are generating collabs')}</SubHeading>
            </Grid>
            <Grid item xs={12}>
              <InformationDescription textAlign={'center'}>
                {t(
                  'Please wait for a while. It will take some time for us to fill\n                all information about collabs for better output.',
                )}
              </InformationDescription>
            </Grid>

            <FlexBox justifyContent={'center'} width={'100%'} mt={2}>
              <SmallSpinner inverse={loadingSuggestions} />
            </FlexBox>

            <Grid item xs={6}>
              <PrimaryButton onClick={handleClose} inverse>
                {t('Cancel')}
              </PrimaryButton>
            </Grid>
            <Grid item xs={6}>
              <PrimaryButton
                onClick={() => {
                  setPage(0);
                }}
                inverse
              >
                {t('Edit Input')}
              </PrimaryButton>
            </Grid>
          </Grid>
        )}
      </ConfirmDialogContainer>
    </Dialog>
  );
};
