import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@store/store'
import { selectColumns } from '@store/columns/selectors'
import { fetchColumns } from '@store/columns/asyncActions'
import { Container, Flex, Box } from '@chakra-ui/react'

import Filter from '@components/Filter'
import ColumnCard from './Card'

const Columns: React.FC = () => {
  const dispatch = useAppDispatch()
  const columns = useSelector(selectColumns)

  useEffect(() => {
    (async () => await dispatch(fetchColumns()))()
  }, [])

  // const renderCards = () => {
  //   columns.length ?  : <></>
  // }
  console.log('columns', columns)

  return <Container>
    <Filter/>

    <Flex gap='4' flexWrap='wrap'>
      {columns.map(el => <Box sx={{ w: '48%'}}>
        <ColumnCard column={el} key={el.id}/>
      </Box>)}
    </Flex>
  </Container>
}

export default Columns
