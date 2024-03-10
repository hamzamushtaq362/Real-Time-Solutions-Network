import { useTranslation } from 'react-i18next';
import React from 'react';
import { SearchSelectAutocomplete } from '~/components';
import { CategoriesAndTagsContainer } from '../elements';
import { InformationDescription } from 'components/CollabCreate/elements';
import { Box } from '@mui/material';
import { CollabCategories as suggestions } from 'constants/collab';

const TeamsAddCategories = ({ watch, setValue, errors, trigger }) => {
  const { t } = useTranslation();

  const { selectedSuggestions } = watch();

  const handleCategoriesChange = (_, updatedSelectedSuggestions) => {
    setValue(
      'selectedSuggestions',
      updatedSelectedSuggestions.map((option) =>
        option.input
          ? option.label.replace('Enter to add "', '').replace('"', '')
          : option,
      ),
    );
    trigger('selectedSuggestions');
  };

  return (
    <CategoriesAndTagsContainer>
      <Box>
        <SearchSelectAutocomplete
          freeSolo
          value={selectedSuggestions}
          options={suggestions} // .map(({ name }) => name)
          getOptionLabel={(option) => (option.input ? option.label : option)}
          onChange={handleCategoriesChange}
          placeholder="Categories (max 5)"
          noOptionsText={t('No Results')}
          limitTags={5}
        />
      </Box>
      {errors && errors.selectedSuggestions && (
        <InformationDescription type="error" my={1} ml={1}>
          {errors?.selectedSuggestions?.message}
        </InformationDescription>
      )}
    </CategoriesAndTagsContainer>
  );
};

export default TeamsAddCategories;
