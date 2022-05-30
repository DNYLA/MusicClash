import {
  Image,
  Box,
  Flex,
  Skeleton,
  useColorModeValue,
  Badge,
  ScaleFade,
} from '@chakra-ui/react';
import React from 'react';
import { SkelentonPageProps } from '../../utils/types';

export default function HomeSkeletonCards({
  isLoading,
  amount,
}: SkelentonPageProps) {
  return (
    <ScaleFade in={isLoading} initialScale={0.8} unmountOnExit>
      <Flex>
        {Array(amount)
          .fill('')
          .map((_, i) => (
            <SkeletonCard />
          ))}
      </Flex>
    </ScaleFade>
  );
}

function SkeletonCard() {
  return (
    <Flex
      mr={3}
      cursor={'progress'}
      bg={useColorModeValue('#F9FAFB', 'gray.600')}
      p={2}
      style={{ transition: 'all 250ms ease-in' }}
      _hover={{ bg: 'teal.600' }}
      rounded={'xl'}
    >
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        // minW={250}
        // w={'xs'}
        w={250}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
      >
        <Skeleton h={260} />
        <Box p="6">
          <Box>
            <Box d="flex" mb={2}>
              <Skeleton h={3} w={'40%'} mr={2} />
              <Skeleton h={3} w={'45%'} />
            </Box>
            <Skeleton h={5} w={'full'} mb={2} />
            <Skeleton h={3} w={'70%'} />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
