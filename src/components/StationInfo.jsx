import React from 'react';

const StationInfo = ({ stationData }) => {
  return (
    <div>
      {Object.entries(stationData).map(([stationName, data]) => (
        <div key={stationName}>
          <h2>{stationName}</h2>
          <ul>
            <li>
              CO: {data.CO} {data.CO > data.CO_setpoint ? '(Above setpoint)' : '(Below setpoint)'}
            </li>
            <li>
              NO: {data.NO} {data.NO > data.NO_setpoint ? '(Above setpoint)' : '(Below setpoint)'}
            </li>
            <li>
              SO2: {data.SO2} {data.SO2 > data.SO2_setpoint ? '(Above setpoint)' : '(Below setpoint)'}
            </li>
            <li>
              Dust: {data.Dust} {data.Dust > data.Dust_setpoint ? '(Above setpoint)' : '(Below setpoint)'}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default StationInfo;