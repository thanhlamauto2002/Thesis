// import CardBK from '~/components/CardBK'
// import CardHG from '~/components/CardHG'
// import CardTV from '~/components/CardTV'
// import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify'
// import { useEffect } from 'react';

// function DashBoard({ data1, data2, data3, isExceedBK, isExceed90BK, isExceedHG, isExceed90HG, isExceedTV, isExceed90TV }) {
//   // Lấy danh sách các key của đối tượng isExceedBK
//   // useEffect(() => {
//   //   Object.keys(isExceedBK).forEach(key => {
//   //     // Lấy giá trị của từng thuộc tính
//   //     const value = isExceedBK[key];
//   //     // Kiểm tra giá trị của thuộc tính và thực hiện hành động tương ứng
//   //     if (value === true) {
//   //       toast.error(`${key} is high at Bach Khoa`, {
//   //         // autoClose: 5000,
//   //         draggable: false,
//   //         position: 'bottom-left',
//   //         hideProgressBar: false,
//   //         closeOnClick: true,
//   //         pauseOnHover: true,
//   //         progress: 0,
//   //         theme: 'colored',
//   //       })
//   //     }
//   //   });

//   // }, [isExceedBK])
//   // useEffect(() => {

//   //   Object.keys(isExceedHG).forEach(key => {
//   //     // Lấy giá trị của từng thuộc tính
//   //     const value = isExceedHG[key];

//   //     // Kiểm tra giá trị của thuộc tính và thực hiện hành động tương ứng
//   //     if (value === true) {
//   //       toast.error(`${key} is high at Hau Giang`, {
//   //         draggable: false,
//   //         position: 'bottom-left',
//   //         // autoClose: 5000,
//   //         hideProgressBar: false,
//   //         closeOnClick: true,
//   //         pauseOnHover: true,
//   //         progress: 0,
//   //         theme: 'colored',
//   //       })
//   //     }
//   //   });

//   // }, [isExceedHG])
//   // useEffect(() => {

//   //   Object.keys(isExceedTV).forEach(key => {
//   //     // Lấy giá trị của từng thuộc tính
//   //     const value = isExceedTV[key];

//   //     // Kiểm tra giá trị của thuộc tính và thực hiện hành động tương ứng
//   //     if (value === true) {
//   //       toast.error(`${key} is high at Tra Vinh`, {
//   //         draggable: false,
//   //         position: 'bottom-left',
//   //         // autoClose: 5000,
//   //         hideProgressBar: false,
//   //         closeOnClick: true,
//   //         pauseOnHover: true,
//   //         progress: 0,
//   //         theme: 'colored',
//   //       })
//   //     }
//   //   });
//   // }, [isExceedTV])
//   return (
//     <div className='dashboard-container'>

//       {/* <div className='dashboard-cards'>
//         <div className='dashboard-card dashboard-card2'>
//           <CardBK data1={data1} isExceedBK={isExceedBK} isExceed90BK={isExceed90BK} />
//         </div>
//         <div className='dashboard-card dashboard-card3'>
//           <CardHG data2={data2} isExceedHG={isExceedHG} isExceed90HG={isExceed90HG} />
//         </div>
//         <div className='dashboard-card dashboard-card4'>
//           <CardTV data3={data3} isExceedTV={isExceedTV} isExceed90TV={isExceed90TV} />
//         </div>
//       </div> */}

//     </div>
//   )
// }

// export default DashBoard

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Dashboard.css';
import MapComponent from '~/components/MapComponent';
const Test = () => {
  const [stationData, setStationData] = useState({});

  useEffect(() => {
    // Kết nối tới Socket Server của máy chủ Node.js
    const socket = io('http://localhost:8017'); // Thay đổi địa chỉ máy chủ và cổng tùy vào cài đặt của bạn

    // Lắng nghe sự kiện 'opcData' từ Socket Server
    socket.on('opcData', ({ station, data }) => {
      // Cập nhật dữ liệu cho trạm tương ứng
      setStationData((prevData) => ({
        ...prevData,
        [station]: data,
      }));
    });

    return () => {
      // Ngắt kết nối Socket khi component unmount
    };
  }, []); // Dependency array rỗng để chỉ chạy một lần khi component được mount
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Sử dụng toLocaleString để định dạng ngày giờ theo locale
  };
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {Object.entries(stationData).map(([station, data]) => (
        <div className="station-card" key={station}>
          <h2 className="station-header">Trạm: {station}</h2>
          <ul className="data-list">
            {Object.entries(data).map(([key, value]) => (
              <li className="data-list-item" key={key}>
                {key === 'createdAt' ? (
                  <span><strong>Thời điểm tạo:</strong> {formatTimestamp(value)}</span>
                ) : (
                  <span><strong>{key}:</strong> {value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {/* < MapComponent stationData={stationData} /> */}
    </div >
  );
};

export default Test;