import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { NFTDescription, NFTTitleText } from 'components/NFTTile/elements';
import { truncateString } from '~/utils';
import {
  ProjectAddedLabel,
  ProjectContentContainer,
  ProjectIconWrap,
  ProjectImage,
  ProjectLabelWrap,
  ProjectTileContainer,
} from 'components/Collective/CollectiveCreate/CreateCollabCollective/elements';
import { Box, useTheme } from '@mui/material';
import TickIcon from 'components/Icons/TickIcon';
import { useFormContext } from 'react-hook-form';

const ProjectCard = ({
  sx,
  id,
  title,
  image,
  description,
  collabType,
}) => {
  const { t } = useTranslation();
  const {setValue, trigger, watch} = useFormContext();

  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const selectedProjects = watch('selectedProjects');

  const handleClick = async () => {
    let updatedProjects = [...selectedProjects];
    const index = selectedProjects.findIndex((project) => project._id === id);
    if (index !== -1) {
      updatedProjects.splice(index, 1);
    } else {
      updatedProjects.push({
        _id: id,
        projectType: collabType ?? 'inside-project',
      });
    }
    setValue('selectedProjects', updatedProjects);
    trigger('selectedProjects');
  };

  const isSelected = selectedProjects.some((project) => project._id === id);

  return (
    <ProjectTileContainer
      {...sx}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      hovered={isHovered}
    >
      <Box width="100%" position="relative">
        <ProjectImage
          src={image}
          alt="nft-image"
          hovered={isHovered}
          selected={isSelected}
        />

        <ProjectLabelWrap selected={isSelected}>
          <ProjectIconWrap>
            <TickIcon
              width={18}
              height={18}
              color={theme.palette.text.inverse}
            />
          </ProjectIconWrap>
          <ProjectAddedLabel ml={2}>{t('Collab Added')}</ProjectAddedLabel>
        </ProjectLabelWrap>
      </Box>
      <ProjectContentContainer>
        <>
          {title.length > 18 ? (
            <NFTTitleText hovered={isHovered}>
              {title
                ? title.length > 18
                  ? truncateString(title, 18)
                  : title
                : 'No Title Found'}
            </NFTTitleText>
          ) : (
            <NFTTitleText variant="h3" hovered={isHovered}>
              {title ? title : 'No Title Found'}
            </NFTTitleText>
          )}

          <NFTDescription hovered={isHovered}>{description}</NFTDescription>
        </>
      </ProjectContentContainer>
    </ProjectTileContainer>
  );
};

export default ProjectCard;
