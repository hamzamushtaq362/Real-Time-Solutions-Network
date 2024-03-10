import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import Search from "../Search/Search";
import SelectedTags from "../SelectedTags/SelectedTags";
import styles from "./SearchableTags.module.css";
import SuggestedTags from "../SuggestedTags/SuggestedTags";

export default function SearchableTags(props) {
  const {
    defaultTags,
    onAdd,
    onDelete,
    addable,
    selectedTags,
    title,
    maxNoOfSuggestions,
    maxNoOfSelections,
  } = props;

  const [tags, setTags] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    setTags(defaultTags);
  }, [defaultTags]);

  useEffect(() => {
    setSelectedTagsInternal(selectedTags);
  }, [selectedTags]);

  const [selectedTagsInteral, setSelectedTagsInternal] = useState([]);

  const handleSuggestedTagClick = (tag) => {
    if (selectedTagsInteral.includes(tag)) {
      return;
    }
    const updatedSelectedTags = [...selectedTagsInteral, tag];
    setSelectedTagsInternal(updatedSelectedTags);
    onAdd(tag);
  };

  const getSuggestedTags = () => {
    return tags
      .filter((tag) => !selectedTagsInteral.includes(tag))
      .filter((tag) =>
        tag.toLowerCase().includes(searchKeyword.trim().toLowerCase())
      )
      .slice(0, maxNoOfSuggestions);
  };

  const handleSelectedTagDeleteClick = (index) => {
    onDelete(selectedTagsInteral[index]);
    const updatedSelectedTags = [
      ...selectedTagsInteral.slice(0, index),
      ...selectedTagsInteral.slice(index + 1),
    ];
    setSelectedTagsInternal(updatedSelectedTags);
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const handleEnterClick = (e) => {
    if (!addable || searchKeyword === "") {
      return;
    }
    if (selectedTagsInteral.length >= maxNoOfSelections) {
      return;
    }
    if (e.code === "Enter") {
      const updatedSelectedTags = [
        ...selectedTagsInteral,
        searchKeyword.trim(),
      ];
      setSearchKeyword("");
      setSelectedTagsInternal(updatedSelectedTags);
      onAdd(searchKeyword.trim());
    }
  };

  return (
    <div
      onKeyDown={handleEnterClick}
      className={styles.searchableTagsContainer}>
      <Search title={title} keyword={searchKeyword} onSearch={handleSearch} />
      <SelectedTags
        onDelete={handleSelectedTagDeleteClick}
        tags={selectedTagsInteral}
      />
      <SuggestedTags
        title={title}
        onClick={handleSuggestedTagClick}
        tags={getSuggestedTags()}
        maxNoOfSelections={selectedTagsInteral.length >= maxNoOfSelections}
      />
    </div>
  );
}

SearchableTags.propTypes = {
  defaultTags: PropTypes.array,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  addable: PropTypes.bool,
  selectedTags: PropTypes.array,
  title: PropTypes.string,
};

SearchableTags.defaultProps = {
  defaultTags: [],
  addable: false,
  selectedTags: [],
  title: "Tags",
};
