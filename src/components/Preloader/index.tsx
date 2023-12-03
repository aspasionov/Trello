import React from 'react'
import { Spinner, Box } from '@chakra-ui/react'

const boxStyles = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background: 'rgba(255,255,255, .5)',
  zIndex: 999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const Preloader: React.FC = () => (
  <Box sx={boxStyles}>
    <Spinner />
  </Box>
)

export default Preloader
