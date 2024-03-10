import { AIGenerateBadge } from './AIGenerateBadge';
import { UploadImageBadgeOption } from './UploadImageBadgeOption';
import { Grid } from '@mui/material';

export const BadgeOption = ({
  selectedBadgeOption,
  setValue,
  watch,
  errors,
}) => {
  return (
    <>
      <Grid container mt={1} mb={1}>
        {selectedBadgeOption === 'upload-badge' && (
          <UploadImageBadgeOption
            setValue={setValue}
            errors={errors}
            watch={watch}
          />
        )}
        {selectedBadgeOption === 'generate-badge' && (
          <AIGenerateBadge setValue={setValue} watch={watch} errors={errors} />
        )}
      </Grid>
    </>
  );
};
