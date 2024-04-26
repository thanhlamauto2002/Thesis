import React, { useState, useEffect } from 'react';

function Reportdata({ reportData }) {
  console.log(reportData)
  return (
    <table className='table-report-data'>
      <thead >
        <tr >
          <th>Date</th>
          <th>SO2 (mg/Nm3)</th>
          <th>CO (mg/Nm3)</th>
          <th>NO (mg/Nm3)</th>
          <th>O2 (%V)</th>
          <th>Temperature (oC)</th>
          <th>Dust (mg/Nm3)</th>
          <th>Area</th>
        </tr>
      </thead>
      <tbody>
        {reportData.map((item, index) => (
          <tr key={index} className='report-tr'>
            <td>{new Date(item.createdAt).toLocaleString('en-GB')}</td>
            <td>{item.SO2}</td>
            <td>{item.CO}</td>
            <td>{item.NO}</td>
            <td>{item.O2}</td>
            <td>{item.Temperature}</td>
            <td>{item.Dust}</td>
            <td>{item.Station}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Reportdata