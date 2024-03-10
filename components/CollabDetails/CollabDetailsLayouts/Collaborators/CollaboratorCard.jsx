import React, { useState } from 'react';
import {
  CollaboratorSkill,
  CollaboratorTitle,
} from 'components/CollabDetails/CollabDetailsLayouts/Collaborators/elements';
import { EditCollaboratorRoleDialog } from '~/components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CollaboratorCardContainer, EditIconContainer } from './elements';
import { UilEdit } from '@iconscout/react-unicons';
import { useTheme } from '@mui/material';

const CollaboratorCard = ({
  imageUrl,
  username,
  fullName,
  skill,
  admin,
  adminCollaboratorRole,
  regularRole,
  memberId,
  collabId,
  showEditIcon,
  setCollaborators,
}) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [openCollaboraorEditDialog, setOpenCollaboraorEditDialog] =
    useState(false);
  const theme = useTheme();

  const handleClickCollaborator = () => {
    router.push(`/@${username}`);
  };
  const profileImage = imageUrl?.includes('boringavatar')
    ? `${imageUrl}&square`
    : imageUrl;

  const getCollaboratorRole = () =>
    admin ? adminCollaboratorRole || 'Collab Author' : regularRole || skill;

  return (
    <>
      <EditCollaboratorRoleDialog
        open={openCollaboraorEditDialog}
        handleClose={() => setOpenCollaboraorEditDialog(false)}
        currentCollaboratorRole={getCollaboratorRole()}
        collabMemberId={memberId} // could be undefined in case of collab author
        collabId={collabId}
        setCollaborators={setCollaborators}
      />

      <Link key={username} href={`/@${username}`}>
        <CollaboratorCardContainer
          onClick={handleClickCollaborator}
          mr={4}
          pb={1}
          ml="2px"
          sx={{ cursor: 'pointer' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered && showEditIcon && (
            <EditIconContainer
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setOpenCollaboraorEditDialog(true);
              }}
            >
              <UilEdit size={20} color={theme?.palette?.background?.default} />
            </EditIconContainer>
          )}

          <img
            width="270px"
            height="270px"
            alt="collaboratorImage"
            src={profileImage}
            style={{ objectFit: 'cover' }}
          />
          <CollaboratorTitle hovered={hovered}>{fullName}</CollaboratorTitle>
          <CollaboratorSkill mt={1}>{getCollaboratorRole()}</CollaboratorSkill>
        </CollaboratorCardContainer>
      </Link>
    </>
  );
};

export default CollaboratorCard;
