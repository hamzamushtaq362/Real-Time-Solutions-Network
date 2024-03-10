import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  MetaworldsContainer,
  MetaworldsTitle,
  MetaworldsItemsContainer,
  MetaworldsSubTitle,
} from './elements';
import { Spacer, SelectItemButton } from '~/components';
import Button from '../common/Button/Button';
import { getPlatformMappings } from '~/constants';
import ThreeDots from '../common/ThreeDots/ThreeDots';
import { onboardMetaverseWorlds } from '~/apis';
import { Box, useTheme } from '@mui/material';

export const Metaworlds = ({ onFinish }) => {
  const { t } = useTranslation();

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
  const [loading, setLoading] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [errorText, setErrorText] = useState('');
  const [isContinueClicked, setIsContinueClicked] = useState(false);

  const theme = useTheme();

  const platformClickHandler = (newSelectedSuggestion) => {
    if (!selectedPlatforms.includes(newSelectedSuggestion)) {
      setSelectedPlatforms((prevState) => {
        return [newSelectedSuggestion, ...prevState];
      });
    } else {
      setSelectedPlatforms((prevState) => {
        return prevState.filter(
          (suggestion) => suggestion !== newSelectedSuggestion,
        );
      });
    }
  };

  const handleContinueClick = async () => {
    setLoading(true);
    setIsContinueClicked(true);
    if (selectedPlatforms.length > 0) {
      await onboardMetaverseWorlds(selectedPlatforms);
      onFinish();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedPlatforms.length > 0) {
      setErrorText('');
    } else if (selectedPlatforms.length === 0) {
      setErrorText('Please select atleast one metaverse world to continue');
    }
  }, [selectedPlatforms]);

  return (
    (<MetaworldsContainer>
      <MetaworldsTitle>{t("Select Metaverse Worlds")}</MetaworldsTitle>
      <Spacer value={24} />
      <MetaworldsSubTitle>{t("Select the Metaverse worlds that you want to create for")}</MetaworldsSubTitle>
      <Spacer value={32} />
      <MetaworldsItemsContainer>
        {platforms.map((name) => (
          <SelectItemButton
            key={name}
            name={name}
            image={getPlatformMappings(name).image.src}
            active={selectedPlatforms.includes(name)}
            selectItemClickHandler={() => platformClickHandler(name)}
          />
        ))}
      </MetaworldsItemsContainer>
      <Spacer value={24} />
      {errorText && isContinueClicked && (
        <>
          <p>{errorText}</p>
        </>
      )}
      <Spacer value={64} />
      <Box
        sx={{
          width: '100',
          display: 'flex',
          justifyContent: 'center',
          columnGap: '50px',
        }}
      >
        <Button onClick={handleContinueClick}>
          {loading ? (
            <ThreeDots color={theme.palette.background.default} />
          ) : (
            'Continue'
          )}
        </Button>
      </Box>
    </MetaworldsContainer>)
  );
};
