import {
  ArrowDownIcon,
  ArrowUpIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  LinkIcon,
} from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
  WrapItem,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { Track } from './Form';
import OptionButton from './Input/OptionButton';

const options = [
  { id: 1, desc: '1 lorem ipsum' },
  { id: 2, desc: 'Lorem, ipsum dolor.' },
  { id: 3, desc: 'Monthly Updates' },
];
interface PackageTierProps {
  title: string;
  options: Array<{ id: number; desc: string }>;
  handleChange: (i: number, a: number) => void;
  deleteCallback: (i: number) => void;
  typePlan: string;
  checked?: boolean;
  position: number;
}
export const SongCard = ({
  title,
  options,
  typePlan,
  checked = false,
  position,
  handleChange,
  deleteCallback,
}: PackageTierProps) => {
  const colorTextLight = checked ? 'white' : 'purple.600';
  const bgColorLight = checked ? 'purple.400' : 'gray.300';

  const colorTextDark = checked ? 'white' : 'purple.500';
  const bgColorDark = checked ? 'purple.400' : 'gray.300';

  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: 'flex-start',
        md: 'space-around',
      }}
      direction={{
        base: 'column',
        md: 'row',
      }}
      alignItems={{ md: 'center' }}
    >
      <Heading size={'xl'}>{title}</Heading>
      {/* <List spacing={3} textAlign="start">
        {options.map((desc, id) => (
          <ListItem key={desc.id}>
            <ListIcon as={FaCheckCircle} color="green.500" />
            {desc.desc}
          </ListItem>
        ))}
      </List> */}
      <WrapItem>
        <Avatar
          name={title}
          size={'lg'}
          src="https://i1.wp.com/themusicalhype.com/wp-content/uploads/2019/12/roddy-ricch-please-excuse-me-for-being-antisocial-atlantic.jpeg?ssl=1"
        />
      </WrapItem>
      <Heading size={'md'}>{typePlan}</Heading>
      <Stack direction={['column', 'row']}>
        {/* <Button
          size="md"
          color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}
          leftIcon={<ExternalLinkIcon />}
        >
          Youtube
        </Button> */}
        <IconButton
          variant="outline"
          aria-label="Search database"
          colorScheme="facebook"
          icon={<EditIcon />}
        />
        <IconButton
          variant="outline"
          aria-label="Search database"
          colorScheme="red"
          icon={<DeleteIcon />}
          onClick={() => deleteCallback(position)}
        />
        <IconButton
          variant="outline"
          aria-label="Search database"
          colorScheme="blue"
          icon={<ArrowUpIcon />}
          onClick={() => handleChange(position, -1)}
        />
        <IconButton
          variant="outline"
          aria-label="Search database"
          colorScheme="blue"
          icon={<ArrowDownIcon />}
          onClick={() => handleChange(position, 1)}
        />
        {/* <OptionButton /> */}
      </Stack>
    </Stack>
  );
};

interface SongCardContainerProps {
  tracks: Track[];
  handleChange: (i: number, a: number) => void;
  deleteCallback: (i: number) => void;
}
const SongCardConainer = ({
  tracks,
  handleChange,
  deleteCallback,
}: SongCardContainerProps) => {
  return (
    <Box py={6} px={5} minH={'50vh'}>
      <Stack spacing={4} width={'100%'} direction={'column'}>
        <Stack
          p={5}
          alignItems={'center'}
          justifyContent={{
            base: 'flex-start',
            md: 'space-around',
          }}
          direction={{
            base: 'column',
            md: 'row',
          }}
        >
          <Stack
            width={{
              base: '100%',
              md: '40%',
            }}
            textAlign={'center'}
          >
            <Heading size={'lg'}>
              Songs From <Text color="purple.400">First Set</Text>
            </Heading>
          </Stack>
          <Stack
            width={{
              base: '100%',
              md: '60%',
            }}
          >
            <Text textAlign={'center'}>
              This is the first set of songs. The order the songs are in below
              is the order they are played in the game. You can hold one of the
              cards to re-arange. The second list is displayed below.
            </Text>
          </Stack>
        </Stack>
        <Divider />
        {tracks.map((track, i) => {
          return (
            <>
              <SongCard
                title={track.name}
                typePlan={track.artistName}
                options={options}
                checked={i % 2 === 0 ? false : true}
                position={i}
                handleChange={handleChange}
                deleteCallback={deleteCallback}
              />
              <Divider />
            </>
          );
        })}
        {/* <SongCard title={'Starter'} typePlan="Free" options={options} />
        <Divider />
        <SongCard
          title={'Lorem Plus'}
          checked={true}
          typePlan="$32.00"
          options={options}
        />
        <Divider />
        <SongCard title={'Lorem Pro'} typePlan="$50.00" options={options} /> */}
      </Stack>
    </Box>
  );
};

export default SongCardConainer;
