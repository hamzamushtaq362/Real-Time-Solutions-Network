import React, { useState } from 'react';
import {
  CollabWorkWrap,
  WorkText,
  WorkImage,
  AddWorkPlaceholderContainer,
  PlaceholderContentContainer,
  PlaceholderText,
} from './elements';
import { FlexBox } from 'components/common/elements';
import PlusIcon from 'components/Icons/PlusIcon';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

export const CollabWorkCard = ({ title, user, key, onClick, image }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <CollabWorkWrap
      onClick={onClick}
      key={key}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <WorkImage src={image} />

      <FlexBox justifyContent="space-between">
        <WorkText hovered={hovered}>{title}</WorkText>
        <WorkText fontWeight={300}>{user?.fullName}</WorkText>
      </FlexBox>
    </CollabWorkWrap>
  );
};

export const AddWorkPlaceholder = ({ collabIdentifier }) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <AddWorkPlaceholderContainer
      onClick={() => router.push(`/collab/${collabIdentifier}/work/create`)}
      hovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <PlaceholderContentContainer>
        <PlusIcon color={theme.palette.text.primary} width={80} height={80} />

        <PlaceholderText>{t('Add collab work')}</PlaceholderText>
      </PlaceholderContentContainer>
    </AddWorkPlaceholderContainer>
  );
};
