import { Link, NavLink } from 'react-router-dom'
import './NavStation.css'
import { Box } from '@mui/material'

export default function NavStation() {
  return (
    <nav className='station-nav'>
      <ul>
        <li>
          <NavLink to='/bachkhoastation'>Bach Khoa Station</NavLink>
        </li>
        <li>
          <NavLink to='/haugiangstation'>Hau Giang Station</NavLink>
        </li>
        <li >
          <NavLink to='/travinhstation'>Tra Vinh Station</NavLink>
        </li>
      </ul>
    </nav>
  )
}
