import {
  Button,
  FormControl,
  FormLabel,
  GridItem,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';

export type ClashDetails = {
  title: string;
  setOneName: string;
  setTwoName: string;
};

interface ClashDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: ClashDetails;
  setDetails: (details: ClashDetails) => void;
  handleSubmit: () => void;
}

export function ClashDetailsModal({
  isOpen,
  onClose,
  details,
  setDetails,
  handleSubmit,
}: ClashDetailsModalProps) {
  const initialRef = useRef<any>();

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your clash</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SimpleGrid columns={6} spacing={6}>
              <FormControl as={GridItem} colSpan={6}>
                <FormLabel>Clash Title</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="90's Hip-Hop throwback"
                  value={details.title}
                  onChange={(e) =>
                    setDetails({ ...details, title: e.target.value })
                  }
                />
              </FormControl>
              <FormControl as={GridItem} colSpan={3}>
                <FormLabel>Primary Set</FormLabel>
                <Input
                  placeholder="East Coast"
                  value={details.setOneName}
                  onChange={(e) =>
                    setDetails({ ...details, setOneName: e.target.value })
                  }
                />
              </FormControl>
              <FormControl as={GridItem} colSpan={3}>
                <FormLabel>Secondary Set</FormLabel>
                <Input
                  placeholder="West Coast"
                  value={details.setTwoName}
                  onChange={(e) =>
                    setDetails({ ...details, setTwoName: e.target.value })
                  }
                />
              </FormControl>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
