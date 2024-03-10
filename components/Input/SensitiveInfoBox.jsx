import React, { useState } from 'react';
import {
  EditIconWrap,
  SensitiveBoxWrap,
  Placeholder,
} from 'components/UserSettings/elements';
import { EditIcon } from '~/components';
import { useTheme } from '@mui/material';

const SensitiveInfoBox = ({value, placeholder, onEdit, background}) => {
  const theme = useTheme();

  const [inputHovered, setInputHovered] = useState(false);

  return (
    <SensitiveBoxWrap
      onMouseEnter={() => setInputHovered(true)}
      onMouseLeave={() => setInputHovered(false)}
      hovered={inputHovered}
      background={background}
    >
      {!value ? <Placeholder>{placeholder}</Placeholder>: value}
      {inputHovered &&
        <EditIconWrap
          onClick={onEdit}
        >
          <EditIcon
            width={16}
            height={16}
            color={theme.palette.text.primary}
          />
        </EditIconWrap>
      }
    </SensitiveBoxWrap>
  );
};

export default SensitiveInfoBox;