import { useTranslation } from 'react-i18next';
import { CollectiveCard } from '~/components';
import { NoResultsFound } from '../NoResultsFound';
import { Box } from '@mui/material';
import { GridContainer } from 'components/common/elements';

export const CreatorProfileCollectivesSection = ({ collectives, loading }) => {
  const { t } = useTranslation();

  return (
    (<Box m={4}>
      {!loading ? (
        <>
          {collectives?.length > 0 ? (
            <GridContainer>
              {collectives.map((collective, index) => (
                <CollectiveCard
                  key={index}
                  collective={collective}
                  sx={{ width: '100% !important', margin: '0 !important' }}
                />
              ))}
            </GridContainer>
          ) : (
            <NoResultsFound text={t("This creator is not part of any collective yet")} />
          )}
        </>
      ) : (
        <GridContainer>
          {[...Array(8)].map((index) => (
            <CollectiveCard key={index} skeleton={true} />
          ))}
        </GridContainer>
      )}
    </Box>)
  );
};
