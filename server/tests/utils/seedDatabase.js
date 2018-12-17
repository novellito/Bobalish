import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma';

const testUser = {
  input: {
    name: 'bob',
    email: 'bob@example.com',
    password: bcrypt.hashSync('bob123')
  },
  user: undefined,
  jwt: undefined,
  drinks: undefined
};

const testDrink = {
  input: {
    name: 'Strawberry boba',
    from: 'bounce',
    price: 3.2
  },
  drink: undefined
};

const seedDatabase = async () => {
  // Delete test data
  await prisma.mutation.deleteManyDrinks();
  await prisma.mutation.deleteManyUsers();
  // Create user one
  testUser.user = await prisma.mutation.createUser({
    data: testUser.input
  });
  testUser.jwt = jwt.sign({ userId: testUser.user.id }, process.env.JWT_SECRET);

  testDrink.drink = await prisma.mutation.createDrink({
    data: {
      ...testDrink.input,
      creator: {
        connect: {
          id: testUser.user.id
        }
      }
    }
  });

  testUser.drinks = [testDrink.drink]; // add the first drink
};

export { seedDatabase as default, testUser, testDrink };
