import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Flex,
} from '@chakra-ui/react';

import { BsThreeDotsVertical, BsChatSquareQuote } from 'react-icons/bs';
import { RiShutDownLine, RiRestartLine, RiFileShredLine } from 'react-icons/ri';

export default function OptionButton() {
  return (
    /**
     * You may move the Popover outside Flex.
     */
    <Flex justifyContent="center" mt={4}>
      <Popover placement="bottom" isLazy>
        <PopoverTrigger>
          <IconButton
            aria-label="Song Options"
            icon={<BsThreeDotsVertical />}
            variant="solid"
            w="fit-content"
          />
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<EditIcon />}
                justifyContent="space-between"
                fontWeight="normal"
                fontSize="sm"
              >
                Edit Item
              </Button>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<ArrowUpIcon />}
                justifyContent="space-between"
                fontWeight="normal"
                colorScheme="red"
                fontSize="sm"
              >
                Move Up
              </Button>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<ArrowDownIcon />}
                justifyContent="space-between"
                fontWeight="normal"
                colorScheme="red"
                fontSize="sm"
              >
                Move Down
              </Button>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<DeleteIcon />}
                justifyContent="space-between"
                fontWeight="normal"
                colorScheme="red"
                fontSize="sm"
              >
                Delete Song
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
