import { useState } from 'react';
import { ActionChipItemContainer, ActionChipItemText } from './elements';
import { Tooltip } from '~/components';

export const ActionChipItem = ({
  actionText,
  icon,
  onClick,
  disabled,
  disabledTooltip,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tooltip disabled={!disabled} title={disabledTooltip}>
      <ActionChipItemContainer
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        hovered={isHovered}
        onClick={onClick}
      >
        {icon}
        <ActionChipItemText>{actionText}</ActionChipItemText>
      </ActionChipItemContainer>
    </Tooltip>
  );
};
