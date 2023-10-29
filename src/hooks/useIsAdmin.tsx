import { selectUser } from '@store/user/selectors'
import { useSelector } from 'react-redux'

const useIsAdmin = (): boolean => {
  const user = useSelector(selectUser)
  console.log('user', user)
  return user.isAuth ? (user.roles as string[])?.includes('admin') : false
}

export { useIsAdmin }
