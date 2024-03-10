import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
// import MarketplaceProfile from './MarketplaceProfile/MarketplaceProfile';
import { MarketplaceProfile } from './MarketplaceProfile';
import Button from '../common/Button/Button';
import { onboardMarketplace, getMarketPlaces, onBoardSkipStep } from '~/apis';
import ThreeDots from '../common/ThreeDots/ThreeDots';
import { UilPlus } from '@iconscout/react-unicons';
import {
  OnBoardRightMarketplaceButtonContainer,
  OnBoardRightMarketplaceContainer,
  OnBoardRightMarketplacePlus,
  OnBoardRightMarketplacePlusContainer,
  OnBoardRightMarketplaceSkipButton,
  OnBoardRightMarketplaceTitleContainer,
} from './element';
import { Spacer } from '~/components';
import { useNotistack } from '~/hooks';
import { useTheme } from '@mui/material';

export const PromoteMarketplace = ({ onFinish }) => {
  const { t } = useTranslation();

  const [marketplaceList, setMarketplaceList] = useState([
    { market: '', id: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [skipLoading, setSkipLoading] = useState(false);
  const theme = useTheme();

  const generateSnackbar = useNotistack();
  const fetchMarketPlaces = async () => {
    try {
      const response = await getMarketPlaces();
      if (response && response?.data?.status === 'success') {
        const marketplaces = response?.data?.data?.marketplaces;
        const formattedMarketPlaces = marketplaces.map((i) => {
          return {
            value: i.iconName,
            label: i.iconName,
            icon: i.iconUrl,
          };
        });

        setOptions(formattedMarketPlaces || []);
      }
    } catch (err) {
      generateSnackbar('Something went wrong while fetching marketplaces', 'error');
    }
  };

  useEffect(() => {
    fetchMarketPlaces();
  }, []);

  const handlePlusClick = () => {
    setMarketplaceList([
      ...marketplaceList,
      {
        market: '',
        id: '',
      },
    ]);
  };

  const handleDeleteClick = (index) => () => {
    setMarketplaceList([
      ...marketplaceList.slice(0, index),
      ...marketplaceList.slice(index + 1),
    ]);
  };

  const handleMarketChange = (index) => (e) => {
    setMarketplaceList([
      ...marketplaceList.slice(0, index),
      {
        ...marketplaceList[index],
        market: e,
      },
      ...marketplaceList.slice(index + 1),
    ]);
  };

  const handleIdChange = (index) => (id) => {
    setMarketplaceList([
      ...marketplaceList.slice(0, index),
      {
        ...marketplaceList[index],
        id,
      },
      ...marketplaceList.slice(index + 1),
    ]);
  };

  const handleSubmit = async () => {
    setLoading(true);

    await onboardMarketplace(marketplaceList);
    setLoading(false);
    onFinish();
  };

  const handleSkipStep = async () => {
    setSkipLoading(true);
    await onBoardSkipStep();
    setSkipLoading(false);
    onFinish();
  };

  return (
    (<OnBoardRightMarketplaceContainer>
      <OnBoardRightMarketplaceTitleContainer>{t("Promote your Marketplace NFTs")}</OnBoardRightMarketplaceTitleContainer>
      <Spacer value={64} />
      {marketplaceList.map((item, index) => (
        <MarketplaceProfile
          key={index}
          onMarketChange={handleMarketChange(index)}
          onIdChange={handleIdChange(index)}
          onDelete={handleDeleteClick(index)}
          marketplaceList={marketplaceList}
          selectedItem={item}
          options={options}
        />
      ))}
      <Spacer value={32} />
      <OnBoardRightMarketplacePlusContainer>
        {marketplaceList.length <= 5 ? (
          <OnBoardRightMarketplacePlus onClick={handlePlusClick}>
            <UilPlus size="20" color={theme.palette.background.default} />
          </OnBoardRightMarketplacePlus>
        ) : null}
      </OnBoardRightMarketplacePlusContainer>
      <OnBoardRightMarketplaceButtonContainer>
        <OnBoardRightMarketplaceSkipButton
          onClick={() => {
            if (marketplaceList.length > 1) {
              handleSubmit();
            } else if (
              marketplaceList.length === 1 &&
              marketplaceList[0]?.market
            ) {
              handleSubmit();
            }
          }}
        >
          {loading ? (
            <ThreeDots color={theme.palette.background.inverse} />
          ) : (
            'Add to Profile'
          )}
        </OnBoardRightMarketplaceSkipButton>

        <Button onClick={handleSkipStep}>
          {!skipLoading ? (
            'Skip'
          ) : (
            <ThreeDots color={theme.palette.background.default} />
          )}
        </Button>
      </OnBoardRightMarketplaceButtonContainer>
    </OnBoardRightMarketplaceContainer>)
  );
};
