import React from 'react';
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {
  Flex,
  Button,
} from '@chakra-ui/react'

type Props = {
  onEdit: () => void
  onDelete: () => void
}

const Controls: React.FC<Props> = ({ onEdit, onDelete }) => {
  return (
    <Flex>
      <Button
        sx={{ ml: 'auto' }}
        onClick={onEdit}
        colorScheme="blue"
        size="xs"
      >
        <EditIcon />
      </Button>
      <Button
        sx={{ ml: 1 }}
        onClick={onDelete}
        colorScheme="red"
        size="xs"
      >
        <DeleteIcon />
      </Button>
    </Flex>
  );
};

export default Controls;
