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
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';

export type Track = {
  name: string;
  artistName: string;
  url: string;
};

interface SongFormProps {
  handleSubmit: (firstSet: boolean) => void;
  handlePublish: () => void;
  setTrack: (track: Track) => void;
  track: Track;
}

export default function SongForm({
  handleSubmit,
  handlePublish,
  track,
  setTrack,
}: SongFormProps) {
  const [selectedSet, setSelectedSet] = useState(0);
  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} p={10}>
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
                      value={track.artistName}
                      onChange={(e) =>
                        setTrack({ ...track, artistName: e.target.value })
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
                      value={track.name}
                      onChange={(e) =>
                        setTrack({ ...track, name: e.target.value })
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
                      value={track.url}
                      onChange={(e) =>
                        setTrack({ ...track, url: e.target.value })
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
                    onClick={() =>
                      handleSubmit(selectedSet === 0 ? true : false)
                    }
                    colorScheme="blue"
                    _focus={{ shadow: '' }}
                    fontWeight="md"
                  >
                    Add
                  </Button>
                  <Button
                    onClick={handlePublish}
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
