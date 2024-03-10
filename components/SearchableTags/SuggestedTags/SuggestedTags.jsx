import { useTranslation } from 'react-i18next';
import React from 'react';
import PropTypes from 'prop-types';
import SuggestedTag from './SuggestedTag/SuggestedTag';
import {
  MaxSelected,
  SuggestedTagsContainer,
  SuggestedTagsLabel,
  SuggestedTagsListContainer,
} from './element';

export default function SuggestedTags(props) {
  const { t } = useTranslation();

  const { tags, onClick, title, maxNoOfSelections } = props;

  if (maxNoOfSelections) {
    return (<MaxSelected>{t("Maximum no of")}{title.toLowerCase()}{t("selected")}</MaxSelected>);
  }

  return (
    (<SuggestedTagsContainer>
      <SuggestedTagsLabel>{t("Suggested")}{title}</SuggestedTagsLabel>
      <SuggestedTagsListContainer>
        {tags.map((tag, index) => (
          <SuggestedTag key={index} onClick={onClick} tag={tag} />
        ))}
      </SuggestedTagsListContainer>
    </SuggestedTagsContainer>)
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
