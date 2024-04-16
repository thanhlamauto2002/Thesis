import React from 'react'

function ReportAlarm({ reportData }) {
  return (
    <table className='table-report-alarm'>
      <thead>
        <tr >
          <th>Date</th>
          <th>Status</th>
          <th>Area</th>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {reportData.map((item, index) => (
          <tr key={index} className='report-tr'>
            <td>{new Date(item.date).toLocaleString('en-GB')}</td>
            <td>{item.status}</td>
            <td>{item.area}</td>
            <td>{item.name}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ReportAlarm