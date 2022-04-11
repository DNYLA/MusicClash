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
export type GameInfo = {
  title: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  songCount: number;
  playersCount: number;
  newGame: boolean;
};
interface MenuCardProps {
  game: GameInfo;
  handleClick: () => void;
}

export const MenuCard = ({ game, handleClick }: MenuCardProps) => {
  return (
    <Flex
      bg={useColorModeValue('#F9FAFB', 'gray.600')}
      p={3}
      mr={5}
      // rounded="lg"
      alignItems="center"
      justifyContent="center"
      onClick={handleClick}
    >
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
      >
        <Image
          src={game.imageUrl}
          cursor="pointer"
          alt={'Game Image'}
          roundedTop="lg"
        />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {game.newGame && (
              <Badge rounded="full" px="2" colorScheme="teal">
                New
              </Badge>
            )}
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {game.songCount} songs &bull; {game.playersCount} players
            </Box>
          </Box>

          <Box
            mt="2"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {game.title}
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
                  color={i < game.rating ? 'teal.500' : 'gray.300'}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {game.reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};
