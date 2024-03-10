import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import './multidropdown.module.css';

const icon = <CheckBoxOutlineBlankIcon fontSize="medium" />;
const checkedIcon = <CheckBoxIcon fontSize="medium" />;

export default function MultiSelectDropdown({
  options,
  value,
  setValue,
  // page,
  // setPage,
  limit = 5,
  // showPagination = false,
}) {
  const { t } = useTranslation();

  const [defaultValues, setDefaultValues] = useState([]);
  useEffect(() => {
    if (options && options.length) {
      let arr = [];
      for (let i = 0; i < options.length; i++) {
        let option = options[i];
        arr.push(option);
        if (arr.length == 5) {
          break;
        }
      }
      setDefaultValues(arr);
      setValue(arr);
    }
  }, [options]);

  useEffect(() => {
    if (value.length > limit) {
      value.shift();
      setValue(value);
    }
  }, [value]);

  return (
    (<div style={{ paddingTop: '.5rem' }}>
      {options.length && defaultValues.length ? (
        <>
          <Autocomplete
            multiple
            options={options || top100Films}
            value={value}
            limitTags={1}
            onChange={(event, newValue) => {
              setValue([...newValue]);
            }}
            defaultValue={defaultValues}
            disableCloseOnSelect
            getOptionLabel={(option) => option?.metadata?.name || 'N/A'}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  sx={{ fontSize: '14px' }}
                  checked={selected}
                />

                <span
                  style={{
                    fontSize: '12px',
                  }}
                >
                  {option?.metadata?.name}
                </span>
              </li>
            )}
            style={{ width: 170, marginLeft: 'auto', marginRight: '0' }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("Select NFTs")}
                placeholder="Search.."
                size="small"
              />
            )}
          />
        </>
      ) : (
        'loading...'
      )}
    </div>)
  );
}
const top100Films = [
  { title: 'The Shawshank', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord',
    year: 2003,
  },
];
