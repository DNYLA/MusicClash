import { Server } from 'socket.io';

export const socketEventHandler = (io: Server) => {
  return io.on('connection', (socket) => {
    socket.on('test', (data) => {
      console.log(data);
    });
  });
};
