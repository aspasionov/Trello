import React from 'react'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
  onApply?: () => void
  onClose: () => void
  isOpen: boolean
}

const ModalWindow: React.FC<Props> = ({
  onClose,
  onApply,
  children,
  isOpen
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {Boolean(onApply) && (
              <Button variant="ghost" onClick={onApply}>
                Apply
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalWindow
