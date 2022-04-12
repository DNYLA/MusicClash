import React from 'react';
import UserContext from '../context/auth';
import useAuth from '../hooks/useAuth';

export default function AppProviders({ children }: any) {
  const { user, login, logout } = useAuth();

  return (
    <UserContext.Provider value={{ isLoggedIn: !!user, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
