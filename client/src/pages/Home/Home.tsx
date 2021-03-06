import { Center, Container, Flex, HStack, Stack } from '@chakra-ui/layout';
import {
  Collapse,
  Heading,
  ScaleFade,
  Slide,
  SlideFade,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { GameInfo, MenuCard } from '../../components/MenuCard';
import UserContext from '../../context/auth';
import { getClashes } from '../../utils/api/Axios';
import { ClashList } from '../../utils/types';
import HomeSkeletonCards from './card-skeleton';

export default function Home() {
  const navigate = useNavigate();
  const { user, login } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const extraInfo = {
    rating: 4,
    playersCount: 12,
    reviewCount: 34,
  };

  const extraInfo2 = {
    rating: 2,
    playersCount: 20,
    reviewCount: 203,
  };

  const [lists, setLists] = useState<ClashList>({
    popular: [],
    new: [],
  });

  useEffect(() => {
    getClashes(true, true).then(({ data }) => {
      console.log(data);
      setLists(data);
      setTimeout(() => setIsLoading(false), 1500);
    });
  }, []);

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
          // justifyContent="center"
          // justify="center"
          overflowX="auto"
        >
          {!isLoading &&
            lists.popular.map((clash, i) => (
              <MenuCard
                key={i}
                handleClick={() => navigate(`clash/${clash.id}`)}
                clash={clash}
                extraInfo={i % 2 === 0 ? extraInfo : extraInfo2}
              />
            ))}
          <Collapse in={isLoading} animateOpacity>
            <HomeSkeletonCards isLoading={true} amount={6} />
          </Collapse>
        </Stack>
      </Container>
      <Container
        // direction="row"
        // mx={50}
        mt={10}
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
          {!isLoading &&
            lists.new.map((clash, i) => (
              <MenuCard
                key={i}
                handleClick={() => navigate(`clash/${clash.id}`)}
                clash={clash}
                extraInfo={i % 2 === 0 ? extraInfo2 : extraInfo}
              />
            ))}
          <Collapse in={isLoading} animateOpacity>
            <HomeSkeletonCards isLoading={true} amount={6} />
          </Collapse>
        </Stack>
      </Container>
    </Flex>
  );
}
