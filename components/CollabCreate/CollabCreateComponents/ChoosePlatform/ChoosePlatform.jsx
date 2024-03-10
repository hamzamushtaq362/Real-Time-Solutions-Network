import { useState } from 'react';

import { getPlatformMappings } from '~/constants';
import { PlatformImage, PlatformText, PlatformWrap } from './elements';
import { Grid } from '@mui/material';

export const ChoosePlatform = ({
  selectedPlatforms,
  setNewPlatform,
  removePlatform,
}) => {
  const [platforms] = useState([
    'Decentraland',
    'Sandbox',
    'CryptoVoxels',
    'Somnium',
    'Mona',
    'Horizon Worlds',
    'Spatial',
    'Ready Player Me',
    'Snap AR Lens',
    'Fortnite',
    'Roblox',
    'Platform-Independent',
    'Zappar',
    '8th Wall',
    // 'Opensea',
    // 'Rarible',
    // 'Magiceden',
    // 'Foundation',
    // 'Superrare',
  ]);

  const addToPlatform = (name) => {
    setNewPlatform(name);
  };

  const removeFromPlatform = (name) => {
    removePlatform(name);
  };

  const selectItemClickHandler = (name, active) => {
    if (active) {
      removeFromPlatform(name);
    } else {
      addToPlatform(name);
    }
  };

  return (
    <Grid container spacing={2}>
      {platforms.map((name, index) => {
        const active = selectedPlatforms.includes(name);
        return (
          <Grid item key={index}>
            <PlatformWrap
              key={index}
              onClick={() => selectItemClickHandler(name, active)}
              active={active}
            >
              <PlatformImage
                src={getPlatformMappings(name).image.src}
                alt="platform"
              />
              <PlatformText active={active}>{name}</PlatformText>
            </PlatformWrap>
          </Grid>
        );
      })}
    </Grid>
  );
};
