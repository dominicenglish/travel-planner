export const
  MAP_CENTRE_SET = 'MAP_CENTRE_SET'
  ;

export const setMapCentre = (lat, lng) => {
  return {
    type: MAP_CENTRE_SET,
    lat,
    lng,
  };
};
