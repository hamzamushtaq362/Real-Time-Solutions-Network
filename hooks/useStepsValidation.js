import { isEmpty } from '~/utils';
import { useEffect, useState } from 'react';

export default function useStepsValidation({
  errors,
  allStepsMandatoryFields,
  dependencies,
  watch,
  currentStep,
  optionalStep,
  optionalStepVisited,
}) {
  const [errorSteps, setErrorSteps] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const timer = setTimeout(() => {
      if (isMounted) {
        const errorSteps = [];
        const completedSteps = [];
        const errorKeys = Object.keys(errors); // get all error keys

        allStepsMandatoryFields?.forEach((stepRequiredFields, index) => {
          if (errors && !isEmpty(errors)) {
            if (
              errorKeys?.some((key) => stepRequiredFields?.includes(key)) && // if error key is in step required fields
              currentStep > index // if current step is greater than the index of the step with error
            ) {
              errorSteps.push(index);
            }
          }
          if (
            !errorKeys?.some((key) => stepRequiredFields?.includes(key)) && // if error key is not in step required fields
            stepRequiredFields?.every((key) => !isEmpty(watch(key))) // if all required fields are not empty
          ) {
            completedSteps.push(index);
          }
          if (optionalStepVisited) {
            completedSteps.push(optionalStep);
          }
        });

        setCompletedSteps([...new Set(completedSteps)]); // remove duplicates
        setErrorSteps([...new Set(errorSteps)]); // remove duplicates
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, dependencies);

  return { errorSteps, completedSteps };
}
