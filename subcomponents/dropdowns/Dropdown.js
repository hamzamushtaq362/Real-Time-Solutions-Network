import { Box } from '@mui/system';
import React from 'react';
import { Spacer, Menu, MenuItem } from '~/components';
import { RoleMenuRowContainer, RolesLabel } from './elements';
import { ListSubheader } from '@mui/material';
import { getSmallAddress } from '~/utils';
import { NoImageAvailableForContractAddress } from '~/assets';
import Image from 'next/image';

export const GroupDropdown = ({
  value,
  setValue,
  label,
  data,
  isImage = false,
  isContractImage = false,
  imageKey,
  valueKey,
  optionArrayKey,
  groupKey,
  spacer,
}) => {
  return (
    <div>
      <RolesLabel>{label}</RolesLabel>
      <Spacer value={spacer || 16} />
      <RoleMenuRowContainer>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Menu
            value={value || data[0].contractAddresses[0]}
            setValue={(value) => {
              setValue(value);
            }}
            overflowY="scroll"
            height="50%"
          >
            {data &&
              data?.map((mainItem, index) => [
                <ListSubheader
                  key={index}
                  style={{ fontSize: '15px', fontWeight: 'bold' }}
                >
                  {mainItem[groupKey]}
                </ListSubheader>,
                mainItem[optionArrayKey].map((item, index) => (
                  <MenuItem key={index} value={item[valueKey]}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0 1rem',
                      }}
                    >
                      {isImage && (
                        <Image
                          width={40}
                          height={40}
                          style={{ borderRadius: '20px' }}
                          alt={'img'}
                          src={
                            (isContractImage
                              ? item?.metadata?.cached_thumbnail_url
                              : item[imageKey]) ||
                            NoImageAvailableForContractAddress
                          }
                        />
                      )}
                      {` ${
                        item.name ? item.name.slice(0, 40) : ''
                      } (${getSmallAddress(item[valueKey])})`}
                    </div>
                  </MenuItem>
                )),
              ])}
          </Menu>
        </Box>
      </RoleMenuRowContainer>
    </div>
  );
};
