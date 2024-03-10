import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {
  ContentSubContainer,
  RowContainer,
  RowContentContainer,
  RowLabelHeaderContainer,
} from 'components/UserSettings/elements';

import { Spacer, StyledInput, StyledDatePicker } from '~/components';
import { Box, IconButton, useTheme } from '@mui/material';
import CloseIcon from 'components/Icons/CloseIcon';
import { ActionText } from 'components/DashboardHome/elements';
import PlusIcon from 'components/Icons/PlusIcon';
import { useFieldArray, Controller, useFormContext } from 'react-hook-form';
import { AchievementsMainContainer } from 'components/UserSettings/UserSettingsProfileSection/elements';
import dayjs from 'dayjs';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

const Achievements = ({ title, description, item, index }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { control } = useFormContext();

  const getFieldName = (fieldName) => {
    return item ? `collabList[${index}].${fieldName}` : fieldName;
  }

  const [lastTitle, setLastTitle] = useState('a');
  const [lastDate, setLastDate] = useState('a');
  const disableAdd = !lastTitle || !lastDate;

  const { fields, append, remove } = useFieldArray({
    control,
    name: getFieldName('achievements'),
  });


  const handleAddInput = () => {
    if (disableAdd) {
      return;
    }
    append({ title: '', date: '' });
    setLastDate('');
    setLastTitle('');
  };

  return (
    <Box mb={3}>
      <RowContainer>
        <RowLabelHeaderContainer>
          <LeftHeaderComp
            headerText={title ?? t('Achievements')}
            subheader={
              description ??
              t(
                'Share your craft’s recognition by adding awards earned by you.',
              )
            }
          />
        </RowLabelHeaderContainer>

        <AchievementsMainContainer>
          {fields &&
            fields?.length > 0 &&
            fields.map((achievement, index) => (
              <>
                <RowContentContainer key={index}>
                  <ContentSubContainer>
                    <Controller
                      name={getFieldName(`achievements[${index}].title`)}
                      control={control}
                      render={({ field }) => (
                        <StyledInput
                          {...field}
                          placeholder={t('Award Name')}
                          onChange={(e) => {
                            field.onChange(e);
                            if (index === fields.length - 1) {
                              setLastTitle(e.target.value);
                            }
                          }}
                        />
                      )}
                    />
                  </ContentSubContainer>
                  <ContentSubContainer>
                    <Controller
                      name={getFieldName(`achievements[${index}].date`)}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <StyledDatePicker
                          placeholder={t('Date')}
                          value={dayjs(value)}
                          onChange={(value) => {
                            const newDate = new Date(value).toISOString();
                            onChange(newDate);
                            if (index === fields.length - 1) {
                              setLastDate(newDate); // update local state for the last item
                            }
                          }}
                          views={['month', 'year']}
                        />
                      )}
                    />
                  </ContentSubContainer>
                  <IconButton
                    onClick={() => {
                      remove(index);
                      setLastDate('a');
                      setLastTitle('a');
                    }}
                    sx={{ width: 60 }}
                  >
                    <CloseIcon
                      width={26}
                      height={26}
                      color={theme.palette.text.primary}
                    />
                  </IconButton>
                </RowContentContainer>
                <Spacer value={4} />
              </>
            ))}
          <ActionText
            onClick={handleAddInput}
            underlineHeight={1.5}
            disabled={disableAdd}
          >
            <PlusIcon
              color={theme.palette.text.primary}
              width={16}
              height={16}
            />
            <Box ml={1}>{t('Add Award')}</Box>
          </ActionText>
        </AchievementsMainContainer>
      </RowContainer>
    </Box>
  );
};

export default Achievements;
