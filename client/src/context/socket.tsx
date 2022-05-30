<<<<<<< HEAD
import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export type SocketContextType = {
  socket: Socket | undefined;
};

const SocketContext = createContext<SocketContextType>({
  socket: undefined,
});

export default SocketContext;
=======
import { createContext, MutableRefObject } from 'react';
import { Socket } from 'socket.io-client';

type SocketConextType = {
  // socket?: MutableRefObject<Socket | undefined>;
  socket?: Socket;
};

export const SocketContext = createContext<SocketConextType>({
  socket: undefined,
});
>>>>>>> 3aca7e2842b31fdde38f56964c485e71b7f78744
