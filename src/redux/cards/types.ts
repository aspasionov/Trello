import type { StatusE } from '@store/columns/types'

export interface CardT {
  id: string
  description: string
  label: string
  columnId: string
  title: string
  order: number
}

export interface CardI {
  cards: CardT[]
  status: StatusE
}
