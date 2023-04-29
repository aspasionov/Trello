import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Board from 'react-trello-ts'

import { fetchData, deleteColumn, addColumn } from '@store/columns/asyncActions'
import { useAppDispatch } from '@store/store'
import { selectColumns } from '@store/columns/selectors'
import LaneHeader from './LaneHeader'

import Preloader from '@components/Preloader'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const items = useSelector(selectColumns)
  useEffect(() => {
    void (async () => {
      try {
        await dispatch(fetchData())
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  if (items.length === 0) return <Preloader />

  const components: Record<string, any> = {
    LaneHeader
  }

  return (
    <div>
      <Board
        components={components}
        canAddLanes
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onLaneDelete={async (id) => await dispatch(deleteColumn(id))}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onLaneAdd={async (params) =>
          await dispatch(
            addColumn({
              id: params.laneId,
              title: params.title,
              label: params.label
            })
          )
        }
        editable
        data={{ lanes: items }}
      />
    </div>
  )
}

export default Home
