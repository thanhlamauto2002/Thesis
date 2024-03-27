import { AlarmData } from './AlarmData'
import { useState, useEffect } from 'react'
import '~/App.css'
import AlarmBK from './AlarmBK'
import AlarmHG from './AlarmHG'
import AlarmTV from './AlarmTV'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import IconButton from '@mui/material/IconButton';
function Alarm({ data1, data2, data3 }) {
  const [selectedStation, setSelectedStation] = useState(() => {
    // Kiểm tra xem liệu có một selectedStation đã lưu trong localStorage không
    const storedStation = localStorage.getItem('selectedStation');
    return storedStation ? JSON.parse(storedStation) : null;
  });

  useEffect(() => {
    // Lưu selectedStation vào localStorage khi có sự thay đổi
    localStorage.setItem('selectedStation', JSON.stringify(selectedStation));
  }, [selectedStation]);

  useEffect(() => {
    // Thực hiện render lại component khi có sự thay đổi trong localStorage
    const handleStorageChange = () => {
      const storedStation = localStorage.getItem('selectedStation');
      setSelectedStation(storedStation ? JSON.parse(storedStation) : null);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [selectedStation]);
  useEffect(() => {
    console.log('Alarm component mounted');
    return () => {
      console.log('Alarm component unmounted');
    };
  }, [data1, data2, data3]);

  return (
    <div className="alarm-box">
      <div className="alarm-nav">
        <ul className='AlarmList'>
          {AlarmData.map((station, index) => (
            <li
              key={index}
              className='row-alarm'
              id={selectedStation === station ? 'active' : ''}
              onClick={() => setSelectedStation(station)}>
              <div id='icon-alarm'>{station.icon}</div>
              <div id='title-alarm'>{station.title}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="alarm-main">
        {selectedStation && renderSelectedStation(selectedStation, { data1, data2, data3 })}
      </div>
    </div>
  );
}

function renderSelectedStation(selectedStation, { data1, data2, data3 }) {
  switch (selectedStation.title) {
    case 'Alarm Bach Khoa':
      return <AlarmBK data1={data1} />
    case 'Alarm Hau Giang':
      return <AlarmHG data1={data2} />
    case 'Alarm Tra Vinh':
      return <AlarmTV data1={data3} />
    default:
      return null;
  }
}
export default Alarm
