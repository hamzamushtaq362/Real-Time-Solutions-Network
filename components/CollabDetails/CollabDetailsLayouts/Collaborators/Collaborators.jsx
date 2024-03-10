import { useTranslation } from 'react-i18next';
import { collabWorksResponsiveRules } from './elements';
import {
  CollaboratorsCardSkeleton,
  Divider,
  SectionHeader,
  Spacer,
} from 'components';
import Carousel from 'components/Carousel/Carousel';
import CollaboratorCard from 'components/CollabDetails/CollabDetailsLayouts/Collaborators/CollaboratorCard';
import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { calculateSkeletonIterations } from 'utils/utils';
import { GridContainer } from '../../../common/elements';

export const Collaborators = ({
  acceptedMembers,
  admin,
  loading,
  isCollabCoCreators,
  adminCollaboratorRole,
  collabId,
  isLoginUserCoCreatorOfCollab,
  isLoginUserAdmin,
  dontAddPadding,
  hideHeader,
  hideDivider,
}) => {
  const theme = useTheme();
  const defaultPadding = theme.spacing(2, 4);
  const boxPadding = dontAddPadding ? 0 : defaultPadding;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { t } = useTranslation();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const collaborators =
      acceptedMembers?.map((member) => ({
        ...member?.user,
        skill: member?.member?.memberRole?.skill,
        memberId: member?.member?._id,
      })) || [];

    let updatedUsers = collaborators;
    if (admin) {
      updatedUsers = [
        { ...admin, admin: true, adminCollaboratorRole },
        ...collaborators,
      ];
    }

    setUsers(updatedUsers);
  }, [acceptedMembers, admin]);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    // Add event listener to update screenWidth on window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { numberOfSkeletons } = calculateSkeletonIterations(screenWidth);

  return (
    <>
      {!loading ? (
        <>
          {users && (
            <>
              <Box p={boxPadding}>
                {!hideHeader && (
                  <>
                    {!isCollabCoCreators && (
                      <SectionHeader text={t('Collaborators')} />
                    )}
                  </>
                )}
                <Carousel settings={collabWorksResponsiveRules}>
                  {users?.length > 0 &&
                    users?.map(
                      (
                        {
                          imageUrl,
                          fullName,
                          skill,
                          username,
                          adminCollaboratorRole,
                          admin,
                          memberId,
                        },
                        index,
                      ) => (
                        <CollaboratorCard
                          {...{
                            imageUrl,
                            fullName,
                            skill,
                            username,
                            admin,
                            adminCollaboratorRole,
                            memberId,
                            collabId,
                            showEditIcon: isLoginUserAdmin
                              ? true
                              : !admin
                              ? isLoginUserCoCreatorOfCollab
                              : false,
                          }}
                          setCollaborators={setUsers}
                          key={index}
                        />
                      ),
                    )}
                </Carousel>
              </Box>

              {!hideDivider && (
                <Divider color={theme.palette.text.primary} margin={0} />
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Box p={theme.spacing(2, 4)}>
            <Spacer />
            {!hideHeader && <SectionHeader text={t('Collaborators')} />}
            <GridContainer>
              {[...Array(numberOfSkeletons - 1 || 3)].map((index) => (
                <CollaboratorsCardSkeleton key={index} />
              ))}
            </GridContainer>
          </Box>
          <Divider color={theme.palette.text.primary} margin={0} />
        </>
      )}
    </>
  );
};
