import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAll } from '@api/columns.api'
import { fetchAll as fetchAllCards } from '@api/cards.api'
import type { CardT, ColumnT } from './types'

export const fetchData = createAsyncThunk(
  'column/fetchData',
  async () => {
    const [{ data: cardsData }, { data: columnsData }] = await Promise.all([fetchAllCards(), fetchAll()])

    const columnWithCards: ColumnT[] = columnsData.map((el: ColumnT) => {
      const currentCards = cardsData.filter((card: CardT) => el.id === card.columnId)
      return {
        ...el,
        cards: currentCards
      }
    })

    return columnWithCards
  }
)