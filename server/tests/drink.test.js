import 'cross-fetch/polyfill';
import seedDatabase, { testUser } from './utils/seedDatabase';
import getClient from './utils/getClient';
import prisma from '../src/prisma';
import { createDrink, updateDrink, deleteDrink } from './utils/operations';

beforeEach(seedDatabase);

test('Should create a new drink for test user', async () => {
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

test('Should update a drink', async () => {
  const client = getClient(testUser.jwt);
  const variables = {
    data: {
      id: testUser.drinks[0].id,
      name: 'Honeydew',
      from: 'gong cha',
      price: 4.29
    }
  };
  const {
    data: { updateDrink: drink }
  } = await client.mutate({
    mutation: updateDrink,
    variables
  });

  expect(drink.name).toEqual(variables.data.name);
  expect(drink.from).toEqual(variables.data.from);
  expect(drink.price).toEqual(variables.data.price);
});

test('Should delete a drink', async () => {
  const client = getClient(testUser.jwt);

  const variables = {
    id: testUser.drinks[0].id
  };

  await client.mutate({
    mutation: deleteDrink,
    variables
  });

  const exists = await prisma.exists.Drink({ id: testUser.drinks[0].id });
  expect(exists).toBe(false);
});
