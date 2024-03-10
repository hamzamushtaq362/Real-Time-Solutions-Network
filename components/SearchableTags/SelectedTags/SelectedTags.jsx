import React from 'react';
import PropTypes from 'prop-types';
import SelectedTag from './SelectedTag/SelectedTag';
import { SelectedTagsListContainer } from './element';

export default function SelectedTags(props) {
  const { tags, onDelete } = props;

  const handleDeleteClick = (index) => () => {
    onDelete(index);
  };

  return (
    <SelectedTagsListContainer>
      {tags.map((tag, index) => (
        <SelectedTag
          key={index}
          onDelete={handleDeleteClick(index)}
          tag={tag}
        />
      ))}
    </SelectedTagsListContainer>
  );
}

SelectedTags.propTypes = {
  tags: PropTypes.array,
  onDelete: PropTypes.func,
};

SelectedTags.defaultProps = {
  tags: [],
};
