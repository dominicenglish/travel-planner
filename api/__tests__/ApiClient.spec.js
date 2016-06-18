jest.unmock('../ApiClient.js');

import { APIClient } from '../ApiClient.js';
import shortid from 'shortid';

describe('APIClient', () => {
  describe('Constructor', () => {
    it('should create get, post, put and delete methods', () => {
      const api = new APIClient({});
      expect(api.get).toBeDefined();
      expect(api.post).toBeDefined();
      expect(api.put).toBeDefined();
      expect(api.delete).toBeDefined();
    });
  });

  describe('trips', () => {
    describe('get', () => {
      it('should return an array of all trips if no filter provided', () => {
        const data = {trips: [{id: 1}, {id: 2}]};
        const api = new APIClient(data);
        const trips = api.trips('get', []);
        expect(trips).toEqual(data.trips);
      });

      it('should return a single trip if filter matches trip id', () => {
        const data = {trips: [{id: 1}, {id: 2}]};
        const api = new APIClient(data);
        const trip = api.trips('get', [1]);
        expect(trip).toEqual(data.trips[0]);
      });

      it('should return undefined if filtered trip doesnt exist', () => {
        const data = {trips: [{id: 1}, {id: 2}]};
        const api = new APIClient(data);
        const trip = api.trips('get', [3]);
        expect(trip).toEqual(undefined);
      });
    });

    describe('put', () => {
      it('should add a new trip', () => {
        const data = {trips: [{id: 1}, {id: 2}]};
        const originalTripsLength = data.trips.length;
        const api = new APIClient(data);
        const params = {};
        const trip = api.trips('put', [], params);
        expect(data.trips.length).toBe(originalTripsLength + 1);
      });

      it('should return the newly created trip', () => {
        const data = {trips: [{id: 1}, {id: 2}]};
        const api = new APIClient(data);
        const params = {
          departureDate: '2016-06-01',
          returnDate: '2016-06-16',
          title: 'Sydney',
          description: 'trip to sydney',
          image: 'some.jpg',
          users: [1, 2],
        };
        const newId = 1;
        const expectedTrip = {...params, id: newId};
        shortid.__resetId__(newId);
        const trip = api.trips('put', [], params);
        expect(trip).toEqual(expectedTrip);
      });
    });
  });

  describe('stops', () => {
    describe('get', () => {
      it('should return trip with id matching filter', () => {
        const data = {
          stops: {
            1: {id: 1, tripId: 10},
            2: {id: 2, tripId: 11},
          }
        };
        const api = new APIClient(data);
        const stopIdToFetch = 1;
        const stop = api.stops('get', [stopIdToFetch]);
        expect(stop).toEqual(data.stops[stopIdToFetch]);
      });

      it('should return trip with tripId matching params.tripId', () => {
        const tripIdToMatch = 10;
        const data = {
          stops: {
            1: {id: 1, tripId: tripIdToMatch},
            2: {id: 2, tripId: 11},
            3: {id: 3, tripId: tripIdToMatch},
          }
        };
        const expectedStops = {1: data.stops[1], 3: data.stops[3]};
        const api = new APIClient(data);
        const stops = api.stops('get', [], {tripId: tripIdToMatch});
        expect(stops).toEqual(expectedStops);
      });
    });

    describe('put', () => {
      it('should add a new stop', () => {
        const data = {stops: {1: {id: 1},2: {id: 2},}};
        const initialLength = Object.keys(data.stops).length;
        const api = new APIClient(data);
        const params = {};
        const stop = api.stops('put', [], params);
        expect(Object.keys(data.stops).length).toEqual(initialLength);
      });

      it('should return the new stop', () => {
        const data = {stops: {1: {id: 1},2: {id: 2},}};
        const initialLength = Object.keys(data.stops).length;
        const api = new APIClient(data);
        const newId = 1;
        shortid.__resetId__(newId);
        const params = {
          tripId: 1,
          title: 'lake',
          description: 'lakey lake',
          address: 'lake st, lakington',
          images: ['one.jpg', 'two.jpg'],
          coordinates: {lat: 27.5, lng: 100.6},
        };
        const stop = api.stops('put', [], params);
        expect(stop).toEqual({...params, id: newId});
      });
    });

    describe('post', () => {
      it('should return undefined if no filter was provided', () => {
        const api = new APIClient({});
        const stop = api.stops('post', []);
        expect(stop).toBe(undefined);
      });

      it('should return undefined if the specified stop doesnt exist', () => {
        const api = new APIClient({stops: {}});
        const stop = api.stops('post', [1]);
        expect(stop).toBe(undefined);
      });

      it('should return correctly update the given stop', () => {
        const data = {stops: {1: {id: 1},2: {id: 2},}};
        const api = new APIClient(data);
        const params = {
          title: 'lake',
          description: 'lakey lake',
          address: 'lake st, lakington',
          images: ['one.jpg', 'two.jpg'],
          coordinates: {lat: 27.5, lng: 100.6},
        };
        const idToUpdate = 1;
        const stop = api.stops('post', [idToUpdate], params);
        expect(stop).toEqual({...data.stops[idToUpdate], ...params});
      });

      it('should correctly update the stops array', () => {
        const data = {stops: {1: {id: 1},2: {id: 2},}};

        const api = new APIClient(data);
        const params = {
          title: 'lake',
          description: 'lakey lake',
          address: 'lake st, lakington',
          images: ['one.jpg', 'two.jpg'],
          coordinates: {lat: 27.5, lng: 100.6},
        };
        const idToUpdate = 1;
        const expectedResult = {...data};
        expectedResult.stops[idToUpdate] = Object.assign(expectedResult.stops[idToUpdate], params);
        const stop = api.stops('post', [idToUpdate], params);
        expect(data).toEqual(expectedResult);
      });
    });

    describe('delete', () => {
      it('should make no changes if no filter is provided', () => {
        const data = {stops: {1: {id: 1},2: {id: 2},}};
        const expectedResult = {...data};
        const api = new APIClient(data);
        const stop = api.stops('delete', []);
        expect(data).toEqual(expectedResult);
      });

      it('should make no changes if object doesnt exist', () => {
        const data = {stops: {1: {id: 1},2: {id: 2},}};
        const expectedResult = {...data};
        const api = new APIClient(data);
        const stop = api.stops('delete', [3]);
        expect(data).toEqual(expectedResult);
      });

      it('should remove the stop specified in the filter', () => {
        const data = {stops: {1: {id: 1},2: {id: 2},}};
        const api = new APIClient(data);
        const stop = api.stops('delete', [1]);
        expect(data.stops).toEqual({2: data.stops[2]});
      });

      it('should return the removed stop', () => {
        const data = {stops: {1: {id: 1},2: {id: 2},}};
        const expectedReturn = {...data.stops[1]};
        const api = new APIClient(data);
        const stop = api.stops('delete', [1]);
        expect(stop).toEqual(expectedReturn);
      });
    });
  });
});
