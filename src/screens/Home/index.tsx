import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Board from 'react-trello-ts'

import {
  fetchColumns,
  deleteColumn,
  addColumn,
  updateCard,
  addCard
} from '@store/desk/asyncActions'
import { useAppDispatch } from '@store/store'
import { selectColumns, selectStatus } from '@store/desk/selectors'
import { StatusE } from '@store/desk/types'
import LaneHeader from './LaneHeader'
import Card from './Card'

import Preloader from '@components/Preloader'
import type { ColumnT, CardT } from '@store/desk/types'
import type { FormState as NewCardFormState } from 'react-trello-ts/dist/components/NewCardForm'
import type { Card as ICard } from 'react-trello-ts/dist/types/Board'
import Header from '@components/Header'

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
    const currentCol = columns.find((el) => el.id === targetLaneId)
    const prevCol = columns.find((el) => el.id === sourceLaneId)

    const newCard: Partial<CardT> = {
      ...cardDetails,
      prevColumnId: prevCol !== undefined ? prevCol.dbId : null,
      order: position,
      columnId: currentCol !== undefined ? currentCol.dbId : null
    }

    await dispatch(updateCard(newCard as CardT))

    await dispatch(fetchColumns())
  }
  const handleLineAdd = async (params: NewCardFormState): Promise<void> => {
    const newColumn: Partial<ColumnT> = {
      order: columns.length,
      id: params.laneId,
      title: params.title,
      label: params.label
    }
    await dispatch(addColumn(newColumn as ColumnT))
    await dispatch(fetchColumns())
  }

  const handleCardAdd = async (card: ICard, laneId: string): Promise<void> => {
    const currentCol = columns.find((el) => el.id === laneId)
    const newCard: Partial<CardT & { draggable: boolean }> = {
      ...card,
      order: currentCol !== undefined ? currentCol.cards.length : 0,
      columnId: currentCol !== undefined ? currentCol.dbId : ''
    }
    await dispatch(addCard(newCard as CardT))
    await dispatch(fetchColumns())
  }

  const components: Record<string, any> = {
    LaneHeader,
    Card
  }

  return (
    <div>
      <Header />
      <Board
        components={components}
        canAddLanes
        onLaneDelete={(id) => {
          void (async () => {
            const currentCol = columns.find((el) => el.id === id)
            if (currentCol !== undefined) {
              await dispatch(deleteColumn(currentCol.dbId))
            }
            await dispatch(fetchColumns())
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
