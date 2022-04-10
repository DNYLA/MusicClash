import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  RepeatIcon,
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

interface OptionsButtonProps {
  deleteCallback: () => void;
  handleSwitch: () => void;
  // openLink: () => void;
}
export default function OptionButton({
  deleteCallback,
  handleSwitch,
}: // openLink,
OptionsButtonProps) {
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
            variant="outline"
            colorScheme="facebook"
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
                colorScheme={'blue'}
              >
                Edit
              </Button>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<RepeatIcon />}
                justifyContent="space-between"
                fontWeight="normal"
                colorScheme={'blue'}
                fontSize="sm"
                onClick={handleSwitch}
              >
                Switch Set
              </Button>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<ExternalLinkIcon />}
                justifyContent="space-between"
                fontWeight="normal"
                colorScheme="blue"
                fontSize="sm"
              >
                Youtube
              </Button>

              <Button
                w="194px"
                variant="ghost"
                rightIcon={<DeleteIcon />}
                justifyContent="space-between"
                fontWeight="normal"
                colorScheme="red"
                fontSize="sm"
                onClick={deleteCallback}
              >
                Delete
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
