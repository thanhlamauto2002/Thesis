import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';

const RadarChart1 = ({ data1, data2, data3 }) => {
  // Kết hợp dữ liệu từ 3 set vào một mảng duy nhất
  const chartData = [
    { subject: 'O2', data1Value: data1.O2, data2Value: data2.O2, data3Value: data3.O2 },
    { subject: 'CO2', data1Value: data1.CO2, data2Value: data2.CO2, data3Value: data3.CO2 },
    { subject: 'NO2', data1Value: data1.NO2, data2Value: data2.NO2, data3Value: data3.NO2 },
    { subject: 'SO2', data1Value: data1.SO2, data2Value: data2.SO2, data3Value: data3.SO2 },
  ];

  return (
    <RadarChart width={600} height={600} data={chartData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={0} domain={[0, 'auto']} />
      <Radar name="Bach Khoa Station" dataKey="data1Value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Radar name="Hau Giang Station" dataKey="data2Value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4} />
      <Radar name="Tra Vinh Station" dataKey="data3Value" stroke="#ffc658" fill="#ffc658" fillOpacity={0.2} />
      <Legend />
    </RadarChart>
  );
};

export default RadarChart1;