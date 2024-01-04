import type { ColumnT, StatusE } from '@store/desk/types'
export interface ColumnsStateT {
  columns: ColumnT[]
  totalCount: number,
  status: StatusE
}
