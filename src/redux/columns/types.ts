export interface CardT {
  id: string
  description: string
  label: string
  columnId: string
  title: string
}

export interface ColumnT {
  id: string
  label: string
  title: string
  cards?: CardT[]
}

export enum StatusE {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ColumnI {
  items: ColumnT[]
  status: StatusE
}
