import React, { useState } from 'react';
import { Grid, Box, useTheme } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { PrimaryButton, SmallSpinner } from '~/components'; // Adjust the path as needed
import PlusIcon from 'components/Icons/PlusIcon';
import { useTranslation } from 'react-i18next';

import { ActionText } from 'components/DashboardHome/elements';
import { LinkText } from 'components/UserSettings/UserSettingsProfileSection/elements';
import axios from 'axios';
import { BASE_URL } from '~/apis';

export const SingleEditableLink = ({
  name,
  AddBtnContent,
  InputComponent
}) => {
  const {control, watch, setValue} = useFormContext();
  const [showInput, setShowInput] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();
  const value = watch(name);
  const { metaTitle, url } = value || {};

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSaveClick = async () => {
    try {
      setLoading(true);
      const metaResponse = await axios.get(
        `${BASE_URL}/api/v1/link/${encodeURIComponent(url)}`,
      );
      setValue(name, {
        ...value,
        metaTitle: metaResponse.data.title || url,
      });
      setLoading(false);
      setShowInput(false);
    }catch (e) {
      setValue(name, {
        ...value,
        url,
        metaTitle: '',
      });
      setLoading(false);
      setShowInput(false);
    }
  };

  const handleAddAction = () => {
    setShowInput(true);
  };

  const handleEditClick = () => {
    setShowInput(true);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {showInput ? (
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item lg={10}>
            <Controller
              name={name}
              control={control}
              render={({ field: {value, onChange} }) =>
                <InputComponent
                  value={url?.replace(/^(https?:\/\/)?(www\.)?/, '')}
                  onChange={(e) => {
                    onChange({
                      ...value,
                      url: e.target.value,
                    });
                  }}
                  placeholder="Link"
                  startAdornment='https://'
                />
              }
            />
          </Grid>
          <Grid item lg={2}>
            <PrimaryButton onClick={handleSaveClick}>
              {loading ? <SmallSpinner/> : 'Save'}
            </PrimaryButton>
          </Grid>
        </Grid>
      ) : (
        <>
          {url && (
            <Grid container spacing={2} alignItems='center' height={70}>
              <Grid item xs={6} lg={9}>
                <LinkText
                  ml={1}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.open(url.includes('http') ? url : `https://${url}`);
                    }
                  }}
                >
                  {metaTitle || url} ↗
                </LinkText>
              </Grid>
              {isHovered && (
                <Grid item xs={6} lg={3}>
                  <PrimaryButton
                    style={{ width: '200px' }}
                    onClick={handleEditClick}
                  >
                    {t('Edit')}
                  </PrimaryButton>
                </Grid>
              )}
            </Grid>
          )}

          {!url && (
            <ActionText onClick={handleAddAction} underlineHeight={1.5} mt={3}>
              <PlusIcon
                color={theme.palette.text.primary}
                width={16}
                height={16}
              />
              <Box ml={1}>{t(AddBtnContent)}</Box>
            </ActionText>
          )}
        </>
      )}
    </div>
  );
};
