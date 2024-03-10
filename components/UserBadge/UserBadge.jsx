import { UserBadgeContainer, UserBadgeText, BadgeWrapper } from './elements';
import { ImageIcon, Tooltip } from '~/components';

export const UserBadge = ({ text, icon, tooltip }) => {
  return (
    <UserBadgeContainer>
      <Tooltip title={tooltip}>
        <BadgeWrapper>
          <ImageIcon size="24px" icon={icon} />
        </BadgeWrapper>
      </Tooltip>
      {text && <UserBadgeText>{text}</UserBadgeText>}
    </UserBadgeContainer>
  );
};
