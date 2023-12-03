import { createStandaloneToast } from '@chakra-ui/react'

const { toast } = createStandaloneToast()

export const alert = (text: string, type?: 'success') => {
  toast({
    title: type ? 'Success!' : 'An error occurred.',
    description: text,
    status: type || 'error',
    position: 'bottom-left',
    duration: 6000,
    isClosable: true,
  })
}
