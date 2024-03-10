import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import Button from '../common/Button/Button';
import { getUserDetails, onboardInterestedNFTs, onBoardSkipStep } from '~/apis';
import ThreeDots from '../common/ThreeDots/ThreeDots';
import SearchableTags from 'components/SearchableTags';
import { nfts } from '~/constants';
import { Box, useTheme } from '@mui/material';
import {
  OnBoardRightSelectNFTContainer,
  OnBoardRightSelectNFTSelectAll,
  OnBoardRightSelectNFTTagsContainer,
  OnBoardRightSelectNFTTitle,
  SelectNftButtonContainer,
} from './elements';
import { OnBoardRightMarketplaceSkipButton } from '../PromoteMarketplace/element';
import { Spacer } from '~/components';

export const SelectNFT = ({ onFinish }) => {
  const { t } = useTranslation();

  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);

  const theme = useTheme();

  const handleContinueClick = async () => {
    setLoading(true);
    const selectedNFTs = tags.map((tag) => nfts[tag]);
    await onboardInterestedNFTs(selectedNFTs);
    await getUserDetails();
    setLoading(false);
    onFinish();
  };

  const handleTagAdd = (newTag) => {
    setTags([...tags, newTag]);
  };

  const handleDelete = (index) => {
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
  };

  const handleSkipStep = async () => {
    setSkipLoading(true);
    await onBoardSkipStep();
    await getUserDetails();
    setSkipLoading(false);
    onFinish();
  };

  return (
    (<OnBoardRightSelectNFTContainer>
      <OnBoardRightSelectNFTTitle>{t("Select NFTs")}</OnBoardRightSelectNFTTitle>
      <OnBoardRightSelectNFTSelectAll>{t(
        "We will use this to show relevant NFT collaboration opportunities to\n        you."
      )}</OnBoardRightSelectNFTSelectAll>
      <Spacer value={150} />
      <OnBoardRightSelectNFTTagsContainer>
        <SearchableTags
          onAdd={handleTagAdd}
          defaultTags={Object.keys(nfts)}
          title="NFTs"
          onDelete={handleDelete}
        />
      </OnBoardRightSelectNFTTagsContainer>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: '30px',
        }}
      >
        <SelectNftButtonContainer>
          <OnBoardRightMarketplaceSkipButton
            onClick={() => {
              if (tags.length > 0) {
                handleContinueClick();
              }
            }}
          >
            {loading ? (
              <ThreeDots color={theme.palette.background.inverse} />
            ) : (
              'Continue'
            )}
          </OnBoardRightMarketplaceSkipButton>

          <Button onClick={handleSkipStep}>
            {!skipLoading ? (
              'Skip'
            ) : (
              <ThreeDots color={theme.palette.background.default} />
            )}
          </Button>
        </SelectNftButtonContainer>
      </Box>
    </OnBoardRightSelectNFTContainer>)
  );
};
