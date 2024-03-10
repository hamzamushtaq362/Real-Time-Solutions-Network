import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  Spacer,
  Divider,
  Avatar,
  NormalInput,
  Tooltip,
  PrimaryButton,
  FormikInputInfoText,
  Spinner,
} from '~/components';
import { sendCurationRequest } from '~/apis';
import {
  CurateCollabContainer,
  CollabSubText,
  AvatarHeaderText,
} from './elements';
import { DialogHeaderText, DialogSubHeaderText, Dialog } from '../elements';
import { Box } from '@mui/material';
import { AvatarSampleImage2 } from '~/assets';
import { useNotistack } from '~/hooks';
import { useTheme } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { UilPercentage } from '@iconscout/react-unicons';

export const CurateCollabDialog = ({
  open,
  handleClose,
  collab,
  onSuccess,
}) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const generateSnackbar = useNotistack();
  const theme = useTheme();
  const curateCollabSchema = Yup.object().shape({
    noteToAdmin: Yup.string()
      .min(8, 'Too short!')
      .max(600, 'Too Long!')
      .required('Note to admin is required'),
    desiredEarningPercentage: Yup.number()
      .min(0, 'Must be greater then 0')
      .max(100, 'Must be less then or equal to 100')
      .required('Negotiation Fees is required'),
  });

  const submitCurationRequest = async (values) => {
    try {
      setLoading(true);

      const response = await sendCurationRequest(
        collab?._id,
        values.desiredEarningPercentage,
        values.noteToAdmin,
      );

      if (response.status === 'success') {
        generateSnackbar(response.message, 'success');
        onSuccess('PENDING');
      }
      handleClose();
      setLoading(false);
    } catch (error) {
      const message = error?.response?.data?.message || 'Something went wrong!';

      generateSnackbar(message, 'error');
      setLoading(false);
    }
  };

  return (
    (<Dialog open={open} onClose={handleClose} width="740px">
      <Formik
        initialValues={{
          desiredEarningPercentage: 2,
          noteToAdmin: '',
        }}
        validationSchema={curateCollabSchema}
        onSubmit={(values) => submitCurationRequest(values)}
      >
        {({ errors, touched, handleBlur, setFieldValue, values }) => {


          return (
            (<Form>
              <CurateCollabContainer>
                <DialogHeaderText>{`BECOME A CURATOR IN ${collab?.title.toUpperCase()}`}</DialogHeaderText>
                <Spacer value={16} />
                <DialogSubHeaderText>{collab?.description}</DialogSubHeaderText>
                <Spacer value={32} />

                <CollabSubText>{t("Created By:")}</CollabSubText>
                <Spacer value={5} />
                <Box sx={{ width: '100%', display: 'flex' }}>
                  <Avatar
                    size="44px"
                    avatar={
                      collab && collab.creatorId && collab.creatorId.imageUrl
                        ? collab.creatorId.imageUrl
                        : AvatarSampleImage2
                    }
                  />
                  <Box sx={{ marginLeft: '12px' }}>
                    <AvatarHeaderText>
                      {collab && collab.creatorId
                        ? collab.creatorId.fullName
                        : 'Thomas L. Fletcher'}
                    </AvatarHeaderText>
                    <Spacer value={4} />
                    <CollabSubText>
                      {" "}
                      {collab && collab.creatorId && collab.creatorId.username
                        ? `@${collab.creatorId.username}`
                        : '@'}
                    </CollabSubText>
                  </Box>
                </Box>

                <Spacer value={32} />
                <Divider />
                <Spacer value={32} />
                <CollabSubText>{t("Curation Details:")}</CollabSubText>

                <Spacer value={32} />
                <Divider />

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
                    name={'curatorFees'}
                    value={values.desiredEarningPercentage}
                    handleChange={(event) =>
                      setFieldValue(
                        'desiredEarningPercentage',
                        event.target.value,
                      )
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
                      errors.desiredEarningPercentage &&
                      touched.desiredEarningPercentage
                        ? 'error'
                        : ''
                    }
                  >
                    {" "}
                    {errors.desiredEarningPercentage &&
                    (values.desiredEarningPercentage ||
                      touched.desiredEarningPercentage)
                      ? errors.desiredEarningPercentage
                      : values.desiredEarningPercentage ||
                        touched.desiredEarningPercentage
                      ? ''
                      : ''}{" "}
                  </FormikInputInfoText>
                </>
                <>
                  <Spacer value={32} />
                  <AvatarHeaderText>{t("Note to Collab Admin")}</AvatarHeaderText>
                  <Spacer value={10} />
                  <NormalInput
                    variant="outlined"
                    borderRadius="8px"
                    padding="15px"
                    multiline
                    rows={4}
                    placeholder={t("Add note to admin")}
                    name={'noteToAdmin'}
                    value={values.noteToAdmin}
                    handleChange={(event) =>
                      setFieldValue('noteToAdmin', event.target.value)
                    }
                    handleBlur={handleBlur}
                  />
                  <FormikInputInfoText
                    variant={
                      errors.noteToAdmin && touched.noteToAdmin ? 'error' : ''
                    }
                  >
                    {" "}
                    {errors.noteToAdmin &&
                    (values.noteToAdmin || touched.noteToAdmin)
                      ? errors.noteToAdmin
                      : values.noteToAdmin || touched.noteToAdmin
                      ? ''
                      : ''}{" "}
                  </FormikInputInfoText>
                </>

                <Spacer value={32} />
                <Tooltip
                  disabled={!loading}
                  title={t("Please select role to apply")}
                >
                  <Box sx={{ width: '100%' }}>
                    <PrimaryButton disabled={loading} type="submit">
                      {loading ? (
                        <Spinner
                          color={theme.palette.background.default}
                          size={15}
                        />
                      ) : (
                        'Send Request'
                      )}
                    </PrimaryButton>
                  </Box>
                </Tooltip>
                <Spacer value={8} />
              </CurateCollabContainer>
            </Form>)
          );
        }}
      </Formik>
    </Dialog>)
  );
};
