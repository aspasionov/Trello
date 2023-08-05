import instance from '@api/base.api'
import { AxiosError } from 'axios'
import type { UserT } from '@store/user/types'

export const getUser = async (): Promise<UserT> => {
  return await instance({
    url: '/auth/me',
    method: 'GET'
  })
}

export const loginUser = async (data: UserT): Promise<UserT | unknown> => {
  try {
    const res = await instance({
      url: '/auth/login',
      method: 'POST',
      data
    })
    return res
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      if (err?.response !== undefined) {
        return await Promise.reject(err.response.data)
      }
    } else {
      throw err
    }
  }
}

export const registerUser = async (data: UserT): Promise<UserT | unknown> => {
  try {
    const res = await instance({
      url: '/auth/register',
      method: 'POST',
      data
    })
    return res
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      if (err?.response !== undefined) {
        return await Promise.reject(err.response.data)
      }
    } else {
      throw err
    }
  }
}
