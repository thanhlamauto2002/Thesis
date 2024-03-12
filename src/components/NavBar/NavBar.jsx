import { Link, NavLink } from 'react-router-dom'
import './navBar.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'

export default function NavBar() {
  return (
    <nav>
      <Link to='/' className='home' > <HomeOutlinedIcon fontSize='large' color='black' />Home</Link>

      <ul>
        <li>
          <NavLink to='/stations'>Stations</NavLink>
        </li>
        <li>
          <NavLink to='/maps'>Maps</NavLink>
        </li>
        <li >
          <NavLink to='/alarm'>Alarm</NavLink>
        </li>
        <li >
          <NavLink to='/login' className='login1'>Login</NavLink>
        </li>

      </ul>
    </nav>
  )
}
