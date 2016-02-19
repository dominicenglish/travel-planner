const methods = ['get', 'post', 'put', 'delete'];

const fakeApi = {
  auth: {
    userId: 1,
  },
  users: {
    1: {
      id: 1,
      name: 'Dominic',
      username: 'Ticketmanbob',
      password: '1234',
    },
    2: {
      id: 2,
      name: 'Tori',
      username: 'tori.condon@gmail.com',
      password: '4321',
    }
  },
  trips: {
    1: {
      id: 1,
      departureDate: '2015-10-01',
      returnDate: '2015-11-01',
      title: 'New Zealand Adventure',
      description: 'A super cool holiday to New Zealand',
      users: [1, 2],
    },
    2: {
      id: 2,
      departureDate: '2015-05-06',
      returnDate: '2015-05-13',
      title: 'Melbourne',
      description: 'A week in Melbourne',
      users: [1, 2],
    },
  },
  stops: {
    1: {
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
    2: {
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
    3: {
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
  },
};

export default class APIClient {
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
    }
  }
}

// module.exports.getTrips = () => ({trips: data.trips});
