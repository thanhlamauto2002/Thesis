import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <DataContext.Provider value={{ data1, setData1, data2, setData2, data3, setData3, selectedStation, setSelectedStation }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);