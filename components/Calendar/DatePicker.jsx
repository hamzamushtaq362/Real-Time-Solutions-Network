import React, { useState } from 'react';
import { StyledInput } from '~/components';
import { Menu } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import { useTranslation } from 'react-i18next';

export const DatePicker = ({duration, setValue, trigger}) => {
  const { t } = useTranslation();
  const [pickerMenuAnchor, setPickerMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setPickerMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setPickerMenuAnchor(null);
  };
  const startDate = duration?.[0]?.startDate;
  const endDate = duration?.[0]?.endDate;
  const selectedDuration = startDate ? `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}` : '';

  return (
    <>
      <StyledInput
        fullWidth
        value={selectedDuration}
        placeholder={t('Select Date')}
        onClick={(e) => handleMenuOpen(e)}
      />
      <Menu
        anchorEl={pickerMenuAnchor}
        keepMounted
        open={Boolean(pickerMenuAnchor)}
        onClose={handleMenuClose}
      >
        <DateRangePicker
          ranges={duration}
          editableDateInputs={true}
          onChange={async item => {
            setValue('duration', [item.selection]);
            await trigger('duration')
          }}
          moveRangeOnFirstSelection={false}
        />
      </Menu>
    </>
  );
};
