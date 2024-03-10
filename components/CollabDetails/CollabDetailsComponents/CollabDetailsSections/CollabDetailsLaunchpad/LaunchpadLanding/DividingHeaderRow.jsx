import {
  DividingHeaderRowContainer,
  HeaderTitle,
  MidlineDivider,
} from './elements';

export const DividingHeaderRow = ({ title, children }) => {
  return (
    <DividingHeaderRowContainer>
      <HeaderTitle>{title}</HeaderTitle>
      <MidlineDivider />
      {children}
    </DividingHeaderRowContainer>
  );
};
