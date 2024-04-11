
import Container from '@mui/material/Container'
import NavBar from '~/components/NavBar/NavBar'
import './App.css'
import { useState, useEffect } from 'react'
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
import Alarm from '~/pages/Alarm'
import Report from '~/pages/report'
import DashBoard from '~/pages/DashBoard'
import User from '~/pages/User'
import Metric from '~/pages/Metric'
import Cookies from 'js-cookie';
import io from 'socket.io-client'
import PrivateRoute from './routes/PrivateRoute'
import axios from 'axios'

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
    }, 1000);

    socket.on('data', (data) => {
      setData(data);
    });

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };

  }, []);
  /*xử lý chart real time */
  //chartBK
  const [previousData1, setPreviousData1] = useState(null);
  const [chartBK, setChartBK] = useState(() => {
    const storedDataBK = localStorage.getItem('chartRealTimetBK');
    return storedDataBK ? JSON.parse(storedDataBK) : [];
  });
  useEffect(() => {
    if (JSON.stringify(data.data1) !== JSON.stringify(previousData1)) {
      // Cập nhật previousData1 với giá trị mới của data.data1
      setPreviousData1(data.data1);
      const updateChartData = () => {
        if (data.data1 && data.data1.createdAt && !isNaN(new Date(data.data1.createdAt))) {
          const newDataPoint = {
            time: new Date(data.data1.createdAt).toLocaleTimeString([], {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit', hour: '2-digit', minute: '2-digit'
            }),
            so2: data.data1.SO2,
            co2: data.data1.CO2,
            no2: data.data1.NO2,
            o2: data.data1.O2,
            temperature: data.data1.Temperature,
            pressure: data.data1.Pressure
          };

          setChartBK(prevData => {
            const updatedData = [...prevData, newDataPoint];
            localStorage.setItem('chartRealTimetBK', JSON.stringify(updatedData));
            return updatedData;
          });
        }
      };
      updateChartData()
    }
  }, [data.data1]);
  // chart HG
  const [previousData2, setPreviousData2] = useState(null);
  const [chartHG, setChartHG] = useState(() => {
    const storedDataHG = localStorage.getItem('chartRealTimeHG');
    return storedDataHG ? JSON.parse(storedDataHG) : [];
  });
  useEffect(() => {
    if (JSON.stringify(data.data2) !== JSON.stringify(previousData2)) {
      // Cập nhật previousData1 với giá trị mới của data.data1
      setPreviousData2(data.data2);
      const updateChartData = () => {
        if (data.data2 && data.data2.createdAt && !isNaN(new Date(data.data2.createdAt))) {
          const newDataPoint = {
            time: new Date(data.data2.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            so2: data.data2.SO2,
            co2: data.data2.CO2,
            no2: data.data2.NO2,
            o2: data.data2.O2,
            temperature: data.data2.Temperature,
            pressure: data.data2.Pressure
          };

          setChartHG(prevData => {
            const updatedData = [...prevData, newDataPoint];
            localStorage.setItem('chartRealTimeHG', JSON.stringify(updatedData));
            return updatedData;
          });
        }
      };
      updateChartData()
    }
  }, [data.data2]);
  // chart TV
  const [previousData3, setPreviousData3] = useState(null);
  const [chartTV, setChartTV] = useState(() => {
    const storedDataTV = localStorage.getItem('chartRealTimeTV');
    return storedDataTV ? JSON.parse(storedDataTV) : [];
  });
  useEffect(() => {
    if (JSON.stringify(data.data3) !== JSON.stringify(previousData3)) {
      // Cập nhật previousData1 với giá trị mới của data.data1
      setPreviousData3(data.data3);
      const updateChartData = () => {
        if (data.data3 && data.data3.createdAt && !isNaN(new Date(data.data3.createdAt))) {
          const newDataPoint = {
            time: new Date(data.data3.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            so2: data.data3.SO2,
            co2: data.data3.CO2,
            no2: data.data3.NO2,
            o2: data.data3.O2,
            temperature: data.data3.Temperature,
            pressure: data.data3.Pressure
          };

          setChartTV(prevData => {
            const updatedData = [...prevData, newDataPoint];
            localStorage.setItem('chartRealTimeTV', JSON.stringify(updatedData));
            return updatedData;
          });
        }
      };
      updateChartData()
    }
  }, [data.data3]);
  /* Xử lý alarm real time */
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
      O2: 150,
      Temperature: 100,
      Pressure: 500
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
              name: `${gas} vượt quá mức an toàn`,
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
      O2: 150,
      Temperature: 100,
      Pressure: 500
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
              name: `${gas} vượt quá mức an toàn`,
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
      O2: 150,
      Temperature: 100,
      Pressure: 500
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
              name: `${gas} vượt quá mức an toàn`,
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
      O2: data.data1.O2,
      Temperature: data.data1.Temperature,
      Pressure: data.data1.Pressure
    },
    data2: {
      SO2: data.data2.SO2,
      CO2: data.data2.CO2,
      NO2: data.data2.NO2,
      O2: data.data2.O2,
      Temperature: data.data2.Temperature,
      Pressure: data.data2.Pressure
    },
    data3: {
      SO2: data.data3.SO2,
      CO2: data.data3.CO2,
      NO2: data.data3.NO2,
      O2: data.data3.O2,
      Temperature: data.data3.Temperature,
      Pressure: data.data3.Pressure
    }
  };
  const [token, setToken] = useState(Cookies.get('jwt') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [userName, setUserName] = useState('')
  const handleLoginSuccess = (accessToken) => {
    Cookies.set('jwt', accessToken, { expires: 7 });
    setToken(accessToken);
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    Cookies.remove('jwt');
    setToken(null);
    setIsLoggedIn(false);
  };
  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa (ví dụ: kiểm tra cookie)
    if (token) {
      setIsLoggedIn(true);
      const response = axios.post('http://localhost:8017/v1/users/verifytoken', {
        token
      })
        .then(response => {
          // Handle response from the backend
          setUserName(response.data.username)
        })
    } else {
      setIsLoggedIn(false); // Nếu không có token, đánh dấu là chưa đăng nhập
    }
  }, [token])


  return (
    <Router>
      <div className='App'>
        <div className='app-bar'>
          <NavBar isLogged={isLoggedIn} onRemoveLogin={handleLogout} userRole={'Admin'} userName={userName} />
        </div>
        <div className='side-bar'>
          <SideBar />
          <div className='main-content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='maps' element={<PrivateRoute><Map /></PrivateRoute>} />
              <Route path='login' element={<Login1 onLoginSuccess={handleLoginSuccess} />} />
              <Route path='alarm' element={<PrivateRoute><Alarm
                alarm1={alarms1} onAcknowledgeBK={handleAcknowledgeBK}
                alarm2={alarms2} onAcknowledgeHG={handleAcknowledgeHG}
                alarm3={alarms3} onAcknowledgeTV={handleAcknowledgeTV} />
              </PrivateRoute>} />
              <Route path='report' element={<PrivateRoute><Report username={userName} /></PrivateRoute>} />
              <Route path='dashboard' element={<DashBoard data1={newData.data1} data2={newData.data2} data3={newData.data3} />} />
              <Route path='userauthencation' element={<PrivateRoute><User /></PrivateRoute>} />
              <Route path='metric' element={<PrivateRoute><Metric data1={chartBK} data2={chartHG} data3={chartTV} /></PrivateRoute>} />
            </Routes>
          </div>
        </div>
      </div >
    </Router>
  )
}
export default App
