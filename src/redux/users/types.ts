import type { StatusE } from '@store/desk/types'

export interface UserI {
  email?: string
  name: string
  _id: string
}

export interface UserStateT {
  users: UserI[]
  status: StatusE
}
