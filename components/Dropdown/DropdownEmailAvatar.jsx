import React from 'react';
import { MailFilledIcon } from '~/components';
import { FlexBox } from 'components/common/elements';
import { useTheme } from '@mui/material';

const DropdownEmailAvatar = ({ size }) => {
  const theme = useTheme();
  return (
    <FlexBox justifyContent="center" width="100%" height="100%">
      <MailFilledIcon
        width={size ?? 26}
        height={size ?? 26}
        color={theme.palette.grey.common}
      />
    </FlexBox>
  );
};

export default DropdownEmailAvatar;
