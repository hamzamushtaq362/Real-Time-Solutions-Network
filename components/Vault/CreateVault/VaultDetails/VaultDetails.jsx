import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import {
  AddProjectMainHeader,
  MainInformationWrap,
  SubHeading,
} from 'components/CollabCreate/AddProject/elements';
import ControllerDatepicker from 'components/Vault/CreateVault/VaultDetails/ControllerDatepicker';
import { Grid } from '@mui/material';
import User from 'components/CollabDetails/CollabDetailsComponents/Author';
import AppContext from 'context/AppContext';
import {
  PlatformText,
  PlatformWrap,
} from 'components/CollabCreate/AddProject/ChoosePlatform/elements';
import { PolygonIcon } from '~/assets';
import {
  BlockchainImage,
  BlockchainImageWrap,
} from 'components/Vault/CreateVault/elements';

const VaultDetails = ({ control, collabTitle }) => {
  const { t } = useTranslation();

  const { user } = useContext(AppContext);
  const [selectedBlockchains, setSelectedBlockchains] = React.useState([]);
  const blockchains = [
    {
      name: 'Polygon',
      image: PolygonIcon,
    },
  ];
  const handleBlockchainClick = (name, active) => {
    if (active) {
      setSelectedBlockchains(
        selectedBlockchains.filter((blockchain) => blockchain !== name),
      );
    } else {
      setSelectedBlockchains([...selectedBlockchains, name]);
    }
  };

  return (
    <MainInformationWrap>
      <AddProjectMainHeader mb={5}>{collabTitle}</AddProjectMainHeader>
      <ControllerDatepicker
        control={control}
        name="startDate"
        heading={t('Start Date')}
        placeholder={t('Select date')}
      />
      <Grid container my={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading mb={2}>{t('Created by')}</SubHeading>
        </Grid>
        <Grid item lg={6}>
          <User users={[user]} />
        </Grid>
      </Grid>
      <ControllerDatepicker
        control={control}
        name="deployOn"
        heading={t('Deploy On')}
        placeholder={t('Select date')}
      />
      <Grid container my={6}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading mb={2}>{t('Name of Blockchain')}</SubHeading>
        </Grid>
        <Grid item lg={6}>
          <Grid container spacing={2}>
            {blockchains.map(({ name, image }, index) => {
              const active = selectedBlockchains.includes(name);
              return (
                <Grid item key={index}>
                  <PlatformWrap
                    key={index}
                    onClick={() => handleBlockchainClick(name, active)}
                    active={active}
                  >
                    <BlockchainImageWrap active={active}>
                      <BlockchainImage src={image.src} alt="platform" />
                    </BlockchainImageWrap>
                    <PlatformText active={active}>{name}</PlatformText>
                  </PlatformWrap>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </MainInformationWrap>
  );
};

export default VaultDetails;
