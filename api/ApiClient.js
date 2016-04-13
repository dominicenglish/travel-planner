const methods = ['get', 'post', 'put', 'delete'];

let fakeApi = {
  auth: {
    userId: 1,
  },
  users: [
    {
      id: 1,
      name: 'Dominic',
      username: 'Ticketmanbob',
      password: '1234',
    },
    {
      id: 2,
      name: 'Tori',
      username: 'tori.condon@gmail.com',
      password: '4321',
    }
  ],
  trips: [
    {
      id: 1,
      departureDate: '2015-10-01',
      returnDate: '2015-11-01',
      title: 'New Zealand Adventure',
      description: 'A super cool holiday to New Zealand',
      image: 'new_zealand_sheep_farm.jpg',
      users: [1, 2],
    },
    {
      id: 2,
      departureDate: '2015-05-06',
      returnDate: '2015-05-13',
      title: 'Melbourne',
      description: 'A week in Melbourne',
      image: 'Road_to_mount_cook_new_zealand.jpg',
      users: [1, 2],
    },
  ],
  stops: [
    {
      id: 1,
      tripId: 1,
      title: 'Hobbiton',
      description: 'Hobbiton from LOTR',
      address: '501 Buckland Rd, Hinuera, Matamata 3400, New Zealand',
      coordinates: {
        lat: '-37.872513',
        lng: '175.683291',
      },
    },
    {
      id: 2,
      tripId: 1,
      title: 'Milford Sound',
      description: 'Cool scenery',
      address: 'Milford Sound, New Zealand',
      coordinates: {
        lat: '-44.671892',
        lng: '167.924120',
      },
    },
    {
      id: 3,
      tripId: 2,
      title: 'Aquarium!',
      description: 'See some penguins',
      address: 'Sea Life Melbourne Aquarium, Melbourne',
      coordinates: {
        lat: '-37.821030',
        lng: '144.958275',
      },
    },
  ],
};

export class APIClient {
  constructor(req) {
    methods.forEach((method) => {
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const pathItems = path.split('/');
        if (pathItems.length > 1) {
          let data = this[pathItems[1]](method, pathItems.slice[2], params, data);
          if (!data || data.err) reject(data.err || 'no data');
          else resolve(data);
        } else {
          reject('invalid path');
        }
        result = this[pathItems]()
      })
    })
  }

  trips(method, filter, params, data) {
    switch (method) {
      case 'get':
        if (filter) {
          return fakeApi.trips[filter];
        } else {
          return fakeApi.trips;
        }
      case 'put':
        // const {trip} = data;
        const trip = {
          id: 3,
          departureDate: '2017-10-01',
          returnDate: '2017-11-01',
          title: 'France',
          description: 'Francy france france',
          image: 'new-zealand-short-trip.jpg',
          users: [1, 2],
        };
        fakeApi.trips.push(trip);
        return trip;
    }
  }

  stops(method, filter, params, data) {
    switch (method) {
      case 'put':
        const { tripId } = data;
        fakeApi.trips[tripId].stops.push({
          id: 4,
          tripId: 2,
          title: 'Coffee!',
          description: 'See some hipsters',
          address: 'Some shop, Melbourne',
          coordinates: {
            lat: '-37.821030',
            lng: '144.958275',
          },
        });
        return fakeApi.trips[tripId].stops;
    }
  }

}

// module.exports.getTrips = () => ({trips: data.trips});
