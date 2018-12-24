export type User = {
  name: string;
  email: string;
  id: number;
  drinks: Drink[];
};
export type Drink = {
  name: string;
  from: string;
  price: number;
  id: string;
};
export type Location = {
  name: string;
  url: string;
  distance: number;
  rating: number;
  review_count: number;
};

export type Query = {
  users: User[];
  drinks: Drink[];
  me: User;
};
