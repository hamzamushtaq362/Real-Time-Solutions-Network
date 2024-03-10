import { useState } from 'react';
import { ImageIcon } from '~/components';
import { XLogoIcon, DiscordIcon } from '~/assets';
import { MissionCardWrap, MissionTitle, IconWrapper } from './elements';

export const MissionCard = ({ mission, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getMissionIcon = (type) => {
    switch (type) {
      case 'twitter':
        return <ImageIcon size="20px" src={XLogoIcon} />;
      case 'discord':
        return <ImageIcon size="20px" src={DiscordIcon} />;
      default:
        return null;
    }
  };

  return (
    <MissionCardWrap
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      hovered={isHovered}
      onClick={onClick}
    >
      <IconWrapper>{getMissionIcon(mission?.platform)}</IconWrapper>
      <MissionTitle>{mission?.title}</MissionTitle>
    </MissionCardWrap>
  );
};
