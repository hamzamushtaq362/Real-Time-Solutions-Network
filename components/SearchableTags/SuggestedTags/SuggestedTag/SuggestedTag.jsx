import React from 'react';
import PropTypes from 'prop-types';
import { SuggestedTagSingle } from './element';

export default function SuggestedTag(props) {
  const { tag, onClick } = props;

  const handleClick = () => {
    onClick(tag);
  };

  return <SuggestedTagSingle onClick={handleClick}>{tag}</SuggestedTagSingle>;
}

SuggestedTag.propTypes = {
  tag: PropTypes.string,
  onClick: PropTypes.func,
};

SuggestedTag.defaultProps = {
  tags: '',
};
