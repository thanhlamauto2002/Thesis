import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import * as React from 'react'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
export default function Map() {
  const [open, setOpen] = React.useState(false)
  const toggleMap = (newOpen) => () => {
    setOpen(newOpen)
  }
  return (
    <Box>
      <Button onClick={toggleMap(true)} > <LocationOnOutlinedIcon fontSize='1.1rem' /> Maps </Button>
    </Box>
  )
}