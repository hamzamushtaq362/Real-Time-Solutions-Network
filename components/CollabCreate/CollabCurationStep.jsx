import { useTranslation } from 'react-i18next';
import { CreateCollabMainHeader, InformationDescription, MainContainer, SubHeading } from './elements';
import { Box, Grid, Slider } from '@mui/material';
import { RadioGroup, Tooltip } from '~/components';
import { getTotalPercetageFromCollabRoles } from '~/utils';
import React, { useEffect, useState } from 'react';

export const CollabCurationStep = ({ setValue, watch }) => {
  const { t } = useTranslation();

  const roles = watch('roles');
  const enableCuration = watch('enableCuration');
  const totalPercentageForCurators = watch('totalPercentageForCurators');

  const [maxRemainingPercentage, setMaxRemainingPercentage] = useState(0);

  const curationOptions = [
    {
      value: true,
      label: 'Enable Curation',
    },
    {
      value: false,
      label: 'Disable Curation',
    },
  ];

  const setInitialTotalPercentageForCurators = () => {
    const totalRolesPercentage = getTotalPercetageFromCollabRoles(roles);

    let updatedPercentageForCurators = totalPercentageForCurators;
    if (totalRolesPercentage > 95) {
      updatedPercentageForCurators = 100 - totalRolesPercentage;
    }

    setValue('totalPercentageForCurators', updatedPercentageForCurators);
    setMaxRemainingPercentage(100 - totalRolesPercentage);
  };

  const isCollabCuratableToggle = (updatedValue) => {
    if (updatedValue) {
      setValue('totalPercentageForCurators', 0);
    } else {
      if (totalPercentageForCurators) {
        setInitialTotalPercentageForCurators();
      }
    }

    setValue('enableCuration', updatedValue);
  };

  const getSliderDislabledTooltip = () => {
    if (!enableCuration) {
      return 'Please enable curation for this collab to change curator value';
    } else if (maxRemainingPercentage === 0) {
      return "Can't set curators fee as remaining is 0%, please update the roles percentage to accomodate curators % earnings";
    }
  };

  const handlePercentageForCuratorsChange = (value) => {
    setValue('totalPercentageForCurators', value);
  };

  useEffect(() => {
    setInitialTotalPercentageForCurators();
  }, []);

  return (
    (<MainContainer>
      <CreateCollabMainHeader>{t("Curation")}</CreateCollabMainHeader>
      <Grid container my={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t("Allow Curation")}</SubHeading>
          <InformationDescription mt={2} width="65%">{t(
            "Allow Curators to showcase your Collab to their audience for a\n            Curator Fee"
          )}</InformationDescription>
        </Grid>
        <Grid item lg={6} xs={12}>
          <RadioGroup
            radioChipWidth="200px"
            options={curationOptions}
            currentValue={enableCuration}
            updateCurrentValue={(updatedValue) =>
              isCollabCuratableToggle(updatedValue)
            }
          />
        </Grid>
      </Grid>
      {/*<Grid container my={6}>*/}
      {/*  <Grid item lg={2.5} xs={12}>*/}
      {/*    <SubHeading>Earning Breakdown</SubHeading>*/}
      {/*  </Grid>*/}
      {/*  <Grid item lg={6} xs={12} mt={1}>*/}
      {/*    <Stack direction="column" spacing={1}>*/}
      {/*      {roles?.length > 0 ? (*/}
      {/*        <>*/}
      {/*          {roles.map((role) => {*/}
      {/*            return (*/}
      {/*              <>*/}
      {/*                <LabelValue*/}
      {/*                  label={role.skill}*/}
      {/*                  value={getAmountAndType(role)}*/}
      {/*                />*/}
      {/*                <Spacer value={16} />*/}
      {/*              </>*/}
      {/*            );*/}
      {/*          })}*/}
      {/*        </>*/}
      {/*      ) : (*/}
      {/*        <InformationDescription mb={2} mt={0.5}>*/}
      {/*          No roles added yet*/}
      {/*        </InformationDescription>*/}
      {/*      )}*/}
      {/*    </Stack>*/}
      {/*    <Divider />*/}
      {/*    <Stack direction="column" spacing={1} mt={2}>*/}
      {/*      <>*/}
      {/*        <LabelValue*/}
      {/*          label={'Total % for Roles'}*/}
      {/*          value={`${totalRolesPercentage}%`}*/}
      {/*        />*/}
      {/*        <Spacer value={16} />*/}
      {/*      </>*/}
      {/*      <>*/}
      {/*        <LabelValue*/}
      {/*          label={'% for Curators'}*/}
      {/*          value={`${totalPercentageForCurators}%`}*/}
      {/*        />*/}
      {/*        <Spacer value={16} />*/}
      {/*      </>*/}
      {/*      <>*/}
      {/*        <LabelValue*/}
      {/*          label={'Remaining % '}*/}
      {/*          value={`${remainingPercentage}%`}*/}
      {/*        />*/}
      {/*        <Spacer value={16} />*/}
      {/*      </>*/}
      {/*    </Stack>*/}
      {/*    <Divider />*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
      {enableCuration && (
        <Grid container my={6}>
          <Grid item lg={2.5} xs={12}>
            <SubHeading>{t("Curator Share")}</SubHeading>
            <InformationDescription mt={2} width="65%">{t(
              "Adjust how much of the future Revenue you want to offer as\n              Curators Fee to the Curators who you accept to promote the Collab."
            )}</InformationDescription>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Tooltip
              disabled={!(maxRemainingPercentage === 0 || !enableCuration)}
              title={getSliderDislabledTooltip()}
            >
              <Box sx={{ width: '400px' }}>
                <Slider
                  defaultValue={5}
                  value={totalPercentageForCurators}
                  max={maxRemainingPercentage}
                  disabled={maxRemainingPercentage === 0 || !enableCuration}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                  color="primary"
                  onChange={(_, value) =>
                    handlePercentageForCuratorsChange(value)
                  }
                />
              </Box>
            </Tooltip>
          </Grid>
        </Grid>
      )}
    </MainContainer>)
  );
};
