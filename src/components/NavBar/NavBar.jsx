import { Link, NavLink } from 'react-router-dom'
import './navBar.css'
import hcmutLogo from '~/assets/logo.jpg'
export default function NavBar() {

  return (
    <div className='app-bar'>
      <div className='hcmut'>
        <img src={hcmutLogo} alt="HCMUT Logo" className="hcmut-logo" />

      </div>
      <div>
        <ul>
          <NavLink to='/login' className='login1'>Login</NavLink>
        </ul>
      </div>
    </div>
  )
}
