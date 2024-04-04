import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@mui/material/Button';
import Reportdata from '~/components/ReportData'
import ReportAlarm from '~/components/ReportAlarm'
import axios from 'axios';
import * as XLSX from 'xlsx';

const Report = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStation, setSelectedStation] = useState('BK');
  const [selectedOption, setSelectedOption] = useState('data');
  const [reportData, setReportData] = useState([]);



  const handleSubmit = () => {
    // Truy xuất dữ liệu từ MongoDB khi nhấn nút Submit
    const startObject = new Date(startDate);
    const timestampStart = startObject.getTime();
    const endObject = new Date(endDate);
    const timestampEnd = endObject.getTime();


    // Gọi API endpoint để lấy dữ liệu từ MongoDB với các tham số selectedStation, startDate và endDate
    axios.get(`http://localhost:8017/v1/getdatareport?station=${selectedStation}&startDate=${timestampStart}&endDate=${timestampEnd}`)
      .then(response => {
        setReportData(response.data);
      })
      .catch(error => {
        console.error('Error fetching report data:', error);
      });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);

  };
  const handleEndDateChange = (date) => {
    setEndDate(date);

  };

  const handleChangeStation = (event) => {
    setSelectedStation(event.target.value); // Cập nhật giá trị đã chọn khi người dùng thay đổi
  };

  const handleChangeOption = (event) => {
    setSelectedOption(event.target.value); // Cập nhật giá trị đã chọn khi người dùng thay đổi
  };


  const handleExport = () => {
    // Xử lý khi người dùng nhấn Export
    if (reportData.length === 0) {
      console.error('No data to export.');
      return;
    }

    // Tạo một workbook mới và một worksheet
    const dataToExport = reportData.map(item => ({
      SO2: item.SO2,
      NO2: item.NO2,
      CO2: item.CO2,
      O2: item.O2,
      Temperature: item.Temperature,
      Pressure: item.Pressure,
      Station: item.Station,
      Date: new Date(item.createdAt).toLocaleString('en-GB')
    }));

    // Tạo một workbook mới và một worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataToExport);

    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Report Data');

    // Xuất workbook ra file Excel và tải về
    XLSX.writeFile(wb, 'report_data.xlsx');
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
        <span className="spacer" style={{ color: 'white', fontSize: '20px' }}>-</span>
        <DatePicker
          className='end-date'
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="End date"
        />
        <select
          className='choose-station'
          value={selectedStation}
          onChange={handleChangeStation}
          style={{
            width: '168px',
            height: '39px', // Giống kích thước của DatePicker
            backgroundColor: 'white', // Màu nền
            color: 'black', // Màu chữ
            border: '1px solid black', // Đường viền
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '15px'
          }}
        >
          <option value="BK">Bach Khoa Station</option>
          <option value="HG">Hau Giang Station</option>
          <option value="TV">Tra Vinh Station</option>
        </select>
        <select
          className='choose-option'
          value={selectedOption}
          onChange={handleChangeOption}
          style={{
            width: '168px',
            height: '39px', // Giống kích thước của DatePicker
            backgroundColor: 'white', // Màu nền
            color: 'black', // Màu chữ
            border: '1px solid black', // Đường viền
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '15px'
          }}
        >
          <option value="data">Data</option>
          <option value="alarm">Alarm</option>
        </select>
        <Button className="submit" variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>
        <Button className="export" variant="outlined" onClick={handleExport}>
          Export
        </Button>
      </div>
      <div className='report-main'>
        <div className='report-table'>
          {selectedOption === 'data' && <Reportdata reportData={reportData} />}
        </div>

      </div>
    </div>
  )
}

export default Report