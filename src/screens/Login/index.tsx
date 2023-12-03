import React, { useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Flex,
  Center,
  Input,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Box,
  Text
} from '@chakra-ui/react'
import instance from '@api/base.api'
import { useAppDispatch } from '@store/store'
import { login } from '@store/user/asyncActions'
import type { UserT } from '@store/user/types'
import logo from '@static/images/logo.svg'

interface StateT {
  email: string
  password: string
  errors: Record<string, string>
}

interface ActionT {
  type: string
  value: string | Record<string, string>
}

const reducer = (state: StateT, action: ActionT): StateT => {
  switch (action.type) {
    case 'set-email': {
      return {
        ...state,
        email: action.value as string
      }
    }
    case 'set-password': {
      return {
        ...state,
        password: action.value as string
      }
    }
    case 'set-errors': {
      return {
        ...state,
        errors: action.value as Record<string, string>
      }
    }
  }

  throw Error('Unknown action.')
}

const LoginScreen: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    email: '',
    password: '',
    errors: {}
  })
  const appDispatch = useAppDispatch()
  const navigate = useNavigate()

  const onChange = (type: string, value: string): void => {
    dispatch({
      type,
      value
    })
  }

  const handleClick = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { errors, ...restState } = state
    try {
      const user = await appDispatch(login(restState as UserT)).unwrap()
      if (typeof user === 'object') {
        if (user.token !== undefined) {
          instance.defaults.headers.common.Authorization = `Bearer ${user.token}`
          localStorage.setItem('TrelloToken', user.token)
          navigate('/')
        }
      }
    } catch (err) {
      const objErrors = Object.assign(
        {},
        ...(err as Array<Record<string, string>>)
      )
      dispatch({ type: 'set-errors', value: objErrors })
    }
  }

  return (
    <Flex h="100vh" bg="#3179ba" color="white">
      <Center width="100%" flexDirection="column">
        <Box maxWidth='100px' mb={2}>
          <img src={logo} alt="logo"/>
        </Box>
        <Stack
          w="500px"
          spacing={3}
          border="1px solid white"
          borderRadius="md"
          p={4}
        >
          <Heading as="h3" size="lg">
            Login
          </Heading>
          <FormControl isInvalid={Boolean(state.errors.email)}>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="Email"
              type="email"
              _placeholder={{ color: "white" }}
              value={state.email}
              onChange={(e) => {
                onChange('set-email', e.target.value)
              }}
            />
            <FormErrorMessage>{state.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(state.errors.password)}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              type="password"
              _placeholder={{ color: "white" }}
              value={state.password}
              onChange={(e) => {
                onChange('set-password', e.target.value)
              }}
            />
            <FormErrorMessage>{state.errors.password}</FormErrorMessage>
          </FormControl>
          <Button
            onClick={() => {
              void (async () => {
                await handleClick()
              })()
            }}
          >
            Login
          </Button>
          <Text>
            If you dont have an account{' '}
            <Link to="/register" style={{ textDecoration: 'underline' }}>
              Register
            </Link>
          </Text>
        </Stack>
      </Center>
    </Flex>
  )
}

export default LoginScreen
