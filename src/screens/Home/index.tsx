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
import { StatusE } from '@store/columns/types'
import LaneHeader from './LaneHeader'
import Card from './Card'

import Preloader from '@components/Preloader'
import type { ColumnT } from '@store/columns/types'
import type { CardT } from '@store/cards/types'
import type { FormState as NewCardFormState } from 'react-trello-ts/dist/components/NewCardForm'
import type { Card as ICard } from 'react-trello-ts/dist/types/Board'

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

  const handleDragEnd = async (
    cardId: string,
    sourceLaneId: string,
    targetLaneId: string,
    position: number,
    cardDetails: ICard
  ): Promise<void> => {
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

    await dispatch(updateColumn(updatedNewColumn as ColumnT))
    await dispatch(updateColumn(updatedOldColumn as ColumnT))
    await dispatch(fetchColumns())
  }
  const handleLineAdd = async (params: NewCardFormState): Promise<void> => {
    const newColumn: Partial<ColumnT> = {
      id: params.laneId,
      title: params.title,
      label: params.label
    }
    await dispatch(addColumn(newColumn as ColumnT))
  }

  const handleCardAdd = async (card: ICard, laneId: string): Promise<void> => {
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
    await dispatch(updateColumn(updatedNewColumn as ColumnT))
    await dispatch(fetchColumns())
  }

  const components: Record<string, any> = {
    LaneHeader,
    Card
  }

  return (
    <div>
      <Board
        components={components}
        canAddLanes
        onLaneDelete={(id) => {
          void (async () => {
            await dispatch(deleteColumn(id))
          })()
        }}
        onLaneAdd={(params) => {
          void (async () => {
            await handleLineAdd(params)
          })()
        }}
        onCardAdd={(card, laneId) => {
          void (async () => {
            await handleCardAdd(card, laneId)
          })()
        }}
        handleDragEnd={(
          cardId,
          sourceLaneId,
          targetLaneId,
          position,
          cardDetails
        ) => {
          if (targetLaneId !== sourceLaneId) {
            void (async () => {
              await handleDragEnd(
                cardId,
                sourceLaneId,
                targetLaneId,
                position,
                cardDetails
              )
            })()
          }
        }}
        editable
        cardDraggable
        data={{ lanes: columns }}
      />

      {status === StatusE.LOADING && <Preloader />}
    </div>
  )
}

export default Home
