import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'

export default function Search() {
  return (
    <Box> <TextField id="outlined-search" label="Search" type="search" size='small'
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon size='small' /></InputAdornment>
      }} />
    </Box>
  )
}