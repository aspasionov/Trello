import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@store/store'
import { selectUsers } from '@store/users/selectors'
import { fetchUsers } from '@store/users/asyncActions'
import {
  Flex,
  InputGroup,
  Select,
  Input,
  InputRightElement
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

interface ParamsT {
  search: string
  userIds: string
}

interface Props {
  params: ParamsT
  setParams: (obj: ParamsT) => void
}
const Filter: React.FC<Props> = ({ setParams, params }) => {
  const dispatch = useAppDispatch()
  const users = useSelector(selectUsers)

  useEffect(() => {
    void (async () => await dispatch(fetchUsers()))()
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setParams({ ...params, search: e.target.value })
  }

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setParams({ ...params, userIds: e.target.value })
  }

  return (
    <Flex
      sx={{ border: '1px solid #000', p: 2, mb: 4, mt: 4 }}
      gap="2"
      rounded="md"
    >
      <InputGroup flex="1">
        <Input
          placeholder="search"
          onChange={handleSearchChange}
          value={params.search}
        />
        <InputRightElement>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>

      <Flex gap="2">
        <Select
          placeholder="Select User"
          onChange={handleSelectChange}
          value={params.userIds}
        >
          {users.map((el) => (
            <option key={el._id} value={el._id}>
              {el.name}
            </option>
          ))}
        </Select>
        {/* <Select placeholder='Select option'> */}
        {/*  <option value='option1'>Option 1</option> */}
        {/*  <option value='option2'>Option 2</option> */}
        {/*  <option value='option3'>Option 3</option> */}
        {/* </Select> */}
      </Flex>
    </Flex>
  )
}

export default Filter
