
import { Divider } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'


const CardTV = () => {
  return (
    <div className="card-station">
      <div className="card-header">
        Tra Vinh Station
      </div>
      <Divider />
      <div className="card-body">
        <div className='row-card'>
          <div id='number'>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'SO2' },
                    { id: 1, value: 15, label: 'NO2' },
                    { id: 2, value: 20, label: 'CO2' },
                    { id: 3, value: 12, label: 'CO' },
                    { id: 4, value: 23, label: 'NO' },
                    { id: 5, value: 24, label: 'H2S' }
                  ]
                }
              ]}
              width={400}
              height={200}
            />
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
export default CardTV



