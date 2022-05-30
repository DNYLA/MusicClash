import { StarIcon } from '@chakra-ui/icons';
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
import { BsPerson, BsStar } from 'react-icons/bs';
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
  const textCol = useColorModeValue('gray.400', 'gray.400');
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

  // if (isLoading) return ;
  const basicBoxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxSize: '250px',
    color: 'white',
    textShadow: '0 0 20px black',
    fontWeight: 'bold',
    fontSize: '20px',
    px: 4,
    background: `url(${clash?.thumbnail})`,
    width: '100%',
    height: 150,
    objectFit: 'scale-down',
    bgSize: 'contain',
  };
  const handleHost = () => {
    navigate('host');
  };

  return (
    <Box m={5}>
      <ClashSkeleton isLoading={isLoading} />
      {/* <Box sx={basicBoxStyles} filter="grayscale(80%)">
        Box with Filter
      </Box>
      <HStack d="flex" position="absolute" w={100} h={100}>
        <Text zIndex={1000} blur="0px">
          Test
        </Text>
        <Box sx={basicBoxStyles} zIndex={0} filter="auto" blur="2px">
          <Flex></Flex>
        </Box>
      </HStack> */}

      <Box
        p={5}
        shadow="md"
        width={'100%'}
        borderWidth="1px"
        height={150}
        boxShadow="2xl"
        border={'1px'}
        bgImg={clash?.thumbnail}
        // bgSize={'contain'}
        bgSize={'contain'}
        borderColor={'#0F1011'}
        objectFit={'scale-down'}
        rounded="lg"
        // blur="2px"
        filter={'grayscale(80%)'}
        color={'white'}
        textShadow={'0 0 20px black'}
      >
        <Box
          blur={'5px'}
          filter="auto"
          // background={'yellow 0.1'}
          dropShadow={'0 0 30px #333'}
        >
          <Center>
            <Heading fontSize="5xl" textShadow={`4px 5px #000`}>
              {clash?.title}
            </Heading>
          </Center>
          <HStack
            justifyContent="center"
            textColor={''}
            // textShadow={`4px 5px #000`}
            dropShadow={'0 0 30px #333'}
            // color={textCol}
            color={'blue.100'}
            fontSize={'2xl'}
            outline={'5px'}
            outlineColor={'red'}
          >
            <Text>{clash?.TrackSet[0].title}</Text>
            <Text>vs</Text>
            <Text>{clash?.TrackSet[1].title}</Text>
          </HStack>
        </Box>
      </Box>

      <Box mt={5}>
        <Center mt={4}>
          <Button
            colorScheme="teal"
            size="lg"
            variant="outline"
            rightIcon={<FaPlay />}
            onClick={handleHost}
          >
            Play
          </Button>
        </Center>
        <StatsList
          songLength={`${clash?.TrackSet[0].tracks.length} : ${clash?.TrackSet[1].tracks.length}`}
        />
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

const StatsList = ({ songLength }: any) => {
  return (
    <Container maxW={'7xl'}>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Total Plays'}
            stat={'5,000'}
            icon={<BsPerson size={'3em'} />}
          />
          <StatsCard
            title={'Rating'}
            stat={'4.2'}
            icon={<BsStar size={'3em'} />}
          />
          <StatsCard
            title={'Songs'}
            stat={songLength}
            icon={<MdMusicNote size={'3em'} />}
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
};
