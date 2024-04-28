import { environment } from "../DB/config/environmets";

export const getGeoLocation = async (address: string) => {
  try {
    const geocodeURL = `${environment.MAPBOX_URL_GEOCODIGN}${encodeURIComponent(
      address
    )}.json?access_token=${environment.MAPBOX_TOKEN}`;
    const response = await fetch(geocodeURL);
    const data = await response.json();
    return data.features[0].geometry.coordinates;
  } catch (error) {
    console.error({
      controller: "createEvent.getGeoLocation",
      stack: error,
    });
    return null;
  }
};

export const getNearbyPlaces = async (
  lat: number,
  long: number,
  distance: number
) => {
  try {
    const tilequeryURL = `${environment.MAPBOX_URL_TILEQUERY}${long},${lat}.json?radius=${distance}&access_token=${environment.MAPBOX_TOKEN}`;

    const response = await fetch(tilequeryURL);
    const data = await response.json();
    return data.features.map(
      (feature: {
        properties: { name: any; type: any };
        geometry: { coordinates: any };
      }) => ({
        name: feature.properties.name,
        type: feature.properties.type,
        coordinates: feature.geometry.coordinates,
      })
    );
  } catch (error) {
    console.error({
      controller: "getEventNearbyPlaces.getNearbyPlaces",
      stack: error,
    });
    return [];
  }
};
