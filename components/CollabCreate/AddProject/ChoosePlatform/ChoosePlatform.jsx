import { getPlatformMappings } from '~/constants';
import { PlatformImage, PlatformText, PlatformWrap } from './elements';
import { Grid } from '@mui/material';
import { InformationDescription } from 'components/CollabCreate/elements';
import React from 'react';
import {useFormContext} from "react-hook-form";

const ChoosePlatform = ({name, isManualTrigger, errorMessage}) => {
  const {watch, setValue, formState: {errors}, trigger } = useFormContext();
  const selectedPlatforms  = watch(name);

  const platforms = ['Decentraland', 'Sandbox', 'CryptoVoxels', 'Somnium', 'Mona', 'Horizon Worlds', 'Spatial', 'Ready Player Me', 'Snap AR Lens', 'Fortnite', 'Roblox', 'Platform-Independent', 'Zappar', '8th Wall'
  // 'Opensea',// 'Rarible',// 'Magiceden',// 'Foundation',// 'Superrare',
  ]

  const addToPlatform = (platform) => {
    const selectedPlatformsCopy = [...selectedPlatforms, platform];
    setValue(name, selectedPlatformsCopy)

  };
  const removeFromPlatform = (value) => {
    const updatedSelectedPlatforms = selectedPlatforms.filter(
      (platform) => platform !== value,
    );
    setValue(name, updatedSelectedPlatforms)
  };
  const selectItemClickHandler = async (platform, active) => {
    if (active) {
      removeFromPlatform(platform);
    } else {
      addToPlatform(platform);
    }
    if (isManualTrigger) {
      await trigger(name)
    }
  };

  return (
    <Grid container spacing={2}>
      {platforms.map((platform, index) => {
        const active = selectedPlatforms?.includes(platform);
        return (
          <Grid item key={platform}>
            <PlatformWrap
              key={index}
              onClick={() => selectItemClickHandler(platform, active)}
              active={active}
            >
              <PlatformImage src={getPlatformMappings(platform).image.src} alt='platform' />
              <PlatformText active={active}>{platform}</PlatformText>
            </PlatformWrap>
          </Grid>
        )
      })}
      {errors && (
        <InformationDescription type="error" my={2} ml={3}>
          {errorMessage ?? errors?.selectedPlatforms?.message}
        </InformationDescription>
      )}
    </Grid>
  );
}

export default ChoosePlatform;
