import React from 'react';
import { Flex, InputGroup, Box, Select, Input, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';

const Filter = () => {
  return (
    <Flex sx={{ border: '1px solid #000', p: 2, mb: 4, mt: 4 }} gap='2' rounded="md">
      <InputGroup sx={{ width: '40%' }}>
        <Input placeholder='search' />
        <InputRightElement>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>

      <Flex flex='1' gap='2'>
        <Select placeholder='Select option'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        <Select placeholder='Select option'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
      </Flex>

    </Flex>
  );
};

export default Filter;
