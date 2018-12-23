import gql from 'graphql-tag';
export const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
      }
    }
  }
`;

export const login = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
    }
  }
`;
export const createDrink = gql`
  mutation($data: CreateDrinkInput!) {
    createDrink(data: $data) {
      id
      name
      from
      price
      creator {
        name
        email
        drinks {
          name
          from
          price
        }
      }
    }
  }
`;

export const deleteDrink = gql`
  mutation($id: ID!) {
    deleteDrink(id: $id) {
      id
      name
      from
      price
    }
  }
`;
export const updateDrink = gql`
  mutation($data: UpdateDrinkInput!) {
    updateDrink(data: $data) {
      id
      name
      from
      price
    }
  }
`;
