import React from 'react';
import SearchableTags from './SearchableTags/SearchableTags';
import PropTypes from 'prop-types';
import { SearchableTagsMainContainer } from './element';

export default function Index(props) {
  const {
    defaultTags,
    onAdd,
    addable,
    title,
    maxNoOfSuggestions,
    maxNoOfSelections,
    onDelete,
    selectedTags,
  } = props;
  return (
    <SearchableTagsMainContainer>
      <SearchableTags
        selectedTags={selectedTags}
        onAdd={onAdd}
        onDelete={onDelete}
        addable={addable}
        defaultTags={defaultTags}
        title={title}
        maxNoOfSuggestions={maxNoOfSuggestions}
        maxNoOfSelections={maxNoOfSelections}
      />
    </SearchableTagsMainContainer>
  );
}

Index.propTypes = {
  defaultTags: PropTypes.array,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  addable: PropTypes.bool,
  selectedTags: PropTypes.array,
  title: PropTypes.string,
  maxNoOfSuggestions: PropTypes.number,
  maxNoOfSelections: PropTypes.number,
};

Index.defaultProps = {
  defaultTags: [],
  addable: false,
  selectedTags: [],
  title: 'Tags',
  maxNoOfSuggestions: 15,
  maxNoOfSelections: 15,
};
