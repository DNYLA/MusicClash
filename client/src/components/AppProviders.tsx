import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import UserContext from '../context/auth';
import SocketContext from '../context/socket';
import useAuth from '../hooks/useAuth';
import { io } from 'socket.io-client';
import { getSocketUrl } from '../utils';

export default function AppProviders({ children }: any) {
  const { user, login, logout, signup, error, setError } = useAuth();
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (socket) return;

    const sockConnection = io(getSocketUrl(), {
      transports: ['websocket'],
    });

    sockConnection.on('connect', () => {
      console.log('Socket Conected');
    });

    setSocket(sockConnection);
  }, []);

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
      <SocketContext.Provider value={{ socket }}>
        {children}
      </SocketContext.Provider>
    </UserContext.Provider>
  );
}
