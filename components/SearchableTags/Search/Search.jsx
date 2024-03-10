import React from 'react';
import PropTypes from 'prop-types';
import { TagsLabel } from './element';
import { SearchInput } from '~/components';

export default function Search(props) {
  const { onSearch, keyword, title } = props;

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      <TagsLabel>{title}</TagsLabel>
      <SearchInput
        padding="14px 12px"
        variant="outlined"
        value={keyword}
        handleChange={handleSearch}
      />
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func,
  keyword: PropTypes.string,
  title: PropTypes.string,
};

Search.defaultProps = {
  keyword: '',
  title: 'Tags',
};
