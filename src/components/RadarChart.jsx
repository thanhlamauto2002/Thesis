import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';

const RadarChart1 = ({ data1, data2, data3 }) => {
  // Kết hợp dữ liệu từ 3 set vào một mảng duy nhất
  const chartData = [
    { subject: 'CO', data1Value: data1.CO, data2Value: data2.CO, data3Value: data3.CO },
    { subject: 'CO2', data1Value: data1.CO2, data2Value: data2.CO2, data3Value: data3.CO2 },
    { subject: 'H2S', data1Value: data1.H2S, data2Value: data2.H2S, data3Value: data3.H2S },
    { subject: 'NO', data1Value: data1.NO, data2Value: data2.NO, data3Value: data3.NO },
    { subject: 'NO2', data1Value: data1.NO2, data2Value: data2.NO2, data3Value: data3.NO2 },
    { subject: 'SO2', data1Value: data1.SO2, data2Value: data2.SO2, data3Value: data3.SO2 },
  ];

  return (
    <RadarChart width={1000} height={600} data={chartData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
      <Radar name="BK" dataKey="data1Value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Radar name="HG" dataKey="data2Value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4} />
      <Radar name="TV" dataKey="data3Value" stroke="#ffc658" fill="#ffc658" fillOpacity={0.2} />
      <Legend />
    </RadarChart>
  );
};

export default RadarChart1;