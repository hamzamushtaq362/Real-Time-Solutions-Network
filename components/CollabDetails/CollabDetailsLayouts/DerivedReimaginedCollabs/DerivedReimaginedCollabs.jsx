import { CollabTile, Divider, SectionHeader } from '~/components';
import React from 'react';
import { filterAcceptedCollabMemberDetails } from '~/utils';
import { Box } from '@mui/material';
import { collabCarouselResponsiveRules } from 'components/DashboardHome/elements';
import Carousel from '../../../Carousel/Carousel';
import { useTheme } from '@mui/material';

export const DerivedReimaginedCollabs = ({ title, derivedBasedOnCollabs }) => {
  const theme = useTheme();

  return (
    <>
      {derivedBasedOnCollabs?.length > 0 &&
        <>
          <Box p={theme.spacing(2, 4)}>
            {/* <HorizontalPadder> */}
            <SectionHeader
              text={`Remimagined from ${title}`}
              withoutButton={true}
            />
            <Carousel settings={collabCarouselResponsiveRules}>
              {derivedBasedOnCollabs.map(
                ({
                  _id,
                  identifier,
                  collabLikes,
                  creatorId,
                  title,
                  description,
                  platform,
                  roles,
                  members,
                  membersLimit,
                }) => (
                  <CollabTile
                    key={_id}
                    identifier={identifier}
                    index={_id}
                    trackEvent
                    id={_id}
                    isLiked={!!collabLikes}
                    title={title}
                    platforms={platform}
                    roles={roles.map(({ skill }) => skill)}
                    description={description}
                    creatorName={creatorId?.fullName && creatorId.fullName}
                    members={filterAcceptedCollabMemberDetails(members)}
                    membersLimit={membersLimit}
                    creatorImage={creatorId?.imageUrl && creatorId.imageUrl}
                    totalCollabs={creatorId?.totalCollabs ?? 0}
                    creatorId={creatorId?._id}
                    followers={
                      creatorId?.numberOfFollowers &&
                      creatorId.numberOfFollowers
                    }
                    connections={creatorId?.connections}
                    hideCurationOption
                  />
                ),
              )}
            </Carousel>
          </Box>
          <Divider color={theme.palette.text.primary} margin={0} />
        </>
      }
    </>
  );
};
