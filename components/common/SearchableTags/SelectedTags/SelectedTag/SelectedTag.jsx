import React from 'react';
import PropTypes from 'prop-types';
import styles from './SelectedTag.module.css';
import { UilTimes } from '@iconscout/react-unicons';

export default function SelectedTag(props) {
  const { tag, onDelete } = props;

  return (
    <div className={styles.selectedTag}>
      <div>{tag}</div>
      <div onClick={onDelete} className={styles.selectedTagDelete}>
        <UilTimes size="20" color="#0144E4" />
      </div>
    </div>
  );
}

SelectedTag.propTypes = {
  tag: PropTypes.string,
  onDelete: PropTypes.func,
};

SelectedTag.defaultProps = {
  tag: '',
};
