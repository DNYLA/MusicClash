import { createContext, useState } from 'react';

export type User = {
  id: number;
  username: string;
  avatarUrl: string;
};

type UserConextType = {
  isLoggedIn: boolean;
  user: User | undefined;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserConextType>({
  isLoggedIn: false,
  user: undefined,
  login: () => {},
  logout: () => {},
});

export default UserContext;
