import { RootState } from '@store/store'
export const selectColumns = (state: RootState) => state.column.items;
