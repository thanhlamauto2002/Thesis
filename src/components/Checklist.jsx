import React from 'react';

const Checklist = ({ stations, selectedStations, onSelectionChange }) => {
  const handleCheckboxChange = (station) => {
    const newSelectedStations = selectedStations.includes(station)
      ? selectedStations.filter(item => item !== station)
      : [...selectedStations, station];
    onSelectionChange(newSelectedStations);
  };

  return (
    <div>
      {stations.map((station, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={selectedStations.includes(station)}
            onChange={() => handleCheckboxChange(station)}
          />
          {station}
        </div>
      ))}
    </div>
  );
};

export default Checklist;