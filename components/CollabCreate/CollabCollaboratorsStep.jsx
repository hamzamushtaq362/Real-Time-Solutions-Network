import React, { useState, useEffect, useContext } from 'react';
import {
  MainContainer,
  CreateCollabMainHeader,
  SubHeading,
  InformationDescription,
  ProfilePhotoContainer,
  ProfilePhotoImage,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InfoLabel,
  InfoValue,
} from './elements';
import { Grid, Box, useTheme } from '@mui/material';
import {
  AddCollaboratorRoleDetails,
  SearchSelectAutocomplete,
} from '~/components';
import { getRandomAvatar, captilalizeString } from '~/utils';
import { roles as suggestedRoles } from 'constants/roles';
import { COLLAB_PAYMENT_MODE } from 'constants/collab';
import { useTranslation } from 'react-i18next';
import AppContext from 'context/AppContext';
import { InfoItemWrap } from 'components/CollabDetails/CollabDetailsComponents/elements';
import { UilEdit, UilPlus, UilMinus } from '@iconscout/react-unicons';

export const CollabCollaboratorsStep = ({
  watch,
  setValue,
  errors,
  trigger,
  isManualTrigger,
  isEdit,
}) => {
  const { user } = useContext(AppContext);
  const [subRolesMap, setSubRolesMap] = useState({});
  const [aboutRolesMap, setAboutRolesMap] = useState({});
  const [expandedRole, setExpandedRole] = useState(false);
  const roles = watch('roles');
  const { t } = useTranslation();

  const handleRoleAdd = async (e, values) => {
    // Check if the skill is already present in the roles
    const isSkillAlreadyAdded = roles.some((role) => role.skill === values[0]);
    if (isSkillAlreadyAdded) {
      return;
    }

    // create a temp object
    const tempRole = {
      skill: values[0],
      paymentType: '',
      paymentMode: COLLAB_PAYMENT_MODE.NoPayment,
      amount: 0,
      subRoles: subRolesMap[values[0]] || [],
      about: aboutRolesMap[values[0]] || '',
    };

    setValue('roles', [...roles, tempRole]);
  };

  const handleSubRoleChange = (e, values, role) => {
    const updatedValues = values.reduce((accumulator, value) => {
      if (value.input) {
        const newValue = value.label
          .replace('Enter to add "', '')
          .replace('"', '');

        if (
          !accumulator.includes(newValue) &&
          !subRolesMap[role]?.includes(newValue)
        ) {
          accumulator.push(newValue);
        }
      } else if (!accumulator.includes(value)) {
        accumulator.push(value);
      }

      return accumulator;
    }, []);

    setSubRolesMap((prevState) => ({
      ...prevState,
      [role]: updatedValues,
    }));
  };

  const theme = useTheme();
  const handleRoleClick = (role) => {
    if (expandedRole === role) {
      setExpandedRole(false);
    } else {
      setExpandedRole(role);
    }
  };

  useEffect(() => {
    if (isEdit) {
      const editAboutRolesMap = {};
      const editSubRolesMap = {};

      roles.forEach((role) => {
        editAboutRolesMap[role.skill] = role.about;
        editSubRolesMap[role.skill] = role.subRoles;
      });

      setSubRolesMap(editSubRolesMap);
      setAboutRolesMap(editAboutRolesMap);
    }
  }, [isEdit]);

  const [openDialog, setopenDialog] = useState(false);
  const [editingRole, setEditingRole] = useState({});

  const updateCollaboratorRole = (role, index) => {
    const updatedRoles = [...roles];
    updatedRoles[index] = role;
    setValue('roles', updatedRoles);
    setopenDialog(false);
  };

  const [roleIndex, setRoleIndex] = useState(0);

  const handleEditRole = (role, index) => {
    setEditingRole(role);
    setRoleIndex(index);
    setopenDialog(true);
  };

  const [isHovered, setIsHovered] = useState(null);

  return (
    <MainContainer>
      <AddCollaboratorRoleDetails
        open={openDialog}
        handleClose={() => setopenDialog(false)}
        suggestedRoles={suggestedRoles}
        handleSubRoleChange={handleSubRoleChange}
        subRolesMap={subRolesMap}
        setSubRolesMap={setSubRolesMap}
        role={editingRole}
        roleIndex={roleIndex}
        updateCollaboratorRole={updateCollaboratorRole}
      />
      <CreateCollabMainHeader>{t('Collaborators')}</CreateCollabMainHeader>
      <Grid container spacing={4} my={3}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Author (You)')}</SubHeading>
        </Grid>
        <Grid
          item
          lg={7}
          xs={12}
          mt={1}
          display="flex"
          columnGap={2}
          alignItems="center"
        >
          <ProfilePhotoContainer>
            <ProfilePhotoImage
              src={
                user?.imageUrl
                  ? user?.imageUrl
                  : getRandomAvatar(user?.username)
              }
            />
          </ProfilePhotoContainer>

          <Box>
            <SubHeading>
              {user?.fullName
                ? user?.fullName
                : captilalizeString(user?.username)}
            </SubHeading>
          </Box>
        </Grid>
      </Grid>
      <Grid container mt={4} mb={4}>
        <Grid item lg={2.5} xs={12}>
          <SubHeading>{t('Looking for')}</SubHeading>
        </Grid>
        <Grid item lg={6} xs={12}>
          <SearchSelectAutocomplete
            freeSolo
            options={suggestedRoles}
            getOptionLabel={(option) => (option.input ? option.label : option)}
            onChange={async (e, newValue) => {
              handleRoleAdd(
                e,
                newValue.map((option) =>
                  option.input
                    ? option.label
                        .replace('Enter to add "', '')
                        .replace('"', '')
                    : option,
                ),
              );
              if (isManualTrigger) {
                await trigger('roles');
              }
            }}
            noOptionsText={t('No Results')}
            placeholder="Roles (max 5)"
            value={[]}
          />
        </Grid>
      </Grid>
      <Grid container mt={4} mb={4}>
        <Grid item lg={2.5}></Grid>
      </Grid>

      <Grid container mt={4} mb={4}>
        <Grid item lg={2.5}></Grid>
        {roles?.length > 0 && (
          <Grid item lg={6} xs={12}>
            <SubHeading
              mt={2}
              mb={2}
              sx={{
                fontWeight: 500,
                letterSpacing: '0.01em',
              }}
            >
              {t('ADDED COLLABORATORS SPOTS')}
            </SubHeading>
            {errors && errors.roles && (
              <InformationDescription type="error" my={1}>
                {errors.roles.message}
              </InformationDescription>
            )}
            {roles?.map((role, index) => (
              <InfoItemWrap
                key={index}
                padding={0}
                borderBottom={
                  expandedRole === role.skill
                    ? 'none'
                    : `1px solid ${theme.palette.borderLight35}`
                }
              >
                <Accordion
                  sx={{ width: '100%' }}
                  key={role.skill}
                  expanded={expandedRole === role.skill}
                  onChange={() => handleRoleClick(role.skill)}
                >
                  <AccordionSummary
                    sx={{
                      width: '100%',
                    }}
                    onMouseEnter={() => setIsHovered(index)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <SubHeading>{role.skill}</SubHeading>

                      {isHovered === index && (
                        <Box
                          sx={{
                            display: 'flex',
                            columnGap: '20px',
                            alignItems: 'center',
                          }}
                        >
                          {expandedRole !== role.skill ? (
                            <UilPlus
                              color={theme.palette.borderLight35}
                              size={20}
                            />
                          ) : (
                            <UilMinus
                              color={theme.palette.borderLight35}
                              size={20}
                            />
                          )}

                          <UilEdit
                            onClick={(e) => {
                              // editRoleHandler(role.skill);
                              handleEditRole(role, index);
                              e.stopPropagation();
                            }}
                            color={theme.palette.borderLight35}
                            size={18}
                          />
                        </Box>
                      )}
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    {role?.about && (
                      <InfoItemWrap paddingTop={0}>
                        <InfoLabel width={130}>About</InfoLabel>
                        <InfoValue paddingBottom={0}>{role?.about}</InfoValue>
                      </InfoItemWrap>
                    )}

                    {role?.subRoles?.length > 0 && (
                      <InfoItemWrap paddingTop={0}>
                        <InfoLabel width={130}>Skill</InfoLabel>
                        <InfoValue>
                          {role.subRoles.map((subRole, index) => (
                            <span key={index}>
                              {subRole}
                              {index < role.subRoles.length - 1 && ', '}
                            </span>
                          ))}
                        </InfoValue>
                      </InfoItemWrap>
                    )}
                  </AccordionDetails>
                </Accordion>
              </InfoItemWrap>
            ))}
          </Grid>
        )}
      </Grid>
    </MainContainer>
  );
};

{
  /* Commenting this for now as we don't have a functionality on the backend to send email invites to non-users */
}
{
  /* <Grid container mb={6}>
  <Grid item lg={2.5} xs={12}>
    <SubHeading>Invite</SubHeading>
  </Grid>
  <Grid item lg={6} xs={12}>
    <InformationDescription mb={2}>
      Add here collaborators who are not registered. We will send them a
      special link.
    </InformationDescription>

    <Autocomplete
      multiple
      freeSolo
      variant="outlined"
      autoCompleteItems={[]}
      placeholder="Add Collaborators by email"
      padding="7px"
      value={emailInvites.map((item) => ({
        inputValue: item,
        title: `Add ${item}`,
      }))}
      onChange={(_, option) => {
        if (option) {
          const stringEmails = option.map((item) => item.inputValue);
          setValue('emailInvites', stringEmails);
        }
      }}
      clearOnBlur
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        const isExisting = options.some(
          (option) => inputValue === option.title,
        );
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option?.inputValue) {
          return option.inputValue;
        }

        return option?.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
    />

    {errors && errors.emailInvites && (
      <InformationDescription type="error" my={1}>
        {errors.emailInvites.message}
      </InformationDescription>
    )}
  </Grid>
</Grid> */
}
