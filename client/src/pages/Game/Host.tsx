import { Box, Flex } from '@chakra-ui/layout';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { SocketContext } from '../../context/socket';

export default function Host() {
  const { socket } = useContext(SocketContext);
  const { id } = useParams();
  const [code, setCode] = useState('0');
  useEffect(() => {
    if (!socket) return; //Socket hasnt initialised Yet.

    socket.emit('host_game', { clashId: id });

    socket.on('lobby_code', async (data) => {
      setCode(data.code);
    });

    console.log(socket);
  }, [socket]);

  return (
    <Flex justifyContent="center" alignItems="center" direction="column">
      Your GameID: {code}
      <Box>Players</Box>
    </Flex>
  );
}
