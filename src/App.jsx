

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
  const [previousData1, setPreviousData1] = useState(() => {
    const storedData1 = localStorage.getItem('preData1');
    return storedData1 ? JSON.parse(storedData1) : [];
  });
  const [chartBK, setChartBK] = useState(() => {
    const storedDataBK = localStorage.getItem('chartRealTimeBK');
    return storedDataBK ? JSON.parse(storedDataBK) : [];
  });

  useEffect(() => {
    if (data.data1.length !== 0) {
      if (JSON.stringify(data.data1) !== JSON.stringify(previousData1)) {
        console.log('dk2: ', JSON.stringify(data.data1) !== JSON.stringify(previousData1))
        console.log('pre2: ', previousData1)
        console.log('bk2: ', data.data1)
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
              co: data.data1.CO,
              no: data.data1.NO,
              o2: data.data1.O2,
              temperature: data.data1.Temperature,
              dust: data.data1.Dust
            };

            setChartBK(prevData => {
              // Kiểm tra xem newDataPoint có tồn tại trong prevData chưa
              const exists = prevData.some(item => (
                item.time === newDataPoint.time &&
                item.so2 === newDataPoint.so2 &&
                item.co === newDataPoint.co &&
                item.no === newDataPoint.no &&
                item.o2 === newDataPoint.o2 &&
                item.temperature === newDataPoint.temperature &&
                item.dust === newDataPoint.dust
              ));

              if (!exists) {
                // Nếu newDataPoint là duy nhất, thêm vào prevData và cập nhật localStorage
                const updatedData = [...prevData, newDataPoint];
                localStorage.setItem('chartRealTimeBK', JSON.stringify(updatedData));
                return updatedData;
              }

              // Nếu newDataPoint đã tồn tại, không cập nhật prevData
              return prevData;
            });
          }
        };

        updateChartData();
      }
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
      setPreviousData2(data.data2);
      const updateChartData = () => {
        if (data.data2 && data.data2.createdAt && !isNaN(new Date(data.data2.createdAt))) {
          const newDataPoint = {
            time: new Date(data.data2.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            so2: data.data2.SO2,
            co: data.data2.CO,
            no: data.data2.NO,
            o2: data.data2.O2,
            temperature: data.data2.Temperature,
            dust: data.data2.Dust
          };

          setChartHG(prevData => {
            // Kiểm tra xem newDataPoint có tồn tại trong prevData chưa
            const exists = prevData.some(item => (
              item.time === newDataPoint.time &&
              item.so2 === newDataPoint.so2 &&
              item.co === newDataPoint.co &&
              item.no === newDataPoint.no &&
              item.o2 === newDataPoint.o2 &&
              item.temperature === newDataPoint.temperature &&
              item.dust === newDataPoint.dust
            ));

            if (!exists) {
              // Nếu newDataPoint là duy nhất, thêm vào prevData và cập nhật localStorage
              const updatedData = [...prevData, newDataPoint];
              localStorage.setItem('chartRealTimeHG', JSON.stringify(updatedData));
              return updatedData;
            }

            // Nếu newDataPoint đã tồn tại, không cập nhật prevData
            return prevData;
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
            co: data.data3.CO,
            no: data.data3.NO,
            o2: data.data3.O2,
            temperature: data.data3.Temperature,
            dust: data.data3.Dust
          };

          setChartTV(prevData => {
            // Kiểm tra xem newDataPoint có tồn tại trong prevData chưa
            const exists = prevData.some(item => (
              item.time === newDataPoint.time &&
              item.so2 === newDataPoint.so2 &&
              item.co === newDataPoint.co &&
              item.no === newDataPoint.no &&
              item.o2 === newDataPoint.o2 &&
              item.temperature === newDataPoint.temperature &&
              item.dust === newDataPoint.dust
            ));

            if (!exists) {
              // Nếu newDataPoint là duy nhất, thêm vào prevData và cập nhật localStorage
              const updatedData = [...prevData, newDataPoint];
              localStorage.setItem('chartRealTimeTV', JSON.stringify(updatedData));
              return updatedData;
            }

            // Nếu newDataPoint đã tồn tại, không cập nhật prevData
            return prevData;
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
      CO: 100,
      NO: 200,
      O2: 150,
      Temperature: 100,
      Dust: 500
    }
    if (JSON.stringify(data.data1) !== JSON.stringify(previousData1)) {
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

        const uniqueNewAlarms = newAlarms.filter(newAlarm => (
          !alarms1.some(existingAlarm => (
            newAlarm.name === existingAlarm.name &&
            newAlarm.value === existingAlarm.value &&
            newAlarm.date === existingAlarm.date
          ))
        ));

        // Thêm các newAlarms duy nhất và không trùng lặp vào alarms1
        setAlarms1(prevAlarms => [...uniqueNewAlarms, ...prevAlarms]);
      };

      checkAlarms1(data.data1)
    }
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
      CO: 100,
      NO: 200,
      O2: 150,
      Temperature: 100,
      Dust: 500
    }
    if (JSON.stringify(data.data2) !== JSON.stringify(previousData2)) {
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

        const uniqueNewAlarms = newAlarms.filter(newAlarm => (
          !alarms2.some(existingAlarm => (
            newAlarm.name === existingAlarm.name &&
            newAlarm.value === existingAlarm.value &&
            newAlarm.date === existingAlarm.date
          ))
        ));

        // Thêm các newAlarms duy nhất và không trùng lặp vào alarms2
        setAlarms2(prevAlarms => [...uniqueNewAlarms, ...prevAlarms]);
      };

      checkAlarms2(data.data2)
    }
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
      CO: 100,
      NO: 200,
      O2: 150,
      Temperature: 100,
      Dust: 500
    }
    if (JSON.stringify(data.data3) !== JSON.stringify(previousData3)) {
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

        const uniqueNewAlarms = newAlarms.filter(newAlarm => (
          !alarms3.some(existingAlarm => (
            newAlarm.name === existingAlarm.name &&
            newAlarm.value === existingAlarm.value &&
            newAlarm.date === existingAlarm.date
          ))
        ));

        // Thêm các newAlarms duy nhất và không trùng lặp vào alarms3
        setAlarms3(prevAlarms => [...uniqueNewAlarms, ...prevAlarms]);
      };

      checkAlarms3(data.data3)
    }
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
      CO: data.data1.CO,
      NO: data.data1.NO,
      O2: data.data1.O2,
      Temperature: data.data1.Temperature,
      Dust: data.data1.Dust,
      StatusTemp: data.data1.StatusTemp,
      StatusDust: data.data1.StatusDust,
      StatusSO2: data.data1.StatusSO2,
      StatusCO: data.data1.StatusCO,
      StatusNO: data.data1.StatusNO,
      StatusO2: data.data1.StatusO2
    },
    data2: {
      SO2: data.data2.SO2,
      CO: data.data2.CO,
      NO: data.data2.NO,
      O2: data.data2.O2,
      Temperature: data.data2.Temperature,
      Dust: data.data2.Dust,
      StatusTemp: data.data2.StatusTemp,
      StatusDust: data.data2.StatusDust,
      StatusSO2: data.data2.StatusSO2,
      StatusCO: data.data2.StatusCO,
      StatusNO: data.data2.StatusNO,
      StatusO2: data.data2.StatusO2
    },
    data3: {
      SO2: data.data3.SO2,
      CO: data.data3.CO,
      NO: data.data3.NO,
      O2: data.data3.O2,
      Temperature: data.data3.Temperature,
      Dust: data.data3.Dust,
      StatusTemp: data.data3.StatusTemp,
      StatusDust: data.data3.StatusDust,
      StatusSO2: data.data3.StatusSO2,
      StatusCO: data.data3.StatusCO,
      StatusNO: data.data3.StatusNO,
      StatusO2: data.data3.StatusO2
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
