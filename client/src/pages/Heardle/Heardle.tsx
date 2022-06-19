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
  Spacer,
  Progress,
  Input,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { BsPerson, BsStar } from 'react-icons/bs';
import { FaOptinMonster, FaPlay } from 'react-icons/fa';
import { FiServer } from 'react-icons/fi';
import { MdMusicNote } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';
import { ListCard } from '../../components/ListCard';
import StatsCard from '../../components/StatsCard';
import { getClash, getHeardle } from '../../utils/api/Axios';
import { Heardle } from '../../utils/types';
import ReactPlayer from 'react-player';

const MAX_SNIPPET_TIME = 15;

export default function DailyHeardle() {
  const bgUrl = 'https://wallpapercave.com/wp/wp1818813.jpg';

  const { artist } = useParams();
  const navigate = useNavigate();
  const textCol = useColorModeValue('gray.400', 'gray.400');
  const [heardle, setHeardle] = useState<Heardle>();
  const [isLoading, setIsLoading] = useState(true);
  const [guesses, setGuesses] = useState([
    { value: '', correct: false },
    { value: '', correct: false },
    { value: '', correct: false },
    { value: '', correct: false },
    { value: '', correct: false },
  ]);

  const [playerSettings, setPlayerSettings] = useState({
    playing: false,
    muted: false,
    controls: false,
  });
  const [currentGuess, setCurrentGuess] = useState(0);
  const [guessText, setGuessText] = useState('');
  const [progress, setProgress] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const playerReff = useRef<ReactPlayer>(null);

  useEffect(() => {
    if (!artist) return;

    getHeardle(artist)
      .then(({ data }) => {
        setHeardle(data);
        setTimeout(() => setIsLoading(false), 500);
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

  const handlePlay = () => {
    setPlayerSettings({ ...playerSettings, playing: !playerSettings.playing });
  };

  const handleProgress = (data: any) => {
    if (!playerReff.current) return;

    const time = Math.round(data.playedSeconds) / MAX_SNIPPET_TIME;

    setProgress(time * 100);

    console.log(time * 100);

    if (data.playedSeconds >= MAX_SNIPPET_TIME) {
      playerReff.current.seekTo(0);
      setPlayerSettings({ ...playerSettings, playing: false });
    }
  };

  const handleSubmit = () => {
    if (currentGuess > 4) {
      return console.log('No More guesses');
    }
    const _guesses = [...guesses];

    _guesses[currentGuess].value = guessText;

    if (guessText.toLowerCase() === heardle.title?.toLowerCase()) {
      _guesses[currentGuess].correct = true;
      setGameEnded(true);
    } else {
      const newGuess = currentGuess + 1;
      if (newGuess > 4) {
        setGameEnded(true);
      } else {
        setCurrentGuess(currentGuess + 1);
      }
    }

    setGuessText('');
    setGuesses(_guesses);
  };

  const displayEndAlert = () => {
    if (guesses[currentGuess].correct) {
      return (
        <Alert status="success">
          <AlertIcon />
          <Center>
            It took you {currentGuess} tries to get the correct answer! Come
            back tomorrow for another one.
          </Center>
        </Alert>
      );
    } else {
      return (
        <Alert status="error">
          <AlertIcon />
          <Center>
            Unfortunatley you couldnt guess the track in 5 guesses. Come back
            tomorrow for another try.
          </Center>
        </Alert>
      );
    }
  };

  return (
    <Flex direction="column" mt={25}>
      {gameEnded && (
        <Container
          display={'flex'}
          maxW={'50vw'}
          justifyContent={'center'}
          alignItems={'center'}
          alignContent={'center'}
          justifyItems={'center'}
          mb={6}
        >
          {displayEndAlert()}
        </Container>
      )}
      <Container
        // direction="row"
        // mx={50}
        mb={5}
        d="flex"
        // alignItems="center"
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
              border = `2px solid ${
                !gameEnded ? 'white' : guess.correct ? 'green' : 'red'
              }`;
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
      <div>
        <div style={{ display: 'none' }}>
          <ReactPlayer
            url={heardle.url}
            ref={playerReff}
            playing={playerSettings.playing}
            onProgress={handleProgress}
            volume={0.1}
          />
        </div>
        <VStack
          spacing={4}
          mt={'5'}
          pl={'25px'}
          pr={'25px'}
          align="stretch"
          alignItems={'center'}
        >
          <Box w={'50%'} h="40px" display={'flex'}>
            <Input
              placeholder="Make a guess"
              size="lg"
              mr={5}
              value={guessText}
              onChange={(e) => setGuessText(e.target.value)}
            />
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              disabled={gameEnded}
            >
              Submit
            </Button>
          </Box>
          <Box w="500px" h="500px">
            <Flex justifyContent={'space-between'}>
              <Box p="4">0:00</Box>
              <Box p="4">
                <Button onClick={handlePlay}>
                  {playerSettings.playing ? 'Pause' : 'Play'}
                </Button>
              </Box>
              <Box p="4">0:{MAX_SNIPPET_TIME}</Box>
            </Flex>
            <Box>
              {/* <VStack>
                <Progress colorScheme="green" size="sm" value={getProgress()} />
              </VStack> */}
              <Progress colorScheme="green" size="sm" value={progress} />

              {/* <Progress colorScheme="green" size="sm" value={100} /> */}
              {/* <Progress colorScheme="green" size="md" value={20} /> */}
              {/* <Progress colorScheme="green" size="lg" value={20} /> */}
              {/* <Progress colorScheme="green" height="32px" value={20} /> */}
            </Box>
          </Box>
        </VStack>
      </div>
    </Flex>
  );
}
