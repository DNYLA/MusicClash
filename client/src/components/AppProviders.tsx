<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import UserContext from '../context/auth';
import SocketContext from '../context/socket';
import useAuth from '../hooks/useAuth';
import { io } from 'socket.io-client';
import { getSocketUrl } from '../utils';
=======
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import UserContext from '../context/auth';
import { SocketContext } from '../context/socket';
import useAuth from '../hooks/useAuth';
import { getSocketIoURL } from '../utils';
>>>>>>> 3aca7e2842b31fdde38f56964c485e71b7f78744

export default function AppProviders({ children }: any) {
  const { user, login, logout, signup, error, setError } = useAuth();
  const [socket, setSocket] = useState<Socket>();
<<<<<<< HEAD

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
=======
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
>>>>>>> 3aca7e2842b31fdde38f56964c485e71b7f78744

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
