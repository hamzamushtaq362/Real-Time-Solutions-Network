import { useTheme, Grid } from '@mui/material';
import { useContract } from '@thirdweb-dev/react';
import React, { useState } from 'react';
import { useNotistack } from 'hooks/useNotistack';
import { PrimaryButton } from 'components/Button';
import { ThreeDots } from 'components/ThreeDots';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

export const GrantRTSNBadgeContract = ({
  editionContractAddress,
  setisUserGrantPermission,
  isUserGrantPermission,
}) => {
  const theme = useTheme();
  const generateSnackbar = useNotistack();
  const [loading, setloading] = useState(false);
  const { contract, isLoading } = useContract(
    editionContractAddress,
    'edition',
  );
  // const { mutateAsync: grantRole } = useGrantRole(contract);

  const grantRoleFunc = async () => {
    try {
      setloading(true);
      generateSnackbar('Granting Initiated');

      const txResult = await contract.roles.grant(
        'admin',
        '0xAFA674D8CB333016e10dC5a0ab85263c9BeC915F',
      );

      if (txResult) {
        setisUserGrantPermission(true);
        setloading(false);
        generateSnackbar('Permission Granted ✅');
      }
    } catch (err) {
      setloading(false);
      console.error('failed to grant role', err);
      generateSnackbar("Couldn't Grant Permission error", err);

      if (err.message && err.message.length < 40) {
        generateSnackbar(err.message);
      } else {
        generateSnackbar('Transaction Failed.. try Again');
      }
    }
  };

  return (
    <Grid container mt={5} mb={6}>
      <Grid item lg={2.5} xs={12}>
        <LeftHeaderComp
          headerText={'Grant Permission'}
          subheader={'Granting Permission to RTSN For Setting up the contract.'}
        />
      </Grid>

      <Grid item lg={3} xs={12}>
        <PrimaryButton
          width="10rem"
          restrictHoverStyles
          disabled={
            editionContractAddress === null
              ? true
              : isUserGrantPermission
              ? true
              : !isLoading
              ? false
              : true
          }
          onClick={grantRoleFunc}
        >
          {isUserGrantPermission ? (
            'Permission Granted'
          ) : !loading ? (
            'Grant Role'
          ) : (
            <ThreeDots color={theme.palette.background.default} />
          )}
        </PrimaryButton>
      </Grid>
    </Grid>
  );
};
