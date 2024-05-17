import React, { useState, useEffect } from 'react';

function Reportdata({ reportData }) {
  console.log(reportData)
  return (
    <table className='table-report-data'>
      <thead >
        <tr >
          <th>Date</th>
          <th>Parameter</th>
          <th>Unit</th>
          <th>Value</th>
          <th>Signal Status</th>
          <th>Station</th>
          <th>Modbus Status</th>
        </tr>
      </thead>
      <tbody >
        {reportData.map((item, index) => {
          function getUnit(gasName) {
            switch (gasName) {
              case 'SO2':
              case 'CO':
              case 'NO':
              case 'Dust':
                return 'mg/Nm3';
              case 'Temperature':
                return '°C';
              case 'O2':
                return '%V';
              default:
                return ''; // Đơn vị mặc định nếu không khớp
            }
          }
          const gasNames = Object.keys(item).filter(key => {
            // Lọc các gasName có giá trị không phải null hoặc undefined
            return key !== 'createdAt' && key !== 'Station' && !key.startsWith('Status') && item[key] != null;
          });
          return (
            <tr key={index} className='report-tr'>
              <td>{new Date(item.createdAt).toLocaleString('en-GB')}</td>
              <td>
                {gasNames.map((gasName, idx) => (
                  <div key={idx}>{gasName}</div>
                ))}
              </td>
              <td>
                {gasNames.map((gasName, idx) => (
                  <div key={idx}>{getUnit(gasName)}</div> // Lấy đơn vị dựa trên gasName
                ))}
              </td>
              <td>
                {gasNames.map((gasName, idx) => (
                  <div key={idx}>{item[gasName]}</div>
                ))}
              </td>
              <td>
                {gasNames.map((gasName, idx) => {
                  const gasSignalKey = `Status${gasName}`;
                  if (gasSignalKey in item) {
                    return <div key={idx}>{item[gasSignalKey]}</div>;
                  } return null; // Trường gasSignal không tồn tại trong item

                })}
              </td>
              <td>{item.Station}</td>
              <td>{item.StatusStation}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}

export default Reportdata