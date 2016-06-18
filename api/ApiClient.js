import shortid from 'shortid';

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
  trips: {
    1: {
      id: 1,
      departureDate: '2015-10-01',
      returnDate: '2015-11-01',
      title: 'New Zealand Adventure',
      description: 'A super cool holiday to New Zealand',
      image: 'new_zealand_sheep_farm.jpg',
      users: [1, 2],
      stops: [1, 2],
    },
    2: {
      id: 2,
      departureDate: '2015-05-06',
      returnDate: '2015-05-13',
      title: 'Melbourne',
      description: 'A week in Melbourne',
      image: 'Road_to_mount_cook_new_zealand.jpg',
      users: [1, 2],
      stops: [3],
    },
  },
  stops: {
    1: {
      id: 1,
      tripId: 1,
      title: 'Hobbiton',
      description: 'Hobbiton from LOTR',
      address: '501 Buckland Rd, Hinuera, Matamata 3400, New Zealand',
      images: ['hobbiton.jpg'],
      details: [
        {icon: 'phone', label: 'Mobile', value: '0408881111'},
        {icon: 'email', label: 'Email', value: 'test@testaroo.com'},
        {icon: 'price', label: 'Cost', value: '150'}
      ],
      coordinates: {
        lat: -37.872513,
        lng: 175.683291,
      },
    },
    2: {
      id: 2,
      tripId: 1,
      title: 'Milford Sound',
      description: 'Cool scenery',
      address: 'Milford Sound, New Zealand',
      images: ['milford-sound.jpg'],
      details: [
        {icon: 'phone', label: 'Mobile', value: '0408881111'},
        {icon: 'email', label: 'Email', value: 'test@testaroo.com'},
        {icon: 'price', label: 'Cost', value: '150'}
      ],
      coordinates: {
        lat: -44.671892,
        lng: 167.924120,
      },
    },
    3: {
      id: 3,
      tripId: 2,
      title: 'Aquarium!',
      description: 'See some penguins',
      address: 'Sea Life Melbourne Aquarium, Melbourne',
      images: ['melb-aqua.jpg'],
      coordinates: {
        lat: -37.821030,
        lng: 144.958275,
      },
    },
  },
};

export class APIClient {
  constructor(dataFile) {
    this.dataFile = dataFile;
    methods.forEach((method) => {
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const pathItems = path.split('/');
        if (pathItems.length > 1) {
          let data = this[pathItems[1]](method, pathItems.slice(2), params, data);
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
        if (filter.length) {
          return Object.values(this.dataFile.trips)
            .find(trip =>  trip.id == filter[0]);
        } else {
          return this.dataFile.trips;
        }
      case 'put':
        const { departureDate, returnDate, title, description, image, users } = params;
        const tripId = shortid.generate()
        const trip = {
          id: tripId,
          departureDate,
          returnDate,
          title,
          description,
          image,
          users,
        };
        this.dataFile.trips[tripId] = trip;
        return trip;
    }
  }

  stops(method, filter, params={}, data) {
    switch (method) {
      case 'get':
        if (filter.length) {
          return Object.values(this.dataFile.stops)
            .find(stop => stop.id == filter[0]);
        } else if (params.tripId) {
          const { tripId } = params;
          return Object.values(this.dataFile.stops).reduce((filteredStops, stop) => {
            if (stop.tripId == tripId) {
              filteredStops[stop.id] = stop;
            }
            return filteredStops;
          }, {});
        }
      case 'put':
        const { tripId='', title='', description='', address='', images=[], coordinates={} } = params;
        const stop = {
          id: shortid.generate(),
          tripId,
          title,
          description,
          address,
          images,
          coordinates,
        };
        this.dataFile.stops[stop.id] = stop;
        return stop;

      case 'post':
        if (filter.length) {
          const [stopId] = filter;
          if (this.dataFile.stops[stopId]) {
            const { title='', description='', address='', images=[], coordinates={} } = params;
            return Object.assign(this.dataFile.stops[stopId], {
              title,
              description,
              address,
              images,
              coordinates
            });
          }
        }

      case 'delete':
        if (filter.length) {
          const [ stopId ] = filter;
          if (this.dataFile.stops[stopId]) {
            const stop = this.dataFile.stops[stopId];
            delete this.dataFile.stops[stopId];
            return stop;
          }
        }
    }
  }

}

let client;
const apiClientSingleton = () => {
  if (!client) client = new APIClient(fakeApi);
  return client;
}

export default apiClientSingleton;
