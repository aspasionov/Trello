import React, { useReducer } from 'react'
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack
} from '@chakra-ui/react'
// import { useImageUploader } from '@hooks/useImageUploader'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@store/store'
// import { uploadAvatar } from '@api/user.api'
// import { renderImgPath } from '@utils/imgPath'
import { update, getCurrentUser } from '@store/user/asyncActions'
import { type UserT } from '@store/user/types'
import { selectUser } from '@store/user/selectors'
import { useNavigate } from 'react-router-dom'

import { HEADER_HEIGHT } from '@constans/index'

type AvatarT = Blob | string | null

interface StateT {
  email: string
  name: string
  avatar: AvatarT
  errors: Record<string, string>
}

interface ActionT {
  type: string
  value: string | Record<string, string> | AvatarT
}

const reducer = (state: StateT, action: ActionT): StateT => {
  switch (action.type) {
    case 'set-name': {
      return {
        ...state,
        name: action.value as string
      }
    }
    case 'set-email': {
      return {
        ...state,
        email: action.value as string
      }
    }
    case 'set-avatar': {
      return {
        ...state,
        avatar: action.value as AvatarT
      }
    }
    case 'set-errors': {
      return {
        ...state,
        errors: action.value as Record<string, never>
      }
    }
  }

  throw Error('Unknown action.')
}

const EditProfile: React.FC = () => {
  const user = useSelector(selectUser)
  const [state, dispatch] = useReducer(reducer, {
    name: user.name !== undefined ? user.name : '',
    email: user.email !== undefined ? user.email : '',
    avatar: user.avatar !== undefined ? user.avatar : null,
    errors: {}
  })

  // const setFile = (file: Blob | null): void => {
  //   dispatch({ type: 'set-avatar', value: file })
  // }

  // const { renderField, selectedFile } = useImageUploader(
  //   user.avatar !== null && user.avatar !== ''
  //     ? renderImgPath(user.avatar as string)
  //     : '',
  //   setFile
  // )

  const appDispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (): Promise<void> => {
    // const formData = new FormData()
    const updatedUser = {
      ...user,
      ...state
    }
    const promises: Array<Promise<never>> = [
      appDispatch(update(updatedUser as UserT)).unwrap()
    ]

    // if (selectedFile !== null) {
    //   formData.append('avatar', selectedFile)
    //   promises.push(uploadAvatar(user._id as string, formData))
    // }

    try {
      await Promise.all(promises)
      await appDispatch(getCurrentUser())
      navigate('/')
    } catch (err) {
      const objErrors = Object.assign(
        {},
        ...(err as Array<Record<string, string>>)
      )
      dispatch({ type: 'set-errors', value: objErrors })
    }
  }

  return (
    <Flex h={`calc(100vh - ${HEADER_HEIGHT}px)`}>
      <Center width="100%">
        <Stack
          w="500px"
          spacing={3}
          border="1px solid gray"
          borderRadius="md"
          p={4}
        >
          <Heading as="h3" size="lg">
            Profile
          </Heading>
          {/* {renderField()} */}
          <FormControl isInvalid={Boolean(state.errors.name)}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Name"
              type="text"
              value={state.name}
              onChange={(e) => {
                dispatch({ type: 'set-name', value: e.target.value })
              }}
            />
            <FormErrorMessage>{state.errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(state.errors.email)}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              type="email"
              value={state.email}
              onChange={(e) => {
                dispatch({ type: 'set-email', value: e.target.value })
              }}
            />
            <FormErrorMessage>{state.errors.email}</FormErrorMessage>
          </FormControl>
          <Flex justifyContent="space-between">
            <Button
              onClick={() => {
                navigate('/')
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                void (async () => {
                  await handleSubmit()
                })()
              }}
            >
              Apply
            </Button>
          </Flex>
        </Stack>
      </Center>
    </Flex>
  )
}

export default EditProfile
