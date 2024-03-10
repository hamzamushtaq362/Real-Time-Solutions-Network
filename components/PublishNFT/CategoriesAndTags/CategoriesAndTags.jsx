import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AccessoriesSuggestionIcon,
  ARVRXRSuggestionIcon,
  ThreeDSuggestionIcon,
  VirtualAvatarSuggestionIcon,
  VirtualWorldsSuggestionIcon,
} from '~/assets';
import { SearchSelectAutocomplete } from '~/components';
import {
  CategoriesAndTagsContainer,
  InformationDescription,
} from '../elements';
import { updateSelectedSuggestions, updateSelectedTags } from '~/redux';
import themes from '../../../constants/themesDefault';

function CategoriesAndTags() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { selectedSuggestions, selectedTags } = useSelector(
    (state) => state.collab,
  );

  const [suggestions] = useState([
    { name: '3D', icon: ThreeDSuggestionIcon },
    { name: 'Virtual Avatar', icon: VirtualAvatarSuggestionIcon },
    { name: 'Virtual Worlds', icon: VirtualWorldsSuggestionIcon },
    { name: 'AR/VR/XR', icon: ARVRXRSuggestionIcon },
    { name: 'Others', icon: AccessoriesSuggestionIcon },
  ]);

  const handleCategoriesChange = (_, updatedSelectedSuggestions) => {
    dispatch(updateSelectedSuggestions(updatedSelectedSuggestions));
  };
  const handleThemesChange = (_, updatedSelectedThemes) => {
    dispatch(updateSelectedTags(updatedSelectedThemes));
  };

  return (
    (<CategoriesAndTagsContainer>
      <InformationDescription mb={2}>{t("Categories (max 5)")}</InformationDescription>
      <SearchSelectAutocomplete
        value={selectedSuggestions}
        options={suggestions.map(({ name }) => name)}
        getOptionLabel={(option) => option.input ? option.label : option}
        onChange={handleCategoriesChange}
        defaultValue={selectedSuggestions}
        noOptionsText={t("No Results")}
        limitTags={5}
      />
      <InformationDescription mb={2} mt={5}>{t("Themes (max 10)")}</InformationDescription>
      <SearchSelectAutocomplete
        value={selectedTags}
        options={themes}
        onChange={handleThemesChange}
        noOptionsText={t("No Results")}
        defaultValue={selectedTags}
        limitTags={10}
      />
    </CategoriesAndTagsContainer>)
  );
}

export default CategoriesAndTags;
