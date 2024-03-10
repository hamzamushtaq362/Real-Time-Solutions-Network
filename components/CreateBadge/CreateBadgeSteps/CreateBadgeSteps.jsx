import { useTranslation } from 'react-i18next';
import CreateStepperHeader from 'components/CreateStepper/CreateStepperHeader';

export const CreateBadgeSteps = () => {
  const CreateBadgeSteps = ['Select Badge Design', 'Badge Details'];
  const { t } = useTranslation();

  return (<>
    <div>
      <CreateStepperHeader
        headerTitle={t("Create Badge")}
        currentStepIndex={0}
        steps={CreateBadgeSteps}
      />
    </div>
  </>);
};
