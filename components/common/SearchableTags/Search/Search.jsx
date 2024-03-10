import React from "react";
import styles from "./Search.module.css";
import searchIcon from "../../../../assets/svg/searchIcon.svg";
import PropTypes from "prop-types";
import Image from "next/image";

export default function Search(props) {
  const { onSearch, keyword, title } = props;

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      <div className={styles.tagsLabel}>{title}</div>
      <div className={styles.searchInputContainer}>
        <Image
          className={styles.searchIconContainer}
          alt='search'
          src={searchIcon} />
        <input
          value={keyword}
          onChange={handleSearch}
          placeholder='Search'
          className={styles.tagsSearchInput}></input>
      </div>
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func,
  keyword: PropTypes.string,
  title: PropTypes.string,
};

Search.defaultProps = {
  keyword: "",
  title: "Tags",
};
