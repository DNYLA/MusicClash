import React, { useState } from 'react';
import UserContext from '../context/auth';
import useAuth from '../hooks/useAuth';

export default function AppProviders({ children }: any) {
  const { user, login, logout, signup, error, setError } = useAuth();
  return (
    <UserContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        login,
        logout,
        signup,
        alertMsg: error,
        setAlert: setError,
        resetAlert: () => setError({ show: false, message: '' }),
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
