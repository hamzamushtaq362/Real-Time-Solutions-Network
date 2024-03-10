import React from 'react';
import { NewPrimaryButton } from './elements';

const NewButton = ({ children, ...rest }) => {
  return (
    <NewPrimaryButton
      disableRipple={true}
      {...rest}
    >
      {children}
    </NewPrimaryButton>
  );
};

export default NewButton;

