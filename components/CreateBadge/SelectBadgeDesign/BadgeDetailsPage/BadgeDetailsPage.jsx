import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { InformationDescription } from './elements';
import { Autocomplete, NormalInput } from '~/components';
import { useState } from 'react';
import { RadioGroup } from 'components/Radio';

import { useDebounce } from 'react-use';
import { searchUserMission } from 'apis/mission';
import { Controller } from 'react-hook-form';

import { useEffect } from 'react';
import { DeployEditionContract } from './DeployEditionContract';
import { GrantRTSNBadgeContract } from './GrantRTSNBadgeContract';
import {
  ChainId,
  useAddress,
  ThirdwebSDK,
  useSigner,
} from '@thirdweb-dev/react';
import { useNotistack } from 'hooks/useNotistack';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';
export const BadgeDetailsPage = ({
  setValue,
  errors,
  control,
  userComingFromMission,
  watch,
  trigger,
}) => {
  const { t } = useTranslation();

  const maxChainOptions = [
    {
      value: 'off-chain',
      label: 'Off Chain',
    },
    {
      value: 'on-chain',
      label: 'On Chain',
    },
  ];
  const [loading, setLoading] = useState(false);
  const [userSearchedItems, setUserSearchItems] = useState([]);
  const [searchMissionString, setSearchMissionString] = useState('');
  const handleSelectingMissions = (value) => {
    if (value) {
      const { collabId, missionId } = value;
      setValue('associatedMissions', { collabId, missionId });
    } else {
      setValue('associatedMissions', {});
    }
  };
  const generateSnackbar = useNotistack();
  const [editionContractAddress, setEditionContractAddress] = useState(null);
  const [isUserGrantPermission, setisUserGrantPermission] = useState(false);
  const address = useAddress();
  const signer = useSigner();
  const [sdk, setSdk] = useState(null);

  useEffect(() => {
    if (signer) {
      const sdk = ThirdwebSDK.fromSigner(signer, ChainId.Polygon);
      setSdk(sdk);
    }
  }, [signer]);

  useDebounce(
    async () => {
      setLoading(true);

      if (searchMissionString) {
        const searchedMissions = await searchUserMission(searchMissionString);

        const formattedMission = searchedMissions.map((mission) => {
          return {
            title: mission.title,
            missionId: mission._id,
            collabId: mission.collab,
          };
        });

        setUserSearchItems(formattedMission);
      } else {
        searchUserMission('');
      }

      setLoading(false);
    },
    500,
    [searchMissionString],
  );

  const selectedChainOption = watch('selectedChainOption');

  useEffect(() => {
    if (selectedChainOption === 'on-chain') {
      if (editionContractAddress) {
        setValue('contractAddress', editionContractAddress);
      } else {
        trigger('contractAddress');
      }
      if (isUserGrantPermission) {
        setValue('contractPermission', isUserGrantPermission);
      } else {
        trigger('contractPermission');
      }
    }
  }, [selectedChainOption, editionContractAddress, isUserGrantPermission]);

  const handleBadgeDetailsChange = (e) => {
    const { value, name } = e.target;

    setValue(name, value);
    trigger(name);
  };

  const handleSelectingChainOption = (value) => {
    // dont let user select on chain.
    if (value === 'on-chain') {
      generateSnackbar('On Chain Badges will be available soon', 'error');
      return;
    }

    setValue('selectedChainOption', value);
  };

  return (
    <>
      <Grid container mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Badge Title')}
            subheader={t('Unique Name for your badge')}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <NormalInput
            borderRadius="19px"
            variant="outlined"
            padding="15px"
            type="string"
            placeholder={t('Enter badge name')}
            name={'badgeTitle'}
            value={watch('badgeTitle')}
            handleChange={handleBadgeDetailsChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
              }
            }}
          />

          {errors && errors.badgeTitle && (
            <InformationDescription type="error" my={2} ml={1}>
              {errors?.badgeTitle?.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Description')}
            subheader={t(
              'Write a description of the badge, explaining what it’s about or it’s objectives.',
            )}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <NormalInput
            borderRadius="19px"
            variant="outlined"
            padding="15px"
            type="string"
            placeholder={t('Write description')}
            name={'badgeDescription'}
            value={watch('badgeDescription')}
            handleChange={handleBadgeDetailsChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
              }
            }}
          />

          {errors && errors.badgeDescription && (
            <InformationDescription type="error" my={2} ml={1}>
              {errors?.badgeDescription?.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
      <Grid container mt={5} mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('Supply')}
            subheader={t(
              'Set A supply on your badge if you want to limit the number of times it can be awarded to users.',
            )}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <NormalInput
            borderRadius="19px"
            variant="outlined"
            padding="15px"
            type="string"
            placeholder={t('give supply')}
            name={'supply'}
            value={watch('supply')}
            handleChange={handleBadgeDetailsChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
              }
            }}
          />

          {errors && errors.supply && (
            <InformationDescription type="error" my={2} ml={1}>
              {errors?.supply?.message}
            </InformationDescription>
          )}
        </Grid>
      </Grid>
      {!userComingFromMission && (
        <Grid container mt={5} mb={6}>
          <Grid item lg={2.5} xs={12}>
            <LeftHeaderComp
              headerText={t('Select Mission')}
              subheader={t('Select mission for badge')}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Grid display="flex" columnGap={1}>
              <InformationDescription mb={2}>
                {t('Select Mission')}
              </InformationDescription>
            </Grid>

            <Controller
              name="associatedMissions"
              control={control}
              render={() => (
                <Autocomplete
                  variant="outlined"
                  padding="7px 10px"
                  borderRadius="8px"
                  id="autocomplete"
                  loading={loading}
                  autoCompleteItems={userSearchedItems}
                  onInputChange={(event) => {
                    setSearchMissionString(event.target.value);
                  }}
                  getOptionLabel={(option) => option.title}
                  onChange={(event, value) => handleSelectingMissions(value)}
                  placeholder={t('Search Missions')}
                  clearOnBlur
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                    }
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      )}
      <Grid container mt={5} mb={6}>
        <Grid item lg={2.5} xs={12}>
          <LeftHeaderComp
            headerText={t('On chain - Off Chain')}
            subheader={t('Select your badge is on chain or Off chain')}
          />
        </Grid>

        <Grid item lg={6} xs={12}>
          <Controller
            name="selectedChainOption"
            control={control}
            render={({ field: { value } }) => (
              <RadioGroup
                radioChipWidth="160px"
                options={maxChainOptions}
                currentValue={value}
                updateCurrentValue={(event) =>
                  handleSelectingChainOption(event)
                }
                // updateCurrentValue={(event) => onChange(event)}
              />
            )}
          />
        </Grid>
      </Grid>
      {selectedChainOption === 'on-chain' && (
        <>
          <DeployEditionContract
            contractImage={watch('image')}
            contractTitle={watch('badgeTitle')}
            contractDescription={watch('badgeDescription')}
            editionContractAddress={editionContractAddress}
            setEditionContractAddress={setEditionContractAddress}
            address={address}
            sdk={sdk}
          />

          {errors && errors.contractAddress && (
            <InformationDescription type="error" my={2} ml={1}>
              {errors?.contractAddress?.message}
            </InformationDescription>
          )}
        </>
      )}
      {selectedChainOption === 'on-chain' && (
        <>
          <GrantRTSNBadgeContract
            editionContractAddress={editionContractAddress}
            setisUserGrantPermission={setisUserGrantPermission}
            isUserGrantPermission={isUserGrantPermission}
          />

          {errors && errors.contractPermission && (
            <InformationDescription type="error" my={2} ml={1}>
              {errors?.contractPermission?.message}
            </InformationDescription>
          )}
        </>
      )}
    </>
  );
};
