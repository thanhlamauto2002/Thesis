
import Container from '@mui/material/Container'
import NavBar from '~/components/NavBar/NavBar'
import './App.css'
import { useState, useEffect, useRef, useLocation } from 'react'
// import socketIOClient from 'socket.io-client'
import SideBar from './components/SideBar'
// import AppRoute from './routes/AppRoute'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from 'react-router-dom'
import Map from '~/pages/Map1'
import Login1 from '~/pages/LoginForm/Login1'
import Home from '~/pages/Home1'
import BachKhoa from '~/pages/BachKhoa'
import HauGiang from '~/pages/HauGiang'
import TraVinh from '~/pages/TraVinh'
import Alarm from '~/pages/Alarm'
import Report from '~/pages/report'
import DashBoard from '~/pages/DashBoard'
import UserManagement from '~/pages/UserManagement'
// import socket from './socket'
import io from 'socket.io-client'

function App() {
  const [data, setData] = useState({ data1: [], data2: [], data3: [] });

  useEffect(() => {
    const socket = io('http://localhost:8017/');
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('message', message => {
      console.log('Message received:', message);
      // Xử lý dữ liệu nhận được từ máy chủ ở đây
    });

    socket.emit('clientEvent', 'Hello from client');

    const interval = setInterval(() => {
      socket.emit('requestData');
    }, 10000);

    socket.on('data', (data) => {
      setData(data);
    });

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []);
  console.log('thay đổi: ', data)
  return (
    <div className='App'>
      <div className='app-bar'>
        <NavBar />
      </div>
      <div className='side-bar'>
        <SideBar />
        <div className='main-content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/maps' element={<Map />} />
            <Route path='/login' element={<Login1 />} />
            <Route path='/alarm' element={<Alarm data1={data.data1} data2={data.data2} data3={data.data3} />} />
            <Route path='/report' element={<Report />} />
            <Route path='/dashboard' element={<DashBoard />} />
            <Route path='/usersmanage' element={<UserManagement />} />
            <Route path='/bachkhoastation' element={<BachKhoa />} />
            <Route path='/haugiangstation' element={<HauGiang />} />
            <Route path='/travinhstation' element={<TraVinh />} />
          </Routes>

        </div>
      </div>
    </div >
  )
}
function CombinedComponents({ data }) {
  const { pathname } = useLocation()

  return (
    <>
      {pathname === '/alarm' && <Alarm data1={data.data1} data2={data.data2} data3={data.data3} />}
      {/* Component khác bạn muốn giữ nguyên khi chuyển đổi route */}
    </>
  );
}
export default App