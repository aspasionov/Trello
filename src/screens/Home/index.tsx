import React, { useEffect, useState } from 'react'
import instance from '@api/base.api'
import Board from 'react-trello'
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import Preloader from '@components/Preloader'

const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false },
        { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' }}
      ]
    },
    {
      id: 'lane2',
      title: 'Completed',
      label: '0/0',
      cards: []
    }
  ]
}

const defaultCol = {
  id: 'lane3',
  title: 'lol',
  label: '3/4',
  cards: []
}

const Home: React.FC = () => {
  const [columns, setColumns] = useState(data)

  useEffect(() => {
    void (async () => {
      try {
        const res = await instance({
          method: 'GET'
        })
        console.log(res)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  const handleClick = (): void => {
    setColumns(prev => ({lanes: [...prev.lanes, defaultCol] }))
  }

  return <div>
    {/*<Preloader/>*/}
    <Button colorScheme='blue' onClick={handleClick}>
      <AddIcon/> <span>Add new column</span>
    </Button>
    <Board data={columns}/>
  </div>
}

export default Home
