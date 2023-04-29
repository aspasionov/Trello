import React, { useState } from 'react'
import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter
} from '@chakra-ui/react'

interface Props {
  title: string
  label: string
  id: string
  onDelete: () => void
}

const LaneHeader: React.FC<Props> = ({ title, label, onDelete }) => {
  const [open, setOpen] = useState(false)

  const handleOpenModal = (): void => {
    setOpen(true)
  }

  const handleCloseModal = (): void => {
    setOpen(false)
  }

  return (<>
      <Flex align='center' justify='space-between'>
        <Box>{title}</Box>
        <Box>{label}</Box>
        <Button onClick={handleOpenModal} colorScheme='red' size='xs'>
          <DeleteIcon/>
        </Button>
      </Flex>

      <Modal
        isCentered
        isOpen={open}
        size='xs'
        onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>
            {`Do you really wont to delete ${title}`}
          </ModalHeader>
          <ModalCloseButton onClick={handleCloseModal}/>

          <ModalFooter>
            <Button colorScheme='blue' mr='auto' onClick={handleCloseModal}>
              No
            </Button>
            <Button variant='outline' onClick={onDelete}>Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LaneHeader
