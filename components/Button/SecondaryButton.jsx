import React from 'react';
import { NewSecondaryButton } from './elements';

const SecondaryButton = ({ children, ...rest }) => {
  return (
    <NewSecondaryButton
      disableRipple={true}
      {...rest}
    >
      {children}
    </NewSecondaryButton>
  );
};

export default SecondaryButton;

