import getUserId from '../utils/getUserId';

const Drink = {
  creator: {
    fragment: 'fragment user on Drink { id }',
    resolve(parent, args, { prisma, request }, info) {
      return prisma.query.user({
        where: {
          id: getUserId(request)
        }
      });
    }
  }
};

export { Drink as default };
