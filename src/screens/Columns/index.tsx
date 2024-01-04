import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { ColumnT } from '@store/desk/types'
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '@store/store'
import { selectColumns,selectCount } from '@store/columns/selectors'
import { fetchColumns } from '@store/columns/asyncActions'
import { fetchAllColumns } from '@api/adminRoutes.api'
import { Container, Flex, Box } from '@chakra-ui/react'

import Filter from '@components/Filter'
import Preloader from '@components/Preloader'
import ColumnCard from './Card'
import { useDebounce } from '@hooks/useDebounce'
import { usePushToSearch } from '@hooks/usePushToSearch'
import { addColumns } from '@store/columns/slice'

interface ParamsT {
  search: string
  userIds: string
}

interface rawDataT {
  data: ColumnT[]
  meta: {
    'total_count': number
  }
}

const Columns: React.FC = () => {
  const dispatch = useAppDispatch()
  const columns = useSelector(selectColumns)
  const totalCount = useSelector(selectCount)
  const [params, setParams] = useState<ParamsT>({
    search: '',
    userIds: ''
  })

  const [page, setPage] = useState(2)
  const [isLoading, setIsLoading] = useState(false);

  const { pushToSearch, searchParams } = usePushToSearch()

  const search = useDebounce(params.search, 500)
  const filterUserId = searchParams.get('userIds')

  useEffect(() => {
    pushToSearch(params as Record<string, string | number>)
  }, [params])

  useEffect(() => {
    const columnsParams = {
      search,
      userIds: filterUserId,
      page: 1
    }

    void (async () => {
      const data =  await dispatch(fetchColumns(columnsParams))
      const rawDate: rawDataT = unwrapResult(data)
      const count = rawDate.meta['total_count']
      const columnsCount = rawDate.data.length
      setPage(2)
      if((document.documentElement.scrollHeight - (window.innerHeight + document.documentElement.scrollTop)) < 100 && columnsCount < count) {
        setIsLoading(true)
      }
    })()
  }, [search, filterUserId])

  useEffect(() => {
    void (async () => {
      if(isLoading) {
        const { data } = await fetchAllColumns({ ...params, page })
        dispatch(addColumns(data))
        setPage(prev => prev + 1)
        setIsLoading(false)
      }
    })()

  }, [isLoading]);

  useEffect(() => {
    if(columns.length < totalCount) {
      const handleScroll = () => {
        if((document.documentElement.scrollHeight - (window.innerHeight + document.documentElement.scrollTop)) < 100) {
          setIsLoading(true)
        }
      }
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }


  }, [columns.length]);

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
      {isLoading && <Box h='100px' position='relative'>
        <Preloader isInside={true}/>
      </Box>}
    </Container>
  )
}

export default Columns
