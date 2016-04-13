export const  TRIPS_GET             = 'TRIPS_GET',
              TRIPS_GET_SUCCESS     = 'TRIPS_GET_SUCCESS',
              TRIPS_GET_FAIL        = 'TRIPS_GET_FAIL',
              TRIPS_CREATE          = 'TRIPS_CREATE',
              TRIPS_CREATE_SUCCESS  = 'TRIPS_CREATE_SUCCESS',
              TRIPS_CREATE_FAIL     = 'TRIPS_CREATE_FAIL'
              ;

export const getTrips = () => {
  return {
    type: TRIPS_GET
  }
};
export const createTrip = (title) => {
  return {
    type: TRIPS_CREATE,
    title,
  };
};
