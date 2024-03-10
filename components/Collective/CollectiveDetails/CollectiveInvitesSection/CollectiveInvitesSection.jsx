import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { CreatorProfileCard } from '~/components';
import { CollectiveInvitesSectionContainer } from './elements';
import Link from 'next/link';
import { NoResultsSubText } from '../elements';

export const CollectiveInvitesSection = ({ invites }) => {
  const { t } = useTranslation();

  return (
    <CollectiveInvitesSectionContainer>
      {invites?.length > 0 ? (
        <>
          <Grid container rowSpacing={2.5}>
            {invites?.map((invite) => {
              const { userId, _id } = invite;
              const user = userId;
              return (
                <>
                  <Grid key={_id} item xl={2} lg={4} md={6} sm={6} xs={12}>
                    <Link href={`/@${user?.username}`}>
                      <CreatorProfileCard
                        key={_id}
                        user={user ? user : null}
                        showCompensationSection={false}
                        emailInviteUser={user ? false : true}
                        userEmail={invite?.emailInvite?.email}
                        sx={{ width: '100%', cursor: 'pointer' }}
                      />
                    </Link>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </>
      ) : (
        <>
          <NoResultsSubText sx={{ marginTop: '50px' }}>
            {t('This collective does not have any invites yet')}
          </NoResultsSubText>
        </>
      )}
    </CollectiveInvitesSectionContainer>
  );
};
