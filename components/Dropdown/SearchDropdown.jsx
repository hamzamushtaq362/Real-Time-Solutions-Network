import { useEffect, useRef, useState } from 'react';
import { CollabItemUser, SearchUserItem } from './DropdownComponents';
import {
  SearchDropdownContainer,
  SearchSectionHeader,
  LocationItemContainer,
  LocationItemText,
} from './elements';
import { useNotistack, useOutsideAlerter } from '~/hooks';
import { SearchInput, Spacer } from '~/components';
import { BASE_URL, fetchContractDetails } from '~/apis';
import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';
import { COLLAB_DEFAULT_IMAGE } from '~/constants';
import { Box, useTheme } from '@mui/material';
import axios from 'axios';
import { useDebounce } from 'react-use';
import { useRouter } from 'next/router';
import FadeIn from '../FadeIn';
import { useTranslation } from 'react-i18next';
import { UilMapMarker } from '@iconscout/react-unicons';
import { setSessionData } from '~/utils';

export const SearchDropdown = ({ width, landing }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [debouncedSearchString, setDebouncedSearchString] = useState('');
  const [isSearchingForContract, setIsSearchingForContract] = useState(false);
  const [contractDetails, setContractDetails] = useState({});

  const [searchedCollabs, setSearchedCollabs] = useState([]);
  const [searchedCreators, setSearchedCreators] = useState([]);
  const [searchedLocations, setSearchedLocations] = useState([]);
  const [placeholder, setPlaceholder] = useState(
    'Search Creators, Collabs and NFTs',
  );

  const wrapperRef = useRef(null);
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();

  useOutsideAlerter(wrapperRef, () => {
    setDropdownOpen(false);
  });
  const generateSnackbar = useNotistack();

  const getContractDetails = async () => {
    try {
      setLoading(true);
      const contractData = await fetchContractDetails(debouncedSearchString);

      if (
        contractData?.asset_contract_type === 'unknown' &&
        contractData?.name === 'Unidentified contract'
      ) {
        setNoResultsFound(true);
      } else {
        setContractDetails(contractData);
        setNoResultsFound(false);
      }
    } catch (error) {
      setNoResultsFound(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      // f1 is for collabs and creators
      const f1 = async () => {
        return await axios.get(
          `${BASE_URL}/api/v1/search/main?searchString=${debouncedSearchString}`,
        );
      };
      const responsef1 = await reFetchTokenExpire(f1, fetchRefreshToken);

      let searchedCollabs = [];
      let searchedCreators = [];

      if (responsef1) {
        const {
          data: { status, collabs, creators },
        } = responsef1;

        if (status === 'success') {
          setSearchedCollabs(collabs);
          setSearchedCreators(creators);

          searchedCollabs = collabs;
          searchedCreators = creators;
        }
      }

      // f2 is for locations
      const f2 = async () => {
        return await axios.get(
          `${BASE_URL}/api/v1/search/location/suggestions?searchString=${debouncedSearchString}`,
        );
      };
      const responsef2 = await reFetchTokenExpire(f2, fetchRefreshToken);

      let searchedLocations = [];

      if (responsef2) {
        const { suggestions } = responsef2.data;

        if (suggestions.length > 0) {
          setSearchedLocations(suggestions);
          searchedLocations = suggestions;
        }
      }

      if (
        searchedCollabs.length === 0 &&
        searchedCreators.length === 0 &&
        searchedLocations.length === 0
      ) {
        setNoResultsFound(true);
        setDropdownOpen(false);
      } else {
        setNoResultsFound(false);
        setDropdownOpen(true);
      }
      setLoading(false);
    } catch {
      generateSnackbar('Something went wrong while fetching results', 'error');
      setLoading(false);
    }
  };

  const resetDropdownState = () => {
    setDropdownOpen(false);
    setSearchedCollabs([]);
    setSearchedCreators([]);
    setNoResultsFound(false);
    setSearchString('');
    setDebouncedSearchString('');
  };

  const itemClickHandler = (path) => {
    router.push(path);
    resetDropdownState();
  };

  const locationMenuItemClickHandler = (placeId, description) => {
    // Please do not remove the commented code below
    router.push(`/collab/explore/location?place=${description}`);

    // router.push(`/collab/explore/location?placeId=${placeId}`);
    setSessionData('currentPlaceDescription', description);
    setSessionData('currentPlaceId', placeId);
    resetDropdownState();
  };

  const handleFocus = () => {
    setPlaceholder('');
  };

  const handleBlur = () => {
    if (!searchString) {
      setPlaceholder('Search Creators, Collabs and NFTs');
    }
  };

  useDebounce(
    () => {
      if (searchString) {
        setDebouncedSearchString(searchString);
      }
    },
    700,
    [searchString],
  );

  useEffect(() => {
    if (
      debouncedSearchString.length === 42 &&
      debouncedSearchString.slice(0, 2) === '0x'
    ) {
      setIsSearchingForContract(true);
      getContractDetails();
    } else if (debouncedSearchString.length > 0) {
      fetchSearchResults();
    } else {
      setDropdownOpen(false);
      setSearchedCollabs([]);
      setSearchedCreators([]);
      setNoResultsFound(false);
    }
  }, [debouncedSearchString]);

  return (
    <>
      <Box ref={wrapperRef} sx={{ position: 'relative' }} data-tour="search">
        <SearchInput
          fontSize="16px"
          padding="12px 8px"
          fontWeight={400}
          onClick={() => setDropdownOpen(true)}
          handleChange={(event) => setSearchString(event.target.value)}
          value={searchString}
          onCross={resetDropdownState}
          showEndAdorment={searchString.length > 0 || placeholder === ''}
          backgroundColor="none"
          dropdownOpen={dropdownOpen}
          placeholder={t(placeholder)}
          placeholderStyle={{
            marginTop: !landing && '5px',
            marginLeft: placeholder === '' ? '11px' : '0',
          }}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          width={width}
        />

        <SearchDropdownContainer open={dropdownOpen}>
          {!loading &&
            !noResultsFound &&
            (isSearchingForContract ? (
              <FadeIn>
                <SearchSectionHeader>{t('Contracts')}</SearchSectionHeader>
                <Spacer value={24} />
                <>
                  <CollabItemUser
                    key={contractDetails.address}
                    name={contractDetails?.name}
                    image={
                      contractDetails?.featured_image_url ||
                      contractDetails?.image_url ||
                      COLLAB_DEFAULT_IMAGE
                    }
                    onClick={() =>
                      itemClickHandler(`/nft/${debouncedSearchString}`)
                    }
                  />
                </>
                <Spacer value={32} />
              </FadeIn>
            ) : (
              <FadeIn>
                {searchedCollabs.length > 0 && (
                  <>
                    <SearchSectionHeader>{t('Collabs')}</SearchSectionHeader>
                    <Spacer value={24} />
                    {searchedCollabs.map(
                      ({ _id, identifier, title, images }) => (
                        <>
                          <CollabItemUser
                            key={_id}
                            name={title}
                            image={
                              images && images.length > 0
                                ? images[0]
                                : COLLAB_DEFAULT_IMAGE
                            }
                            onClick={() =>
                              itemClickHandler(`/collab/${identifier}`)
                            }
                          />
                        </>
                      ),
                    )}
                    <Spacer value={32} />
                  </>
                )}

                {searchedCreators.length > 0 && (
                  <>
                    <SearchSectionHeader>{t('Creators')}</SearchSectionHeader>
                    <Spacer value={24} />
                    {searchedCreators?.map(
                      ({ _id, username, imageUrl, fullName }) => (
                        <>
                          <SearchUserItem
                            onClick={() => itemClickHandler(`/@${username}`)}
                            key={_id}
                            username={username}
                            fullName={fullName}
                            image={imageUrl}
                          />
                        </>
                      ),
                    )}
                  </>
                )}

                {/* Location component code */}

                {searchedLocations.length > 0 && (
                  <>
                    <SearchSectionHeader>{t('Locations')}</SearchSectionHeader>
                    <Spacer value={24} />
                    {searchedLocations.map(({ placeId, description }) => (
                      <>
                        <LocationItemContainer
                          key={placeId}
                          onClick={() =>
                            locationMenuItemClickHandler(placeId, description)
                          }
                        >
                          <UilMapMarker
                            color={theme.palette.grey.common}
                            size={20}
                          />

                          <LocationItemText>{description}</LocationItemText>
                        </LocationItemContainer>
                      </>
                    ))}
                    <Spacer value={32} />
                  </>
                )}

                {/* Ends */}
              </FadeIn>
            ))}
        </SearchDropdownContainer>
      </Box>
    </>
  );
};
