import type { RootState } from '@store/store'
import type { ColumnT, StatusE } from '@store/desk/types'
export const selectColumns = (state: RootState): ColumnT[] => state.desk.items
export const selectStatus = (state: RootState): StatusE => state.desk.status
