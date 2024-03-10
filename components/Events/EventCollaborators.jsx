import { Grid } from '@mui/material';
import { gridProps } from '~/constants';
import { SectionMainContainer } from 'components/Collective/CollectiveDetails/elements';
import CollaboratorCard from '../CollabDetails/CollabDetailsLayouts/Collaborators/CollaboratorCard';
import React from 'react';

export const EventCollaborators = ({
  members,
  addedBy,
  adminCollaboratorRole,
  regularRole,
}) => {
  return (
    <SectionMainContainer>
      <Grid container columnSpacing={2.5} rowSpacing={2.5}>
        {members?.length > 0 ? (
          <>
            {members.map(
              ({ _id, username, imageUrl, fullName, skill }, index) => (
                <Grid key={_id} item {...gridProps}>
                  <CollaboratorCard
                    {...{
                      imageUrl,
                      fullName,
                      skill,
                      username,
                      admin: addedBy?._id === _id,
                      adminCollaboratorRole,
                      regularRole,
                    }}
                    memberId={_id}
                    key={index}
                  />
                </Grid>
              ),
            )}
          </>
        ) : (
          <></>
        )}
      </Grid>
    </SectionMainContainer>
  );
};
