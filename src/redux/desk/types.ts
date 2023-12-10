export interface CardT {
  id: string
  description: string
  label: string
  columnId: string | null
  prevColumnId?: string | null
  title: string
  background: Blob | string | null
  order: number
}

export interface ColumnT {
  id: string
  _id?: string
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
  columnParams: Record<string, string>
  status: StatusE
}
