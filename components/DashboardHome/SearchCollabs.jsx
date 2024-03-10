import React from 'react';
import { SearchCollabsWrap, SearchTitle } from 'components/DashboardHome/elements';
import { SearchDropdown } from '~/components';
import { SearchInputContainer } from 'components/Navbar/DashboardNavbar/elements';

const SearchCollabs = () => {
  return (
    <SearchCollabsWrap px={4}>
      <SearchTitle>
        Find Collabs, Creators & Places
      </SearchTitle>
      <SearchInputContainer landing>
        <SearchDropdown landing width={400} />
      </SearchInputContainer>
      {/*<SuggestionText>*/}
      {/*  Suggestions:<Suggestion>Times Square New York</Suggestion>, <Suggestion>Balenciaga</Suggestion>, <Suggestion>BeatSaber</Suggestion>*/}
      {/*</SuggestionText>*/}
    </SearchCollabsWrap>
  );
};

export default SearchCollabs;