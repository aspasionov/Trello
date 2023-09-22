import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Board from 'react-trello'

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
    const newCard: Partial<CardT> = {
      ...cardDetails,
      prevColumnId: sourceLaneId,
      order: position,
      columnId: targetLaneId
    }

    await dispatch(updateCard(newCard as CardT))

    await dispatch(fetchColumns())
  }
  const handleLineAdd = async (params: {
    id: string
    title: string
  }): Promise<void> => {
    const newColumn: Partial<ColumnT> = {
      title: params.title
    }
    await dispatch(addColumn(newColumn as ColumnT))
    await dispatch(fetchColumns())
  }

  const handleCardAdd = async (card: ICard, laneId: string): Promise<void> => {
    const currentCol = columns.find((el) => el.id === laneId)
    const newCard: Partial<CardT & { draggable: boolean }> = {
      ...card,
      order: currentCol !== undefined ? currentCol.cards.length : 0,
      columnId: laneId
    }
    await dispatch(addCard(newCard as CardT))
    await dispatch(fetchColumns())
  }

  const components: Record<string, any> = {
    LaneHeader,
    Card
  }

  const copyArr = JSON.parse(JSON.stringify(columns))

  return (
    <div>
      <Header />
      <Board
        style={{ height: 'calc(100vh - 81px)' }}
        data={{ lanes: copyArr }}
        components={components}
        onLaneDelete={(id: string) => {
          void (async () => {
            await dispatch(deleteColumn(id))
            await dispatch(fetchColumns())
          })()
        }}
        onLaneAdd={(params: { id: string; title: string }) => {
          void (async () => {
            await handleLineAdd(params)
          })()
        }}
        onCardAdd={(card: CardT, laneId: string) => {
          void (async () => {
            await handleCardAdd(card, laneId)
          })()
        }}
        handleDragEnd={(
          cardId: string,
          sourceLaneId: string,
          targetLaneId: string,
          position: number,
          cardDetails: CardT
        ) => {
          if (targetLaneId === sourceLaneId && position === cardDetails.order)
            return
          if (
            targetLaneId !== sourceLaneId ||
            (targetLaneId === sourceLaneId && position !== cardDetails.order)
          ) {
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
        canAddLanes
        cardDraggable
        editable
      />

      {status === StatusE.LOADING && <Preloader />}
    </div>
  )
}

export default Home
