import bcrypt from 'bcryptjs';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password);
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    });

    return {
      user,
      token: generateToken(user.id)
    };
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: args.data
      },
      info
    );
  },
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    });

    if (!user) {
      throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password);

    if (!isMatch) {
      throw new Error('Unable to login');
    }

    return {
      user,
      token: generateToken(user.id)
    };
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    return prisma.mutation.deleteUser(
      {
        where: {
          id: getUserId(request)
        }
      },
      info
    );
  },
  async createDrink(parent, args, { prisma, request }, info) {
    const user = await prisma.query.user({
      where: {
        id: getUserId(request)
      }
    });

    if (!user) {
      throw new Error('User not found');
    }
    return prisma.mutation.createDrink(
      {
        data: {
          ...args.data,
          creator: { connect: { id: user.id } }
        }
      },
      info
    );
  },
  async updateDrink(parent, args, { prisma, request }, info) {
    const exists = await prisma.exists.Drink({
      id: args.id,
      creator: {
        id: getUserId(request)
      }
    });

    if (!exists) {
      throw new Error('User with given drink not found!');
    }

    const data = {
      name: args.data.name,
      from: args.data.from,
      price: args.data.price
    };
    return prisma.mutation.updateDrink(
      {
        where: {
          id: args.data.id
        },
        data: data
      },
      info
    );
  },
  async deleteDrink(parent, args, { prisma, request }, info) {
    const exists = await prisma.exists.Drink({
      id: args.id,
      creator: {
        id: getUserId(request)
      }
    });

    if (!exists) {
      throw new Error('User with given drink not found!');
    }

    const drink = await prisma.mutation.deleteDrink({
      where: {
        id: args.id
      }
    });

    return drink;
  }
};

export { Mutation as default };
