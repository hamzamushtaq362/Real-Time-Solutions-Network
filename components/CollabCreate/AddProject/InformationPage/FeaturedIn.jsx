import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {
  EditIconWrap,
  RowContainer,
  RowContentContainer,
  RowLabelHeaderContainer,
} from 'components/UserSettings/elements';
import {
  AddUrlWrap,
  LinkBoxRow,
  LinkBoxTitle,
  LinkBoxValue,
} from 'components/CollabCreate/AddProject/elements';
import {
  EditIcon,
  SimpleButton,
  Spacer,
  StyledInput,
  SmallSpinner,
} from '~/components';
import { Box, IconButton, useTheme } from '@mui/material';
import CloseIcon from 'components/Icons/CloseIcon';
import { ActionText } from 'components/DashboardHome/elements';
import PlusIcon from 'components/Icons/PlusIcon';
import { useFieldArray, Controller, useFormContext } from 'react-hook-form';
import { FlexBox } from 'components/common/elements';
import { isValidURL, removeURLInitials, useIsMobileView } from '~/utils';
import axios from 'axios';
import { BASE_URL } from '~/apis';
import MetaTitleRow from 'components/CollabCreate/AddProject/InformationPage/MetaTitleRow';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

const FeaturedIn = ({ description, index, item }) => {
  const { control, watch } = useFormContext();
  const { t } = useTranslation();

  const isMobileView = useIsMobileView();

  const getFieldName = (fieldName) => {
    return item ? `collabList[${index}].${fieldName}` : fieldName;
  }
  const theme = useTheme();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: getFieldName('featuredIn'),
  });
  const [lastTitle, setLastTitle] = useState('a');
  const [lastUrl, setLastUrl] = useState('a');
  const disableAdd = !lastTitle || !lastUrl;


  const handleAddInput = () => {
    if (disableAdd) {
      return;
    }
    append({
      title: '',
      url: '',
      metaTitle: '',
      showAddBtn: false,
      loading: false,
    });
    setLastTitle('');
    setLastUrl('');
  };
  const handleFetchMeta = async (index) => {
    const item = watch(getFieldName(`featuredIn[${index}]`));
    const { title, url } = item;
    try {
      update(index, {
        ...item,
        loading: true,
      });

      const metaResponse = await axios.get(
        `${BASE_URL}/api/v1/link/${encodeURIComponent(url)}`,
      );
      update(index, {
        ...item,
        metaTitle: metaResponse.data.title || removeURLInitials(url),
        loading: false,
      });
      setLastTitle(title);
      setLastUrl(url);
    } catch (e) {
      update(index, {
        ...item,
        metaTitle: removeURLInitials(url),
        loading: false,
      });
      setLastTitle(title);
      setLastUrl(url);
    }
  };
  const handleEditUrl = (index) => {
    const item = watch(getFieldName(`featuredIn[${index}]`));
    update(index, {
      ...item,
      metaTitle: '',
      showAddBtn: true,
    });
  };

  return (
    <Box mb={3}>
      <RowContainer>
        <RowLabelHeaderContainer>
          <LeftHeaderComp
            headerText={t('Featured in')}
            subheader={
              description ??
              'Highlight your professional achievements by adding online coverage of your work.'
            }
          />
        </RowLabelHeaderContainer>

        <RowContentContainer>
          <Box sx={{ width: isMobileView ? '100%' : '70%' }}>
            {fields &&
              fields?.length > 0 &&
              fields.map((item, index) => (
                <>
                  {item.metaTitle ? (
                    <MetaTitleRow
                      metaTitle={item?.metaTitle}
                      url={item.url}
                      {...{ watch, control, index, update, remove }}
                    />
                  ) : (
                    <FlexBox width="100%">
                      <LinkBoxRow key={index}>
                        <LinkBoxTitle>
                          <Controller
                            name={getFieldName(`featuredIn[${index}].title`)}
                            control={control}
                            render={({ field }) => (
                              <StyledInput
                                {...field}
                                placeholder="Title"
                                onChange={(e) => {
                                  field.onChange(e);
                                  if (index === fields.length - 1) {
                                    setLastTitle(e.target.value);
                                  }
                                }}
                                border="none"
                              />
                            )}
                          />
                        </LinkBoxTitle>
                        <LinkBoxValue>
                          <Controller
                            name={getFieldName(`featuredIn[${index}].url`)}
                            control={control}
                            render={({ field }) => (
                              <StyledInput
                                {...field}
                                placeholder="Link"
                                onChange={(e) => {
                                  field.onChange(e);
                                  if (index === fields.length - 1) {
                                    setLastUrl(e.target.value);
                                  }
                                  if (isValidURL(e.target.value)) {
                                    const item = watch(getFieldName(`featuredIn[${index}]`));
                                    update(index, {
                                      ...item,
                                      url: e.target.value,
                                      showAddBtn: true,
                                    });
                                  }
                                }}
                                border="none"
                              />
                            )}
                          />
                        </LinkBoxValue>
                        {item.showAddBtn && !item.metaTitle && (
                          <AddUrlWrap>
                            <SimpleButton
                              onClick={() => handleFetchMeta(index)}
                              padding="0 8px"
                              height={30}
                            >
                              {item.loading ? (
                                <SmallSpinner inverse />
                              ) : (
                                <>
                                  <PlusIcon
                                    color={theme.palette.text.primary}
                                    width={12}
                                    height={12}
                                  />
                                  <Box ml="4px">{t('Add')}</Box>
                                </>
                              )}
                            </SimpleButton>
                          </AddUrlWrap>
                        )}
                        {item.metaTitle && (
                          <AddUrlWrap>
                            <EditIconWrap onClick={() => handleEditUrl(index)}>
                              <EditIcon
                                width={16}
                                height={16}
                                color={theme.palette.text.primary}
                              />
                            </EditIconWrap>
                          </AddUrlWrap>
                        )}
                      </LinkBoxRow>
                      <IconButton
                        onClick={() => {
                          remove(index);
                          setLastTitle('a');
                          setLastUrl('a');
                        }}
                        sx={{ width: 60, height: 60, marginLeft: 3 }}
                      >
                        <CloseIcon
                          width={26}
                          height={26}
                          color={theme.palette.text.primary}
                        />
                      </IconButton>
                    </FlexBox>
                  )}
                  <Spacer value={20} />
                </>
              ))}
            {!disableAdd && (
              <ActionText onClick={handleAddInput} underlineHeight={1.5}>
                <PlusIcon
                  color={theme.palette.text.primary}
                  width={16}
                  height={16}
                />
                <Box ml={1}>{t('Add Featured In')}</Box>
              </ActionText>
            )}
          </Box>
        </RowContentContainer>
      </RowContainer>
    </Box>
  );
};

export default FeaturedIn;
