import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchAll } from '@api/columns.api'
import { fetchAll as fetchCards } from '@api/cards.api'
import { fetchData } from '@store/columns/asyncActions'
import { useAppDispatch } from '@store/store'
import { selectColumns } from '@store/columns/selectors'
import Column from './Column'
import LaneHeader from './LaneHeader'

import Board from 'react-trello-ts'
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import Preloader from '@components/Preloader'

const defaultCol = {
  id: 'lane3',
  title: 'lol',
  label: '3/4',
  cards: []
}

const xxx = {
  cards: [
    {
      description: '2 Gallons of milk at the Deli store',
      id: 'Card1',
      label: '2017-12-01',
      laneId: 'SORTED_LANE',
      metadata: {
        completedAt: '2017-12-01T10:00:00Z',
        shortCode: 'abc'
      },
      title: 'Buy milk'
    },
    {
      description: 'Sort out recyclable and waste as needed',
      id: 'Card2',
      label: '2017-11-01',
      laneId: 'SORTED_LANE',
      metadata: {
        completedAt: '2017-11-01T10:00:00Z',
        shortCode: 'aaa'
      },
      title: 'Dispose Garbage'
    },
    {
      description: 'Can AI make memes?',
      id: 'Card3',
      label: '2017-10-01',
      laneId: 'SORTED_LANE',
      metadata: {
        completedAt: '2017-10-01T10:00:00Z',
        shortCode: 'fa1'
      },
      title: 'Write Blog'
    },
    {
      description: 'Transfer to bank account',
      id: 'Card4',
      label: '2017-09-01',
      laneId: 'SORTED_LANE',
      metadata: {
        completedAt: '2017-09-01T10:00:00Z',
        shortCode: 'ga2'
      },
      title: 'Pay Rent'
    }
  ],
  id: 'SORTED_LANE',
  label: '20/70',
  title: 'Sorted Lane'
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
    LaneHeader
  }

  console.log('xxxxx')


  return <div>
    {/*<Button colorScheme='blue' onClick={handleClick}>*/}
    {/*  <AddIcon/> <span>Add new column</span>*/}
    {/*</Button>*/}
    <Board
      components={components}
      // AddCardLink={() => <button>New Card</button>}
      canAddLanes
      // editLaneTitle
      // laneDraggable
      // hideCardDeleteAction
      // hideCardDeleteIcon
      editable
      // addLaneTitle="NEW LANE"
      data={{ lanes: items }}
    />
  </div>
}

export default Home
