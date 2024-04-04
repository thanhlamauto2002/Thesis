import React, { useState, useEffect } from 'react'
import { MetricStationData } from '~/components/MetricStationData'
import { MetricOptionData } from '~/components/MetricOptionData'
import BachKhoaComp from '~/components/BKStation'
import HauGiangComp from '~/components/HGStation'
import TraVinhComp from '~/components/TVStation'
import ChartComponent from '~/components/ChartComponent'
import axios from 'axios';

function Metric({ data1, data2, data3 }) {

  const [selectedStation, setSelectedStation] = useState('bk');
  const [selectedOption, setSelectedOption] = useState('current');
  const [option, setOption] = useState('today');
  const [chartData, setChartData] = useState(null)
  console.log('dataChart: ', chartData)

  useEffect(() => {
    const getData = () => {
      axios.get(`http://localhost:8017/v1/getdatachart?station=${selectedStation}&option=${option}`)
        .then(response => {
          setChartData(response.data);
          console.log('res data: ', response.data)
        })
        .catch(error => {
          console.error('Error fetching report data:', error);
        });

    }
    getData()

  }, [selectedStation, selectedOption]);


  const handleClick = (stationId) => {
    setSelectedStation(stationId);
  };
  const handleClickOption = (optionId) => {
    setSelectedOption(optionId);
    setOption(optionId)
  };

  const renderCharts = () => {
    // Kiểm tra selectedStation và selectedOption để render biểu đồ tương ứng
    // Ví dụ:
    let chartContent = null;

    if (selectedStation === 'bk') {
      if (selectedOption === 'current') {
        chartContent = <BachKhoaComp data1={data1} />
      } else if (selectedOption === 'today') {
        chartContent = <ChartComponent data1={chartData} />
      } else if (selectedOption === 'l7day') {
        chartContent = <ChartComponent data1={chartData} />
      } else if (selectedOption === 'l30day') {
        chartContent = <ChartComponent data1={chartData} />
      }
    } else if (selectedStation === 'hg') {
      if (selectedOption === 'current') {
        chartContent = <HauGiangComp data1={data2} />
      } else if (selectedOption === 'today') {
        chartContent = <ChartComponent data1={chartData} />
      } else if (selectedOption === 'l7day') {
        chartContent = <ChartComponent data1={chartData} />
      } else if (selectedOption === 'l30day') {
        chartContent = <ChartComponent data1={chartData} />
      }
    } else if (selectedStation === 'tv') {
      if (selectedOption === 'current') {
        chartContent = <TraVinhComp data1={data3} />
      } else if (selectedOption === 'today') {
        chartContent = <ChartComponent data1={chartData} />
      } else if (selectedOption === 'l7day') {
        chartContent = <ChartComponent data1={chartData} />
      } else if (selectedOption === 'l30day') {
        chartContent = <ChartComponent data1={chartData} />
      }
    }
    return chartContent
  };
  return (
    <div className='metric-container'>
      <div className='metric-bar'>
        <div className='metric-station'>
          <ul className='station-list'>
            {MetricStationData.map((val, key) => {
              return (
                <li
                  key={key}
                  className='row-station'
                  id={selectedStation == val.id ? 'active' : ''}
                  onClick={() => handleClick(val.id)}>
                  <div id='title'>{val.title}</div>
                </li>
              )
            }
            )}
          </ul>
        </div>
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
        <span>{selectedStation === 'bk' ? 'Bach Khoa Station' : ''}
          {selectedStation === 'hg' ? 'Hau Giang Station' : ''}
          {selectedStation === 'tv' ? 'Tra Vinh Station' : ''}</span>
      </div>
      <div className='metric-main'>
        {renderCharts()}
      </div>
    </div>
  )
}

export default Metric