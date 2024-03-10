import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { RadioGroup } from 'components/Radio';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';

export const SelectBadgeOption = ({
  maxBadgeOptions,
  selectedBadgeOption,
  setSelectedBadgeOption,
}) => {
  const { t } = useTranslation();

  return (
    <Grid container mt={1} mb={2}>
      <Grid item lg={2.5} xs={12}>
        <LeftHeaderComp
          headerText={t('Select Badge Design')}
          subheader={t('Unique Name for your badge')}
        />
      </Grid>
      <Grid item lg={9} xs={12}>
        <RadioGroup
          radioChipWidth="200px"
          options={maxBadgeOptions}
          currentValue={selectedBadgeOption}
          updateCurrentValue={(updatedValue) =>
            setSelectedBadgeOption(updatedValue)
          }
        />
      </Grid>
    </Grid>
  );
};
