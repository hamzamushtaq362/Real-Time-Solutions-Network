import { useTranslation } from 'react-i18next';
import { Dialog } from '../elements';
import {
  FollowListContainer,
  ListContainer,
  NoFollowersFoundContainer,
  NoFollowersText,
  FollowListFooter,
  FollowDialogHeader,
} from './elements';
import { setCurrentDialog } from '~/redux';

import { Spacer, PrimaryButton } from '~/components';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { FollowListItem } from './FollowListComponents';

export const CollectiveFollowListDialog = ({
  open,
  handleClose,
  followersList,
}) => {
  const { t } = useTranslation();

  // Hooks init
  const dispatch = useDispatch();
  const router = useRouter();

  const listItemClickHandler = (name) => {
    dispatch(setCurrentDialog(''));
    router.push(`/@${name}`);
  };

  return (
    (<Dialog open={open} onClose={handleClose} height="520px" width="400px">
      <FollowListContainer>
        <Spacer value={16} />
        <FollowDialogHeader>{t("Followers")}</FollowDialogHeader>
      </FollowListContainer>
      <ListContainer>
        {followersList?.length > 0 ? (
          <>
            {followersList.map(({ _id, username, imageUrl, skills }) => (
              <FollowListItem
                key={_id}
                id={_id}
                name={username}
                image={imageUrl}
                skills={skills}
                onClick={() => listItemClickHandler(username)}
              />
            ))}
          </>
        ) : (
          <NoFollowersFoundContainer>
            <NoFollowersText>{t("No Followers yet")}</NoFollowersText>
          </NoFollowersFoundContainer>
        )}
      </ListContainer>
      <FollowListFooter>
        <PrimaryButton onClick={handleClose} width="100px" height="40px">{t("Done")}</PrimaryButton>
      </FollowListFooter>
    </Dialog>)
  );
};
