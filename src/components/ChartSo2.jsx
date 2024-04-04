import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography'


const ChartSo2 = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const validData = data.filter(item => typeof item.time !== 'undefined' && typeof item.value !== 'undefined');
    setChartData(validData);
  }, [data]);


  return (
    <div className='so2-chart'>
      <Typography variant="h6">SO2</Typography> {/* Hiển thị tên của biểu đồ */}

      <ResponsiveContainer width="80%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="linear" dataKey="value" stroke='#0077be' />
        </LineChart>
      </ResponsiveContainer>
    </div>

  );
}

export default ChartSo2;