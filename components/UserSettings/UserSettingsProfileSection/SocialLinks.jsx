import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {
  RowContainer,
  RowContentContainer,
  RowLabelHeaderContainer,
} from 'components/UserSettings/elements';
import { Box, useTheme } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { getInputStartText, SOCIAL_LINKS } from '~/constants';
import { ActionText } from 'components/DashboardHome/elements';
import PlusIcon from 'components/Icons/PlusIcon';
import { getRefinedValue, useIsMobileView } from '~/utils';
import EditableLink from 'components/CreatorProfile/EditableLink/EditableLink';
import axios from 'axios';
import { BASE_URL } from '~/apis';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

const SocialLinks = ({ description }) => {
  const {control, watch} = useFormContext();
  const [lastName, setLastName] = useState('a');
  const [lastUrl, setLastUrl] = useState('a');
  const disableAdd = !lastName || !lastUrl;

  const { t } = useTranslation();
  const [loading, setLoading] = useState(-1);

  const theme = useTheme();
  const isMobileView = useIsMobileView();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'socials',
  });

  const handleAddSocialLink = () => {
    if (disableAdd) {
      return;
    }
    append({ name: '', value: '', metaTitle: '', isEditing: true });
    setLastName('');
    setLastUrl('');
  };
  const handleToggleEdit = async (index) => {
    const item = watch('socials')[index];
    update(index, {
      ...item,
      value: getRefinedValue(item.value),
      isEditing: !item.isEditing,
    });
  };
  const handleSave = async (index) => {
    const item = watch('socials')[index];
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
        metaTitle: metaResponse.data.title || '',
      });
      setLoading(-1);
      setLastName(item.name);
      setLastUrl(item.value);
    } catch (e) {
      update(index, {
        ...item,
        value: url,
        isEditing: !item.isEditing,
        metaTitle: '',
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
          headerText={t('Social links')}
          subheader={description}
        />
      </RowLabelHeaderContainer>
      <RowContentContainer>
        <Box sx={{ width: isMobileView ? '100%' : '64%' }}>
          {fields.length >= 0 &&
            fields.map((item, index) => (
              <EditableLink
                key={index}
                index={index}
                item={item}
                control={control}
                watch={watch}
                dropdownArray={SOCIAL_LINKS}
                remove={() => handleRemove(index)}
                onSave={() => handleSave(index)}
                toggleEdit={() => handleToggleEdit(index)}
                loading={loading}
                parentName="socials"
              />
            ))}

          {!disableAdd && (
            <ActionText
              onClick={handleAddSocialLink}
              underlineHeight={1.5}
              mt={1}
              // disabled={disableAdd}
            >
              <PlusIcon
                color={theme.palette.text.primary}
                width={16}
                height={16}
              />
              <Box ml={1}>{t('Add Social links')}</Box>
            </ActionText>
          )}
        </Box>
      </RowContentContainer>
    </RowContainer>
  );
};

export default SocialLinks;
