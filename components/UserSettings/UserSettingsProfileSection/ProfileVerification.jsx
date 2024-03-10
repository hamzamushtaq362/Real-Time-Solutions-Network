import {
  RowContainer,
  RowLabelHeaderContainer,
  RowContentContainer,
  ContentSubContainer,
  InputLabel,
} from '../elements';
import { Spacer, BadgeLabel } from '~/components';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const ProfileVerification = ({ status }) => {
  const { t } = useTranslation();
  return (
    <RowContainer>
      <RowLabelHeaderContainer></RowLabelHeaderContainer>

      <RowContentContainer>
        {/*{(status === 'NOT_APPLIED' || !status) && (*/}
        {/*  <ContentSubContainer>*/}
        {/*    <Box sx={{ display: 'flex', columnGap: '4px' }}>*/}
        {/*      <InputLabel>*/}
        {/*        Proceed with verification process to get more visibility and*/}
        {/*        gain trust*/}
        {/*      </InputLabel>*/}
        {/*    </Box>*/}
        {/*    <Spacer value={10} />*/}
        {/*    <PrimaryButton*/}
        {/*      width={isMobileView ? '100%' : '292px'}*/}
        {/*      onClick={verifyClickHandler}*/}
        {/*    >*/}
        {/*      Verify Profile{' '}*/}
        {/*      <ImageIcon icon={VERIFY_MARK_ICON} sx={{ marginLeft: '4px' }} />*/}
        {/*    </PrimaryButton>*/}
        {/*  </ContentSubContainer>*/}
        {/*)}*/}

        {status === 'PENDING' && (
          <ContentSubContainer>
            <Box sx={{ display: 'flex', columnGap: '4px' }}>
              <InputLabel>{t("Profile Verification Status")}</InputLabel>
            </Box>
            <Spacer value={10} />
            <BadgeLabel text="PENDING" />
          </ContentSubContainer>
        )}

        {status === 'VERIFIED' && (
          <ContentSubContainer>
            <Box sx={{ display: 'flex', columnGap: '4px' }}>
              <InputLabel>{t("Profile Verification Status")}</InputLabel>
            </Box>
            <Spacer value={10} />
            <BadgeLabel text="VERIFIED" />
          </ContentSubContainer>
        )}

        {status === 'REJECTED' && (
          <ContentSubContainer>
            <Box sx={{ display: 'flex', columnGap: '4px' }}>
              <InputLabel>{t("Profile Verification Status")}</InputLabel>
            </Box>
            <Spacer value={10} />
            <BadgeLabel text="REJECTED" />
          </ContentSubContainer>
        )}
      </RowContentContainer>
    </RowContainer>
  );
};
