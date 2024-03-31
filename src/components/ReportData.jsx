import React, { useState, useEffect } from 'react';

function Reportdata({ reportData }) {
  console.log(reportData)
  return (
    <table className='table-report-data'>
      <thead >
        <tr >
          <th>Date</th>
          <th>SO2</th>
          <th>CO2</th>
          <th>NO2</th>
          <th>O2</th>
          <th>Temperature</th>
          <th>Pressure</th>
          <th>Area</th>
        </tr>
      </thead>
      <tbody>
        {reportData.map((item, index) => (
          <tr key={index} className='report-tr'>
            <td>{new Date(item.createdAt).toLocaleString('en-GB')}</td>
            <td>{item.SO2}</td>
            <td>{item.CO2}</td>
            <td>{item.NO2}</td>
            <td>{item.O2}</td>
            <td>{item.Temperature}</td>
            <td>{item.Pressure}</td>
            <td>{item.Station}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Reportdata