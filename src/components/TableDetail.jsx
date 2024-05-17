import React from 'react';

const TableDetail = ({ station }) => {
  if (!station) {
    return <div> Không có dữ liệu để hiện thị</div>;
  }
  if (typeof station !== 'object') {
    return <div>Định dạng dữ liệu không hợp lệ</div>;
  }
  // const dataEntries = Object.entries(station);
  const filteredFields = Object.entries(station).filter(
    ([key, value]) => key !== '_id' && !key.startsWith('Status') && !key.startsWith('CO_setpoint') &&
      !key.startsWith('NO_setpoint') &&
      !key.startsWith('SO2_setpoint') &&
      !key.startsWith('Dust_setpoint')
  );

  // Lấy danh sách các thuộc tính Signal Status
  const statusFields = Object.entries(station).filter(
    ([key, value]) => key.startsWith('Status')
  );

  // Tạo một đối tượng để lưu trữ thông tin cho mỗi hàng của bảng
  const tableRows = filteredFields.map(([key, value]) => {
    const signalStatusKey = `Status${key}`; // Tên của thuộc tính Signal Status tương ứng
    const signalStatusValue = station[signalStatusKey]; // Giá trị của thuộc tính Signal Status tương ứng
    if (key === 'createdAt') {
      value = new Date(parseInt(value)).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      })
      key = 'Date'
    }
    return {
      property: key,
      value: value,
      signalStatus: signalStatusValue || '-' // Nếu không có giá trị Signal Status, hiển thị dấu gạch ngang
    };
  });
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
      <thead>
        <tr>
          <th style={{ padding: '12px', backgroundColor: '#2F4050', border: '1px solid #ddd', color: 'white' }}>Property</th>
          <th style={{ padding: '12px', backgroundColor: '#2F4050', border: '1px solid #ddd', color: 'white' }}>Value</th>
          <th style={{ padding: '12px', backgroundColor: '#2F4050', border: '1px solid #ddd', color: 'white' }}>Signal Status</th>
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #779bbc' }}>
            <td style={{ padding: '12px', backgroundColor: '#779bbc', border: '1px solid #2F4050' }}>{row.property}</td>
            <td style={{ padding: '12px', backgroundColor: '#779bbc', border: '1px solid #2F4050' }}>{row.value}</td>
            <td style={{ padding: '12px', backgroundColor: '#779bbc', border: '1px solid #2F4050' }}>{row.signalStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableDetail;