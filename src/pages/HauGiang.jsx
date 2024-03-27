import * as React from 'react'
import { LineChart } from '@mui/x-charts/LineChart'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import ChartSo2 from '~/components/ChartSo2'
import ChartCo2 from '~/components/ChartCo2'
import ChartNo2 from '~/components/ChartNo2'
import ChartCo from '~/components/ChartCo'
import ChartNo from '~/components/ChartNo'
import ChartH2s from '~/components/ChartH2s'
import { useNavigate } from 'react-router-dom'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

function HauGiang({ data1 }) {
  const navigate = useNavigate()

  const [chartData, setChartData] = useState(() => {
    const storedData = localStorage.getItem('hauGiangChartData');
    return storedData ? JSON.parse(storedData) : [];
  });

  const [isDataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    const updateChartData = () => {
      if (data1 && data1.createdAt && !isNaN(new Date(data1.createdAt))) {
        const newDataPoint = {
          time: new Date(data1.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          so2: data1.SO2,
          co2: data1.CO2,
          no2: data1.NO2,
          co: data1.CO,
          no: data1.NO,
          h2s: data1.H2S
        };

        setChartData(prevData => {
          const updatedData = [...prevData, newDataPoint];
          localStorage.setItem('hauGiangChartData', JSON.stringify(updatedData));
          setDataUpdated(true);
          return updatedData;
        });
      }
    };

    updateChartData()
  }, [data1]);

  useEffect(() => {
    // Check if data has been updated in localStorage, if so, reset the state
    if (isDataUpdated) {
      setDataUpdated(false);
    }
  }, [isDataUpdated]);

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div className='chart-container'>
      <div className='chart-header'>
        <button onClick={handleBackToDashboard} className="back-to-dashboard-button"><ArrowBackOutlinedIcon /></button>
        <Typography className='station-name' variant="h6" fontWeight="bold">
          Hau Giang Station</Typography>
      </div>
      <div className="grid-container">
        <div className="chart"><ChartSo2 data={chartData.map(entry => ({ time: entry.time, value: entry.so2 }))} /></div>
        <div className="chart"><ChartCo2 data={chartData.map(entry => ({ time: entry.time, value: entry.co2 }))} /></div>
        <div className="chart"><ChartNo2 data={chartData.map(entry => ({ time: entry.time, value: entry.no2 }))} /></div>
        <div className="chart"><ChartCo data={chartData.map(entry => ({ time: entry.time, value: entry.co }))} /></div>
        <div className="chart"><ChartNo data={chartData.map(entry => ({ time: entry.time, value: entry.no }))} /></div>
        <div className="chart"><ChartH2s data={chartData.map(entry => ({ time: entry.time, value: entry.h2s }))} /></div>
      </div>
    </div>
  );
}

export default HauGiang;