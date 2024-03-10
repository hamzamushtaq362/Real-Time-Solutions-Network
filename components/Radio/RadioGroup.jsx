import { BpCheckedIcon, BpIcon, RadioContainer } from './elements';
import { RadioFormControlLabel } from './elements';
import { Radio } from '@mui/material';

export const RadioGroup = ({
  options,
  currentValue,
  updateCurrentValue,
  radioChipWidth,
  inverse,
}) => {
  return (
    <RadioContainer>
      {options.length > 0 &&
        options.map((option, index) => (
          <RadioFormControlLabel
            inverse={inverse}
            width={radioChipWidth}
            key={index}
            value={option.value}
            onChange={() => updateCurrentValue(option.value)}
            checked={currentValue === option.value}
            control={<BpRadio inverse={inverse} />}
            label={option.label}
          />
        ))}
    </RadioContainer>
  );
};

export const BpRadio = (props) => { // bp = blueprintjs
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}