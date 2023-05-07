import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Board from 'react-trello-ts'

import { fetchColumns, deleteColumn, addColumn } from '@store/columns/asyncActions'
import { fetchCards, addCard } from '@store/cards/asyncActions'
import { useAppDispatch } from '@store/store'
import { selectColumns } from '@store/columns/selectors'
import { setColumns } from '@store/columns/slice'
import { selectCards } from '@store/cards/selectors'
import LaneHeader from './LaneHeader'
import Card from './Card'

import Preloader from '@components/Preloader'
import type { ColumnT } from '@store/columns/types'
import type { CardT } from '@store/cards/types'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const columns = useSelector(selectColumns)
  const cards = useSelector(selectCards)

  useEffect(() => {
    void (async () => {
      try {
        await dispatch(fetchColumns())
        await dispatch(fetchCards())
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  useEffect(() => {
    const columnWithCards: ColumnT[] = columns.map((el: ColumnT, index: number) => {
      const currentCards = cards.filter(
        (card: CardT) => el.id === card.columnId
      )
      return {
        ...el,
        order: index,
        cards: currentCards
      }
    })
    dispatch(setColumns(columnWithCards))
  }, [cards])

  if (columns.length === 0 || cards.length === 0) return <Preloader />

  const components: Record<string, any> = {
    LaneHeader,
    Card
  }

  return (
    <div>
      <Board
        components={components}
        canAddLanes
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onLaneDelete={async (id) => await dispatch(deleteColumn(id))}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onLaneAdd={async (params) => {
          const newColumn: Partial<ColumnT> = {
            id: params.laneId,
            title: params.title,
            label: params.label
          }
          await dispatch(
            addColumn(newColumn as ColumnT)
          )
        }}
        onCardAdd= { (card, laneId) => {
          void (async () => {
            const newCard: Partial<CardT & { draggable: boolean }> = {
              ...card,
              draggable: true,
              columnId: laneId
            }
            await dispatch(addCard(newCard as CardT))
          })()
        }}
        // handleDragStart={(cardId, laneId) => {
        //   console.log('cardId, laneId', cardId, laneId)
        //   const currentColumn = columns.find(el => el.id === laneId);
        //   currentColumn.cards = currentColumn.cards.filter(card => card.id === cardId)
        //   console.log('currentColumn', currentColumn)
        //   dispatch(setColumns([]))
        // }}
        // handleDragEnd={async (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
        //   const newCard: Partial<CardT> = {
        //     ...cardDetails,
        //     columnId: targetLaneId
        //   }
        //   await dispatch(updateCard(newCard as CardT))
        // }}
        onCardUpdate={(cardId, card) => { console.log('xxx', cardId, card) }}
        // onDataChange={(newData) => console.log(newData)}
        editable
        cardDraggable
        data={{ lanes: columns }}
      />
    </div>
  )
}

export default Home
