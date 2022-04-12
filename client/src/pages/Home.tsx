import { Center, Container, Flex, HStack, Stack } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { GameInfo, MenuCard } from '../components/MenuCard';
import UserContext from '../context/auth';

export default function Home() {
  const navigate = useNavigate();
  const { user, login } = useContext(UserContext);

  const gameInfo = {
    imageUrl:
      'https://i.discogs.com/drDRPMm8yMlW1x_tX3Mbdx04Q6ltzHBo-Zbm4zdreBw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0NzUw/MjI3LTE1ODE2OTQy/NTQtNjk5NC5qcGVn.jpeg',
    title: 'Roddy Ricch vs Travis Scott',
    rating: 4,
    songCount: 2,
    playersCount: 12,
    reviewCount: 34,
    newGame: true,
  };

  const gameInfo2 = {
    imageUrl:
      'http://1.bp.blogspot.com/-aVzmKG8bjyg/UMeqkeWLb7I/AAAAAAAABUA/ooU6RkXmZyw/s1600/Good-Kid-m.A.A.d-City-Deluxe-Edition.jpg',
    title: 'Kendrick Lamar vs Wu-Tang ',
    rating: 2,
    songCount: 15,
    playersCount: 20,
    reviewCount: 203,
    newGame: false,
  };

  return (
    <Flex direction="column" mt={25}>
      <Container
        // direction="row"
        // mx={50}
        mb={5}
        // d="flex"
        // alignItems="center"
        // alignContent="center"
        // justifyContent="center"
        minW={'90vw'}
      >
        <Heading mb={2} onClick={login}>
          Popular {user?.username} {user?.id}
        </Heading>
        <Stack
          direction="row"
          // mx={50}
          // mb={5}
          // m={0}
          // d="flex"
          alignItems="center"
          // // justifyContent="center"
          // justify="center"
          overflowX="auto"
        >
          {Array(9)
            .fill('')
            .map((_, i) => (
              <MenuCard
                handleClick={() => navigate(`clash/${i}`)}
                game={i % 2 === 0 ? gameInfo : gameInfo2}
              />
            ))}
        </Stack>
      </Container>
      <Container
        // direction="row"
        // mx={50}
        mb={5}
        // d="flex"
        // alignItems="center"
        // alignContent="center"
        // justifyContent="center"
        minW={'90vw'}
      >
        <Heading mb={2}>Recently Created</Heading>
        <Stack
          direction="row"
          // mx={50}
          // mb={5}
          // m={0}
          // d="flex"
          alignItems="center"
          // // justifyContent="center"
          // justify="center"
          overflowX="auto"
        >
          {Array(9)
            .fill('')
            .map((_, i) => (
              <MenuCard
                handleClick={() => navigate(`clash/${i}`)}
                game={i % 2 === 0 ? gameInfo2 : gameInfo}
              />
            ))}
        </Stack>
      </Container>
    </Flex>
  );
}
