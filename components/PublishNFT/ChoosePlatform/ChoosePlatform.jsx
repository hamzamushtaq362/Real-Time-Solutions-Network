import { useState } from 'react';

import { getPlatformMappings } from '~/constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedPlatforms } from '~/redux';
import { PlatformImage, PlatformText, PlatformWrap } from './elements';
import { Grid } from '@mui/material';

function ChoosePlatform() {
  const dispatch = useDispatch();
  const { selectedPlatforms } = useSelector((state) => {
    return state.collab;
  });

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
    const selectedPlatformsCopy = [...selectedPlatforms, name];
    dispatch(updateSelectedPlatforms(selectedPlatformsCopy));
  };
  const removeFromPlatform = (name) => {
    const updatedSelectedPlatforms = selectedPlatforms.filter(
      (platform) => platform !== name,
    );
    dispatch(updateSelectedPlatforms(updatedSelectedPlatforms));
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
              <PlatformImage src={getPlatformMappings(name).image.src} alt='platform' />
              <PlatformText active={active}>{name}</PlatformText>
            </PlatformWrap>
          </Grid>
        )
      })}
    </Grid>
  );
}

export default ChoosePlatform;
