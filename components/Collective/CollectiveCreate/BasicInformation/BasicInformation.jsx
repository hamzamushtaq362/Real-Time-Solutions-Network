import React from 'react';
import {
  AddProjectMainHeader,
  MainInformationWrap,
  SubHeading,
} from '../../../CollabCreate/AddProject/elements';
import CollectiveImage from './CollectiveImage';
import CoverImage from './CoverImage';
import { Box, Grid } from '@mui/material';
import LinearProgressWithLabel from 'components/LinearProgressWithLabel/LinearProgressWithLabel';
import ControllerInput from 'components/PublishNFT/InformationPage/ControllerInput';
import ControllerTextArea from 'components/PublishNFT/InformationPage/ControllerTextArea';
import SocialLinks from 'components/UserSettings/UserSettingsProfileSection/SocialLinks';
import MarketplaceLinks from 'components/UserSettings/UserSettingsProfileSection/MarketplaceLinks';
import { useTranslation } from 'react-i18next';
import { Awards, FeaturedIn, Spacer } from '~/components';
import {
  InputLabel,
  RowContainer,
  RowContentContainer,
  RowLabelHeaderContainer,
} from 'components/UserSettings/elements';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';
import { SingleEditableLink } from 'components/CreatorProfile/EditableLink/SingleEditableLink';
import { PreAdornedInput } from 'components/Input/PreAdornedInput';
import { useIsMobileView } from '~/utils';
import { useFormContext } from 'react-hook-form';

const BasicInformation = ({ uploadProgress, isManualTrigger }) => {
  const {formState: {errors}} = useFormContext();
  const { t } = useTranslation();
  const isMobileView = useIsMobileView();

  return (
    <MainInformationWrap>
      {typeof uploadProgress === 'number' && (
        <Grid container my={4}>
          <Grid item lg={2.5} xs={12}>
            <SubHeading>{t('Uploading Images')}</SubHeading>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Box mb={2}>
              <LinearProgressWithLabel value={uploadProgress} />
            </Box>
          </Grid>
        </Grid>
      )}
      <AddProjectMainHeader>{t('About')}</AddProjectMainHeader>
      <CollectiveImage />
      <CoverImage />
      <ControllerInput
        name="title"
        placeholder={t('Name')}
        heading={t('Name')}
        leftDescription={t('Team Name')}
        isManualTrigger={isManualTrigger}
      />
      <ControllerTextArea
        name="introduction"
        placeholder={t('Write your introduction')}
        heading={t('Introduction')}
        leftDescription={t(
          'Give us a snippet about your Team in 160 characters',
        )}
        isManualTrigger={isManualTrigger}
        maxLength={160}
      />
      <ControllerTextArea
        name="biography"
        placeholder={t('Write your biography')}
        heading={t('Bio')}
        leftDescription={t(
          "Share your Team's mission, vision, and dreams. What impact do you want to make?",
        )}
        isManualTrigger={isManualTrigger}
        maxLength={700}
      />
      <RowContainer>
        <RowLabelHeaderContainer>
          <LeftHeaderComp
            headerText={t('Showreel')}
            subheader={t('Show off your best work with a Showreel video link (optional)')}
          />
        </RowLabelHeaderContainer>

        <RowContentContainer>
          <Box sx={{ width: isMobileView ? '100%' : '64%' }}>
            <SingleEditableLink
              name='showReel'
              AddBtnContent='Add Show reel'
              InputComponent={PreAdornedInput}
            />
            {errors.showReel && (
              <>
                <Spacer value={10} />
                <InputLabel type="error">
                  {errors.showReel.message}
                </InputLabel>
              </>
            )}
          </Box>
        </RowContentContainer>
      </RowContainer>
      <AddProjectMainHeader>{t('Media')}</AddProjectMainHeader>
      <FeaturedIn
        description="Let the world know your triumphs! Share the award details and the date you brought it home."
      />

      <Awards
        title="Achievements"
        description='Let the world know your triumphs! Share the award details and the date you brought it home.'
      />

      <AddProjectMainHeader>{t('Socials')}</AddProjectMainHeader>
      <SocialLinks
        description={t(
          'Give enthusiasts a chance to follow your journey. Where can they find more about you and admire your work?',
        )}
      />
      <MarketplaceLinks
        title="NFT"
        description={t(
          'Into the NFT universe? Add links to your NFT Marketplace for easy access and increased visibility for potential buyers.',
        )}
      />
    </MainInformationWrap>
  );
};

export default BasicInformation;
