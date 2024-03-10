import React, {useState} from 'react';
import { StyledTextArea } from '~/components';
import { CounterText, CounterWrap } from 'components/common/elements';
import { Box } from '@mui/material';

const StyledTextarea = ({ value, onChange, placeholder, maxLength, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Box position="relative">
      <StyledTextArea
        value={value}
        onChange={async (e) => {
          if (e.target.value?.length <= maxLength) {
            onChange(e);
          }
        }}
        onFocus={() => setIsFocused(true)}
        inputProps={{ onBlur: () => setIsFocused(false) }}
        multiline
        fullWidth
        placeholder={placeholder}
        rows={4}
        maxLength={maxLength}
        {...rest}
      />
      {isFocused && maxLength && value?.length > 50 && (
        <CounterWrap>
          <CounterText>
            {value?.length}/{maxLength}
          </CounterText>
        </CounterWrap>
      )}
    </Box>
  );
};

export default StyledTextarea;