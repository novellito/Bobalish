import getUserId from '../utils/getUserId';
import client from '../utils/yelp';

const Query = {
  async locations(parent, { data }, { prisma }, info) {
    let jsonBody;

    try {
      ({ jsonBody } = await client.search({
        term: 'boba',
        location: data.location ? data.location : 'elmhurst, new york',
        longitude: data.longitude,
        latitude: data.latitude,
        categories:
          'Bubble Tea, Beverage Store, Restaurant, Coffee & Tea, Juice Bars & Smoothies, Cafes, Food',
        limit: 10
      }));
    } catch (err) {
      console.log(err);
    }

    return jsonBody.businesses.map(elem => elem.name);
  },
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          }
        ]
      };
    }
    return prisma.query.users(opArgs, info);
  },
  drinks(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          }
        ]
      };
    }

    return prisma.query.drinks(opArgs, info);
  },
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.user({
      where: {
        id: userId
      }
    });
  },
  async drink(parent, args, { prisma, request }, info) {
    const drinks = await prisma.query.drinks(
      {
        where: {
          id: args.id,
          OR: [
            {
              creator: {
                id: getUserId(request, false)
              }
            }
          ]
        }
      },
      info
    );
    if (drinks.length === 0) {
      throw new Error('Drink not found');
    }

    return drinks[0];
  }
};

export { Query as default };
