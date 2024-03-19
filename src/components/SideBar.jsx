import React from 'react'
import '~/App.css'
import { SidebarData } from './SidebarData'
import { useNavigate } from 'react-router-dom'
function SideBar() {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
  }
  return (
    <div className='Sidebar'>
      <ul className='SidebarList'>
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className='row'
              id={window.location.pathname == val.link ? 'active' : ''}
              onClick={() => handleNavigation(val.link)}>
              <div id='icon'>{val.icon}</div>
              <div id='title'>{val.title}</div>
            </li>
          )
        }
        )}
      </ul>
    </div>
  )
}

export default SideBar