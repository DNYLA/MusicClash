import React from 'react';
import {
  Box,
  Flex,
  Image,
  Badge,
  useColorModeValue,
  Tag,
  Avatar,
  TagLabel,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
const Cpwe = () => {
  const property = {
    imageUrl:
      'https://i.discogs.com/drDRPMm8yMlW1x_tX3Mbdx04Q6ltzHBo-Zbm4zdreBw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0NzUw/MjI3LTE1ODE2OTQy/NTQtNjk5NC5qcGVn.jpeg',
    imageAlt: 'Rear view of modern home with pool',
    songs: 2,
    players: 12,
    title: 'Roddy Ricch vs Travis Scott',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  };

  return (
    <Flex
      bg={useColorModeValue('#F9FAFB', 'gray.600')}
      p={3}
      mr={5}
      // rounded="lg"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
      >
        <Image
          src={property.imageUrl}
          alt={property.imageAlt}
          roundedTop="lg"
        />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {property.songs} songs &bull; {property.players} players
            </Box>
          </Box>

          <Box
            mt="2"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {property.title}
          </Box>

          {/* <Box>
            {property.formattedPrice}
            <Box as="span" color="gray.600" fontSize="sm">
              / wk
            </Box>
          </Box> */}

          {/* 
          <Box mt="3">
            <Tag size="sm" colorScheme={'facebook'} borderRadius="full">
              <Avatar
                src="https://bit.ly/sage-adebayo"
                size="xs"
                name="Segun Adebayo"
                ml={-1}
                mr={2}
              />
              <TagLabel>Segun</TagLabel>
            </Tag>
          </Box> */}

          <Box d="flex" mt="3" alignItems="center">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < property.rating ? 'teal.500' : 'gray.300'}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {property.reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Cpwe;
