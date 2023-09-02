import React from 'react'
import { useSelector } from 'react-redux'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Avatar,
  Card
} from '@chakra-ui/react'

import { useAppDispatch } from '@store/store'
import { selectUser } from '@store/user/selectors'
import { logout } from '@store/user/slice'

const Header: React.FC = () => {
  const user = useSelector(selectUser)

  const dispatch = useAppDispatch()

  return (
    <Stack
      direction="row"
      p="2"
      justify="end"
      bg="#3179ba"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Menu>
        <MenuButton as={Card} p="2">
          <Stack direction="row" align="center">
            <Avatar name={user.email} src="https://bit.ly/dan-abramov" />
            <span>{user.email}</span>
          </Stack>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => dispatch(logout())}>Log out</MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  )
}

export default Header
