import { PublicInfoBoxContainer, InfoText } from './elements';
import { PrimaryButton } from '~/components';
import { useRouter } from 'next/router';

export const PublicInfoBox = ({
  message,
  buttonText,
  navigateLink,
  backgroundColor,
  color,
  ...props
}) => {
  const router = useRouter();
  return (
    <PublicInfoBoxContainer backgroundColor={backgroundColor} {...props}>
      <InfoText color={color}>{message}</InfoText>
      {buttonText && (
        <PrimaryButton
          width="120px"
          sx={{ marginLeft: '12px' }}
          onClick={() => router.push(navigateLink)}
        >
          {buttonText}
        </PrimaryButton>
      )}
    </PublicInfoBoxContainer>
  );
};
