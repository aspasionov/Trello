import React, { useReducer } from 'react'
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
  Text,
} from '@chakra-ui/react'
import { useAppDispatch } from '@store/store'
import { login } from '@store/user/asyncActions'
import type { UserT } from '@store/user/types'
import { Link } from 'react-router-dom'

interface StateT {
  email: string
  password: string
  errors: Record<string, any>
}

interface ActionT {
  type: string
  value: string | Record<string, any>
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
        errors: action.value as Record<string, any>
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

  const onChange = (type: string, value: string): void => {
    dispatch({
      type,
      value
    })
  }

  const handleClick = async (): Promise<void> => {
    const { errors, ...restState } = state
    try {
      await appDispatch(login(restState as UserT)).unwrap()
    } catch (err) {
      const objErrors = Object.assign({}, ...(err as any[]))
      dispatch({ type: 'set-errors', value: objErrors })
    }
  }

  return (
    <Flex h="100vh">
      <Center width="100%">
        <Stack
          w="500px"
          spacing={3}
          border="1px solid gray"
          borderRadius="md"
          p={4}
        >
          <Heading as="h3" size="lg">
            Login
          </Heading>
          <FormControl isInvalid={Boolean(state.errors?.email)}>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="Email"
              type="email"
              value={state.email}
              onChange={(e) => {
                onChange('set-email', e.target.value)
              }}
            />
            <FormErrorMessage>{state.errors?.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(state.errors?.password)}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              type="password"
              value={state.password}
              onChange={(e) => {
                onChange('set-password', e.target.value)
              }}
            />
            <FormErrorMessage>{state.errors?.password}</FormErrorMessage>
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
