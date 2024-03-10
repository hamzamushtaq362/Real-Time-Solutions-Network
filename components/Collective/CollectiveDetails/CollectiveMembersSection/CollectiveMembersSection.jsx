import { useTranslation } from 'react-i18next';
import { TileAddPlaceholder, CreatorProfileCard } from '~/components';

import { SectionMainContainer } from '../elements';
import { Box } from '@mui/material';
import { CollectiveInviteDialog } from 'components/Dialog/CollectiveInviteDialog';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDialog } from 'redux/dialogSlice';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AppContext from 'context/AppContext';

export const CollectiveMembersSection = ({
  members,
  collectiveId,
  collective,
}) => {
  const { t } = useTranslation();

  const { currentDialog } = useSelector((state) => state.dialog);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useContext(AppContext);

  return (
    <SectionMainContainer>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          columnGap: '20px',
          rowGap: '20px',
        }}
      >
        {user?.userId === collective?.admin?._id && (
          <TileAddPlaceholder
            onClick={() => dispatch(setCurrentDialog('open-invite-dialog'))}
            cardTitle={t('Add a team member')}
            minHeight={270}
            width={270}
            height={270}
          />
        )}
        {members?.length > 0 && (
          <>
            {members.map(({ userId: user }) => (
              <CreatorProfileCard
                key={user?._id}
                user={user}
                showSkills={false}
                showIntro={true}
                onClick={() => router.push(`/@${user?.username}`)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </>
        )}
      </Box>
      <CollectiveInviteDialog
        open={currentDialog === 'open-invite-dialog'}
        handleClose={() => dispatch(setCurrentDialog(''))}
        collectiveId={collectiveId}
      />
    </SectionMainContainer>
  );
};
