import React, { useState, useEffect } from 'react';
import './Report.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@mui/material/Button';
import Reportdata from '~/components/ReportData'
import ReportAlarm from '~/components/ReportAlarm'
import axios from 'axios';
import io from 'socket.io-client';
import { Area } from 'recharts';

const Report = ({ username, token }) => {

  const [stationData, setStationData] = useState({});
  const [stations, setStations] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [selectedOption, setSelectedOption] = useState('all-station');

  const [selectedGas, setSelectedGas] = useState('SO2');

  const [selectedStation, setSelectedStation] = useState('');
  const [selectedOptionDetail, setSelectedOptionDetail] = useState('SO2');


  const [reportData, setReportData] = useState([]);
  const [isSubmited, setIsSubmited] = useState(false);


  useEffect(() => {
    // const socket = io('http://localhost:8017'); // Thay đổi địa chỉ máy chủ và cổng tùy vào cài đặt của bạn

    // socket.on('opcData', ({ station, data }) => {
    //   // Cập nhật dữ liệu cho trạm tương ứng
    //   setStationData((prevData) => ({
    //     ...prevData,
    //     [station]: data,
    //   }));
    // });
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
  const handleSubmit = () => {
    const startObject = new Date(startDate);
    const timestampStart = startObject.getTime();
    const endObject = new Date(endDate);
    const timestampEnd = endObject.getTime();
    setIsSubmited(true)
    if (selectedOption === 'all-station') {
      axios.get(`http://localhost:8017/v1/getdatareport?gas=${selectedGas}&option=${selectedOption}&startDate=${timestampStart}&endDate=${timestampEnd}`)
        .then(response => {
          setReportData(response.data);
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching report data:', error);
        });
    }
    else {
      // Gọi API endpoint để lấy dữ liệu từ MongoDB với các tham số selectedStation, startDate và endDate
      axios.get(`http://localhost:8017/v1/getdatareport?station=${selectedStation}&option=${selectedOption}&startDate=${timestampStart}&endDate=${timestampEnd}&optionDetail=${selectedOptionDetail}`)
        .then(response => {
          setReportData(response.data);
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching report data:', error);
        });
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setIsSubmited(false)

  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setIsSubmited(false)

  };

  const handleChangeOption = (event) => {
    setSelectedOption(event.target.value); // Cập nhật giá trị đã chọn khi người dùng thay đổi
    setIsSubmited(false)

  };
  const handleChangeGas = (event) => {
    setSelectedGas(event.target.value); // Cập nhật giá trị đã chọn khi người dùng thay đổi
    setIsSubmited(false)

  };
  const handleStationChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedStation(event.target.value);
    // Xử lý khi người dùng chọn một trạm
    console.log('Station selected:', selectedStation)

  };
  const handleOptionDetailChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptionDetail(selectedValue);
  };
  console.log(selectedOptionDetail)
  const currentDate = new Date();

  const handleExport = async () => {
    // Xử lý khi người dùng nhấn Export
    if (reportData.length === 0) {
      console.error('No data to export.');
      return;
    }
    function getUnit(gasName) {
      switch (gasName) {
        case 'SO2':
        case 'CO':
        case 'NO':
        case 'Dust':
          return 'mg/Nm³';
        case 'Temperature':
          return '°C';
        case 'O2':
          return '%V';
        default:
          return ''; // Đơn vị mặc định nếu không khớp
      }
    }

    // Tạo mảng dữ liệu để export
    const dataToExport = reportData.map((item) => ({

      Date: new Date(item.createdAt).toLocaleString('en-GB'),
      Parameter: Object.keys(item).filter(
        (key) =>
          key !== 'createdAt' &&
          key !== 'Station' &&
          !key.startsWith('Status') &&
          item[key] != null
      ),
      Unit: Object.keys(item)
        .filter(
          (key) =>
            key !== 'createdAt' &&
            key !== 'Station' &&
            !key.startsWith('Status') &&
            item[key] != null
        )
        .map((gasName) => getUnit(gasName)),
      Value: Object.keys(item)
        .filter(
          (key) =>
            key !== 'createdAt' &&
            key !== 'Station' &&
            !key.startsWith('Status') &&
            item[key] != null
        )
        .map((gasName) => item[gasName]),
      SignalStatus: Object.keys(item)
        .filter((key) => key.startsWith('Status') && key !== 'StatusStation')
        .map((gasSignalKey) => item[gasSignalKey] || ''), // Nếu không có trường gasSignal, đặt giá trị mặc định là '',
      StatusStation: item.StatusStation,
      Station: item.Station,
      UserName: username,
      StartDate: startDate.toLocaleString('en-GB'), // Thêm startDate vào dữ liệu export
      EndDate: endDate.toLocaleString('en-GB'),     // Thêm endDate vào dữ liệu export
      CurrentTime: currentDate.toLocaleString('en-GB'),
      Area: selectedOption === 'all-station' ? 'All Stations' : item.Station
    }));


    try {
      console.log('dataexport: ', dataToExport)
      // // Gửi dữ liệu dataToExport lên backend
      const response = await axios.post('http://localhost:8017/v1/export', {
        dataToExport: dataToExport,
        option: selectedOptionDetail
      });
      const downloadUrl = response.data.downloadUrl;
      window.location.href = downloadUrl;

    } catch (error) {
      console.error('Export request failed:', error);
      // Xử lý lỗi khi gửi yêu cầu xuất Excel lên backend
    }
  };


  return (
    <div className='report-container'>
      <div className='report-bar'>
        <DatePicker
          className='start-date'
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Start date"
          placeholderTextColor="black"
        />
        <span className="spacer" style={{ color: 'black', fontSize: '20px', border: 'none' }}>-</span>
        <DatePicker
          className='end-date'
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="End date"
        />
        <select
          className='choose-option'
          value={selectedOption}
          onChange={handleChangeOption}

        >
          <option value="all-station">All Stations</option>
          <option value="any-station">Any Station</option>
        </select>
        {selectedOption === 'all-station' && (
          <select
            className='choose-gas'
            value={selectedGas} onChange={handleChangeGas}
          >
            <option value="SO2">SO2</option>
            <option value="CO">CO</option>
            <option value="NO">NO</option>
            <option value="Dust">Dust</option>
            <option value="Temperature">Temperature</option>
            <option value="O2">O2</option>
          </select>
        )}

        {/* Hiển thị thanh select khác khi selectedStation là "any-station" */}
        {selectedOption === 'any-station' && (
          <div>
            <select
              value={selectedStation}
              onChange={handleStationChange}
              className='choose-station'
            >
              <option key={0} value=''>Choose Station</option>
              {stations.map((station, index) => (
                <option key={index + 1} value={station}>{station}</option>
              ))}
            </select>

            <select
              value={selectedOptionDetail}
              onChange={handleOptionDetailChange}
              className='choose-option-detail'
            >
              <option value="SO2">SO2</option>
              <option value="CO">CO</option>
              <option value="NO">NO</option>
              <option value="Dust">Dust</option>
              <option value="Temperature">Temperature</option>
              <option value="O2">O2</option>
              <option value="allgas">All Parameters</option>
              <option value="Alarm">Alarms</option>
            </select>
          </div>
        )}
        <Button className="submit" variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>
        <Button className="export" variant="outlined" onClick={handleExport}>
          Export
        </Button>
      </div>
      <div className='report-main'>
        <div className='scrollable-table'>
          <div className='report-table'>
            <Reportdata reportData={reportData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report