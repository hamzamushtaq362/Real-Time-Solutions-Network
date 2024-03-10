import { createSlice } from '@reduxjs/toolkit';
import { roles } from '~/constants';
import themes from './../constants/themesDefault';

const collabState = {
  selectedPlatforms: [],
  platform: [],
  selectedSuggestions: [],
  platformType: [],
  title: '',
  description: '',
  image: '',
  imagePreview: '',
  roles: [],
  suggestedRoles: [...roles],
  // collabId: '',
  nonselectedTags: themes,
  searchedTags: themes,
  selectedTags: [],
  themes: [],
  enableCuration: true,
  privateCollab: false,
  totalPercentageForCurators: 5,
  selectedCoCreators: [],
  isNFTPublished: null,
  collabTitleForSubCollab: '',
  showCuratorsTab: true,
};

export const groupCollectionsSlice = createSlice({
  name: 'collab',
  initialState: collabState,
  reducers: {
    updateSelectedPlatforms: (state, action) => {
      state.selectedPlatforms = action.payload;
      state.platform = action.payload;
    },
    updateSelectedSuggestions: (state, action) => {
      state.selectedSuggestions = action.payload;
      state.platformType = action.payload;
    },
    updateSelectedCoCreators: (state, action) => {
      state.selectedCoCreators = action.payload;
    },
    updateRoles: (state, action) => {
      state.roles = action.payload;
    },
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateDescription: (state, action) => {
      state.description = action.payload;
    },
    updateImage: (state, action) => {
      state.image = action.payload;
    },
    updateImagePreview: (state, action) => {
      state.imagePreview = action.payload;
      state.image = action.payload;
    },
    updateCollabId: (state, action) => {
      state.collabId = action.payload;
    },
    updateSuggestedRoles: (state, action) => {
      state.suggestedRoles = action.payload;
    },
    updateNonSelectedTags: (state, action) => {
      state.nonselectedTags = action.payload;
    },
    updateSearcedTags: (state, action) => {
      state.searchedTags = action.payload;
    },
    updateSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
      state.themes = action.payload;
    },
    updateEnableCurationStatus: (state, action) => {
      state.enableCuration = action.payload;
    },
    updatePrivateCollabStatus: (state, action) => {
      state.privateCollab = action.payload;
    },
    updateTotalPercentageForCurators: (state, action) => {
      state.totalPercentageForCurators = action.payload;
    },
    resetCollab: (state) => {
      Object.assign(state, collabState);
      state = collabState;
    },
    updateIsNFTPublished: (state, action) => {
      state.isNFTPublished = action.payload;
    },
    updateCuratorsTabStatus: (state, action) => {
      state.showCuratorsTab = action.payload;
    },
  },
});

export const {
  updateSelectedPlatforms,
  updateSelectedSuggestions,
  updateRoles,
  updateTitle,
  updateDescription,
  updateImage,
  updateImagePreview,
  updateCollabId,
  updateSuggestedRoles,
  updateNonSelectedTags,
  updateSearcedTags,
  updateSelectedTags,
  resetCollab,
  updateEnableCurationStatus,
  updateTotalPercentageForCurators,
  updatePrivateCollabStatus,
  updateSelectedCoCreators,
  updateIsNFTPublished,
  updateCuratorsTabStatus,
} = groupCollectionsSlice.actions;

export default groupCollectionsSlice.reducer;
