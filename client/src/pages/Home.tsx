import { Center, Container, Flex, HStack, Stack } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/react';
import React from 'react';
import Cpwe from '../components/MenuCard';

export default function Home() {
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
        <Heading mb={2}>Popular</Heading>
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
          <Cpwe />
          <Cpwe />
          <Cpwe />
          <Cpwe />
          <Cpwe />
          <Cpwe />
          <Cpwe />
          <Cpwe />
          <Cpwe />
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
          <Cpwe />
          <Cpwe />
          <Cpwe />
          <Cpwe />
          <Cpwe />
          <Cpwe />
          <Cpwe />
          <Cpwe />
          <Cpwe />
        </Stack>
      </Container>
    </Flex>
  );
}
