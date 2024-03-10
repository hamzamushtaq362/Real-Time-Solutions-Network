import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import {
  MainContainer,
  CreateMissionMainHeader,
  InformationDescription,
  CreateNewBadgeLabel,
  BadgeLabelContainer,
  BadgesContainer,
} from './elements';
import { RadioGroup, Autocomplete, BadgeLabel } from '~/components';
import {
  JoinDiscordTemplate,
  PostTweetTemplate,
  RetweetTweetTemplate,
  LikeTweetTemplate,
  AddTwitterBioTemplate,
} from './MissionTemplates';
import { Grid, Box, useTheme } from '@mui/material';
import ArrowRightUpLongIcon from '../Icons/ArrowRightUpLongIcon';
import { missionTypeMappings } from '~/constants';
import { getUserBadges } from '~/apis';
import { useDebounce } from 'react-use';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

const MissionDynammicTemplate = ({
  missionType,
  platform,
  control,
  errors,
  watch,
}) => {
  switch (platform) {
    case 'discord':
      if (missionType === 'join-discord-server') {
        return (
          <>
            <JoinDiscordTemplate
              control={control}
              errors={errors}
              watch={watch}
            />
          </>
        );
      }
      break;
    case 'twitter':
      switch (missionType) {
        case 'post-tweet':
          return (
            <PostTweetTemplate
              control={control}
              errors={errors}
              watch={watch}
            />
          );
        case 'retweet-tweet':
          return (
            <RetweetTweetTemplate
              control={control}
              errors={errors}
              watch={watch}
            />
          );
        case 'like-tweet':
          return (
            <LikeTweetTemplate
              control={control}
              errors={errors}
              watch={watch}
            />
          );
        case 'add-twitter-bio':
          return (
            <AddTwitterBioTemplate
              control={control}
              errors={errors}
              watch={watch}
            />
          );
        default:
          break;
      }
      break;
    default:
      return null;
  }

  // Return null if no matching conditions are met
  return null;
};

export const MissionActionStep = ({
  control,
  errors,
  setValue,
  watch,
  addQueryParam,
  isManualTrigger,
  trigger,
}) => {
  const { t } = useTranslation();

  const [platforms] = useState([
    { label: 'Discord', value: 'discord' },
    { label: 'Twitter', value: 'twitter' },
  ]);

  const [platformTemplates, setPlatformTemplates] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [badgeSearchString, setBadgeSearchString] = useState('');
  const [badgesLoading, setBadgesLoading] = useState(false);

  const fetchUserBadges = async () => {
    try {
      setBadgesLoading(true);
      const response = await getUserBadges(badgeSearchString);
      if (response.status === 'success') {
        const formattedBadges = response.data.map((badge) => {
          return {
            label: badge.name,
            value: badge.identifier,
          };
        });
        setRewards(formattedBadges);
      }
      setBadgesLoading(false);
    } catch (err) {
      setBadgesLoading(false);
    }
  };

  useDebounce(fetchUserBadges, 500, [badgeSearchString]);

  const maximumEligibilityOptions = [
    {
      value: 'yes',
      label: 'Yes',
    },
    {
      value: 'no',
      label: 'No',
    },
  ];

  const { platform, missionType, missionHasReward, rewardableBadges } = watch();

  const missionRewardSelected = async (value) => {
    setValue('rewardableBadges', [...rewardableBadges, value]);
    if (isManualTrigger) {
      await trigger('rewardableBadges');
    }
  };

  const missionRewardUnselected = (value) => {
    setValue(
      'rewardableBadges',
      rewardableBadges.filter((badge) => badge !== value),
    );
  };

  const getBadgeLabel = (value) => {
    return rewards.find((reward) => reward.value === value)?.label;
  };

  const getPlatformLabel = (value) => {
    return platforms.find((platform) => platform.value === value).label;
  };

  const getMissionTypeLabel = (value) => {
    return platformTemplates.find((template) => template.value === value)
      ?.label;
  };

  useEffect(() => {
    const filteredMissionTypes = Object.keys(missionTypeMappings).filter(
      (missionType) => {
        return missionTypeMappings[missionType].platform === platform;
      },
    );

    const platformTemplates = filteredMissionTypes.map((missionType) => {
      return {
        label: missionTypeMappings[missionType].text,
        value: missionTypeMappings[missionType].value,
      };
    });

    setPlatformTemplates(platformTemplates);
  }, [platform]);

  const theme = useTheme();
  return (
    <MainContainer>
      <CreateMissionMainHeader>{t('Action')}</CreateMissionMainHeader>
      <Grid container mt={5} mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Select Platform')}
            subheader={t('Select a platform for action.')}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Autocomplete
            value={
              platform
                ? { value: platform, label: getPlatformLabel(platform) }
                : ''
            }
            variant="outlined"
            autoCompleteItems={platforms}
            placeholder={t('Select platform')}
            padding="7px"
            onChange={async (_, option) => {
              if (option) {
                setValue('platform', option.value);
                if (isManualTrigger) {
                  await trigger('platform');
                }
              } else {
                setValue('platform', '');
                setValue('missionType', '');
              }
            }}
            clearOnBlur
          />
          {errors && errors.platform && (
            <InformationDescription type="error" my={1}>
              {errors?.platform?.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
      <Grid container mt={5} mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Select Template')}
            subheader={t('Select mission template')}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Autocomplete
            value={
              missionType
                ? {
                    value: missionType,
                    label: getMissionTypeLabel(missionType),
                  }
                : ''
            }
            variant="outlined"
            autoCompleteItems={platformTemplates}
            placeholder={t('Select template')}
            padding="7px"
            onChange={async (_, option) => {
              if (option) {
                setValue('missionType', option.value);
                if (isManualTrigger) {
                  await trigger('missionType');
                }
              }
            }}
            clearOnBlur
          />
          {errors && errors?.missionType && (
            <InformationDescription type="error" my={1}>
              {errors?.missionType?.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>

      <MissionDynammicTemplate
        missionType={missionType}
        platform={platform}
        control={control}
        errors={errors}
        watch={watch}
      />

      <Grid container mt={5} mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Reward')}
            subheader={t(
              'Select reward that user will get once they completed reward',
            )}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Box sx={{ marginLeft: '5px' }}>
            <RadioGroup
              options={maximumEligibilityOptions}
              currentValue={missionHasReward ? 'yes' : 'no'}
              updateCurrentValue={async (updatedValue) => {
                setValue('missionHasReward', updatedValue === 'yes');
                if (isManualTrigger) {
                  await trigger('missionHasReward');
                }
              }}
            />
          </Box>

          {missionHasReward && (
            <>
              <InformationDescription mb={2} mt={4}>
                {t('Select a reward')}
              </InformationDescription>

              <Autocomplete
                variant="outlined"
                autoCompleteItems={rewards.filter(
                  (reward) => !rewardableBadges.includes(reward.value),
                )}
                loading={badgesLoading}
                placeholder={t('Search rewardable badges')}
                padding="7px"
                onChange={(_, option) => {
                  if (option) {
                    missionRewardSelected(option.value);
                    setBadgeSearchString('');
                  }
                }}
                onInputChange={(event, value) => {
                  setBadgeSearchString(value);
                }}
              />

              {rewardableBadges.length > 0 && (
                <BadgesContainer mt={2}>
                  {rewardableBadges.map((badge, index) => (
                    <BadgeLabel
                      key={index}
                      text={getBadgeLabel(badge)}
                      crossable
                      onCross={() => missionRewardUnselected(badge)}
                    />
                  ))}
                </BadgesContainer>
              )}

              <BadgeLabelContainer mt={2}>
                <CreateNewBadgeLabel onClick={() => addQueryParam()}>
                  {t('Create a new badge')}
                </CreateNewBadgeLabel>
                <Box display="flex" component="span" ml={1} mt={0.1}>
                  <ArrowRightUpLongIcon
                    width={12}
                    height={12}
                    color={theme.palette.text.primary}
                  />
                </Box>
              </BadgeLabelContainer>
            </>
          )}

          {errors && errors.rewardableBadges && (
            <InformationDescription type="error" my={1}>
              {errors.rewardableBadges.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
    </MainContainer>
  );
};
