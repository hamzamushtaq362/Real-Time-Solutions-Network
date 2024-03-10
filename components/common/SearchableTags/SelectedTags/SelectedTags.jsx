import React from 'react';
import PropTypes from 'prop-types';
import SelectedTag from './SelectedTag/SelectedTag';
import styles from './SelectedTags.module.css';

export default function SelectedTags(props) {
  const { tags, onDelete } = props;

  const handleDeleteClick = (index) => () => {
    onDelete(index);
  };

  return (
    <div className={styles.selectedTagsListContainer}>
      {tags.map((tag, index) => (
        <SelectedTag
          key={index}
          onDelete={handleDeleteClick(index)}
          tag={tag}
        />
      ))}
    </div>
  );
}

SelectedTags.propTypes = {
  tags: PropTypes.array,
  onDelete: PropTypes.func,
};

SelectedTags.defaultProps = {
  tags: [],
};
