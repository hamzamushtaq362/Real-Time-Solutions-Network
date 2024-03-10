import React from 'react';
import PropTypes from 'prop-types';
import { UilTimes } from '@iconscout/react-unicons';
import { useTheme } from '@mui/material';
import { SelectedTagContainer, SelectedTagDelete } from './element';

export default function SelectedTag(props) {
  const { tag, onDelete } = props;
  const theme = useTheme();

  return (
    <SelectedTagContainer>
      <div>{tag}</div>
      <SelectedTagDelete onClick={onDelete}>
        <UilTimes size="20" color={theme.palette.blue.main} />
      </SelectedTagDelete>
    </SelectedTagContainer>
  );
}

SelectedTag.propTypes = {
  tag: PropTypes.string,
  onDelete: PropTypes.func,
};

SelectedTag.defaultProps = {
  tag: '',
};
