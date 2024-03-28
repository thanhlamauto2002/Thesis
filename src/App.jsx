
import Container from '@mui/material/Container'
import NavBar from '~/components/NavBar/NavBar'
import './App.css'
import { useState, useEffect, useRef } from 'react'
// import socketIOClient from 'socket.io-client'
import SideBar from './components/SideBar'
// import AppRoute from './routes/AppRoute'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet
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

  // xử lý alarm BK
  const [alarms1, setAlarms1] = useState(() => {
    const storedAlarms = localStorage.getItem('alarms1');
    return storedAlarms ? JSON.parse(storedAlarms) : [];
  });
  useEffect(() => {
    const setPoints = {
      SO2: 50,
      CO2: 100,
      NO2: 200,
      CO: 150,
      NO: 180,
      H2S: 50
    }
    const checkAlarms1 = (data) => {
      const newAlarms = Object.entries(data).map(([key, value]) => {
        if (key !== '_id' && key !== 'createdAt') {
          const gas = key.toUpperCase();
          if (value > setPoints[key]) {
            return {
              date: new Date(parseInt(data.createdAt)).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              }),
              status: 'Alarm',
              area: 'Bach Khoa Station',
              name: `Khí ${gas} vượt quá mức an toàn`,
              value: value,
              acknowledged: false // Thêm trạng thái acknowledged
            };
          }
        }
        return null;
      }).filter(Boolean);

      // Kiểm tra xem dữ liệu mới có khác với dữ liệu hiện tại không
      // if (JSON.stringify(newAlarms) !== JSON.stringify(alarms1)) {
      setAlarms1(prevAlarms => [...newAlarms, ...prevAlarms]);
      console.log('new: ', newAlarms)
      // }
    };

    checkAlarms1(data.data1)
  }, [data.data1]);

  useEffect(() => {
    localStorage.setItem('alarms1', JSON.stringify(alarms1));
  }, [alarms1]);
  const handleAcknowledgeBK = (index) => {
    const updatedAlarms = [...alarms1];
    updatedAlarms.splice(index, 1);
    setAlarms1(updatedAlarms);
  };
  // xử lý alarm HG
  const [alarms2, setAlarms2] = useState(() => {
    const storedAlarms2 = localStorage.getItem('alarms2');
    return storedAlarms2 ? JSON.parse(storedAlarms2) : [];
  });
  useEffect(() => {
    const setPoints = {
      SO2: 50,
      CO2: 100,
      NO2: 200,
      CO: 150,
      NO: 180,
      H2S: 50
    }
    const checkAlarms2 = (data) => {
      const newAlarms = Object.entries(data).map(([key, value]) => {
        if (key !== '_id' && key !== 'createdAt') {
          const gas = key.toUpperCase();
          if (value > setPoints[key]) {
            return {
              date: new Date(parseInt(data.createdAt)).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              }),
              status: 'Alarm',
              area: 'Hau Giang Station',
              name: `Khí ${gas} vượt quá mức an toàn`,
              value: value,
              acknowledged: false // Thêm trạng thái acknowledged
            };
          }
        }
        return null;
      }).filter(Boolean);

      // Kiểm tra xem dữ liệu mới có khác với dữ liệu hiện tại không
      // if (JSON.stringify(newAlarms) !== JSON.stringify(alarms1)) {
      setAlarms2(prevAlarms => [...newAlarms, ...prevAlarms]);
      // }
    };

    checkAlarms2(data.data2)
  }, [data.data2]);
  useEffect(() => {
    localStorage.setItem('alarms2', JSON.stringify(alarms2));
  }, [alarms2]);
  const handleAcknowledgeHG = (index) => {
    const updatedAlarms2 = [...alarms2];
    updatedAlarms2.splice(index, 1);
    setAlarms2(updatedAlarms2);
  };
  //xử lý alarm TV
  const [alarms3, setAlarms3] = useState(() => {
    const storedAlarms3 = localStorage.getItem('alarms3');
    return storedAlarms3 ? JSON.parse(storedAlarms3) : [];
  });
  useEffect(() => {
    const setPoints = {
      SO2: 50,
      CO2: 100,
      NO2: 200,
      CO: 150,
      NO: 180,
      H2S: 50
    }
    const checkAlarms3 = (data) => {
      const newAlarms = Object.entries(data).map(([key, value]) => {
        if (key !== '_id' && key !== 'createdAt') {
          const gas = key.toUpperCase();
          if (value > setPoints[key]) {
            return {
              date: new Date(parseInt(data.createdAt)).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              }),
              status: 'Alarm',
              area: 'Tra Vinh Station',
              name: `Khí ${gas} vượt quá mức an toàn`,
              value: value,
              acknowledged: false // Thêm trạng thái acknowledged
            };
          }
        }
        return null;
      }).filter(Boolean);

      // Kiểm tra xem dữ liệu mới có khác với dữ liệu hiện tại không
      // if (JSON.stringify(newAlarms) !== JSON.stringify(alarms1)) {
      setAlarms3(prevAlarms => [...newAlarms, ...prevAlarms]);
      // }
    };

    checkAlarms3(data.data3)
  }, [data.data3]);
  useEffect(() => {
    localStorage.setItem('alarms3', JSON.stringify(alarms3));
  }, [alarms3]);
  const handleAcknowledgeTV = (index) => {
    const updatedAlarms3 = [...alarms3];
    updatedAlarms3.splice(index, 1);
    setAlarms3(updatedAlarms3);
  };
  //
  const newData = {
    data1: {
      SO2: data.data1.SO2,
      CO2: data.data1.CO2,
      NO2: data.data1.NO2,
      CO: data.data1.CO,
      NO: data.data1.NO,
      H2S: data.data1.H2S
    },
    data2: {
      SO2: data.data2.SO2,
      CO2: data.data2.CO2,
      NO2: data.data2.NO2,
      CO: data.data2.CO,
      NO: data.data2.NO,
      H2S: data.data2.H2S
    },
    data3: {
      SO2: data.data3.SO2,
      CO2: data.data3.CO2,
      NO2: data.data3.NO2,
      CO: data.data3.CO,
      NO: data.data3.NO,
      H2S: data.data3.H2S
    }
  };
  console.log('thay đổi: ', data)
  console.log('newdata1: ', newData.data1)
  return (
    <Router>
      <div className='App'>
        <div className='app-bar'>
          <NavBar />
        </div>
        <div className='side-bar'>
          <SideBar />
          <div className='main-content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='maps' element={<Map />} />
              <Route path='login' element={<Login1 />} />
              <Route path='alarm' element={<Alarm alarm1={alarms1} onAcknowledgeBK={handleAcknowledgeBK} alarm2={alarms2} onAcknowledgeHG={handleAcknowledgeHG} alarm3={alarms3} onAcknowledgeTV={handleAcknowledgeTV} />} />
              <Route path='report' element={<Report />} />
              <Route path='dashboard' element={<DashBoard data1={newData.data1} data2={newData.data2} data3={newData.data3} />} />
              <Route path='usersmanage' element={<UserManagement />} />
              <Route path='bachkhoastation' element={<BachKhoa data1={data.data1} />} />
              <Route path='haugiangstation' element={<HauGiang data1={data.data2} />} />
              <Route path='travinhstation' element={<TraVinh data1={data.data3} />} />
            </Routes>
          </div>
        </div>
      </div >
    </Router>
  )
}
export default App
