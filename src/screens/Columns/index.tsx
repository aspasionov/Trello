import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@store/store'
import { selectColumns } from '@store/columns/selectors'
import { fetchColumns } from '@store/columns/asyncActions'
import { Container, Flex, Box } from '@chakra-ui/react'

import Filter from '@components/Filter'
import ColumnCard from './Card'
import { useDebounce } from '@hooks/useDebounce'
import { usePushToSearch } from '@hooks/usePushToSearch'

interface ParamsT {
  search: string
  userIds: string
}

const Columns: React.FC = () => {
  const dispatch = useAppDispatch()
  const columns = useSelector(selectColumns)
  const [params, setParams] = useState<ParamsT>({
    search: '',
    userIds: ''
  })

  const { pushToSearch, searchParams } = usePushToSearch()

  const search = useDebounce(params.search, 500)
  const filterUserId = searchParams.get('userIds')

  useEffect(() => {
    pushToSearch(params)
  }, [params])

  useEffect(() => {
    const columnsParams = {
      search,
      userIds: filterUserId
    }
    void (async () => await dispatch(fetchColumns(columnsParams)))()
  }, [search, filterUserId])

  return (
    <Container>
      <Filter setParams={setParams} params={params} />

      <Flex gap="4" flexWrap="wrap">
        {columns.length > 0
          ? columns.map((el) => (
            <Box sx={{ w: '48%' }} key={el._id}>
              <ColumnCard column={el} />
            </Box>
          ))
          : 'Nothing to show!'}
      </Flex>
    </Container>
  )
}

export default Columns
