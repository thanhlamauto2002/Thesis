import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@mui/material/Button';
import Reportdata from '~/components/ReportData'
import ReportAlarm from '~/components/ReportAlarm'
import axios from 'axios';
import * as XLSX from 'xlsx';
const Report = ({ username }) => {
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

  const currentDate = new Date();

  const handleExport = async () => {
    // Xử lý khi người dùng nhấn Export
    if (reportData.length === 0) {
      console.error('No data to export.');
      return;
    }

    // Tạo một workbook mới và một worksheet
    const dataToExport = reportData.map(item => ({
      SO2: item.SO2,
      NO: item.NO,
      CO: item.CO,
      O2: item.O2,
      Temperature: item.Temperature,
      Dust: item.Dust,
      Station: item.Station,
      UserName: username,
      Date: new Date(item.createdAt).toLocaleString('en-GB'),
      StartDate: startDate.toLocaleString('en-GB'), // Thêm startDate vào dữ liệu export
      EndDate: endDate.toLocaleString('en-GB'),     // Thêm endDate vào dữ liệu export
      CurrentTime: currentDate.toLocaleString('en-GB')

    }));

    try {
      // Gửi dữ liệu dataToExport lên backend
      const response = await axios.post('http://localhost:8017/v1/export', {
        dataToExport: dataToExport
      });
      const downloadUrl = response.data.downloadUrl;
      window.location.href = downloadUrl;

      console.log('Export request successful:', response.data);
      // Xử lý kết quả trả về từ backend (nếu cần)
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
        <span className="spacer" style={{ color: 'white', fontSize: '20px', border: 'none' }}>-</span>
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
        <div className="scrollable-table">

          <div className='report-table'>
            {selectedOption === 'data' && <Reportdata reportData={reportData} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report