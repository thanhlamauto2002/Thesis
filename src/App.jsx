

import Container from '@mui/material/Container'
import NavBar from '~/components/NavBar/NavBar'
import './App.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
import Report from '~/pages/Report'
import DashBoard from '~/pages/DashBoard'
import User from '~/pages/User'
import Metric from '~/pages/Metric'
import Cookies from 'js-cookie';
import io from 'socket.io-client'
import PrivateRoute from './routes/PrivateRoute'
import axios from 'axios';
import { Flip, ToastContainer, toast } from 'react-toastify'

function App() {

  const [currentSocket, setCurrentSocket] = useState(null);

  const [data, setData] = useState({ data1: [], data2: [], data3: [] });
  const [data1s, setData1s] = useState({ dataTerminal1: [], dataTerminal2: [], dataTerminal3: [] });

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
    }, 1000);
    //
    socket.on('data', (data) => {
      setData(data);
    });
    socket.on('data1s', (data) => {
      setData1s(data);
    });
    setCurrentSocket(socket)

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };

  }, []);

  console.log('data1s: ', data1s)
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
                item.dust === newDataPoint.dust));

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
  const [previousData31s, setPreviousData31s] = useState(null);

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
  const [saveAlarmsBK, setAlarmsBK] = useState([])
  const [alarms1, setAlarms1] = useState(() => {
    const storedAlarms = localStorage.getItem('alarms1');
    return storedAlarms ? JSON.parse(storedAlarms) : [];
  });
  const [isExceedBK, setIsExceedBK] = useState({
    SO2: false,
    CO: false,
    NO: false,
    O2: false,
    Temperature: false,
    Dust: false
  });
  const [isExceed90BK, setIsExceed90BK] = useState({
    SO2: false,
    CO: false,
    NO: false,
    O2: false,
    Temperature: false,
    Dust: false
  });
  useEffect(() => {
    const setPoints = {
      SO2: 500,
      CO: 1000,
      NO: 850,
      O2: 150,
      Temperature: 100,
      Dust: 200
    }
    if (JSON.stringify(data.data1) !== JSON.stringify(previousData1)) {
      const checkAlarms1 = (data) => {
        const newAlarms = Object.entries(data).map(([key, value]) => {
          if (key !== '_id' && key !== 'createdAt'
            && key !== 'StatusTemp'
            && key !== 'StatusDust'
            && key !== 'StatusSO2'
            && key !== 'StatusCO'
            && key !== 'StatusNO'
            && key !== 'StatusO2'
            && key !== 'O2'
            && key !== 'Temperature') {
            const gas = key.toUpperCase();
            let unit = null
            switch (key) {
              case 'SO2':
                unit = 'mg/Nm3';
                break;
              case 'CO':
                unit = 'mg/Nm3';
                break;
              case 'NO':
                unit = 'mg/Nm3';
                break;
              case 'Dust':
                unit = 'mg/Nm3';
                break;
              case 'O2':
                unit = '%V';
                break;
              case 'Temperature':
                unit = 'oC';
                break;
              default:
                unit = 'Unknown Signal';
                break;
            }
            if (value >= setPoints[key] && !isExceedBK[key]) {
              setIsExceedBK(prevState => ({
                ...prevState,
                [key]: true
              })); return {
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
                name: `${gas} exceeds the safe level`,
                value: `${value} ${unit}`,
                acknowledged: false, // Thêm trạng thái acknowledged 
                id: 'red'
              };
            } else if (value >= 0.9 * setPoints[key] && value < setPoints[key] && !isExceedBK[key]) {
              setIsExceed90BK(prevState => ({
                ...prevState,
                [key]: true
              })); return {
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
                name: `${gas} is higher than the 90% of safe level`,
                value: `${value} ${unit}`,
                acknowledged: false,// Thêm trạng thái acknowledged
                id: 'orange'
              };
            } else if (value < setPoints[key] && isExceedBK[key]) {
              if (value >= 0.9 * setPoints[key]) {
                setIsExceed90BK(prevState => ({
                  ...prevState,
                  [key]: true
                }));
              }
              setIsExceedBK(prevState => ({
                ...prevState,
                [key]: false
              }));
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
                name: `${gas} has decreased underneath the limit`,
                value: `${value} ${unit}`,
                acknowledged: false,// Thêm trạng thái acknowledged
                id: 'green'
              };
            } else if (value >= setPoints[key] && isExceedBK[key]) {
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
                name: `${gas} exceeds the safe level`,
                value: `${value} ${unit}`,
                acknowledged: false,// Thêm trạng thái acknowledged
                id: 'red'
              };
            } else if (value < 0.9 * setPoints[key]) {
              setIsExceed90BK(prevState => ({
                ...prevState,
                [key]: false
              }));
            }
          } else if (value === 'Error') {
            let nameOfSignal = null
            switch (key) {
              case 'StatusTemp':
                nameOfSignal = 'Error Temperature Signal';
                break;
              case 'StatusDust':
                nameOfSignal = 'Error Dust Signal';
                break;
              case 'StatusSO2':
                nameOfSignal = 'Error SO2 Signal';
                break;
              case 'StatusO2':
                nameOfSignal = 'Error O2 Signal';
                break;
              case 'StatusCO':
                nameOfSignal = 'Error CO Signal';
                break;
              case 'StatusNO':
                nameOfSignal = 'Error NO Signal';
                break;
              default:
                nameOfSignal = 'Unknown Signal';
                break;
            }
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
              name: nameOfSignal,
              value: 'Error',
              acknowledged: false, // Thêm trạng thái acknowledged
              id: 'red'
            }
          }

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
        if (uniqueNewAlarms.length !== 0) {
          const unixTimestampAlarms = uniqueNewAlarms.map(alarm => {
            // Sao chép đối tượng alarm thành một đối tượng mới để tránh ảnh hưởng đến uniqueNewAlarms ban đầu
            const updatedAlarm = { ...alarm };

            // Chuyển đổi trường date thành timestamp Unix

            // Gán lại trường date bằng timestamp Unix
            updatedAlarm.date = data.createdAt;

            // Trả về đối tượng đã được chỉnh sửa
            return updatedAlarm;
          });
          setAlarmsBK(unixTimestampAlarms)
        }
      };

      checkAlarms1(data.data1)

    }
  }, [data.data1]);
  // Lưu alarm BK mới vào db
  useEffect(() => {
    if (currentSocket && currentSocket.connected) {
      currentSocket.emit('saveAlarmsBK', saveAlarmsBK);
    }
  }, [saveAlarmsBK]);
  // Lưu alarms1 vào localStorage
  useEffect(() => {
    localStorage.setItem('alarms1', JSON.stringify(alarms1));
  }, [alarms1]);
  const handleAcknowledgeBK = (index) => {
    const updatedAlarms = [...alarms1];
    updatedAlarms.splice(index, 1);
    setAlarms1(updatedAlarms);
  };
  // xử lý alarm HG
  const [saveAlarmsHG, setAlarmsHG] = useState([])
  const [alarms2, setAlarms2] = useState(() => {
    const storedAlarms2 = localStorage.getItem('alarms2');
    return storedAlarms2 ? JSON.parse(storedAlarms2) : [];
  });
  const [isExceedHG, setIsExceedHG] = useState({
    SO2: false,
    CO: false,
    NO: false,
    O2: false,
    Temperature: false,
    Dust: false
  });
  const [isExceed90HG, setIsExceed90HG] = useState({
    SO2: false,
    CO: false,
    NO: false,
    O2: false,
    Temperature: false,
    Dust: false
  });
  useEffect(() => {
    const setPoints = {
      SO2: 500,
      CO: 1000,
      NO: 850,
      O2: 150,
      Temperature: 100,
      Dust: 200
    }
    if (JSON.stringify(data.data2) !== JSON.stringify(previousData2)) {
      const checkAlarms2 = (data) => {
        const newAlarms = Object.entries(data).map(([key, value]) => {
          if (key !== '_id' && key !== 'createdAt'
            && key !== 'StatusTemp'
            && key !== 'StatusDust'
            && key !== 'StatusSO2'
            && key !== 'StatusCO'
            && key !== 'StatusNO'
            && key !== 'StatusO2'
            && key !== 'O2'
            && key !== 'Temperature') {
            const gas = key.toUpperCase();
            let unit = null
            switch (key) {
              case 'SO2':
                unit = 'mg/Nm3';
                break;
              case 'CO':
                unit = 'mg/Nm3';
                break;
              case 'NO':
                unit = 'mg/Nm3';
                break;
              case 'Dust':
                unit = 'mg/Nm3';
                break;
              case 'O2':
                unit = '%V';
                break;
              case 'Temperature':
                unit = 'oC';
                break;
              default:
                unit = 'Unknown Signal';
                break;
            }
            if (value >= setPoints[key] && !isExceedHG[key]) {

              setIsExceedHG(prevState => ({
                ...prevState,
                [key]: true
              })); return {
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
                name: `${gas} exceeds the safe level`,
                value: `${value} ${unit}`,
                acknowledged: false, // Thêm trạng thái acknowledged 
                id: 'red'
              };
            } else if (value >= 0.9 * setPoints[key] && value < setPoints[key] && !isExceedHG[key]) {
              setIsExceed90HG(prevState => ({
                ...prevState,
                [key]: true
              }));
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
                name: `${gas} is higher than the 90% of safe level`,
                value: `${value} ${unit}`,
                acknowledged: false,// Thêm trạng thái acknowledged
                id: 'orange'
              };
            } else if (value < setPoints[key] && isExceedHG[key]) {
              if (value >= 0.9 * setPoints[key]) {
                setIsExceed90HG(prevState => ({
                  ...prevState,
                  [key]: true
                }));
              }
              setIsExceedHG(prevState => ({
                ...prevState,
                [key]: false
              }));

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
                name: `${gas} has decreased underneath the limit`,
                value: `${value} ${unit}`,
                acknowledged: false,// Thêm trạng thái acknowledged
                id: 'green'
              };
            } else if (value >= setPoints[key] && isExceedHG[key]) {
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
                name: `${gas} exceeds the safe level`,
                value: `${value} ${unit}`,
                acknowledged: false,// Thêm trạng thái acknowledged
                id: 'red'
              };
            } else if (value < 0.9 * setPoints[key]) {
              setIsExceed90HG(prevState => ({
                ...prevState,
                [key]: false
              }));
            }
          } else if (value === 'Error') {
            let nameOfSignal = null
            switch (key) {
              case 'StatusTemp':
                nameOfSignal = 'Error Temperature Signal';
                break;
              case 'StatusDust':
                nameOfSignal = 'Error Dust Signal';
                break;
              case 'StatusSO2':
                nameOfSignal = 'Error SO2 Signal';
                break;
              case 'StatusO2':
                nameOfSignal = 'Error O2 Signal';
                break;
              case 'StatusCO':
                nameOfSignal = 'Error CO Signal';
                break;
              case 'StatusNO':
                nameOfSignal = 'Error NO Signal';
                break;
              default:
                nameOfSignal = 'Unknown Signal';
                break;
            }
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
              name: nameOfSignal,
              value: 'Error',
              acknowledged: false, // Thêm trạng thái acknowledged
              id: 'red'
            }
          }
        }).filter(Boolean);

        const uniqueNewAlarms = newAlarms.filter(newAlarm => (
          !alarms2.some(existingAlarm => (
            // newAlarm.name === existingAlarm.name &&
            // newAlarm.value === existingAlarm.value &&
            newAlarm.date === existingAlarm.date
          ))
        ));

        // Thêm các newAlarms duy nhất và không trùng lặp vào alarms2
        setAlarms2(prevAlarms => [...uniqueNewAlarms, ...prevAlarms]);
        //
        if (uniqueNewAlarms.length !== 0) {
          const unixTimestampAlarms = uniqueNewAlarms.map(alarm => {
            // Sao chép đối tượng alarm thành một đối tượng mới để tránh ảnh hưởng đến uniqueNewAlarms ban đầu
            const updatedAlarm = { ...alarm };

            // Chuyển đổi trường date thành timestamp Unix

            // Gán lại trường date bằng timestamp Unix
            updatedAlarm.date = data.createdAt;

            // Trả về đối tượng đã được chỉnh sửa
            return updatedAlarm;
          });
          setAlarmsHG(unixTimestampAlarms)
        }
      };

      checkAlarms2(data.data2)
    }
  }, [data.data2]);

  // Lưu alarm HG mới vào db
  useEffect(() => {
    if (currentSocket && currentSocket.connected) {
      currentSocket.emit('saveAlarmsHG', saveAlarmsHG);
    }
  }, [saveAlarmsHG]);
  // Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem('alarms2', JSON.stringify(alarms2));
  }, [alarms2]);
  const handleAcknowledgeHG = (index) => {
    const updatedAlarms2 = [...alarms2];
    updatedAlarms2.splice(index, 1);
    setAlarms2(updatedAlarms2);
  };
  //xử lý alarm TV
  const [saveAlarmsTV, setAlarmsTV] = useState([])
  const [alarms3, setAlarms3] = useState(() => {
    const storedAlarms3 = localStorage.getItem('alarms3');
    return storedAlarms3 ? JSON.parse(storedAlarms3) : [];
  });
  const [isExceed, setIsExceed] = useState({
    SO2: false,
    CO: false,
    NO: false,
    Dust: false
  });
  const [isExceed90TV, setIsExceed90TV] = useState({
    SO2: false,
    CO: false,
    NO: false,
    Dust: false
  });
  useEffect(() => {
    const setPoints = {
      SO2: 500,
      CO: 1000,
      NO: 850,
      O2: 150,
      Temperature: 100,
      Dust: 200
    }

    if (JSON.stringify(data.data3) !== JSON.stringify(previousData3)) {
      const checkAlarms3 = (data) => {
        const newAlarms = Object.entries(data).map(([key, value]) => {
          if (key !== '_id' && key !== 'createdAt'
            && key !== 'StatusTemp'
            && key !== 'StatusDust'
            && key !== 'StatusSO2'
            && key !== 'StatusCO'
            && key !== 'StatusNO'
            && key !== 'StatusO2'
            && key !== 'O2'
            && key !== 'Temperature') {
            const gas = key.toUpperCase();
            let unit = null
            switch (key) {
              case 'SO2':
                unit = 'mg/Nm3';
                break;
              case 'CO':
                unit = 'mg/Nm3';
                break;
              case 'NO':
                unit = 'mg/Nm3';
                break;
              case 'Dust':
                unit = 'mg/Nm3';
                break;
              case 'O2':
                unit = '%V';
                break;
              case 'Temperature':
                unit = 'oC';
                break;
              default:
                unit = 'Unknown Signal';
                break;
            }
            if (value >= setPoints[key] && !isExceed[key]) {
              setIsExceed(prevState => ({
                ...prevState,
                [key]: true
              })); return {
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
                name: `${gas} exceeds the safe level`,
                value: `${value} ${unit}`,
                acknowledged: false, // Thêm trạng thái acknowledged 
                id: 'red'
              };
            } else if (value >= 0.9 * setPoints[key] && value < setPoints[key] && !isExceed[key]) {
              setIsExceed90TV(prevState => ({
                ...prevState,
                [key]: true
              }));
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
                name: `${gas} is higher than the 90% of safe level`,
                value: `${value} ${unit}`,
                acknowledged: false,// Thêm trạng thái acknowledged
                id: 'orange'
              };
            } else if (value < setPoints[key] && isExceed[key]) {
              if (value >= 0.9 * setPoints[key]) {
                setIsExceed90TV(prevState => ({
                  ...prevState,
                  [key]: true
                }));
              }
              setIsExceed(prevState => ({
                ...prevState,
                [key]: false
              }));
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
                name: `${gas} has decreased underneath the limit`,
                value: `${value} ${unit}`,
                acknowledged: false,// Thêm trạng thái acknowledged
                id: 'green'
              };
            } else if (value >= setPoints[key] && isExceed[key]) {
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
                name: `${gas} exceeds the safe level`,
                value: `${value} ${unit}`,
                acknowledged: false,// Thêm trạng thái acknowledged
                id: 'red'
              };
            } else if (value < 0.9 * setPoints[key]) {
              setIsExceed90TV(prevState => ({
                ...prevState,
                [key]: false
              }));
            }
          } else if (value === 'Error') {
            let nameOfSignal = null
            switch (key) {
              case 'StatusTemp':
                nameOfSignal = 'Error Temperature Signal';
                break;
              case 'StatusDust':
                nameOfSignal = 'Error Dust Signal';
                break;
              case 'StatusSO2':
                nameOfSignal = 'Error SO2 Signal';
                break;
              case 'StatusO2':
                nameOfSignal = 'Error O2 Signal';
                break;
              case 'StatusCO':
                nameOfSignal = 'Error CO Signal';
                break;
              case 'StatusNO':
                nameOfSignal = 'Error NO Signal';
                break;
              default:
                nameOfSignal = 'Unknown Signal';
                break;
            }
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
              name: nameOfSignal,
              value: 'Error',
              acknowledged: false, // Thêm trạng thái acknowledged
              id: 'red'
            }
          }
        }).filter(Boolean);

        const uniqueNewAlarms = newAlarms.filter(newAlarm => (
          !alarms3.some(existingAlarm => (
            // newAlarm.name === existingAlarm.name &&
            // newAlarm.value === existingAlarm.value &&
            newAlarm.date === existingAlarm.date
          ))
        ));

        // Thêm các newAlarms duy nhất và không trùng lặp vào alarms3
        setAlarms3(prevAlarms => [...uniqueNewAlarms, ...prevAlarms]);
        if (uniqueNewAlarms.length !== 0) {
          const unixTimestampAlarms = uniqueNewAlarms.map(alarm => {
            // Sao chép đối tượng alarm thành một đối tượng mới để tránh ảnh hưởng đến uniqueNewAlarms ban đầu
            const updatedAlarm = { ...alarm };
            // Gán lại trường date bằng timestamp Unix
            updatedAlarm.date = data.createdAt;

            // Trả về đối tượng đã được chỉnh sửa
            return updatedAlarm;
          });
          setAlarmsTV(unixTimestampAlarms)
        }
      };

      checkAlarms3(data.data3)
    }

  }, [data.data3]);
  // Lưu alarm TV mới vào db
  useEffect(() => {
    if (currentSocket && currentSocket.connected) {
      currentSocket.emit('saveAlarmsTV', saveAlarmsTV);
    }
  }, [saveAlarmsTV]);
  // Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem('alarms3', JSON.stringify(alarms3));
  }, [alarms3]);
  const handleAcknowledgeTV = (index) => {
    const updatedAlarms3 = [...alarms3];
    updatedAlarms3.splice(index, 1);
    setAlarms3(updatedAlarms3);
  };

  // Data dashboard
  const newData = {
    data1: {
      SO2: data1s.dataTerminal1.SO2,
      CO: data1s.dataTerminal1.CO,
      NO: data1s.dataTerminal1.NO,
      O2: data1s.dataTerminal1.O2,
      Temperature: data1s.dataTerminal1.Temperature,
      Dust: data1s.dataTerminal1.Dust,
      StatusTemp: data1s.dataTerminal1.StatusTemp,
      StatusDust: data1s.dataTerminal1.StatusDust,
      StatusSO2: data1s.dataTerminal1.StatusSO2,
      StatusCO: data1s.dataTerminal1.StatusCO,
      StatusNO: data1s.dataTerminal1.StatusNO,
      StatusO2: data1s.dataTerminal1.StatusO2,
      Date: new Date(parseInt(data1s.dataTerminal1.createdAt)).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    },
    data2: {
      SO2: data1s.dataTerminal2.SO2,
      CO: data1s.dataTerminal2.CO,
      NO: data1s.dataTerminal2.NO,
      O2: data1s.dataTerminal2.O2,
      Temperature: data1s.dataTerminal2.Temperature,
      Dust: data1s.dataTerminal2.Dust,
      StatusTemp: data1s.dataTerminal2.StatusTemp,
      StatusDust: data1s.dataTerminal2.StatusDust,
      StatusSO2: data1s.dataTerminal2.StatusSO2,
      StatusCO: data1s.dataTerminal2.StatusCO,
      StatusNO: data1s.dataTerminal2.StatusNO,
      StatusO2: data1s.dataTerminal2.StatusO2,
      Date: new Date(parseInt(data1s.dataTerminal2.createdAt)).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    },
    data3: {
      SO2: data1s.dataTerminal3.SO2,
      CO: data1s.dataTerminal3.CO,
      NO: data1s.dataTerminal3.NO,
      O2: data1s.dataTerminal3.O2,
      Temperature: data1s.dataTerminal3.Temperature,
      Dust: data1s.dataTerminal3.Dust,
      StatusTemp: data1s.dataTerminal3.StatusTemp,
      StatusDust: data1s.dataTerminal3.StatusDust,
      StatusSO2: data1s.dataTerminal3.StatusSO2,
      StatusCO: data1s.dataTerminal3.StatusCO,
      StatusNO: data1s.dataTerminal3.StatusNO,
      StatusO2: data1s.dataTerminal3.StatusO2,
      Date: new Date(parseInt(data1s.dataTerminal3.createdAt)).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
  };
  const [isExceed1sBK, setIsExceed1sBK] = useState({
    SO2: false,
    CO: false,
    NO: false,
    Dust: false
  });
  const [isExceed90BK1s, setIsExceed90BK1s] = useState({
    SO2: false,
    CO: false,
    NO: false,
    Dust: false
  });
  const [isExceed1sHG, setIsExceed1sHG] = useState({
    SO2: false,
    CO: false,
    NO: false,
    Dust: false
  });
  const [isExceed90HG1s, setIsExceed90HG1s] = useState({
    SO2: false,
    CO: false,
    NO: false,
    Dust: false
  });
  const [isExceed1sTV, setIsExceed1sTV] = useState({
    SO2: false,
    CO: false,
    NO: false,
    Dust: false
  });
  const [isExceed90TV1s, setIsExceed90TV1s] = useState({
    SO2: false,
    CO: false,
    NO: false,
    Dust: false
  });
  //terminal1
  useEffect(() => {
    const setPoints = {
      SO2: 500,
      CO: 1000,
      NO: 850,
      O2: 150,
      Temperature: 100,
      Dust: 200
    }

    Object.entries(data1s.dataTerminal1).map(([key, value]) => {
      if (key !== 'createdAt'
        && key !== 'StatusTemp'
        && key !== 'StatusDust'
        && key !== 'StatusSO2'
        && key !== 'StatusCO'
        && key !== 'StatusNO'
        && key !== 'StatusO2'
        && key !== 'O2'
        && key !== 'Temperature') {
        if (value >= setPoints[key] && !isExceed1sBK[key]) {

          setIsExceed1sBK(prevState => ({
            ...prevState,
            [key]: true
          }));
        } else if (value >= 0.9 * setPoints[key] && value < setPoints[key] && !isExceed1sBK[key]) {
          setIsExceed90BK1s(prevState => ({
            ...prevState,
            [key]: true
          }));
        } else if (value < setPoints[key] && isExceed1sBK[key]) {
          if (value >= 0.9 * setPoints[key]) {
            setIsExceed90BK1s(prevState => ({
              ...prevState,
              [key]: true
            }));
          }
          setIsExceed1sBK(prevState => ({
            ...prevState,
            [key]: false
          }));

        } else if (value >= setPoints[key] && isExceed1sBK[key]) {

          setIsExceed1sBK(prevState => ({
            ...prevState,
            [key]: true
          }));
        } else if (value < 0.9 * setPoints[key]) {
          setIsExceed90BK1s(prevState => ({
            ...prevState,
            [key]: false
          }));
        }
      }
    })
  }, [data1s.dataTerminal1])
  //terminal2
  useEffect(() => {
    const setPoints = {
      SO2: 500,
      CO: 1000,
      NO: 850,
      O2: 150,
      Temperature: 100,
      Dust: 200
    }
    Object.entries(data1s.dataTerminal2).map(([key, value]) => {
      if (key !== 'createdAt'
        && key !== 'StatusTemp'
        && key !== 'StatusDust'
        && key !== 'StatusSO2'
        && key !== 'StatusCO'
        && key !== 'StatusNO'
        && key !== 'StatusO2'
        && key !== 'O2'
        && key !== 'Temperature') {
        if (value >= setPoints[key] && !isExceed1sHG[key]) {

          setIsExceed1sHG(prevState => ({
            ...prevState,
            [key]: true
          }));
        } else if (value >= 0.9 * setPoints[key] && value < setPoints[key] && !isExceed1sHG[key]) {
          setIsExceed90HG1s(prevState => ({
            ...prevState,
            [key]: true
          }));
        } else if (value < setPoints[key] && isExceed1sHG[key]) {
          if (value >= 0.9 * setPoints[key]) {
            setIsExceed90HG1s(prevState => ({
              ...prevState,
              [key]: true
            }));
          }
          setIsExceed1sHG(prevState => ({
            ...prevState,
            [key]: false
          }));

        } else if (value >= setPoints[key] && isExceed1sHG[key]) {

          setIsExceed1sHG(prevState => ({
            ...prevState,
            [key]: true
          }));
        } else if (value < 0.9 * setPoints[key]) {
          setIsExceed90HG1s(prevState => ({
            ...prevState,
            [key]: false
          }));
        }
      }
    })
  }, [data1s.dataTerminal2])

  //terminal3
  useEffect(() => {
    const setPoints = {
      SO2: 500,
      CO: 1000,
      NO: 850,
      O2: 150,
      Temperature: 100,
      Dust: 200
    }
    Object.entries(data1s.dataTerminal3).map(([key, value]) => {
      if (key !== 'createdAt'
        && key !== 'StatusTemp'
        && key !== 'StatusDust'
        && key !== 'StatusSO2'
        && key !== 'StatusCO'
        && key !== 'StatusNO'
        && key !== 'StatusO2'
        && key !== 'O2'
        && key !== 'Temperature') {
        if (value >= setPoints[key] && !isExceed1sTV[key]) {

          setIsExceed1sTV(prevState => ({
            ...prevState,
            [key]: true
          }));
        } else if (value >= 0.9 * setPoints[key] && value < setPoints[key] && !isExceed1sTV[key]) {
          setIsExceed90TV1s(prevState => ({
            ...prevState,
            [key]: true
          }));
        } else if (value < setPoints[key] && isExceed1sTV[key]) {
          if (value >= 0.9 * setPoints[key]) {
            setIsExceed90TV1s(prevState => ({
              ...prevState,
              [key]: true
            }));
          }
          setIsExceed1sTV(prevState => ({
            ...prevState,
            [key]: false
          }));

        } else if (value >= setPoints[key] && isExceed1sTV[key]) {

          setIsExceed1sTV(prevState => ({
            ...prevState,
            [key]: true
          }));
        } else if (value < 0.9 * setPoints[key]) {
          setIsExceed90TV1s(prevState => ({
            ...prevState,
            [key]: false
          }));
        }
      }
    })
  }, [data1s.dataTerminal3])
  // Xử lý login
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
    window.location.href = '/login';

  };
  const [email, setEmail] = useState('')
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
          setEmail(response.data.email)
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
              <Route path='dashboard' element={<DashBoard data1={newData.data1} data2={newData.data2} data3={newData.data3} isExceedBK={isExceed1sBK} isExceed90BK={isExceed90BK1s} isExceedHG={isExceed1sHG} isExceed90HG={isExceed90HG1s} isExceedTV={isExceed1sTV} isExceed90TV={isExceed90TV1s} />} />
              <Route path='userauthencation' element={<PrivateRoute><User verifyEmail={email} token={token} /></PrivateRoute>} />
              <Route path='metric' element={<PrivateRoute><Metric data1={chartBK} data2={chartHG} data3={chartTV} /></PrivateRoute>} />
            </Routes>
          </div>
        </div>
      </div >
    </Router>

  )
}
export default App
