import { InformationDescription, SubHeading } from './elements';
import { useIsMobileView } from 'utils/utils';
export const LeftHeaderComp = ({
  headerText,
  subheader,
  subHeaderBreakText,
}) => {
  const isMobileView = useIsMobileView();
  return (
    <>
      <SubHeading>{headerText}</SubHeading>
      <InformationDescription width={!isMobileView ? '60%' : '80%'}>
        {subheader}
        <br />
        {subHeaderBreakText}
      </InformationDescription>
    </>
  );
};
