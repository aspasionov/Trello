import { selectUser } from '@store/user/selectors'
import { useSelector } from 'react-redux'

const useIsAdmin = (): boolean => {
  const user = useSelector(selectUser)
  return user._id !== undefined
    ? (user.roles as string[]).includes('admin')
    : false
}

export { useIsAdmin }
