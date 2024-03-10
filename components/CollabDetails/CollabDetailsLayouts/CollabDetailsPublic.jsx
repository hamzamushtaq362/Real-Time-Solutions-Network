import React, { useState, useEffect } from 'react';
import { JoinConsoleContainer, JoinConsoleText } from './elements';
import { Iconify, CollabDetailsMain, Spacer, Divider } from '~/components';
import { Collaborators } from 'components/CollabDetails/CollabDetailsLayouts/Collaborators';
import { Box, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { CollabEvents } from './CollabEvents';
import { CollabWorks } from './CollabWorks';
import SimilarCollabs from './SimilarCollabs';
import { captilalizeString } from '~/utils';

const CollabDetailsPublic = ({ collabResponse }) => {
  const router = useRouter();
  const [collabDetails, setCollabDetails] = useState(null);
  const [errorText, setErrorText] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    if (collabResponse) {
      if (collabResponse.isPrivate) {
        setIsPrivate(true);
        setErrorText(
          collabResponse?.data?.message ||
            'The user has made this collab Private',
        );
      } else {
        setCollabDetails(collabResponse);
      }
    } else {
      setErrorText(
        collabResponse?.data?.message ||
          'Something went wrong or collab not found!',
      );
    }
  }, [collabResponse]);

  const [acceptedMembers, setAcceptedMembers] = useState([]);

  useEffect(() => {
    if (collabDetails) {
      setAcceptedMembers(
        collabDetails?.members?.filter(({ status }) => status === 'ACCEPTED'),
      );
    }
  }, [collabDetails]);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {collabDetails && (
        <>
          <Box sx={{ width: '100%' }}>
            <CollabDetailsMain
              collab={collabDetails}
              showCreatorDetails
              isPublic
              onNavigateBack={() => router.push('/collab/explore')}
            />

            <Spacer value={32} />

            <Collaborators
              acceptedMembers={acceptedMembers}
              admin={collabDetails?.creatorId}
              adminCollaboratorRole={collabDetails?.collabCreatorRole}
              loading={false}
            />

            <CollabEvents collabId={collabDetails?._id} />

            <CollabWorks collabId={collabDetails?._id} hideDivider />

            <SimilarCollabs
              collabDetails={collabDetails}
              title={'Collabs you might be interested in '}
              type={'similar'}
            />

            <Divider color={theme.palette.text.primary} margin={0} />

            <SimilarCollabs
              collabDetails={collabDetails}
              title={`More Collabs by ${captilalizeString(
                collabDetails?.creatorId.fullName,
              )}`}
              type={'creator'}
            />
          </Box>
        </>
      )}
      {errorText && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <JoinConsoleContainer maxWidth="560px">
            {isPrivate && (
              <Iconify
                icon="bxs:lock-open"
                color={theme.palette.grey.common}
                width="25px"
                height="25px"
                sx={{ marginRight: '6px' }}
              />
            )}{' '}
            <JoinConsoleText color={theme.palette.grey.common}>
              {errorText}
            </JoinConsoleText>
          </JoinConsoleContainer>
        </Box>
      )}
    </Box>
  );
};

export default CollabDetailsPublic;
