import { GoogleMap, Marker, LoadScript, DirectionsService, DirectionsRenderer, InfoWindow } from '@react-google-maps/api'
import { useState, useEffect } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import axios from 'axios'


const MapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY
  })

  const [currentPosition, setCurrentPosition] = useState(null)
  const [directions, setDirections] = useState(null)
  const [distance, setDistance] = useState(null)// State để lưu trạm được chọn
  const [stations, setStations] = useState([]) // State để lưu trạm từ backend
  const [selectedStations, setSelectedStations] = useState({})

  useEffect(() => {
    axios.get('http://localhost:8017/v1/liststation/get')
      .then(response => {
        setStations(response.data) // Giả sử response.data.stations chứa danh sách các trạm từ backend
      })
      .catch(error => {
        console.error('Error fetching stations from backend:', error)
      })
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          setCurrentPosition({ lat: latitude, lng: longitude })
        },
        error => {
          console.error('Error getting geolocation:', error)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }, [])

  const onDirectionsLoad = (response) => {
    setDirections(response)
    const distance = response.routes[0].legs[0].distance.text
    setDistance(distance)
  }

  const renderDirections = () => {
    if (directions) {
      return <DirectionsRenderer directions={directions} options={{ polylineOptions: { strokeWeight: 6, strokeColor: '#007bff' } }} />
    }
    return null
  }

  const requestDirections = (destination) => {
    const directionsService = new window.google.maps.DirectionsService()
    directionsService.route(
      {
        origin: currentPosition,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          onDirectionsLoad(result)
        } else {
          console.error(`Error fetching directions: ${status}`)
        }
      }
    )
  }


  const handleMarkerClick = (station) => {
    const updatedSelectedStations = { ...selectedStations }
    updatedSelectedStations[station.name] = station
    setSelectedStations(updatedSelectedStations)
    requestDirections(station.position)
    setDistance(null) // Reset distance
  }

  const handleInfoWindowClose = (stationName) => {
    const updatedSelectedStations = { ...selectedStations }
    delete updatedSelectedStations[stationName]
    setSelectedStations(updatedSelectedStations)
    setDirections(null) // Reset directions
  }
  return (

    isLoaded ? (
      <GoogleMap
        mapContainerStyle={{ height: 'calc(100vh - 50.8px)', width: '100%' }}
        center={currentPosition} // Thành phố Hồ Chí Minh
        zoom={10}
      >
        {currentPosition && (
          <Marker
            position={currentPosition}
            title="Your Location"
          />
        )}
        {stations.map(station => (
          <Marker
            key={station.name}
            position={station.position}
            title={station.name}
            onClick={() => handleMarkerClick(station)}
          >
            {selectedStations[station.name] && (
              <InfoWindow
                onCloseClick={() => handleInfoWindowClose(station.name)}
                position={station.position}
              >
                <div>
                  <h3>{station.name}</h3>
                  <p>Status: {station.status}</p>
                  <p>Distance: {distance}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>

        ))}

        {renderDirections()}

      </GoogleMap>
    ) : <></>
  )
}

export default MapComponent