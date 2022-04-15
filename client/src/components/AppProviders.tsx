import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import UserContext from '../context/auth';
import { SocketContext } from '../context/socket';
import useAuth from '../hooks/useAuth';
import { getSocketIoURL } from '../utils';

export default function AppProviders({ children }: any) {
  const { user, login, logout, signup, error, setError } = useAuth();
  const [socket, setSocket] = useState<Socket>();
  // const socket = useRef<Socket>();

  useEffect(() => {
    if (!socket) {
      setSocket(io(getSocketIoURL()));
    }

    if (socket) {
      socket.emit('join', {
        userId: 5,
      });
    }
  }, [socket, user?.id]);

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
