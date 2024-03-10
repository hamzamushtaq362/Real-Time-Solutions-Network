import React, { useEffect, useState } from 'react';
import { Avatar, Menu, MenuItem, StyledInput } from '~/components';
import { MarketPlaceItemContainer, MarketPlaceText } from './elements';
import { Grid, Box } from '@mui/material';

export const MarketPlaceProfileRow = ({
  onIdChange,
  onMarketChange,
  marketplaceList,
  options,
  selectedItem,
}) => {
  const [selected, setSelected] = useState(null);
  const [filterOptions, setfilterOptions] = useState([]);

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
      setSelected({ label: 'Name', value: 'select' });
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

  return (
    <>
      <Grid item lg={6} xs={12}>
        <Box width='100%'>
          {selected && (
            <Menu value={selected?.value} setValue={handleChange} height={60}>
              <MenuItem value={'select'}>
                <MarketPlaceItemContainer>
                  <MarketPlaceText>{'Name'}</MarketPlaceText>
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
        </Box>
      </Grid>
      <Grid item lg={6} xs={12}>
        <StyledInput
          // onBlurCapture={onBlurCapture}
          placeholder='ID'
          onChange={handleIdChange}
          defaultValue={selectedItem?.id}
          disabled={selected?.value === 'select'}
        />
      </Grid>
    </>
  );
};
