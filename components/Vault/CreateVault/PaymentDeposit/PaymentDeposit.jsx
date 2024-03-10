import { useTranslation } from 'react-i18next';
import React from 'react';
import {
  AddProjectMainHeader,
  InformationDescription,
  MainInformationWrap,
  SubHeading,
} from 'components/CollabCreate/AddProject/elements';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Dropdown } from 'components/Dropdown/Dropdown';

const PaymentDeposit = ({ control, collabTitle }) => {
  const { t } = useTranslation();

  return (
    <MainInformationWrap>
      <AddProjectMainHeader mb={5}>{collabTitle}</AddProjectMainHeader>
      <Grid container my={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading mb={2}>{t('Select Wallet')}</SubHeading>
        </Grid>
        <Grid item lg={6}>
          <InformationDescription mb={2}>
            {t('Select Wallet')}
          </InformationDescription>
          <Controller
            name="wallet"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Dropdown
                options={[
                  '0x325232353245342322456323',
                  '0x325232353245342322456323',
                  '0x325232353245342322456323',
                ]}
                selectedItem={value ?? 'Select your wallet'}
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

export default PaymentDeposit;
