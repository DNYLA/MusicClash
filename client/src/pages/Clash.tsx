import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Center,
  HStack,
  Grid,
  GridItem,
  Divider,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { MdMusicNote } from 'react-icons/md';
import { ListCard } from '../components/ListCard';
import StatsCard from '../components/StatsCard';

export default function Clash() {
  // const bgUrl = 'https://wallpapercave.com/wp/wp1818813.jpg';
  const bgUrl =
    'https://media.cultura.com/media/catalog/product/cache/1/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/e/n/enter-the-wu-tang-clan-36-chambers-0888751698512_0.jpg?t=1509590181';
  return (
    <Box m={5}>
      <Box
        p={5}
        shadow="md"
        width={'100%'}
        borderWidth="1px"
        height={150}
        boxShadow="2xl"
        border={'1px'}
        borderColor={'#0F1011'}
        bgImg={bgUrl}
        objectFit="cover"
      >
        <Center>
          <Heading fontSize="5xl">Hip Hop Favourites</Heading>{' '}
        </Center>
        <HStack justifyContent="center">
          <Text>Roddy Ricch</Text>
          <Text>vs</Text>
          <Text>Wu-Tang Clan</Text>
        </HStack>
      </Box>
      <Box mt={5}>
        <HStack>
          <ListCard />
          <Text>vs</Text>

          <ListCard />
        </HStack>
        <HStack mt={5}>
          <ListCard />
          <Text>vs</Text>

          <ListCard />
        </HStack>
        <StatsList />
        <Grid
          mt={5}
          // h="200px"
          // templateRows="repeat(2, 1fr)"
          templateColumns="repeat(11, 1fr)"
          gap={4}
        >
          <GridItem colSpan={5}>
            <ListCard />
            <ListCard />
            <ListCard />
            <ListCard />
            <ListCard />
            <ListCard />
            {/* <ListCard /> */}
          </GridItem>

          <GridItem colSpan={1}>
            <Center height={'100%'}>
              <Divider orientation="vertical" />
            </Center>
          </GridItem>

          <GridItem colSpan={5}>
            <ListCard />
            <ListCard />
            <ListCard />
            <ListCard />
            <ListCard />
            <ListCard />
            <ListCard />
          </GridItem>
          {/* 
          <GridItem rowSpan={4} colSpan={1} justifyContent="space-around">
            <StatsCard
              title={'Current Players'}
              stat={'5,000'}
              icon={<BsPerson size={'3em'} />}
              sx={{ marginBottom: 5 }}
            />
            <StatsCard
              title={'Lobbies'}
              stat={'1,000'}
              icon={<FiServer size={'3em'} />}
              sx={{ marginBottom: 5 }}
            />
            <StatsCard
              title={'Songs'}
              stat={'7'}
              icon={<MdMusicNote size={'3em'} />}
              sx={{ marginBottom: 5 }}
            />
          </GridItem> */}
        </Grid>
      </Box>
    </Box>
  );
}

const StatsList = () => {
  return (
    <Container maxW={'7xl'}>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Current Players'}
            stat={'5,000'}
            icon={<BsPerson size={'3em'} />}
          />
          <StatsCard
            title={'Lobbies'}
            stat={'1,000'}
            icon={<FiServer size={'3em'} />}
          />
          <StatsCard
            title={'Songs'}
            stat={'7'}
            icon={<MdMusicNote size={'3em'} />}
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
};
