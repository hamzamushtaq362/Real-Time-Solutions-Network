import { Dialog, UserProfileSectionEdit } from '~/components';

export const ContributedProfileEditDialog = ({
  open,
  handleClose,
  userData,
  setUser,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} height={'auto'} width={'auto'}>
      <UserProfileSectionEdit
        isContributedEdit
        userData={userData}
        setContributedUser={setUser}
      />
    </Dialog>
  );
};
