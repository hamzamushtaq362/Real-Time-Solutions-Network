import { ChoosePlatformProcessButton } from '~/components';
import {
  ProceedButtonText,
  StepHeaderContainer,
  StepHeaderText,
} from './ChoosePlatform/elements';

export const ChoosePlatformProceedButton = ({
  text,
  children,
  onClick,
  sx,
  width,
  disabled,
  type,
}) => {
  return (
    <ChoosePlatformProcessButton
      type={type}
      onClick={onClick}
      sx={sx}
      width={width}
      disabled={disabled}
    >
      <ProceedButtonText marginRight="6px">{text}</ProceedButtonText> {children}
    </ChoosePlatformProcessButton>
  );
};

export const StepHeader = ({ description }) => {
  return (
    <StepHeaderContainer>
      <StepHeaderText>{description}</StepHeaderText>
    </StepHeaderContainer>
  );
};
