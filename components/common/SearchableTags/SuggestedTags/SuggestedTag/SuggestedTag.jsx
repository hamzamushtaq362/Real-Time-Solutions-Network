import React from "react";
import styles from "./SuggestedTag.module.css";
import PropTypes from "prop-types";

export default function SuggestedTag(props) {
  const { tag, onClick } = props;

  const handleClick = () => {
    onClick(tag);
  };

  return (
    <div onClick={handleClick} className={styles.suggestedTag}>
      {tag}
    </div>
  );
}

SuggestedTag.propTypes = {
  tag: PropTypes.string,
  onClick: PropTypes.func,
};

SuggestedTag.defaultProps = {
  tags: "",
};
