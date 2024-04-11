import { Link, NavLink } from 'react-router-dom'
import './navBar.css'
import hcmutLogo from '~/assets/logo.jpg'
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
export default function NavBar({ isLogged, onRemoveLogin, userRole, userName }) {

  return (
    <div className='app-bar'>
      <div className='hcmut'>
        <img src={hcmutLogo} alt="HCMUT Logo" className="hcmut-logo" />

      </div>
      <div>
        <ul className='login-label'>
          {isLogged ? (
            // Nếu đã đăng nhập, hiển thị nút Log Out
            <>
              <li className='user-label'>
                {userName && <span className='user-name'><AccountCircleOutlinedIcon />{userName}</span>} {/* Hiển thị vai trò của người dùng */}
              </li>
              <li>
                <NavLink onClick={onRemoveLogin} className='logout'> <LogoutOutlinedIcon /> LogOut</NavLink>
              </li>
            </>
          ) : (
            // Nếu chưa đăng nhập, hiển thị nút Login
            <li>
              <NavLink to='/login' className='login1'> <LoginOutlinedIcon />LogIn</NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
