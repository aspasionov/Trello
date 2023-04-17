import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Board from 'react-trello-ts'

import { fetchData, deleteColumn } from '@store/columns/asyncActions'
import { useAppDispatch } from '@store/store'
import { selectColumns } from '@store/columns/selectors'
import Column from './Column'
import LaneHeader from './LaneHeader'

import Preloader from '@components/Preloader'

const defaultCol = {
  id: 'lane3',
  title: 'lol',
  label: '3/4',
  cards: []
}

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

  const handleClick = (): void => {
    setColumns(prev => ({ lanes: [...prev.lanes, defaultCol] }))
  }

  console.log(items)

  if(!items.length) return <Preloader/>

  const components = {
    // AddCardLink:  () => <button>New Card</button>,
    NewLaneSection: Column,
    LaneHeader: (props) => <LaneHeader {...props} id='xxxx'/>
  }

  console.log('xxxxx')

  return <div>
    <Board
      components={components}
      canAddLanes
      onLaneDelete={ async (id: string) => {
        await dispatch(deleteColumn(id))
      }}
      editable
      data={{ lanes: items }}
    />
  </div>
}

export default Home
