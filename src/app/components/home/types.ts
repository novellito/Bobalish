export type User = {
  name: string;
  id: number;
};
export type Drink = {
  name: string;
  place: string;
};

export type Query = {
  users: User[];
  drink: Drink[];
};
