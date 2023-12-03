import React, { useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Flex,
  Center,
  Input,
  Text,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage, Box
} from '@chakra-ui/react'
import instance from '@api/base.api'
import { useAppDispatch } from '@store/store'
import { register } from '@store/user/asyncActions'

import type { UserT } from '@store/user/types'
import logo from "@static/images/logo.svg";

interface StateT {
  email: string
  password: string
  name: string
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
    case 'set-name': {
      return {
        ...state,
        name: action.value as string
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

const RegisterScreen: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    email: '',
    name: '',
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
      const user = await appDispatch(register(restState as UserT)).unwrap()
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
            Register
          </Heading>
          <FormControl isInvalid={Boolean(state.errors.name)}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Name"
              type="Text"
              _placeholder={{ color: "white" }}
              value={state.name}
              onChange={(e) => {
                onChange('set-name', e.target.value)
              }}
            />
            <FormErrorMessage>{state.errors.name}</FormErrorMessage>
          </FormControl>
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
            Register
          </Button>
          <Text>
            If you have an account{' '}
            <Link to="/login" style={{ textDecoration: 'underline' }}>
              login
            </Link>
          </Text>
        </Stack>
      </Center>
    </Flex>
  )
}

export default RegisterScreen
