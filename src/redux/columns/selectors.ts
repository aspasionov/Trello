import type { RootState } from '@store/store'
import type { ColumnT } from '@store/columns/types'
export const selectColumns = (state: RootState): ColumnT[] => state.column.items
