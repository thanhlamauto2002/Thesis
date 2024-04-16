import React from 'react'
import axios from 'axios';

const writeAlarmToDB = async (alarmBK) => {
  try {
    const response = await axios.post('http://localhost:8017/v1/databkstation/createalarm');
    console.log('Response:', response.data); // Log kết quả trả về từ server (nếu cần)
    return response.data; // Trả về dữ liệu từ response (nếu cần)
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to write alarm to database');
  }
};
export default writeAlarmToDB