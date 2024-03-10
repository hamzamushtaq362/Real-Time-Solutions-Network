import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import Button from '../common/Button/Button.jsx';
import { onboardDiscover } from '~/apis';
import ThreeDots from '../common/ThreeDots/ThreeDots';
import SearchableTags from 'components/SearchableTags';
import { tags as suggestedTags } from '~/constants/tags';
import {
  OnBoardRightDiscoverContainer,
  OnBoardRightDiscoverSelectAll,
  OnBoardRightDiscoverTagsContainer,
  OnBoardRightDiscoverTitle,
} from './elements';
import ButtonCenter from '../common/Button/ButtonCenter';
import { useTheme } from '@mui/material';

export const Discover = (props) => {
  const { t } = useTranslation();

  const { onFinish } = props;
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);

  const theme = useTheme();

  const handleContinueClick = async () => {
    setLoading(true);
    await onboardDiscover(tags);
    onFinish();
    setLoading(false);
  };

  const handleTagsAdd = (newTag) => {
    setTags([...tags, newTag]);
  };

  const handleDelete = (index) => {
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
  };

  return (
    (<OnBoardRightDiscoverContainer>
      <OnBoardRightDiscoverTitle>{t("Get Discovered")}</OnBoardRightDiscoverTitle>
      <OnBoardRightDiscoverSelectAll>{t("What skills do you bring to the Metaverse")}</OnBoardRightDiscoverSelectAll>
      <OnBoardRightDiscoverTagsContainer>
        <SearchableTags
          onAdd={handleTagsAdd}
          defaultTags={suggestedTags}
          maxNoOfSuggestions={15}
          onDelete={handleDelete}
        />
      </OnBoardRightDiscoverTagsContainer>
      <ButtonCenter>
        <Button onClick={handleContinueClick}>
          {loading ? (
            <ThreeDots color={theme.palette.background.default} />
          ) : (
            'Continue'
          )}
        </Button>
      </ButtonCenter>
    </OnBoardRightDiscoverContainer>)
  );
};
