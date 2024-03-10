import { useTranslation } from 'react-i18next';
import React from 'react';
import PropTypes from 'prop-types';
import SuggestedTag from './SuggestedTag/SuggestedTag.jsx';
import styles from './SuggestedTags.module.css';

export default function SuggestedTags(props) {
  const { t } = useTranslation();

  const { tags, onClick, title, maxNoOfSelections } = props;

  if (maxNoOfSelections) {
    return (<div className={styles.maxSelected}>{t("Maximum no of")}{title.toLowerCase()}{t("selected")}</div>);
  }

  return (
    (<div className={styles.suggestedTagsContainer}>
      <div className={styles.suggestedTagsLabel}>{t("Suggested")}{title}</div>
      <div className={styles.suggestedTagsListContainer}>
        {tags.map((tag, index) => (
          <SuggestedTag key={index} onClick={onClick} tag={tag} />
        ))}
      </div>
    </div>)
  );
}

SuggestedTags.propTypes = {
  tags: PropTypes.array,
  onClick: PropTypes.func,
  title: PropTypes.string,
  maxNoOfSelections: PropTypes.number,
};

SuggestedTags.defaultProps = {
  tags: [],
  title: 'Tags',
};
