import { geocodeByPlaceId } from 'react-places-autocomplete';

export const getPlaceDetailsByPlaceId = async (placeId) => {
  try {
    const results = await geocodeByPlaceId(placeId);

    if (results && results.length > 0) {
      const location = results[0].geometry.location;

      const description = results[0].formatted_address; // Extract formatted address

      const lat = location.lat();
      const lng = location.lng();

      return { latitude: lat, longitude: lng, description };
    } else {
      throw new Error('No results found for the given placeId');
    }
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
};
