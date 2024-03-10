export const contructExistingContributedProfilesArray = (collabDetails) => {
  const existingContributedProfiles = [];
  const collabAuthor = collabDetails?.creatorId;

  const collabAuthorProile = {
    name: collabAuthor?.fullName,
    role: '', // TODO: Need to save the role for the author at the backend, currently not being saving
    image: collabAuthor?.imageUrl,
    isCollabAuthor: true,
    isNewCollaborator: false, // Since all profiles are existing, this will be false
    isContributedProfile: collabAuthor?.isContributedProfile,
    userId: collabAuthor?._id,
    twitter: collabAuthor?.social?.find((social) => social?.name === 'twitter')
      ?.value,
  };
  existingContributedProfiles.push(collabAuthorProile);

  if (collabDetails?.members?.length > 0) {
    const existingMembersContributedProfiles = collabDetails?.members?.map(
      (instance) => {
        const memberProfile = {
          name: instance?.user?.fullName,
          role: instance?.member?.memberRole?.skill,
          image: instance?.user?.imageUrl,
          isCollabAuthor: false,
          isNewCollaborator: false, // Since all profiles are existing, this will be false
          isContributedProfile: instance?.user?.isContributedProfile || true,
          userId: instance?.user?._id,
          twitter: instance?.user?.social?.find(
            (social) => social?.name === 'twitter',
          )?.value,
        };
        return memberProfile;
      },
    );

    if (existingMembersContributedProfiles?.length > 0) {
      existingContributedProfiles.push(...existingMembersContributedProfiles);
    }
  }

  return existingContributedProfiles;
};
