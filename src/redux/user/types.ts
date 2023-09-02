import type { ColumnT } from '../desk/types'

export interface ErrorsT {
  errors: Array<{
    email?: string
    password?: string
    name?: string
  }>
}

export interface UserT {
  name?: string
  email?: string
  columns?: ColumnT[]
  password?: string
  isAuth?: boolean
  avatarUrl?: string
  token?: string
  __v?: number
  _id?: string
}

export enum StatusE {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface UserStateT {
  user: null | UserT
  status: StatusE
}
