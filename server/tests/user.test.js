import 'cross-fetch/polyfill';
import prisma from '../src/prisma';
import seedDatabase, { testUser } from './utils/seedDatabase';
import getClient from './utils/getClient';
import { createUser, login, getProfile } from './utils/operations';

const client = getClient();

beforeEach(seedDatabase);

test('Should create a new user', async () => {
  const variables = {
    data: {
      name: 'john',
      email: 'john@example.com',
      password: 'john1233'
    }
  };
  const response = await client.mutate({
    mutation: createUser,
    variables
  });

  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id
  });
  expect(exists).toBe(true);
});

// These tests will intentionally cause graphql errors in getClient()
test('Should not login with invalid credentials', async () => {
  const variables = {
    data: {
      email: 'bob@example.com',
      password: 'bob321'
    }
  };

  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow();
});
// These tests will intentionally cause graphql errors in getClient()
test('Should not signup with a short pw', async () => {
  const variables = {
    data: {
      name: 'Bad pw',
      email: 'bad@example.com',
      password: 'pass'
    }
  };

  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow();
});

test('Should fetch user profile', async () => {
  const client = getClient(testUser.jwt);
  const { data } = await client.query({ query: getProfile });
  expect(data.me.id).toBe(testUser.user.id);
  expect(data.me.name).toBe(testUser.user.name);
  expect(data.me.email).toBe(testUser.user.email);
});
