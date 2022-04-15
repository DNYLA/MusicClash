import { createContext, MutableRefObject } from 'react';
import { Socket } from 'socket.io-client';

type SocketConextType = {
  // socket?: MutableRefObject<Socket | undefined>;
  socket?: Socket;
};

export const SocketContext = createContext<SocketConextType>({
  socket: undefined,
});
