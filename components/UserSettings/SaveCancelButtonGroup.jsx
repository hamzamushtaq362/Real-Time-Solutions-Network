import { OutlinedButton, PrimaryButton, Spinner } from '~/components';
import { Box, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export const SaveCancelButtonGroup = ({ saving, loading, disabled }) => {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', columnGap: '10px' }}>
      <OutlinedButton
        onClick={() => router.back()}
        disabled={saving || loading}
        restrictHoverStyles
        height="40px"
        width="160px"
      >
        {t('Cancel')}
      </OutlinedButton>
      <PrimaryButton
        type="submit"
        disabled={saving || loading || disabled}
        restrictHoverStyles
        height="40px"
        width="160px"
      >
        {!saving ? (
          t('Save')
        ) : (
          <Spinner size={12} color={theme.palette.background.default} />
        )}
      </PrimaryButton>
    </Box>
  );
};
