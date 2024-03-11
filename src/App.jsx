import Container from '@mui/material/Container'
import NavBar from '~/components/NavBar/NavBar'
import './App.css'
import { Outlet } from 'react-router-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from 'react-router-dom'
import Station from './pages/Stations/Station1'
import Map from './pages/Map1'
import Login from './pages/LoginForm/Login1'
import Home from './pages/Home1'
import BachKhoa from '~/pages/BachKhoa'
import HauGiang from '~/pages/HauGiang'
import TraVinh from '~/pages/TraVinh'
function App() {
  return (
    <>
      <NavBar />
      <div className='contentBar'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/stations' element={<Station />} />
          <Route path='/maps' element={<Map />} />
          <Route path='/login' element={<Login />} />
          <Route path='/bachkhoastation' element={<BachKhoa />} />
          <Route path='/haugiangstation' element={<HauGiang />} />
          <Route path='/travinhstation' element={<TraVinh />} />
        </Routes>
        <Outlet />
      </div>
    </>
  )
}

export default App

