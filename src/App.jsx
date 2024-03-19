import Container from '@mui/material/Container'
import NavBar from '~/components/NavBar/NavBar'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import SideBar from './components/SideBar'
import AppRoute from './routes/AppRoute'
const socket = socketIOClient('http://localhost:8017/')
function App() {
  useEffect(() => {
    console.log('Connected to server')
    return () => {
      socket.disconnect()
      console.log('Disconnected from server')

    }
  }, [])
  return (
    <div className='App'>
      <div className='app-bar'>
        <NavBar />
      </div>
      <div className='side-bar'>
        <SideBar />
        <div className='main-content'>
          <AppRoute />
        </div>
      </div>
    </div>
  )
}

export default App

