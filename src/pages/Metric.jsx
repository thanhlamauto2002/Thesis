import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Metric.css'
import { MetricOptionData } from '~/components/MetricOptionData'
import io from 'socket.io-client';
import ChartComponent from '~/components/ChartComponent'

function Metric() {
  const [stationData, setStationData] = useState({});
  const [chartData, setChartData] = useState(null)
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState('Choose Station');
  const [selectedOption, setSelectedOption] = useState('');
  const [option, setOption] = useState('today');

  console.log('option', selectedOption)

  useEffect(() => {
    const socket = io('http://localhost:8017'); // Thay đổi địa chỉ máy chủ và cổng tùy vào cài đặt của bạn

    socket.on('opcData', ({ station, data }) => {
      // Cập nhật dữ liệu cho trạm tương ứng
      setStationData((prevData) => ({
        ...prevData,
        [station]: data,
      }));
    });

    const getData = () => {
      axios.get('http://localhost:8017/v1/liststation/get')
        .then(response => {
          const extractedStations = response.data.map(item => item.Station.trim());
          setStations(extractedStations);

        })
        .catch(error => {
          console.error('Error fetching report data:', error);
        });

    }
    getData()
  }, []);
  useEffect(() => {
    const getData = () => {
      axios.get(`http://localhost:8017/v1/getdataopcua?station=${selectedStation}&option=${selectedOption}`)
        .then(response => {
          setChartData(response.data);
        })
        .catch(error => {
          console.error('Error fetching report data:', error);
        });
    };

    // getData();
    let intervalId = null;
    if (selectedOption === 'current') {
      intervalId = setInterval(getData, 10000); // Gọi API mỗi 10 giây (10000ms = 10 giây)
    } else {
      getData();
    }

    // Xóa interval khi component unmount hoặc khi selectedOption không còn là 'current'
    return () => {
      clearInterval(intervalId);
    };

  }, [selectedStation, selectedOption]);


  const handleClick = (stationId) => {
    setSelectedStation(stationId);
  };
  const handleStationChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedStation(selectedValue);
    // Xử lý khi người dùng chọn một trạm
    console.log('Station selected:', selectedValue);
  };
  const handleClickOption = (optionId) => {
    setSelectedOption(optionId);
  };
  console.log(chartData)
  console.log(selectedOption)
  console.log(selectedStation)
  const renderCharts = () => {
    // Kiểm tra selectedStation và selectedOption để render biểu đồ tương ứng
    // Ví dụ:
    let chartContent = null;
    if (selectedOption === 'current') {
      chartContent = <ChartComponent data1={chartData} />
    } else if (selectedOption === 'today') {
      chartContent = <ChartComponent data1={chartData} />
    } else if (selectedOption === 'l7day') {
      chartContent = <ChartComponent data1={chartData} />
    } else if (selectedOption === 'l30day') {
      chartContent = <ChartComponent data1={chartData} />
    }

    return chartContent
  };
  return (
    <div className='metric-container'>
      <div className='metric-bar'>
        <select value={selectedStation} onChange={handleStationChange} className='select-station'>
          <option key={0} value=''>Choose Station</option>
          {stations.map((station, index) => (
            <option key={index + 1} value={station}>{station}</option>
          ))}
        </select>
        <div className='metric-option'>
          <ul className='option-list'>
            {MetricOptionData.map((val1, key) => {
              return (
                <li
                  key={key}
                  className='row-station'
                  id={selectedOption == val1.id ? 'active' : ''}
                  onClick={() => handleClickOption(val1.id)}>
                  <div id='title'>{val1.title}</div>
                </li>
              )
            }
            )}
          </ul>
        </div>
      </div>
      <div className='metric-title'>

      </div>
      <div className='metric-main'>
        {renderCharts()}
      </div>
    </div>
  )
}

export default Metric