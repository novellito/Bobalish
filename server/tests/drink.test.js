import 'cross-fetch/polyfill';
import prisma from '../src/prisma';
import seedDatabase, { testUser } from './utils/seedDatabase';
import getClient from './utils/getClient';
import { createDrink } from './utils/operations';

const client = getClient(testUser.jwt);
beforeEach(seedDatabase);

test('Should create a new drink for userOne', async () => {
  const client = getClient(testUser.jwt);
  const variables = {
    data: {
      name: 'Taro',
      from: 'bounce',
      price: 3.99
    }
  };

  expect(testUser.drinks.length).toBe(1);
  const { data } = await client.mutate({
    mutation: createDrink,
    variables
  });

  expect(data.createDrink.creator.drinks.length).toBe(2);
});

// test('Should update a drink', async () => {
//   //   const variables = {
//   //     data: {
//   //       name: 'Andrew',
//   //       email: 'andrew@example.com',
//   //       password: 'pass'
//   //     }
//   //   };
//   //   await expect(
//   //     client.mutate({ mutation: createUser, variables })
//   //   ).rejects.toThrow();
// });

// test('Should delete a drink', async () => {});
