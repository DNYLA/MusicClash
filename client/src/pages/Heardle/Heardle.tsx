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
import { getClash, getHeardle } from '../../utils/api/Axios';
import { Heardle } from '../../utils/types';
import ReactPlayer from 'react-player';

export default function DailyHeardle() {
  const bgUrl = 'https://wallpapercave.com/wp/wp1818813.jpg';

  const { artist } = useParams();
  const navigate = useNavigate();
  const textCol = useColorModeValue('gray.400', 'gray.400');
  const [heardle, setHeardle] = useState<Heardle>();
  const [isLoading, setIsLoading] = useState(true);
  const [guesses, setGuesses] = useState([
    { value: 'Down Below', correct: false },
    { value: 'Down Below', correct: false },
    { value: 'Down Below', correct: false },
    { value: 'Down Below', correct: false },
    { value: 'Down Below', correct: false },
  ]);
  const [currentGuess, setCurrentGuess] = useState(3);

  useEffect(() => {
    if (!artist) return;

    getHeardle(artist)
      .then(({ data }) => {
        setHeardle(data);
        setTimeout(() => setIsLoading(false), 1500);
      })
      .catch((err) => {
        console.log(err);
        navigate('/');
      });
  }, [artist]);

  if (!artist)
    return <div>A Heardle does not exist for this artist currently.</div>;

  // return <Box m={5}>{heardle && <div>{heardle.artist}</div>}</Box>;

  if (isLoading || !heardle) return <div>Loading...</div>;

  return (
    <Flex direction="column" mt={25}>
      <Container
        // direction="row"
        // mx={50}
        mb={5}
        d="flex"
        alignItems="center"
        alignContent="center"
        justifyContent="center"
        // minW={'90vw'}
        maxW={'550px'}
      >
        <VStack
          // divider={<StackDivider borderColor="gray.200" />}
          spacing={6}
          align="stretch"
          width={'100%'}
        >
          {guesses.map((guess, i) => {
            let border = '1px solid white';
            if (i < currentGuess) {
              border = '1px solid red';
            } else if (i === currentGuess) {
              console.log(guess.correct);
              border = `2px solid ${guess.correct ? 'green' : 'white'}`;
            }

            return (
              <Box
                h="50px"
                bg="gray.900"
                border={border}
                textAlign={'center'}
                verticalAlign={'center'}
                justifyContent={'center'}
                alignContent={'center'}
                alignItems={'center'}
                p={2}
              >
                <Text fontSize="" noOfLines={1}>
                  {guess.value}
                </Text>
              </Box>
            );
          })}
        </VStack>
      </Container>
      <ReactPlayer url={heardle.url} />
    </Flex>
  );
}
