

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Dashboard.css';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import TableDetail from '~/components/TableDetail';
const Dashboard = ({ token }) => {
  const [stationData, setStationData] = useState({});

  const [station, setStation] = useState([])

  const [showDetail, setShowDetail] = useState(false);

  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  console.log(stationData)

  useEffect(() => {

    const getData = () => {
      axios.get('http://localhost:8017/v1/liststation/get')
        .then(response => {
          const extractedStations = response.data.map(item => {
            return {
              Station: item.Station.trim(),
              Latitude: item.Latitude,
              Longitude: item.Longitude
            };
          });
          setStation(extractedStations);
        })
        .catch(error => {
          console.error('Error fetching report data:', error);
        });

    }
    getData()

  }, []);
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
      // socket.disconnect();
    };


  }, []);
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY
  });



  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        error => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);


  const handleMarkerClick = (station) => {
    setSelectedStation(station);
    setIsOpen(true); // Mở InfoWindow khi nhấp vào Marker
  };
  console.log(isOpen)
  const handleInfoWindowClose = () => {
    setIsOpen(false); // Đóng InfoWindow khi người dùng nhấp vào nút đóng
  };

  const handleDetailClick = (station) => {
    console.log('Detail button clicked for station:', station);
    setShowDetail(true);
    // Xử lý khi nhấn vào nút Detail
  };
  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const renderMarkers = () => {
    console.log('sation: ', station)
    const stations = Object.values(station);
    console.log('station valie: ', stations)
    return stations.map((item) => (
      <Marker
        key={item.Station}
        position={{ lat: item.Latitude, lng: item.Longitude }}
        onClick={() => handleMarkerClick(item)}
      >
        {selectedStation === item && isOpen && (
          <InfoWindow
            position={{ lat: item.Latitude, lng: item.Longitude }}
            onCloseClick={handleInfoWindowClose}
          >
            <div style={{ width: '150px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ marginBottom: '5px' }}>{item.Station}</h3>
              <div style={{ marginBottom: '10px' }}>
                <strong>Status: {stationData[selectedStation.Station].StatusStation}</strong>
              </div>
              <button
                style={{
                  padding: '8px',
                  backgroundColor: 'blue',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
                onClick={() => handleDetailClick(item)}
              >
                Detail
              </button>
            </div>
          </InfoWindow>
        )}
      </Marker>
    ));
  };

  return (
    <div className='dashboard-container'>
      <div className="map-container" style={{ width: showDetail ? '50%' : '100%' }}>
        {isLoaded && <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={currentPosition}
          zoom={10}
        >
          {renderMarkers()}
        </GoogleMap>}
      </div>
      {showDetail && (
        <div className="detail-container" style={{ width: showDetail ? '50%' : '0%', overflowY: 'scroll' }}>
          <div className='detail-header'>
            <label className='lable-table-detail'> Detail Information </label>
            <button onClick={handleCloseDetail} style={{ float: 'right', cursor: 'pointer' }} className='btn-close-detail'>
              Close
            </button>
          </div>
          <TableDetail station={stationData[selectedStation.Station]} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;