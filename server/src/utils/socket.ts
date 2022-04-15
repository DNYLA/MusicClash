import { Server, Socket } from 'socket.io';

export const socketHandler = (io: Server) => {
  return io.on('connection', (socket: Socket) => {
    console.log(`Socket Connected: ${socket.id}`);
    socket.on('join', async ({ userId }) => {
      console.log('Hi');
    });

    socket.on('host_game', async ({ clashId }) => {
      console.log(clashId);
      //const code = CallFunctionToGenerateCode()
      const code = `${clashId}2321`;
      socket.emit('lobby_code', { code });
    });
  });
};
