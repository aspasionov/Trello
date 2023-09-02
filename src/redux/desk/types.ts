export interface CardT {
  id: string
  description: string
  label: string
  columnId: string | null
  prevColumnId?: string | null
  title: string
  order: number
}

export interface ColumnT {
  id: string
  label: string
  title: string
  dbId: string
  order: number
  cards: CardT[] | []
}

export enum StatusE {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface ColumnI {
  items: ColumnT[]
  status: StatusE
}
