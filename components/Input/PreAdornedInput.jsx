import React, {useState} from 'react';
import { AdornedInputContainer, StyledInput, AdornmentContainer } from '~/components';

export const PreAdornedInput = ({ startAdornment, ...props }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <AdornedInputContainer
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {startAdornment && <AdornmentContainer hovered={hovered}>{startAdornment}</AdornmentContainer>}
      <StyledInput border='none' {...props} />
    </AdornedInputContainer>
  );
};
