import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './Alarm.css'
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import { toast } from 'react-toastify'

function Alarm({ token }) {
  const [selectedStation, setSelectedStation] = useState('');
  const [stations, setStations] = useState([]);
  const [showUnauthorizedToast, setShowUnauthorizedToast] = useState(false);

  const [alarmData, setAlarmData] = useState(() => {
    // Khởi tạo alarmData từ localStorage nếu có, nếu không thì là một đối tượng trống
    const storedAlarmData = localStorage.getItem('alarmData');
    return storedAlarmData ? JSON.parse(storedAlarmData) : {};
  });
  console.log('token', token)

  useEffect(() => {
    // Lưu alarmData vào localStorage với key là 'alarmData'
    localStorage.setItem('alarmData', JSON.stringify(alarmData));
  }, [alarmData]);

  useEffect(() => {
    const socket = io('http://localhost:8017');


    socket.on('opcData', ({ station, data }) => {
      const timestamp = data.createdAt;

      setAlarmData(prevAlarmData => {
        const newAlarmData = { ...prevAlarmData };

        if (!newAlarmData[station]) {
          newAlarmData[station] = {};
        }

        Object.entries(data).forEach(([key, value]) => {
          if (key.endsWith('_setpoint') && key !== 'StatusStation') {
            const parameterName = key.replace('_setpoint', '');

            if (!newAlarmData[station][parameterName]) {
              newAlarmData[station][parameterName] = {
                isExceed: false,
                lastAlarmValue: null,
                alarms: [],
              };
            }

            const currentIsExceed = value && data[parameterName] > value;
            const currentIsExceed90 = value && data[parameterName] <= 0.9 * value;

            if (currentIsExceed && !newAlarmData[station][parameterName].isExceed) {
              // Giá trị vượt quá ngưỡng lần đầu tiên
              newAlarmData[station][parameterName].isExceed = true;

              const newAlarm = {
                parameterName: parameterName,
                value: data[parameterName],
                setpoint: value,
                timestamp: timestamp,
              };
              // const response = axios.post('http://localhost:8017/sendEmail', {
              //   station: station,
              //   parameterName: parameterName,
              //   value: `${data[parameterName]} mg/Nm3`,
              //   setpoint: value,
              //   timestamp: timestamp
              // });

              newAlarmData[station][parameterName].alarms.push(newAlarm);
            } else if (!currentIsExceed && currentIsExceed90 && newAlarmData[station][parameterName].isExceed) {
              // Giá trị dưới ngưỡng sau khi đã vượt quá
              newAlarmData[station][parameterName].isExceed = false;
            }
          }
        });

        return newAlarmData;

      }
      );

    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8017/v1/liststation/get');
        const extractedStations = response.data.map(item => item.Station.trim());
        setStations(extractedStations);
      } catch (error) {
        console.error('Error fetching station data:', error);
      }
    };

    fetchData();
  }, []);
  const handleAcknowledgeAlarm = (station, parameterName, timestamp) => {
    // Tạo một bản sao của alarmData để cập nhật
    const updatedAlarmData = { ...alarmData };

    // Lọc ra alarms của parameterName của station và loại bỏ alarm có timestamp tương ứng
    updatedAlarmData[station][parameterName].alarms = updatedAlarmData[station][parameterName].alarms.filter(
      alarm => alarm.timestamp !== timestamp
    );

    // Cập nhật state alarmData với dữ liệu mới
    setAlarmData(updatedAlarmData);

    // Lưu dữ liệu mới vào localStorage
    localStorage.setItem('alarmData', JSON.stringify(updatedAlarmData));
  };
  console.log('select', selectedStation)
  const renderAlarmTable = () => {
    console.log(token)
    console.log(token.permissions)
    if (!selectedStation)
      return null
    console.log(!token.permissions.includes(selectedStation))

    if (!token.permissions.includes(selectedStation)) {
      if (!showUnauthorizedToast) {
        toast.warning(`You are not authorized for ${selectedStation}`, { draggable: false });
        setShowUnauthorizedToast(true);
      }
      return null;
    } else {
      const alarms = alarmData[selectedStation] || {};

      return (
        <table className='alarm-table'>
          <thead className='table-head'>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
              <th>Setpoint</th>
              <th>Time</th>
              <th>Acknowledge</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(alarms).map(parameterName =>
              alarms[parameterName].alarms.map((alarm, index) => (
                <tr key={index}>
                  <td>{alarm.parameterName}</td>
                  <td>{alarm.value}</td>
                  <td>{alarm.setpoint}</td>
                  <td>{new Date(alarm.timestamp).toLocaleString()}</td>
                  <td><DoneOutlineOutlinedIcon onClick={() => handleAcknowledgeAlarm(selectedStation, parameterName, alarm.timestamp)}
                    style={{ cursor: 'pointer' }} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      );
    }
  }

  return (
    <div className="alarm-box">
      <div className="alarm-nav">
        <ul className="AlarmList">
          {stations.map((station, index) => (
            <li
              key={index}
              className={selectedStation === station ? 'active row-alarm' : 'row-alarm'}
              onClick={() => {
                setSelectedStation(station);
                setShowUnauthorizedToast(false);
              }
              }
            >
              <div id="icon-alarm">{/* Add icon if needed */}</div>
              <div id="title-alarm">{station}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="alarm-main">
        {
          renderAlarmTable()
        }
      </div>
    </div>
  );
}

export default Alarm;