import {
  ListItemContainer,
  FollowNameText,
  FollowSubText,
  TextBox,
} from './elements';

import { truncateString } from '~/utils';
import { Avatar, Tooltip } from '~/components';

export const FollowListItem = ({ name, image, skills, onClick }) => {

  const skillsString = skills?.length > 0 ? skills?.join(', ') : '';

  return (
    (<ListItemContainer onClick={onClick}>
      <Avatar avatar={image} />
      <TextBox>
        <FollowNameText>{name}</FollowNameText>
        <Tooltip title={skillsString} enterDelay={1500}>
          <FollowSubText>
            {" "}
            {skillsString.length > 40
              ? truncateString(skillsString, 37)
              : skillsString}
          </FollowSubText>
        </Tooltip>
      </TextBox>
    </ListItemContainer>)
  );
};
