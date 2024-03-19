import { Link, NavLink } from 'react-router-dom'
import './navBar.css'


export default function NavBar() {

  return (

    <ul>
      <NavLink to='/login' className='login1'> Login </NavLink>
    </ul>
  )
}
