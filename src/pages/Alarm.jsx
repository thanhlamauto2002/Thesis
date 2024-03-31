import { AlarmData } from './AlarmData'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import '~/App.css'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import IconButton from '@mui/material/IconButton';
import AlarmBK from './AlarmBK';
import AlarmHG from './AlarmHG';
import AlarmTV from './AlarmTV';
function Alarm({ alarm1, alarm2, alarm3, onAcknowledgeBK, onAcknowledgeHG, onAcknowledgeTV }) {
  const [selectedStation, setSelectedStation] = useState(null);
  const handleSelectStation = (station) => {
    setSelectedStation(station);
  };
  const renderSelectedStation = () => {
    if (selectedStation) {
      switch (selectedStation.title) {
        case 'Alarm Bach Khoa':
          return <AlarmBK data1={alarm1} ackBK={onAcknowledgeBK} />;
        case 'Alarm Hau Giang':
          return <AlarmHG data1={alarm2} ackHG={onAcknowledgeHG} />;
        case 'Alarm Tra Vinh':
          return <AlarmTV data1={alarm3} ackTV={onAcknowledgeTV} />;
        default:
          return null;
      }
    } else {
      // Mặc định hiển thị AlarmBK
      return <AlarmBK data1={alarm1} ackBK={onAcknowledgeBK} />;
    }
  };
  console.log(selectedStation)
  return (
    <div className="alarm-box">
      <div className="alarm-nav">
        <ul className='AlarmList'>
          {AlarmData.map((station, index) => (
            <li
              key={index}
              className='row-alarm'
              id={selectedStation === station ? 'active' : ''}
              onClick={() => setSelectedStation(station)}
            >
              <div id='icon-alarm'>{station.icon}</div>
              <div id='title-alarm'>{station.title}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="alarm-main">
        {renderSelectedStation()}

      </div>
    </div>
  );
}

export default Alarm
