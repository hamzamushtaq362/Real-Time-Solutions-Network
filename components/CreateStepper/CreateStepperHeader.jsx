import {
  ActionsWrap,
  AddProjectMainHeader,
  ArrowWrap,
  NumberWrap,
  StepsWrap,
  StepWrap,
} from '../CollabCreate/AddProject/elements';
import {
  ArrowDivider,
  OutlinedButton,
  PrimaryButton,
  SmallSpinner,
} from '~/components';
import { useTheme } from '@mui/material';
import { useIsMobileView } from '~/utils';
import { useTranslation } from 'react-i18next';
import { SecondarybarHeader } from 'components/SecondaryNavbar/elements';

const CreateStepperHeader = ({
  headerTitle,
  steps,
  hideDraft,
  currentStepIndex,
  setCurrentStepIndex,
  disabledDraft,
  disabledNext,
  handleDraftSave,
  finalStepText,
  loadingDraft,
  handleNextClick,
  loadingNext,
  errorSteps,
  trigger,
  setIsManualTrigger,
  completedSteps,
  hideNavigator,
}) => {
  const theme = useTheme();
  const isMobileView = useIsMobileView();
  const { t } = useTranslation();
  const isFinalStep = steps?.length - 1 === currentStepIndex;

  return (
    <>
      <SecondarybarHeader>
        <AddProjectMainHeader>{t(headerTitle)}</AddProjectMainHeader>

        {!hideNavigator && (
          <StepsWrap>
            {steps &&
              steps.map((step, index) => (
                <StepWrap
                  key={index}
                  completed={completedSteps?.includes(index)}
                  error={errorSteps?.includes(index)}
                  active={currentStepIndex === index}
                  onClick={async () => {
                    await trigger();
                    setIsManualTrigger(true);
                    setCurrentStepIndex(index);
                  }}
                >
                  <NumberWrap
                    completed={completedSteps?.includes(index)}
                    error={errorSteps?.includes(index)}
                    active={currentStepIndex === index}
                  >
                    {index + 1}
                  </NumberWrap>
                  {t(step)}

                  {index !== steps.length - 1 && (
                    <ArrowWrap>
                      <ArrowDivider
                        width={isMobileView ? 24 : 34}
                        height={52}
                        color={theme.palette.borderLight}
                      />
                    </ArrowWrap>
                  )}
                </StepWrap>
              ))}
          </StepsWrap>
        )}

        {!isMobileView && (
          <ActionsWrap>
            <>
              {!hideDraft && (
                <OutlinedButton
                  disabled={disabledDraft}
                  width="190px"
                  height={50}
                  fontSize={16}
                  marginLeft={8}
                  onClick={handleDraftSave}
                >
                  {loadingDraft ? (
                    <SmallSpinner inverse={true} />
                  ) : (
                    t('Save Draft')
                  )}
                </OutlinedButton>
              )}
            </>

            <PrimaryButton
              width="190px"
              height={50}
              disabled={disabledNext}
              marginLeft={8}
              fontSize={16}
              onClick={handleNextClick}
              type={
                steps?.length - 1 === currentStepIndex ? 'submit' : 'button'
              }
            >
              {loadingNext ? (
                <SmallSpinner />
              ) : isFinalStep ? (
                finalStepText
              ) : (
                t('Next Step')
              )}
            </PrimaryButton>
          </ActionsWrap>
        )}
      </SecondarybarHeader>
    </>
  );
};

export default CreateStepperHeader;
