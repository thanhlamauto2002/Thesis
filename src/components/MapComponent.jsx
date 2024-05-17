import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import TableDetail from './TableDetail';
const MapComponent = ({ stationData }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY
  });

  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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

    // Xử lý khi nhấn vào nút Detail
  };

  const renderMarkers = () => {
    const stations = Object.values(stationData);
    return stations.map((station) => (
      <Marker
        key={station.Station}
        position={{ lat: station.Latitude, lng: station.Longitude }}
        onClick={() => handleMarkerClick(station)}
      >
        {isOpen && (
          <InfoWindow
            position={{ lat: station.Latitude, lng: station.Longitude }}
            onCloseClick={handleInfoWindowClose}
          >
            <div style={{ width: '100px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ marginBottom: '5px' }}>{station.Station}</h3>
              <div style={{ marginBottom: '10px' }}>
                <strong>Status:</strong>
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
                onClick={() => handleDetailClick(station)}
              >
                Detail
              </button>
              {selectedStation && <TableDetail station={selectedStation} />}
            </div>
          </InfoWindow>
        )}
      </Marker>
    ));
  };

  return (
    isLoaded ? (
      <GoogleMap
        mapContainerStyle={{ height: 'calc(100vh - 50.8px)', width: '100%' }}
        center={currentPosition}
        zoom={10}
      >
        {renderMarkers()}
      </GoogleMap>
    ) : <></>
  );
};

export default MapComponent;