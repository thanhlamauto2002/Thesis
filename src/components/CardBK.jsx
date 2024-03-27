
import { Divider } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const CardBK = () => {
  const data = [
    { name: 'SO2', value: 10 },
    { name: 'NO2', value: 15 },
    { name: 'CO2', value: 20 },
    { name: 'CO', value: 12 },
    { name: 'NO', value: 23 },
    { name: 'H2S', value: 24 }
  ];

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d53e4f', '#5e6472'];
  return (
    <div className="card-station">
      <div className="card-header">
        Bach Khoa Station
      </div>
      <Divider />
      <div className="card-body">
        <div className='row-card'>
          <div id='number'>
            <BarChart
              width={400}
              height={200}
              data={data}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
              {data.map((entry, index) => (
                <Bar key={index} dataKey="value" fill={colors[index]} />
              ))}
            </BarChart>
          </div>
          <div id='image'>
            <img
              alt="Plants"
              height="70"
              width="80"
              src="https://cdn.fogwing.net/sfactory/images/plant.svg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default CardBK



