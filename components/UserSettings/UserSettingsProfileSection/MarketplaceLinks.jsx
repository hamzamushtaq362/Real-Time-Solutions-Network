import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {
  RowContainer,
  RowContentContainer,
  RowLabelHeaderContainer,
} from 'components/UserSettings/elements';
import { Box, useTheme } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { getInputStartText, MARKETPLACE_LINKS } from '~/constants';

import { ActionText } from 'components/DashboardHome/elements';
import PlusIcon from 'components/Icons/PlusIcon';
import { getRefinedValue, removeURLInitials, useIsMobileView } from '~/utils';
import axios from 'axios';
import { BASE_URL } from '~/apis';

import EditableLink from 'components/CreatorProfile/EditableLink/EditableLink';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

const MarketplaceLinks = ({ title, description }) => {
  const {control, watch} = useFormContext();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(-1);
  const theme = useTheme();
  const isMobileView = useIsMobileView();

  const [lastName, setLastName] = useState('a');
  const [lastUrl, setLastUrl] = useState('a');
  const disableAdd = !lastName || !lastUrl;

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'marketplaces',
  });

  const handleAddSocialLink = () => {
    append({ name: '', value: '', metaTitle: '', isEditing: true });
    setLastName('');
    setLastUrl('');
  };

  const handleToggleEdit = async (index) => {
    const item = watch('marketplaces')[index];
    update(index, {
      ...item,
      value: getRefinedValue(item.value),
      isEditing: !item.isEditing,
    });
  };
  const handleSave = async (index) => {
    const item = watch('marketplaces')[index];
    const url = getInputStartText(item.name) + item.value;

    try {
      setLoading(index);
      const metaResponse = await axios.get(
        `${BASE_URL}/api/v1/link/${encodeURIComponent(url)}`,
      );
      update(index, {
        ...item,
        value: url,
        isEditing: !item.isEditing,
        metaTitle: metaResponse.data.title || removeURLInitials(url),
      });
      setLoading(-1);
      setLastName(item.name);
      setLastUrl(item.value);
    } catch (e) {
      update(index, {
        ...item,
        value: url,
        isEditing: !item.isEditing,
        metaTitle: removeURLInitials(url),
      });
      setLoading(-1);
      setLastName(item.name);
      setLastUrl(item.value);
    }
  };
  const handleRemove = (index) => {
    remove(index);
    if (index === fields.length - 1) {
      setLastName('a');
      setLastUrl('a');
    }
  };

  return (
    <RowContainer>
      <RowLabelHeaderContainer>
        <LeftHeaderComp
          headerText={title ? title : t('Marketplace links')}
          subheader={
            description
              ? description
              : t('Add marketplace to select from different placeforms ')
          }
        />
      </RowLabelHeaderContainer>
      <RowContentContainer>
        <Box sx={{ width: isMobileView ? '100%' : '64%' }}>
          {fields.map((item, index) => (
            <EditableLink
              key={index}
              index={index}
              item={item}
              control={control}
              watch={watch}
              dropdownArray={MARKETPLACE_LINKS}
              remove={() => handleRemove(index)}
              onSave={() => handleSave(index)}
              toggleEdit={() => handleToggleEdit(index)}
              loading={loading}
              parentName="marketplaces"
            />
          ))}
          {!disableAdd && (
            <ActionText
              onClick={handleAddSocialLink}
              underlineHeight={1.5}
              mt={1}
              disabled={disableAdd}
            >
              <PlusIcon
                color={theme.palette.text.primary}
                width={16}
                height={16}
              />
              <Box ml={1}>{t('Add Marketplace link')}</Box>
            </ActionText>
          )}
        </Box>
      </RowContentContainer>
    </RowContainer>
  );
};

export default MarketplaceLinks;
