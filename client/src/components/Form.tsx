import React, { useState } from 'react';
import {
  chakra,
  Box,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Checkbox,
  RadioGroup,
  Radio,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { Track } from '../utils/types';
import { ClashDetails, ClashDetailsModal } from './ClashDetails';

interface SongFormProps {
  addTrack: (firstSet: boolean) => void;
  handlePublish: (details: ClashDetails) => void;
  setTrack: (track: Track) => void;
  track: Track;
}

export default function SongForm({
  addTrack,
  handlePublish,
  track,
  setTrack,
}: SongFormProps) {
  const [selectedSet, setSelectedSet] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clashInfo, setClashInfo] = useState<ClashDetails>({
    title: '',
    setOneName: '',
    setTwoName: '',
  });

  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} p={10}>
      <ClashDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        details={clashInfo}
        setDetails={setClashInfo}
        handleSubmit={() => handlePublish(clashInfo)}
      />
      <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden="true">
        <Box py={5}>
          <Box
            borderTop="solid 1px"
            borderTopColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
          ></Box>
        </Box>
      </Box>
      <Box mt={[10, 0]}>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                Track Information
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                Enter details for the track you want to add.
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
              method="POST"
              shadow="base"
              rounded={[null, 'md']}
              overflow={{ sm: 'hidden' }}
            >
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg={useColorModeValue('white', 'gray.700')}
                spacing={6}
              >
                <SimpleGrid columns={6} spacing={6}>
                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="artist_name"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Artist name
                    </FormLabel>
                    <Input
                      type="text"
                      name="artist_name"
                      id="artist_name"
                      autoComplete="given-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={track.artist}
                      onChange={(e) =>
                        setTrack({ ...track, artist: e.target.value })
                      }
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="last_name"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Track name
                    </FormLabel>
                    <Input
                      type="text"
                      name="last_name"
                      id="last_name"
                      autoComplete="family-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={track.title}
                      onChange={(e) =>
                        setTrack({ ...track, title: e.target.value })
                      }
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 6]}>
                    <FormLabel
                      htmlFor="email_address"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Youtube Link
                    </FormLabel>
                    <Input
                      type="text"
                      name="email_address"
                      id="email_address"
                      autoComplete="email"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={track.youtubeUrl}
                      onChange={(e) =>
                        setTrack({ ...track, youtubeUrl: e.target.value })
                      }
                    />
                  </FormControl>
                </SimpleGrid>
                <FormControl>
                  <RadioGroup
                    value={selectedSet}
                    onChange={(e) => setSelectedSet(parseInt(e))}
                  >
                    <Stack>
                      <Radio value={0}>Set One</Radio>
                      <Radio value={1}>Set Two</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Stack>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue('gray.50', 'gray.900')}
              >
                <HStack justifyContent="space-between">
                  <Button
                    onClick={() => addTrack(selectedSet === 0 ? true : false)}
                    colorScheme="blue"
                    _focus={{ shadow: '' }}
                    fontWeight="md"
                  >
                    Add
                  </Button>
                  <Button
                    onClick={onOpen}
                    colorScheme="green"
                    _focus={{ shadow: '' }}
                    fontWeight="md"
                  >
                    Publish
                  </Button>
                </HStack>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>

      <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden="true">
        <Box py={5}>
          <Box
            borderTop="solid 1px"
            borderTopColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
}
