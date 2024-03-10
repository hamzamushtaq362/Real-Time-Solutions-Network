import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { StyledInput, PlacesAutocompleteDropdownOption } from '~/components';
import {
  AddressDropdownItemsContainer,
  PlacesAutocompleteInputContainer,
  AutocompleteLoadingText,
} from './elements';
import { getPlaceDetailsByPlaceId } from '~/utils';

export const PlacesAutocompleteInput = ({
  addressString,
  setAddressString,
  setAddressChanged,
  setCoordinates,
  setPlaceId,
  id,
  placeholder,
}) => {
  const handleChangeInput = (address) => {
    setAddressString(address);
  };

  const handleSelect = async (address, placeId) => {
    if (placeId) {
      const { latitude, longitude } = await getPlaceDetailsByPlaceId(placeId);

      if (setCoordinates) {
        setCoordinates({
          latitude,
          longitude,
        });
      }

      if (setPlaceId) {
        setPlaceId(placeId);
      }
    }

    setAddressString(address);
    if (setAddressChanged){
      setAddressChanged((prevState) => !prevState);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <PlacesAutocomplete
      value={addressString}
      onChange={handleChangeInput}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <PlacesAutocompleteInputContainer>
            <StyledInput
              id={id}
              padding="10px"
              value={addressString}
              {...getInputProps({
                placeholder: placeholder ? placeholder : 'Location',
              })}
              onKeyDown={handleKeyDown}
            />
            <>
              {loading && (
                <AutocompleteLoadingText>Loading...</AutocompleteLoadingText>
              )}
              {suggestions.length > 0 && (
                <AddressDropdownItemsContainer>
                  {suggestions.map((suggestion, index) => {
                    return (
                      <span {...getSuggestionItemProps(suggestion)} key={index}>
                        <PlacesAutocompleteDropdownOption
                          option={{
                            location: suggestion.description,
                            placeId: suggestion.placeId,
                          }}
                          {...getSuggestionItemProps(suggestion, {
                            onClick: () =>
                              handleSelect(
                                suggestion.description,
                                suggestion.placeId,
                              ),
                          })}
                        />
                      </span>
                    );
                  })}
                </AddressDropdownItemsContainer>
              )}
            </>
          </PlacesAutocompleteInputContainer>
        );
      }}
    </PlacesAutocomplete>
  );
};
