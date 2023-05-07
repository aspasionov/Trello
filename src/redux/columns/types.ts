import type { CardT } from '../cards/types'

export interface ColumnT {
  id: string
  label: string
  title: string
  order: number
  cards: CardT[]
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
