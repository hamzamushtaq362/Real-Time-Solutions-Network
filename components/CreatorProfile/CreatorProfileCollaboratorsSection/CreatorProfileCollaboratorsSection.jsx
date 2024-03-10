import { CreatorProfileCard } from '~/components';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { gridProps } from '~/constants';
import { SectionMainContainer } from 'components/Collective/CollectiveDetails/elements';

export const CreatorProfileCollaboratorsSection = ({ members }) => {
  return (
    <SectionMainContainer>
      <Grid container columnSpacing={2.5} rowSpacing={2.5}>
        {members?.length > 0 ? (
          <>
            {members.map(member => (
              <Grid key={member?._id} item {...gridProps}>
                <Link href={`/@${member?.username}`}>
                  <CreatorProfileCard
                    key={member?._id}
                    user={member}
                    showSkills={false}
                    showIntro={true}
                    sx={{ cursor: 'pointer' }}
                  />
                </Link>
              </Grid>
            ))}
          </>
        ) : (
          <></>
        )}
      </Grid>
    </SectionMainContainer>
  );
};
