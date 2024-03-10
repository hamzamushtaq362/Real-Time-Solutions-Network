import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useContext } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AddProjectMainHeader,
  MainInformationWrap,
} from '../elements';
import { Box, Grid, useTheme } from '@mui/material';
import {
  ContributedCollaboratorsDrawer,
  Dropdown,
  PrimaryButton,
} from '~/components';
import AppContext from 'context/AppContext';
import { LeftHeaderComp } from 'components/CollabCreate/LeftHeaderComp';
import CreateEventForm from 'components/EventCreate/CreateEventForm';
import ExternalCollabForm from 'components/CollabCreate/AddProject/InformationPage/ExternalCollabForm';
import { AccountTypes, CollabCreatorRoles } from '~/constants';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useNotistack } from '~/hooks';
import PlusIcon from '../../../Icons/PlusIcon';
import { PlusIconWrap } from '../../../Landing/FaqSection/elements';

const InformationPage = ({
  handleContributeProfiles,
  isEdit,
  invitedMembersUserIds,
  contributedProfiles,
}) => {
  const theme = useTheme();
  const { user } = useContext(AppContext);
  const { watch, control, setValue, trigger } = useFormContext();
  const generateSnackbar = useNotistack();
  const { t } = useTranslation();
  const [rolesList, setRolesList] = useState([]);
  const [currentCollabIndex, setCurrentCollabIndex] = useState(0);
  const [isManualTrigger, setIsManualTrigger] = useState(false);
  const [addressString, setAddressString] = useState('');
  const [addressChanged, setAddressChanged] = useState(false);

  const { fields, append } = useFieldArray({
    control,
    name: 'collabList',
  });

  useEffect(() => {
    let roles = [...CollabCreatorRoles];
    if (user?.userRole !== 'admin') {
      roles = roles.filter((role) => role.value !== 'Contributor');
    }
    setRolesList(roles);
  }, []);

  const [contributedProfileDrawerOpen, setContributedProfileDrawerOpen] =
    useState(false);
  const toggleContributedCollaboratorsDrawer = () => {
    setContributedProfileDrawerOpen(!contributedProfileDrawerOpen);
  };

  const handleCreateAnotherCollab = async () => {
    const isFormValid = await trigger();
    if (isFormValid) {
      const collabList = watch('collabList');
      append({
        collabTitle: '',
        collabDescription: '',
        link: '',
        themes: [],
        selectedImages: [],
        selectedPlatforms: [],
        selectedCoCreators: [],
        selectedSuggestions: [],
        achievements: [],
        featuredIn: [],
        releases: [],
        collabLocation: '',
      });
      setTimeout(async () => {
        setCurrentCollabIndex(collabList.length);
      }, 100);
    } else {
      setIsManualTrigger(true);
      generateSnackbar(
        'Please fill in the required information first',
        'error',
      );
    }
  };
  const handleAccordionToggle = async (index) => {
    const isFormValid = await trigger();
    if (isFormValid) {
      setCurrentCollabIndex(currentCollabIndex === index ? null : index);
    } else {
      setIsManualTrigger(true);
      generateSnackbar(
        'Please fill in the required information first',
        'error',
      );
    }
  };
  useEffect(() => {
    setValue('location', addressString);
  }, [addressChanged]);

  const role = watch('role');

  return (
    <>
      {/* Drawers rendering start */}

      <ContributedCollaboratorsDrawer
        handleContributeProfiles={handleContributeProfiles}
        contributedProfiles={contributedProfiles}
        open={contributedProfileDrawerOpen}
        handleClose={toggleContributedCollaboratorsDrawer}
      />

      {/* Drawers rendering ends */}

      <MainInformationWrap>
        {user?.accountType &&
          user.accountType.includes(AccountTypes.StudioGalleryMuseum) && (
            <Grid container my={6}>
              <Grid item lg={2.5} xs={12}>
                <LeftHeaderComp
                  headerText={t('Role')}
                  subheader={t('Choose your role in the collab')}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Dropdown
                  options={rolesList}
                  selectedItem={role}
                  setSelectedItem={(value) => {
                    setValue('role', value);
                  }}
                  width="100%"
                  height={60}
                  placement="right"
                />
              </Grid>
            </Grid>
          )}
        {role === 'Event Host' && (
          <CreateEventForm
            hideCollaborators
            {...{
              isManualTrigger,
              setAddressChanged,
              addressString,
              setAddressString,
            }}
          />
        )}
        <AddProjectMainHeader mb={2} mt={6}>
          {t('Collab Details')}
        </AddProjectMainHeader>

        {role === 'Event Host' ? (
          <>
            {fields.map((item, index) => {
              const title = watch(`collabList[${index}].collabTitle`);
              return (
                <Accordion
                  key={item.id}
                  expanded={index === currentCollabIndex}
                  onChange={() => handleAccordionToggle(index)}
                  elevation={title ? 1 : 0}
                >
                  <AccordionSummary
                    sx={{
                      display: index === currentCollabIndex ? 'none' : 'flex',
                    }}
                  >
                    <Box>{title}</Box>
                    <PlusIconWrap
                      mr={2}
                      isRotated={index === currentCollabIndex}
                    >
                      <PlusIcon
                        width={16}
                        height={16}
                        color={theme.palette.text.primary}
                      />
                    </PlusIconWrap>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ExternalCollabForm
                      {...{
                        isManualTrigger,
                        isEdit,
                        invitedMembersUserIds,
                        toggleContributedCollaboratorsDrawer,
                        item,
                        index,
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </>
        ) : (
          <ExternalCollabForm
            {...{
              isManualTrigger,
              isEdit,
              invitedMembersUserIds,
              toggleContributedCollaboratorsDrawer,
            }}
          />
        )}
        {role === 'Event Host' && (
          <Grid container mb={6}>
            <Grid item lg={2.5} />
            <Grid item lg={6}>
              <PrimaryButton
                restrictHoverStyles
                width="180px"
                onClick={handleCreateAnotherCollab}
                // disabled={!isValid}
              >
                Add another Collab
              </PrimaryButton>
            </Grid>
          </Grid>
        )}
      </MainInformationWrap>
    </>
  );
};

export default InformationPage;
