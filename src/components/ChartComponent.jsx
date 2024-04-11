
import * as React from 'react'
import { useState, useEffect } from 'react'
import ChartSo2 from '~/components/ChartSo2'
import ChartCo2 from '~/components/ChartCo2'
import ChartNo2 from '~/components/ChartNo2'
import ChartO2 from '~/components/ChartO2'
import ChartTemp from '~/components/ChartTemp'
import ChartPressure from '~/components/ChartPressure'
function ChartComponent({ data1 }) {


  // const [chartData, setChartData] = useState(() => {
  //   const storedData = localStorage.getItem('chartDataMetric');
  //   return storedData ? JSON.parse(storedData) : [];
  // });
  const [chartData, setChartData] = useState([])
  useEffect(() => {
    const updateChartData = () => {
      // Kiểm tra nếu `data1` là một mảng và có ít nhất một phần tử
      if (Array.isArray(data1) && data1.length >= 0) {
        const updatedData = data1.map(data => {
          // Kiểm tra tính hợp lệ của dữ liệu
          if (data && data.createdAt && !isNaN(new Date(data.createdAt))) {
            return {
              time: new Date(data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              so2: data.SO2,
              co2: data.CO2,
              no2: data.NO2,
              o2: data.O2,
              temperature: data.Temperature,
              pressure: data.Pressure
            };
          }
          return null; // Trả về null nếu dữ liệu không hợp lệ
        }).filter(Boolean); // Loại bỏ các phần tử null
        setChartData(updatedData);
      }
    };

    updateChartData();
  }, [data1]);
  return (
    <div className='chart-container'>
      <div className="grid-container">
        <div className="chart"><ChartSo2 data={chartData.map(entry => ({ time: entry.time, value: entry.so2 }))} /></div>
        <div className="chart"><ChartCo2 data={chartData.map(entry => ({ time: entry.time, value: entry.co2 }))} /></div>
        <div className="chart"><ChartNo2 data={chartData.map(entry => ({ time: entry.time, value: entry.no2 }))} /></div>
        <div className="chart"><ChartO2 data={chartData.map(entry => ({ time: entry.time, value: entry.o2 }))} /></div>
        <div className="chart"><ChartTemp data={chartData.map(entry => ({ time: entry.time, value: entry.temperature }))} /></div>
        <div className="chart"><ChartPressure data={chartData.map(entry => ({ time: entry.time, value: entry.pressure }))} /></div>
      </div>
    </div>
  );
}

export default ChartComponent