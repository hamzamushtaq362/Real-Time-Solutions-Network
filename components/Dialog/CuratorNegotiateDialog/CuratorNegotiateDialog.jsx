import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  Spacer,
  NormalInput,
  PrimaryButton,
  FormikInputInfoText,
  Spinner,
  UserDescriptionCell,
} from '~/components';
import { negotiateCollabCuration } from '~/apis';
import {
  CuratorNegotiateDialogContainer,
  AvatarHeaderText,
  CurationFeesContainer,
  CurationFeeSubContainer,
  CurationFeeLabel,
  CurationFeeValue,
} from './elements';
import { DialogHeaderText, Dialog } from '../elements';
import { Box } from '@mui/material';

import { useNotistack } from '~/hooks';
import { useTheme } from '@mui/material';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { UilPercentage } from '@iconscout/react-unicons';

export const CuratorNegotiateDialog = ({
  open,
  handleClose,
  curationId,
  curatorDetails,
  curationFee,
  status,
  subsequentNegotiationEarning,
  totalPercentForCurators,
  usedPercentForCurators,
  updateRecordStatusFromFilterCurations,
  updatedNegotiationFeesFromCuration,
}) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const generateSnackbar = useNotistack();
  const theme = useTheme();
  const curateCollabSchema = Yup.object().shape({
    negotiationFees: Yup.number()
      .min(0, 'Must be greater then 0')
      .max(100, 'Must be less then or equal to 100')
      .required('Negotiation Fees is required'),
    noteForCurator: Yup.string()
      .min(10, 'Too short!')
      .max(600, 'Too Long!')
      .required('Note for curator is required'),
  });

  const negotiateCuration = async (values) => {
    try {
      setLoading(true);
      const response = await negotiateCollabCuration(
        curationId,
        values.negotiationFees,
        values.noteForCurator,
      );

      if (response.status === 'success') {
        updateRecordStatusFromFilterCurations(curationId, 'NEGOTIATED');
        updatedNegotiationFeesFromCuration(curationId, values.negotiationFees);
      }

      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(true);
      generateSnackbar('Something went wrong!', 'error');
    }
  };

  return (
    (<Dialog open={open} onClose={handleClose} width="650px">
      <Formik
        initialValues={{
          negotiationFees: 2,
          noteForCurator: '',
        }}
        validationSchema={curateCollabSchema}
        onSubmit={(values) => negotiateCuration(values)}
      >
        {({ errors, touched, handleBlur, setFieldValue, values }) => {


          return (
            (<Form>
              <CuratorNegotiateDialogContainer>
                <DialogHeaderText>{t("NEGOTIATE")}</DialogHeaderText>
                <Spacer value={16} />

                <Spacer value={40} />
                <UserDescriptionCell userDetails={curatorDetails} />

                <Spacer value={40} />

                <CurationFeesContainer>
                  <CurationFeeSubContainer>
                    <CurationFeeLabel>{t("Ask for Curation Fees")}</CurationFeeLabel>

                    <CurationFeeValue>{curationFee}%</CurationFeeValue>
                  </CurationFeeSubContainer>
                  <CurationFeeSubContainer showBorderLeft>
                    <CurationFeeLabel>{t("Available Percentage for Curators")}</CurationFeeLabel>
                    <CurationFeeValue>
                      {totalPercentForCurators - usedPercentForCurators}%
                    </CurationFeeValue>
                  </CurationFeeSubContainer>

                  {status === 'NEGOTIATED' && (
                    <CurationFeeSubContainer showBorderLeft>
                      <CurationFeeLabel>{t("Previous Negotiated Fees")}</CurationFeeLabel>

                      <CurationFeeValue>
                        {subsequentNegotiationEarning}%
                      </CurationFeeValue>
                    </CurationFeeSubContainer>
                  )}
                </CurationFeesContainer>

                <>
                  <Spacer value={32} />
                  <AvatarHeaderText>{t("Negotiation Fees %")}</AvatarHeaderText>
                  <Spacer value={10} />
                  <NormalInput
                    type="number"
                    variant="outlined"
                    borderRadius="8px"
                    padding="15px"
                    placeholder={t("Negotiation Fees")}
                    name={'negotiationFees'}
                    value={values.negotiationFees}
                    handleChange={(event) =>
                      setFieldValue('negotiationFees', event.target.value)
                    }
                    endAdornment={
                      <>
                        <UilPercentage color={theme.palette.text.primary} />
                      </>
                    }
                    handleBlur={handleBlur}
                  />
                  <FormikInputInfoText
                    variant={
                      errors.negotiationFees && touched.negotiationFees
                        ? 'error'
                        : ''
                    }
                  >
                    {" "}
                    {errors.negotiationFees &&
                    (values.negotiationFees || touched.negotiationFees)
                      ? errors.negotiationFees
                      : values.negotiationFees || touched.negotiationFees
                      ? ''
                      : ''}{" "}
                  </FormikInputInfoText>
                </>

                <>
                  <Spacer value={32} />
                  <AvatarHeaderText>{t("Note")}</AvatarHeaderText>
                  <Spacer value={10} />
                  <NormalInput
                    variant="outlined"
                    borderRadius="8px"
                    padding="15px"
                    multiline
                    rows={4}
                    placeholder={t("Enter note for curator")}
                    name={'noteForCurator'}
                    value={values.noteForCurator}
                    handleChange={(event) =>
                      setFieldValue('noteForCurator', event.target.value)
                    }
                    handleBlur={handleBlur}
                  />
                  <FormikInputInfoText
                    variant={
                      errors.noteForCurator && touched.noteForCurator
                        ? 'error'
                        : ''
                    }
                  >
                    {" "}
                    {errors.noteForCurator &&
                    (values.noteForCurator || touched.noteForCurator)
                      ? errors.noteForCurator
                      : values.noteForCurator || touched.noteForCurator
                      ? ''
                      : ''}{" "}
                  </FormikInputInfoText>
                </>

                <Spacer value={32} />

                <Box sx={{ width: '100%' }}>
                  <PrimaryButton disabled={loading} type="submit">
                    {loading ? (
                      <Spinner
                        color={theme.palette.background.default}
                        size={15}
                      />
                    ) : (
                      'Send'
                    )}
                  </PrimaryButton>
                </Box>
              </CuratorNegotiateDialogContainer>
            </Form>)
          );
        }}
      </Formik>
    </Dialog>)
  );
};
