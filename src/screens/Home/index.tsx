import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Board from 'react-trello'

import {
  fetchColumns,
  deleteColumn,
  addColumn,
  updateCard,
  updateColumn,
  addCard
} from '@store/desk/asyncActions'
import { useAppDispatch } from '@store/store'
import {selectColumns, selectParams, selectStatus} from '@store/desk/selectors'
import { StatusE } from '@store/desk/types'
import { usePushToSearch } from '@hooks/usePushToSearch'
import LaneHeader from './LaneHeader'
import Card from './Card'

import Preloader from '@components/Preloader'
import type { ColumnT, CardT } from '@store/desk/types'
import {useDebounce} from "@hooks/useDebounce";
import { setParams } from '@store/desk/slice'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const columns = useSelector(selectColumns)
  const urlParams = useSelector(selectParams)
  const status = useSelector(selectStatus)

  const initialized = useRef(false)

  const { pushToSearch, searchParams } = usePushToSearch()

  const search = useDebounce(urlParams.search, 500)

  useEffect(() => {
    const defaultSearchValue = searchParams.get('search')
    if(defaultSearchValue) dispatch(
      setParams({ search: defaultSearchValue })
    )
  }, [searchParams]);

  useEffect(() => {
    if(initialized.current) {
      void (async () => {
        try {
          await dispatch(fetchColumns({ search }))
          pushToSearch({ search })
        } catch (e) {
          console.error(e)
        }
      })()
    } else {
      initialized.current = true
    }

  }, [search])

  const handleDragEnd = async (
    cardId: string,
    sourceLaneId: string,
    targetLaneId: string,
    position: number,
    cardDetails: Partial<CardT>
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
      title: params.title,
      order: columns.length
    }
    await dispatch(addColumn(newColumn as ColumnT))
    await dispatch(fetchColumns())

  }

  const handleCardAdd = async (card: CardT, laneId: string): Promise<void> => {
    const currentCol = columns.find((el) => el.id === laneId)
    const newCard: Partial<CardT & { draggable: boolean }> = {
      ...card,
      order: currentCol !== undefined ? currentCol.cards.length : 0,
      columnId: laneId
    }
    await dispatch(addCard(newCard as CardT))
    await dispatch(fetchColumns())
  }

  const components: Record<string, React.FC> = {
    LaneHeader: LaneHeader as React.FC,
    Card
  }

  const copyArr = JSON.parse(JSON.stringify(columns))

  return (
    <div>
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
        handleLaneDragEnd={(_, order, col) => {
          void (async () => {
            const updatedColumn = {
              ...col,
              order
            }
            await dispatch(updateColumn(updatedColumn))
            await dispatch(fetchColumns())
          })()
        }}
        canAddLanes
        cardDraggable
        draggable
        editable
      />

      {status === StatusE.LOADING && <Preloader />}
    </div>
  )
}

export default Home
