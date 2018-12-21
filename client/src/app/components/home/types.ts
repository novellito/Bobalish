export type User = {
  name: string;
  id: number;
};
export type Drink = {
  name: string;
  from: string;
  price: number;
  id: string;
};

export type Query = {
  users: User[];
  drinks: Drink[];
};
