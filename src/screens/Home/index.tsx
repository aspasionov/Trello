import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Board from 'react-trello-ts'

import {
  fetchColumns,
  deleteColumn,
  updateColumn,
  addColumn
} from '@store/columns/asyncActions'
import { useAppDispatch } from '@store/store'
import { selectColumns, selectStatus } from '@store/columns/selectors'
import { addNewCard } from '@store/columns/slice'
import { StatusE } from '@store/columns/types'
import LaneHeader from './LaneHeader'
import Card from './Card'

import Preloader from '@components/Preloader'
import type { ColumnT } from '@store/columns/types'
import type { CardT } from '@store/cards/types'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const columns = useSelector(selectColumns)
  const status = useSelector(selectStatus)

  useEffect(() => {
    void (async () => {
      try {
        await dispatch(fetchColumns())
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

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
          await dispatch(addColumn(newColumn as ColumnT))
        }}
        onCardAdd={(card, laneId) => {
          void (async () => {
            const currentCol = columns.find((el) => el.id === laneId)
            const newCard: Partial<CardT & { draggable: boolean }> = {
              ...card,
              draggable: true,
              columnId: laneId
            }

            const updatedNewColumn: Partial<ColumnT> = {
              ...currentCol,
              cards:
                currentCol === undefined
                  ? []
                  : ([...currentCol.cards, newCard] as CardT[])
            }
            dispatch(addNewCard(newCard as CardT))
            await dispatch(updateColumn(updatedNewColumn as ColumnT))
          })()
        }}
        // handleDragStart={(cardId, laneId) => {
        //   console.log('cardId, laneId', cardId, laneId)
        //   const currentColumn = columns.find(el => el.id === laneId);
        //   currentColumn.cards = currentColumn.cards.filter(card => card.id === cardId)
        //   console.log('currentColumn', currentColumn)
        //   dispatch(setColumns([]))
        // }}
        handleDragEnd={(
          cardId,
          sourceLaneId,
          targetLaneId,
          position,
          cardDetails
        ) => {
          void (async () => {
            const newColumn = columns.find((el) => el.id === targetLaneId)
            const oldLine = columns.find((el) => el.id === sourceLaneId)
            const newCard: Partial<CardT> = {
              ...cardDetails,
              columnId: targetLaneId
            }

            const updatedOldColumn: Partial<ColumnT> = {
              ...oldLine,
              cards:
                oldLine === undefined
                  ? []
                  : oldLine.cards.filter((card) => card.id !== cardId)
            }

            const updatedNewColumn: Partial<ColumnT> = {
              ...newColumn,
              cards:
                newColumn === undefined
                  ? []
                  : ([...newColumn.cards, newCard] as CardT[])
            }
            await dispatch(updateColumn(updatedOldColumn as ColumnT))
            await dispatch(updateColumn(updatedNewColumn as ColumnT))
          })()
        }}
        // onCardUpdate={(cardId, card) => {
        //   console.log('xxx', cardId, card)
        // }}
        // onDataChange={(newData) => console.log('newData', newData)}
        editable
        cardDraggable
        data={{ lanes: columns }}
      />

      {status === StatusE.LOADING && <Preloader />}
    </div>
  )
}

export default Home
