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
import { FaPlay } from 'react-icons/fa';
import { FiServer } from 'react-icons/fi';
import { MdMusicNote } from 'react-icons/md';
import { Track } from '../components/Form';
import { ListCard } from '../components/ListCard';
import StatsCard from '../components/StatsCard';

export default function Clash() {
  const trackInfo: Track = {
    name: 'Perfect Time',
    artistName: 'Roddy Ricch',
    url: 'https://i1.wp.com/themusicalhype.com/wp-content/uploads/2019/12/roddy-ricch-please-excuse-me-for-being-antisocial-atlantic.jpeg?ssl=1',
  };

  const wuTangTrack: Track = {
    name: 'C.R.E.A.M',
    artistName: 'Wu-Tang Clan',
    url: 'http://4.bp.blogspot.com/_k10O9FWTRzU/TNCsG0vvKzI/AAAAAAAAAz0/bilC88p0Bw0/s1600/wu_tang_clan_enter_the_wu_tang_36_chambers-f.jpg',
  };
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
        <Center mt={4}>
          <Button
            colorScheme="teal"
            size="lg"
            variant="outline"
            rightIcon={<FaPlay />}
          >
            Play
          </Button>
        </Center>
        <StatsList />

        <Grid
          mt={21}
          // h="200px"
          // templateRows="repeat(2, 1fr)"
          templateColumns="repeat(11, 1fr)"
          gap={4}
        >
          <GridItem colSpan={5}>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <ListCard track={trackInfo} />
              ))}
            {/* <ListCard /> */}
          </GridItem>

          <GridItem colSpan={1}>
            <Center height={'100%'}>
              <Divider orientation="vertical" />
            </Center>
          </GridItem>

          <GridItem colSpan={5}>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <ListCard track={wuTangTrack} />
              ))}
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
