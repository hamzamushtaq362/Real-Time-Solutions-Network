import React from 'react';
import { CollabTile } from '~/components';

import {
  filterAcceptedCollabMemberDetails,
  filterNullValuesFromArray,
} from '~/utils';
import { CardsEmptyState } from '~/components';
import { GridContainer } from 'components/common/elements';

export const CollabsMapping = ({
  collaborations,
  collabsType,
  emptyStateText,
  setActiveTab,
  buttonText,
  propsForCollabTile,
}) => {
  return (
    <React.Fragment>
      <GridContainer>
        {collaborations && collaborations.length ? (
          filterNullValuesFromArray(collaborations).map(
            (
              {
                _id,
                identifier,
                isLiked,
                creatorId,
                title,
                description,
                platform,
                roles,
                members,
                membersLimit,
                status,
                collabLocation,
                showNearbyTag,
              },
              index,
            ) => (
              <CollabTile
                key={_id}
                index={index}
                id={_id}
                identifier={identifier}
                isLiked={isLiked}
                title={title}
                platforms={platform}
                location={collabLocation}
                roles={roles?.map(({ skill }) => skill)}
                description={description}
                creatorName={creatorId?.fullName}
                creatorId={creatorId?._id}
                members={filterAcceptedCollabMemberDetails(members)}
                membersLimit={membersLimit}
                creatorImage={creatorId?.imageUrl}
                totalCollabs={creatorId?.totalCollabs ?? 0}
                followers={creatorId?.numberOfFollowers}
                connections={creatorId?.connections}
                status={status}
                {...propsForCollabTile}
                showNearbyTag={showNearbyTag}
                sx={{ width: '100% !important', margin: '0 !important' }}
              />
            ),
          )
        ) : (
          <></>
        )}
      </GridContainer>
      <>
        {(!collaborations || collaborations.length === 0) && (
          <CardsEmptyState
            collabsType={collabsType}
            isInvite={false}
            setActiveTab={setActiveTab}
            emptyStateText={emptyStateText}
            buttonText={buttonText}
          />
        )}
      </>
    </React.Fragment>
  );
};
