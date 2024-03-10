import { useTranslation } from 'react-i18next';
import { CollabTile, TileAddPlaceholder } from '~/components';
import { SectionMainContainer } from '../elements';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AppContext from 'context/AppContext';

export const CollectiveAllCollabsSection = ({
  collabs,
  collectiveLink,
  collective,
}) => {
  const { t } = useTranslation();
  const { user } = useContext(AppContext);

  const router = useRouter();

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
            sx={{ marginRight: '10px' }}
            onClick={() => router.push(`${collectiveLink}/project/create`)}
            cardTitle={t('Add New Collab')}
          />
        )}

        {collabs?.length > 0 ? (
          <>
            {collabs?.map((collab, index) => (
              <CollabTile
                key={collab._id}
                index={index}
                title={collab.title}
                identifier={collab?.identifier}
                description={collab.description}
                collectiveCollab={true}
                id={collab._id}
                collectiveLink={collectiveLink}
                creatorName={collective?.title}
                creatorImage={collective?.image}
                totalCollabs={collabs?.length || 0}
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </Box>
    </SectionMainContainer>
  );
};
