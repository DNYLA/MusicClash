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
import { Clash } from '../utils/types';
export type GameInfo = {
  rating: number;
  reviewCount: number;
  playersCount: number;
};
interface MenuCardProps {
  clash: Clash;
  extraInfo: GameInfo; //Extra Info is Info that should be in the clash but has not been develoepd yet.
  handleClick: () => void;
}

export const MenuCard = ({ clash, extraInfo, handleClick }: MenuCardProps) => {
  const songAmount =
    clash.TrackSet[0]._count.tracks + clash.TrackSet[0]._count.tracks;

  const newLimit = new Date();
  const createdAt = new Date(clash.createdAt);
  newLimit.setDate(newLimit.getDate() - 7);

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
        // minW={250}
        w={'xs'}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
      >
        <Image
          src={clash.thumbnail}
          cursor="pointer"
          alt={'Clash Thumbnail'}
          roundedTop="lg"
        />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {createdAt > newLimit && (
              <Badge rounded="full" px="2" colorScheme="teal" mr={2}>
                New
              </Badge>
            )}
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              // ml="2"
            >
              {songAmount} songs &bull; {extraInfo.playersCount} players
            </Box>
          </Box>

          <Box
            mt="2"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {clash.title}
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
                  color={i < extraInfo.rating ? 'teal.500' : 'gray.300'}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {extraInfo.reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};
