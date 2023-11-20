import type { RootState } from '@store/store'
import type { UserI } from './types'
export const selectUsers = (state: RootState): UserI[] => state.users.users
