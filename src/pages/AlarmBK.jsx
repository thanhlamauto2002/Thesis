import React, { useState, useEffect, useRef } from 'react';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import IconButton from '@mui/material/IconButton';


function AlarmBK({ data1, ackBK }) {

  const handleAcknowledge = (index) => {
    ackBK(index);
  };
  const getRowId = (id) => {
    switch (id) {
      case 'red':
        return 'red'
      case 'orange':
        return 'orange'
      case 'green':
        return 'green'
      default:
        return null
    }
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
            {data1.map((alarm, index) => (
              <tr key={index} className={getRowId(alarm.id)} >
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

