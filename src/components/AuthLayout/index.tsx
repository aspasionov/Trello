import React, { useEffect } from 'react'
import { useOutlet } from 'react-router-dom'

import instance from '@api/base.api'
import { getCurrentUser } from '@store/user/asyncActions'
import { setUser } from '@store/user/slice'
import Preloader from '@components/Preloader'
import { useAppDispatch } from '@store/store'
import { selectUser } from '@store/user/selectors'
import { useSelector } from 'react-redux'

const AuthLayout: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useSelector(selectUser)
  const outlet = useOutlet()
  useEffect(() => {
    void (async () => {
      const token: string | null = localStorage.getItem('TrelloToken')
      if (token !== null) {
        instance.defaults.headers.common.Authorization = `Bearer ${token}`
        try {
          await dispatch(getCurrentUser())
        } catch (err) {
          console.error(err)
        }
      } else {
        dispatch(setUser({ isAuth: false }))
      }
    })()
  }, [])

  if (user === null) {
    return <Preloader />
  }

  return <>{outlet}</>
}

export default AuthLayout
