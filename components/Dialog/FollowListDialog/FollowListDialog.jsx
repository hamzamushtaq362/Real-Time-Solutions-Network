import { useTranslation } from 'react-i18next';
import { Dialog } from '../elements';
import {
  FollowListContainer,
  Tab,
  Tabs,
  ListContainer,
  NoFollowersFoundContainer,
  NoFollowersText,
  FollowListFooter,
} from './elements';
import { setCurrentDialog } from '~/redux';

import { Spacer, PrimaryButton } from '~/components';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { FollowListItem } from './FollowListComponents';

export const FollowListDialog = ({
  open,
  handleClose,
  followTab,
  setFollowTab,
  followersList,
  followingsList,
}) => {
  const { t } = useTranslation();

  // Hooks init
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (_1, newValue) => {
    setFollowTab(newValue);
  };

  const listItemClickHandler = (name) => {
    dispatch(setCurrentDialog(''));
    router.push(`/@${name}`);
  };

  return (
    <Dialog open={open} onClose={handleClose} height="520px" width="400px">
      <FollowListContainer>
        <Spacer value={16} />

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={followTab}
            onChange={handleChange}
            aria-label={t('basic tabs example')}
          >
            <Tab label="Followers" value="followers" />
            {followingsList && <Tab label="Followings" value="followings" />}
          </Tabs>
        </Box>
      </FollowListContainer>
      {followTab === 'followers' && (
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
              <NoFollowersText>{t('No Followers yet')}</NoFollowersText>
            </NoFollowersFoundContainer>
          )}
        </ListContainer>
      )}
      {followingsList && followTab === 'followings' && (
        <ListContainer>
          {followingsList?.length > 0 ? (
            <>
              {followingsList.map(({ _id, username, imageUrl, skills }) => (
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
              <NoFollowersText>{t('No Followings yet')}</NoFollowersText>
            </NoFollowersFoundContainer>
          )}
        </ListContainer>
      )}
      <FollowListFooter>
        <PrimaryButton onClick={handleClose} width="100px" height="40px">
          {t('Done')}
        </PrimaryButton>
      </FollowListFooter>
    </Dialog>
  );
};
