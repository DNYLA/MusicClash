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
  Skeleton,
  Badge,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { FiServer } from 'react-icons/fi';
import { MdMusicNote } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';
import { ListCard } from '../../components/ListCard';
import StatsCard from '../../components/StatsCard';
import { getClash } from '../../utils/api/Axios';
import { Clash as ClashType, Track } from '../../utils/types';
import ClashSkeleton from './clash-skeleton';

export default function Clash() {
  const bgUrl = 'https://wallpapercave.com/wp/wp1818813.jpg';

  const [clash, setClash] = useState<ClashType>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return navigate('/');
    getClash(id)
      .then(({ data }) => {
        setClash(data);
        setTimeout(() => setIsLoading(false), 1500);
      })
      .catch((err) => {
        console.log(err);
        navigate('/');
      });
  }, [id]);

  if (isLoading) return <ClashSkeleton isLoading={isLoading} />;

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
        rounded="lg"
        dropShadow="lg"
      >
        <Center>
          <Heading fontSize="5xl">{clash?.title}</Heading>
        </Center>
        <HStack justifyContent="center">
          <Text>{clash?.TrackSet[0].title}</Text>
          <Text>vs</Text>
          <Text>{clash?.TrackSet[1].title}</Text>
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
            {clash?.TrackSet[0].tracks.map((t, i) => (
              <ListCard key={i} track={t} />
            ))}
            {/* {Array(5)
              .fill('')
              .map((_, i) => (
                <ListCard key={i} track={clash.} />
              ))} */}
            {/* <ListCard /> */}
          </GridItem>

          <GridItem colSpan={1}>
            <Center height={'100%'}>
              <Divider orientation="vertical" />
            </Center>
          </GridItem>

          <GridItem colSpan={5}>
            {clash?.TrackSet[1].tracks.map((t, i) => (
              <ListCard key={i} track={t} />
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
