import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { renderImgPath } from '@utils/imgPath'
import logo from '@static/images/logo.svg'
import { SearchIcon } from '@chakra-ui/icons'
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
  InputGroup,
  InputLeftElement,
  Input,
  Card
} from '@chakra-ui/react'

import { useAppDispatch } from '@store/store'
import { selectUser } from '@store/user/selectors'
import { logout } from '@store/user/slice'
import { setParams } from '@store/desk/slice'
import { selectParams} from '@store/desk/selectors'

import { useIsAdmin } from '@hooks/useIsAdmin'

const adminLinks = [
  {
    id: 3,
    to: '/',
    text: 'Home'
  },
  {
    id: 1,
    to: '/columns',
    text: 'Columns'
  },
  {
    id: 2,
    to: '/cards',
    text: 'Cards'
  },
  {
    id: 3,
    to: '/statistic',
    text: 'Statistic'
  }
]

const Header: React.FC = () => {
  const user = useSelector(selectUser)
  const params = useSelector(selectParams)
  const navigate = useNavigate()
  const location = useLocation()

  const isHomePage = location.pathname === '/'
  const dispatch = useAppDispatch()

  const isAdmin = useIsAdmin()

  const renderLinks = (): React.ReactNode => {
    return isAdmin ? (
      <Box sx={{ ml: 'auto' }}>
        {adminLinks.map(({ to, id, text }) => (
          <Link
            style={{ color: 'white', margin: '0 20px', fontWeight: 600 }}
            key={id}
            to={to}
          >
            {text}
          </Link>
        ))}
      </Box>
    ) : (
      <></>
    )
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if(e.target.value) {
      dispatch(setParams({ search: e.target.value }))
    } else {
      dispatch(setParams({}))
    }
  }

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
      {renderLinks()}
      {isHomePage && <InputGroup sx={{ maxWidth: 300, mr: 10 }}>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='#3179ba' />
        </InputLeftElement>
        <Input type='text' placeholder='search' bg='white' borderColor='transparent' onChange={handleSearch} value={params.search || ''} />
      </InputGroup>}

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
