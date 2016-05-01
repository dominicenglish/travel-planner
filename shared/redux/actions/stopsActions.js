export const
  STOPS_GET = 'STOPS_GET',
  STOPS_GET_SUCCESS = 'STOPS_GET_SUCCESS',
  STOPS_GET_FAIL = 'STOPS_GET_FAIL',
  STOPS_CREATE = 'STOPS_CREATE',
  STOPS_CREATE_SUCCESS = 'STOPS_CREATE_SUCCESS',
  STOPS_CREATE_FAIL = 'STOPS_CREATE_FAIL',
  STOPS_UPDATE = 'STOPS_UPDATE',
  STOPS_UPDATE_SUCCESS = 'STOPS_UPDATE_SUCCESS',
  STOPS_UPDATE_FAIL = 'STOPS_UPDATE_FAIL',
  STOPS_DELETE = 'STOPS_DELETE',
  STOPS_DELETE_SUCCESS = 'STOPS_DELETE_SUCCESS',
  STOPS_DELETE_FAIL = 'STOPS_DELETE_FAIL'
  ;

export const getStops = (tripId) => {
  return {
    type: STOPS_GET,
    tripId,
  };
};

export const createStop = (...props) => {
  return {
    type: STOPS_GET,
    ...props,
  };
};

export const updateStop = (...props) => {
  return {
    type: STOPS_UPDATE,
    ...props,
  };
};

export const deleteStop = (stopId) => {
  return {
    type: STOPS_DELETE,
    stopId,
  };
};
