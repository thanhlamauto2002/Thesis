import React, { useState, useEffect } from 'react';
import './Setting.css';
import { SettingOptionData } from './SettingOptionData';
import axios from 'axios';
import io from 'socket.io-client';
import { toast } from 'react-toastify'

function Setting() {

  const [stations, setStations] = useState([]);
  const [stationList, setStationList] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [selectedOption, setSelectedOption] = useState('newstation');
  const [iPAddress, setIpAddress] = useState('');
  const [stationName, setStationName] = useState('');
  const [nodes, setNodes] = useState([]);
  console.log(selectedOption)
  console.log(stations)



  useEffect(() => {
    const socket = io('http://localhost:8017');

    socket.on('connectionError', message => {
      console.log('Message received:', message);
      toast.error(message, { draggable: false })


    });
    socket.on('connectionSuccess', message => {
      console.log('Message received:', message);
      toast.success(message, { draggable: false })


    });

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {

    const getData = () => {
      axios.get('http://localhost:8017/v1/liststation/get')
        .then(response => {
          setStations(response.data);
          const extractedStations = response.data.map(item => item.Station.trim());
          setStationList(extractedStations);

        })
        .catch(error => {
          console.error('Error fetching report data:', error);
        });

    }
    getData()
  }, []);

  const handleChangeStation = (event) => {
    setSelectedStation(event.target.value);
  };

  const handleAddNode = () => {
    const newNode = {
      parameterName: '',
      namespace: '',
      nodeId: '',
      setpoint: ''
    };
    setNodes([...nodes, newNode]);
  };

  const handleNodeChange = (index, key, value) => {
    const updatedNodes = [...nodes];
    updatedNodes[index][key] = value;
    setNodes(updatedNodes);
  };

  const handleRemoveNode = (index) => {
    const updatedNodes = [...nodes];
    updatedNodes.splice(index, 1); // Xóa node tại vị trí index
    setNodes(updatedNodes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(nodes); // In ra để kiểm tra
    const response = await axios.post('http://localhost:8017/v1/createopcserver', {
      IP: iPAddress,
      Station: stationName,
      nodes: nodes
    });
  };
  const handleClickOption = (optionId) => {
    setSelectedOption(optionId);
  };
  return (
    <div className='container-setting'>
      <div className='setting-title-bar'>
        <label className='setting-title'>Configure OPC UA Connection</label>
      </div>
      <div className='metric-option'>
        <ul className='setting-option-list'>
          {SettingOptionData.map((val1, key) => {
            return (
              <li
                key={key}
                className='setting-row-station'
                id={selectedOption == val1.id ? 'active' : ''}
                onClick={() => handleClickOption(val1.id)}>
                <div id='title'>{val1.title}</div>
              </li>
            )
          }
          )}
        </ul>
      </div>
      {selectedOption === 'newstation' && <form onSubmit={handleSubmit}>
        <div className='setting-ip'>
          <label className='label-ip' htmlFor='ipAddress'>IP of Server:</label>
          <input
            type='text'
            id='ipAddress'
            placeholder=''
            value={iPAddress}
            onChange={(event) => setIpAddress(event.target.value)}
            required
          />
          <label className='label-name' htmlFor='ipAddress'>Station:</label>
          <input
            type='text'
            id='stationname'
            placeholder=''
            value={stationName}
            onChange={(event) => setStationName(event.target.value)}
            required
          />
          <button className='add-node' type='button' onClick={handleAddNode}>+ Add Node</button>

        </div>
        <div className='setting-nodes'>
          {nodes.map((node, index) => (
            <div key={index} className='node-input'>
              <label className='label-config' htmlFor={`parameterName${index}`}>Parameter Name:</label>
              <input
                type='text'
                id={`parameterName${index}`}
                placeholder=''
                value={node.parameterName}
                onChange={(event) => handleNodeChange(index, 'parameterName', event.target.value)}
                required
              />
              <label className='label-config' htmlFor={`namespace${index}`}>Namespace:</label>
              <input
                type='text'
                id={`namespace${index}`}
                placeholder=''
                value={node.namespace}
                onChange={(event) => handleNodeChange(index, 'namespace', event.target.value)}
                required
              />
              <label className='label-config' htmlFor={`nodeId${index}`}>Node ID:</label>
              <input
                type='text'
                id={`nodeId${index}`}
                placeholder=''
                value={node.nodeId}
                onChange={(event) => handleNodeChange(index, 'nodeId', event.target.value)}
                required
              />
              <label className='label-config' htmlFor={`nodeId${index}`}>Setpoint:</label>
              <input
                type='text'
                id={`nodeId${index}`}
                placeholder=''
                value={node.setpoint}
                onChange={(event) => handleNodeChange(index, 'setpoint', event.target.value)}
                required
              />
              <button className='remove-node' type='button' onClick={() => handleRemoveNode(index)}>Remove Node</button>
            </div>
          ))}
        </div>
        <button className='connect-button' type='submit'>Connect</button>
      </form>}
      {selectedOption === 'existconnection' &&
        <select value={selectedStation} onChange={handleChangeStation} className='select-station-setting'>
          {stationList.map((station, index) => (
            <option key={index} value={station}>{station}</option>
          ))}
        </select>



      }
    </div>
  );
}

export default Setting;