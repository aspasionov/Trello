import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { renderImgPath } from '@utils/imgPath'
import logo from '@static/images/logo.svg'
import {
  Menu,
  MenuButton,
  MenuList,
  Image,
  MenuItem,
  Stack,
  Text,
  Box,
  Avatar,
  Card
} from '@chakra-ui/react'

import { useAppDispatch } from '@store/store'
import { selectUser } from '@store/user/selectors'
import { logout } from '@store/user/slice'

const Header: React.FC = () => {
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  return (
    <Stack
      direction="row"
      p="2"
      justify="space-between"
      alignItems="center"
      bg="#3179ba"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Link to="/">
        <Image width={100} height={50} src={logo} alt="" />
      </Link>
      <Menu>
        <MenuButton as={Card} p="2">
          <Stack direction="row" align="center">
            <Avatar
              bg="#3179ba"
              name={user.name}
              src={renderImgPath(user.avatar as string)}
            />
            <Box>
              <Text as="b" fontSize="sm">
                {user.name !== undefined ? user.name : user.email}
              </Text>
              {user.name !== undefined ? (
                <Text fontSize="xs">{user.email}</Text>
              ) : null}
            </Box>
          </Stack>
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              navigate('/edit-profile')
            }}
          >
            Edit
          </MenuItem>
          <MenuItem onClick={() => dispatch(logout())}>Log out</MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  )
}

export default Header
