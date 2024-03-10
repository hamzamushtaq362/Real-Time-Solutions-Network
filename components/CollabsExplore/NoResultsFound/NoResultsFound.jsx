import { NoResultsContainer, NoResultsText } from './elements';

export const NoResultsFound = ({ text }) => {
  return (
    <NoResultsContainer>
      <NoResultsText>{text || 'No results found'}</NoResultsText>
    </NoResultsContainer>
  );
};
