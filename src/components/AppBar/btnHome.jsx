import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import * as React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { Link } from '@mui/material'
export default function Home() {
  const [open, setOpen] = React.useState(false)
  const toggleMap = (newOpen) => () => {
    setOpen(newOpen)
  }
  return (
    <Box sx={{ marginLeft: '50px' }}>
      <Button component={Link} to='/' style={{ alignItems: 'center', display: 'flex' }}> <HomeOutlinedIcon fontSize='small' color='teal' /> Home </Button>
    </Box>
  )
}