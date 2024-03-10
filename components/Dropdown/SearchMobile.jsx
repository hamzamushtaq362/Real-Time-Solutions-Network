import React  from 'react';
import { SearchContainer } from '../Navbar/DashboardNavbar/elements';
import { RoundedBorderedContainer } from './elements';
import { UilSearch } from '@iconscout/react-unicons';
import { useTheme } from '@mui/material';

const SearchMobile = ({ onSearchClick }) => {
  const theme = useTheme();

  return (
    <RoundedBorderedContainer mr={2} onClick={onSearchClick}>
      <SearchContainer display='flex' justifyContent='center'>
        <UilSearch color={theme.palette.grey.common} size="20" />
      </SearchContainer>
    </RoundedBorderedContainer>
  );
};

export default SearchMobile;