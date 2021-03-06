import { createContext, Dispatch, SetStateAction, useState } from 'react';

export type AlertNotification = {
  show: boolean;
  message: string;
};

export type User = {
  id: number;
  username: string;
  avatarUrl?: string;
};

type UserConextType = {
  isLoggedIn: boolean;
  user: User | undefined;
  alertMsg: AlertNotification;
  login: (username: string, password: string) => void;
  signup: (username: string, password: string) => void;
  setAlert: Dispatch<SetStateAction<AlertNotification>>;
  resetAlert: () => void;
  logout: () => void;
};

const UserContext = createContext<UserConextType>({
  isLoggedIn: false,
  user: undefined,
  alertMsg: { show: false, message: '' },
  login: () => {},
  signup: () => {},
  setAlert: () => {},
  resetAlert: () => {},
  logout: () => {},
});

export default UserContext;
