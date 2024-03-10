import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { IconButton, useTheme } from '@mui/material';
import { UilTimes } from '@iconscout/react-unicons';
import {
  OnBoardRightMarketplaceProfileDropdown,
  OnBoardRightMarketplaceProfileInputContainer,
  OnBoardRightMarketplaceProfileItem,
  OnBoardRightMarketplaceProfileSelectContainer,
  MarketPlaceItemContainer,
  MarketPlaceText,
} from './elements';
import { Avatar, NormalInput, Menu, MenuItem } from '~/components';

export const MarketplaceProfile = ({
  onDelete,
  onIdChange,
  onMarketChange,
  marketplaceList,
  options,
  selectedItem,
}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);
  const [filterOptions, setfilterOptions] = useState([]);

  const theme = useTheme();

  const handleChange = (selectedValue) => {
    const desiredOption = filterOptions.find(
      (option) => option?.value === selectedValue,
    );

    setSelected(desiredOption);
    onMarketChange(selectedValue);
  };

  const handleIdChange = (e) => {
    onIdChange(e.target.value);
  };

  useEffect(() => {
    setfilterOptions(options);
  }, [options]);

  useEffect(() => {
    let newSelect = options.find((i) => {
      return i.value === selectedItem.market;
    });

    if (newSelect) {
      setSelected(newSelect);
    } else {
      setSelected({ label: 'Select', value: 'select' });
    }
  }, [selectedItem, options]);

  useEffect(() => {
    let added = marketplaceList.map((i) => {
      return i.market;
    });
    let newOptions = options.filter((i) => {
      return !added.includes(i.value);
    });
    setfilterOptions(newOptions);
  }, [marketplaceList]);

  return (<>
    <OnBoardRightMarketplaceProfileDropdown>
      <OnBoardRightMarketplaceProfileItem>
        <OnBoardRightMarketplaceProfileSelectContainer>
          {selected && (
            <Menu value={selected?.value} setValue={handleChange}>
              <MenuItem value={'select'}>
                <MarketPlaceItemContainer>
                  <MarketPlaceText>{'Select'}</MarketPlaceText>
                </MarketPlaceItemContainer>
              </MenuItem>

              {options.map((option) => {


                return (
                  <MenuItem key={option?.value} value={option?.value}>
                    <MarketPlaceItemContainer>
                      <Avatar avatar={option?.icon} />
                      <MarketPlaceText>{option?.label}</MarketPlaceText>
                    </MarketPlaceItemContainer>
                  </MenuItem>
                );
              })}
            </Menu>
          )}
        </OnBoardRightMarketplaceProfileSelectContainer>
      </OnBoardRightMarketplaceProfileItem>
      <OnBoardRightMarketplaceProfileInputContainer>
        <NormalInput
          placeholder={t("Enter marketplace")}
          variant="outlined"
          padding="13.2px 12px"
          borderRadius="8px"
          handleChange={handleIdChange}
          defaultValue={selectedItem?.id}
          disabled={selected?.value === 'select'}
        />
      </OnBoardRightMarketplaceProfileInputContainer>

      <IconButton onClick={onDelete} size="large" sx={{ marginLeft: '10px' }}>
        <UilTimes size="20" color={theme.palette.grey.common} />
      </IconButton>
    </OnBoardRightMarketplaceProfileDropdown>
  </>);
};
