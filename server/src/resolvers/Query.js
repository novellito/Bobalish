import getUserId from '../utils/getUserId';

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    // console.log(args);
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
    // console.log(args);
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          }
        ]
      };
    }

    // const userId = getUserId(request, false);
    // //   console.log(parent);
    // console.log('email');
    // //   console.log(request);
    // //   console.log('id ', userId);s
    // if (userId && userId === parent.id) {
    //   return parent.email;
    // } else {
    //   return null;
    // }

    return prisma.query.drinks(opArgs, info);
  },
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    console.log(userId);
    return prisma.query.user({
      where: {
        id: userId
      }
    });
  }
};

export { Query as default };
