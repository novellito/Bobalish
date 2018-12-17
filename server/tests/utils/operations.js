import { gql } from 'apollo-boost';

const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const login = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
    }
  }
`;

const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

const createDrink = gql`
  mutation($data: CreateDrinkInput!) {
    createDrink(data: $data) {
      id
      name
      from
      price
      creator {
        drinks {
          name
          from
          price
        }
      }
    }
  }
`;

export { createUser, login, getProfile, createDrink };
