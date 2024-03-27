import React, { useState, useEffect, useRef } from 'react';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import IconButton from '@mui/material/IconButton';


function AlarmBK({ data1 }) {
  const [alarms, setAlarms] = useState(() => {
    const storedAlarms = localStorage.getItem('alarms');
    return storedAlarms ? JSON.parse(storedAlarms) : [];
  });

  const prevData1 = useRef(data1);

  const setPoints = {
    SO2: 50,
    CO2: 100,
    NO2: 200,
    CO: 150,
    NO: 180,
    H2S: 50
  };
  console.log('alamrbk: ', alarms)
  useEffect(() => {
    if (isDataChanged()) {
      checkAlarms(data1);
    }
  }, [data1]); // useEffect này chỉ chạy khi data1 thay đổi

  useEffect(() => {
    prevData1.current = data1; // Cập nhật prevData1 khi data1 thay đổi
  }, [data1]);
  console.log('>>databk: ', data1)
  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(alarms)); // Lưu trạng thái của alarms vào localStorage
  }, [alarms]); // useEffect này chỉ chạy khi alarms thay đổi

  const isDataChanged = () => {
    return JSON.stringify(prevData1.current) !== JSON.stringify(data1);
  };

  const checkAlarms = (data) => {
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
            name: `Khí ${gas}`,
            value: value,
            acknowledged: false // Thêm trạng thái acknowledged
          };
        }
      }
      return null;
    }).filter(Boolean);

    setAlarms(prevAlarms => [...newAlarms, ...prevAlarms]);
  };

  const handleAcknowledge = (index) => {
    const updatedAlarms = [...alarms];
    updatedAlarms.splice(index, 1);
    setAlarms(updatedAlarms);
    console.log('>>>ALARM: ', alarms)
  };

  const handleResetAlarms = () => {
    setAlarms([]);
    localStorage.removeItem('alarms'); // Xóa trạng thái alarms khỏi localStorage
  };

  return (
    <div className='alarmbk-box'>
      <div className="scrollable-table">
        <table className="alarmbk-table">
          <thead>
            <tr className='table-head'>
              <th>Date</th>
              <th>Status</th>
              <th>Area</th>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {alarms.map((alarm, index) => (
              <tr key={index} className="alarm-row">
                <td>{alarm.date}</td>
                <td className="alarm-status">
                  <IconButton style={{ fontSize: 'medium', fontWeight: 'bolder', margin: '1px' }}>
                    <WarningAmberOutlinedIcon />
                  </IconButton>
                  {alarm.status}
                  {!alarm.acknowledged && ( // Chỉ hiển thị nút acknowledge nếu chưa được acknowledge
                    <IconButton onClick={() => handleAcknowledge(index)} style={{ fontSize: 'medium', fontWeight: 'bolder', margin: '3px' }}>
                      Ack
                    </IconButton>
                  )}
                </td>
                <td>{alarm.area}</td>
                <td>{alarm.name}</td>
                <td>{alarm.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='back-bk'></div>
    </div>
  );
}

export default AlarmBK;