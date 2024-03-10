import React, { useEffect, useState } from 'react';
import { InfoItemWrap, InfoLabel, InfoValue } from './elements';
import { Tooltip } from '~/components';

const InfoWithTooltip = ({ label, items }) => {
  const [displayTags, setDisplayTags] = useState('');
  const [tooltipTags, setTooltipTags] = useState('');

  useEffect(() => {
    if (items) {
      let updatedDisplayTags = '';
      let updatedTooltipTags = '';

      items.forEach((item, index) => {
        if (updatedDisplayTags.length + item.length < 50) {
          updatedDisplayTags += item;
          if (index !== items.length - 1) {
            updatedDisplayTags += ', ';
          }
        } else {
          updatedTooltipTags += item;
          if (index !== items.length - 1) {
            updatedTooltipTags += ', ';
          }
        }
      });

      setDisplayTags(updatedDisplayTags);
      setTooltipTags(updatedTooltipTags);
    }
  }, [items]);

  const tooltipItemCount = tooltipTags.includes(', ')
    ? tooltipTags.split(', ').length
    : tooltipTags
    ? 1
    : 0;

  return (
    <InfoItemWrap>
      <InfoLabel>{label}</InfoLabel>
      <InfoValue>
        {displayTags}
        {tooltipItemCount > 0 && (
          <Tooltip title={tooltipTags}>
            &nbsp;
            {tooltipItemCount > 0 ? '+ ' : ''}
            {tooltipItemCount + ' more'}
          </Tooltip>
        )}
      </InfoValue>
    </InfoItemWrap>
  );
};

export default InfoWithTooltip;
