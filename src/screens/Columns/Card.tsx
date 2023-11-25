import React from 'react'
import {
  Card,
  Heading,
  CardHeader,
  Stack,
  Box,
  CardBody,
  Divider,
  Text
} from '@chakra-ui/react'
import type { ColumnT } from '@store/desk/types'

interface Props {
  column: ColumnT
}

const ColumnCard: React.FC<Props> = ({ column }) => {
  return (
    <Card sx={{ mb: 4 }}>
      <CardHeader>
        <Heading size="md">{column.title}</Heading>
      </CardHeader>
      <Divider orientation="horizontal" />
      <CardBody>
        <Stack spacing="4" maxWidth="3xl">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Cards
            </Heading>
            <Text pt="2" fontSize="sm">
              {column.cards.length}
            </Text>
          </Box>
          <Divider orientation="horizontal" />
          <Box>
            <Heading size="xs" textTransform="uppercase">
              User
            </Heading>
            <Text pt="2" fontSize="sm">
              Check out the overview of your clients.
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default ColumnCard
