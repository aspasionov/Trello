import type { RootState } from '@store/store'
import type { ColumnT, StatusE } from '@store/desk/types'
export const selectColumns = (state: RootState): ColumnT[] => state.columns.columns
export const selectStatus = (state: RootState): StatusE => state.columns.status
export const selectCount = (state: RootState): StatusE => state.columns.totalCount
