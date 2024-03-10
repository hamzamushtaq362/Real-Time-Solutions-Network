import { useTranslation } from 'react-i18next';
import React from 'react';
import {
  AddProjectMainHeader,
  InformationDescription,
  MainInformationWrap,
  SubHeading,
} from 'components/CollabCreate/AddProject/elements';
import ControllerDatepicker from 'components/Vault/CreateVault/VaultDetails/ControllerDatepicker';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Dropdown } from 'components/Dropdown/Dropdown';

const ExpiryInfo = ({ control, collabTitle }) => {
  const { t } = useTranslation();

  return (
    <MainInformationWrap>
      <AddProjectMainHeader mb={5}>{collabTitle}</AddProjectMainHeader>
      <ControllerDatepicker
        control={control}
        name="expiryDate"
        heading={t('Expiring Date')}
        placeholder={t('Select date')}
      />
      <Grid container my={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading mb={2}>{t('Expire in Days')}</SubHeading>
        </Grid>
        <Grid item lg={6}>
          <InformationDescription mb={2}>
            {t('Select Days')}
          </InformationDescription>
          <Controller
            name="expireDays"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Dropdown
                options={[
                  '1 Day',
                  '2 Days',
                  '3 Days',
                  '4 Days',
                  '5 Days',
                  '6 Days',
                  '7 Days',
                  '8 Days',
                  '9 Days',
                  '10 Days',
                  '11 Days',
                  '12 Days',
                  '13 Days',
                  '14 Days',
                  '15 Days',
                  '16 Days',
                  '17 Days',
                  '18 Days',
                  '19 Days',
                  '20 Days',
                  '21 Days',
                  '22 Days',
                  '23 Days',
                  '24 Days',
                  '25 Days',
                  '26 Days',
                  '27 Days',
                  '28 Days',
                  '29 Days',
                  '30 Days',
                  '31 Days',
                  '32 Days',
                  '33 Days',
                  '34 Days',
                  '35 Days',
                  '36 Days',
                  '37 Days',
                  '38 Days',
                  '39 Days',
                  '40 Days',
                  '41 Days',
                  '42 Days',
                  '43 Days',
                  '44 Days',
                  '45 Days',
                  '46 Days',
                  '47 Days',
                  '48 Days',
                  '49 Days',
                  '50 Days',
                  '51 Days',
                  '52 Days',
                  '53 Days',
                  '54 Days',
                  '55 Days',
                  '56 Days',
                  '57 Days',
                  '58 Days',
                  '59 Days',
                  '60 Days',
                  '61 Days',
                  '62 Days',
                  '63 Days',
                  '64 Days',
                  '65 Days',
                  '66 Days',
                  '67 Days',
                  '68 Days',
                  '69 Days',
                  '70 Days',
                  '71 Days',
                  '72 Days',
                  '73 Days',
                  '74 Days',
                  '75 Days',
                  '76 Days',
                  '77 Days',
                  '78 Days',
                  '79 Days',
                  '80 Days',
                ]}
                selectedItem={value ?? 'Select days'}
                setSelectedItem={(text) => onChange(text)}
                width="100%"
              />
            )}
          />
        </Grid>
      </Grid>
    </MainInformationWrap>
  );
};

export default ExpiryInfo;
