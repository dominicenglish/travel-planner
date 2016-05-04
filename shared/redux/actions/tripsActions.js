export const  TRIPS_GET             = 'TRIPS_GET',
              TRIPS_GET_SUCCESS     = 'TRIPS_GET_SUCCESS',
              TRIPS_GET_FAIL        = 'TRIPS_GET_FAIL',
              TRIPS_CREATE          = 'TRIPS_CREATE',
              TRIPS_CREATE_SUCCESS  = 'TRIPS_CREATE_SUCCESS',
              TRIPS_CREATE_FAIL     = 'TRIPS_CREATE_FAIL',
              TRIP_GET              = 'TRIP_GET',
              TRIP_GET_SUCCESS      = 'TRIP_GET_SUCCESS',
              TRIP_GET_FAIL         = 'TRIP_GET_FAIL'
              ;

export const getTrips = () => {
  return {
    type: TRIPS_GET
  };
};
export const createTrip = (title) => {
  return {
    type: TRIPS_CREATE,
    title,
  };
};
export const getTrip = (tripId) => {
  return {
    type: TRIP_GET,
    tripId,
  };
};
