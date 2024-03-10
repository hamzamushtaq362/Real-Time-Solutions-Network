import { Dialog } from '../elements';
import { SubHeading, InformationDescription, MainHeader } from './elements';
import { Box, Grid } from '@mui/material';
import {
  PrimaryButton,
  SearchSelectAutocomplete,
  StyledTextArea,
} from '~/components';
import { useState } from 'react';
import SuggestedKeywords from 'components/Chip/SuggestedKeywords/SuggestedKeywords';
import roleSkillsMapping from './roleSkillsMapping.json';
import { useEffect } from 'react';

export const AddCollaboratorRoleDetails = ({
  open,
  handleClose,
  suggestedRoles,
  handleSubRoleChange,
  subRolesMap,
  setSubRolesMap,
  role,
  updateCollaboratorRole,
  roleIndex,
}) => {
  const [updateRole, setUpdateRole] = useState(role);

  useEffect(() => {
    setUpdateRole(role);
  }, [role]);

  useEffect(() => {
    setUpdateRole((prevState) => ({
      ...prevState,
      subRoles: subRolesMap[role.skill] || [],
    }));
  }, [subRolesMap]);

  const onSelectSkill = (suggestedSkill) => {
    const isSkillAlreadyAdded = subRolesMap[role.skill]?.find(
      (skill) => skill === suggestedSkill,
    );

    if (isSkillAlreadyAdded) {
      return;
    }

    const KeyOfSelectedSkills = role.skill;
    const addedSkills = subRolesMap[KeyOfSelectedSkills] || [];

    setSubRolesMap((prevState) => ({
      ...prevState,
      [KeyOfSelectedSkills]: [...addedSkills, suggestedSkill],
    }));
  };

  const [availableSkills, setAvailableSkills] = useState([]);

  // create useEffect for availableSkills
  useEffect(() => {
    const availableSkills = roleSkillsMapping[role.skill]?.filter(
      (skill) => !subRolesMap[role.skill]?.includes(skill),
    );
    availableSkills?.sort(() => 0.5 - Math.random());
    setAvailableSkills(availableSkills?.slice(0, 7));
  }, [role.skill, subRolesMap]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} height="650px" width="672px">
        <Grid item lg={6} padding={'2rem'}>
          <Box>
            <MainHeader>Edit Collaborator Details</MainHeader>
            <InformationDescription>
              Share additional details to attract the right collaborators to
              your collab.{' '}
            </InformationDescription>
          </Box>
          <Box mb={10}>
            <SubHeading mt={2} mb={2}>
              Collaborator title
            </SubHeading>

            <StyledTextArea
              value={updateRole.skill || ''}
              onChange={async (e) => {
                setUpdateRole((prevState) => ({
                  ...prevState,
                  skill: e.target.value,
                }));
              }}
              placeholder="collaborator’s role title"
            />

            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'flexStart'}
              gap={'1rem'}
            >
              <Box>
                <SubHeading mt={2} mb={2}>
                  Describe Your Ideal Collaborators Contributions
                </SubHeading>
                <Grid item lg={12} xs={12} mb={1}>
                  <StyledTextArea
                    value={updateRole.about || ''}
                    onChange={async (e) => {
                      setUpdateRole((prevState) => ({
                        ...prevState,
                        about: e.target.value,
                      }));
                    }}
                    fullWidth
                    placeholder="Describe the collaborator’s role. What do you expect the collaborator to contribute to the collab? (optional)"
                    rows={3}
                  />
                </Grid>
              </Box>
              <Box>
                <SubHeading mb={1}>
                  Specify Necessary Technical & Professional Skills
                </SubHeading>
                <SearchSelectAutocomplete
                  freeSolo
                  options={suggestedRoles}
                  getOptionLabel={(option) =>
                    option.input ? option.label : option
                  }
                  borderRadius={'1rem'}
                  onChange={(e, newValue) =>
                    handleSubRoleChange(e, newValue, role.skill)
                  }
                  noOptionsText={'No Results'}
                  placeholder="Add expected technical or other proficiencies expected from the collaborator (optional)"
                  value={subRolesMap[role.skill] || []}
                />
              </Box>
              <SuggestedKeywords
                onSelectSkill={onSelectSkill}
                availableSkills={availableSkills}
              />
            </Box>

            <PrimaryButton
              marginTop={'1rem'}
              restrictHoverStyles
              onClick={() => updateCollaboratorRole(updateRole, roleIndex)}
              // onClick={() => addRoleHandler(role.skill)}
            >
              Update Collaborator Spot
            </PrimaryButton>
          </Box>
        </Grid>
      </Dialog>
    </>
  );
};
