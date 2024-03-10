import { useTranslation } from 'react-i18next';
import {
  TableNavbarContainer,
  SortByContainer,
  SortByText,
  TableNavbarSearchContainer,
} from './elements';
import { SearchInput } from '~/components';
import { Box, useTheme } from '@mui/material';
import { Dropdown } from 'components/Dropdown/Dropdown';

const TableNavSortBy = ({ filterBy, setFilterBy }) => {
  const { t } = useTranslation();

  return (
    (<SortByContainer>
      <SortByText sx={{ marginLeft: '10px', marginRight: '10px' }}>{t("Sort by")}</SortByText>
      <Dropdown options={['all', 'approved', 'denied', 'pending']} selectedItem={filterBy} setSelectedItem={setFilterBy} />
    </SortByContainer>)
  );
};

const TableNavSearchBar = () => {

  const theme = useTheme();
  return (
    <TableNavbarSearchContainer>
      <Box border={`1px solid ${theme.palette.divider}`} borderRadius={100}>
        <SearchInput
          padding="14px"
          backgroundColor={theme.palette.background.default}
          handleChange={() => {}} //             handleChange={e => setSearchString(e.target.value)}
        />
      </Box>
    </TableNavbarSearchContainer>
  );
};

export const TableNavbar = ({ filterBy, setFilterBy }) => {

  return (
    <TableNavbarContainer>
      <TableNavSortBy filterBy={filterBy} setFilterBy={setFilterBy} />
      <TableNavSearchBar />
    </TableNavbarContainer>
  );
};
