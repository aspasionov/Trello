import type { RootState } from '@store/store'
import type { ColumnT, StatusE } from '@store/columns/types'
export const selectColumns = (state: RootState): ColumnT[] => state.column.items
export const selectStatus = (state: RootState): StatusE => state.column.status
