import type { RootState } from '@store/store'
import type { UserT } from '@store/user/types'
export const selectUser = (state: RootState): UserT => state.user.user as UserT
