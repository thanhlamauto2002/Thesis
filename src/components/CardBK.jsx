
import { Divider } from '@mui/material'

const CardBK = () => {
  const data = [
    { name: 'SO2', value: 10 },
    { name: 'NO2', value: 15 },
    { name: 'CO2', value: 20 },
    { name: 'CO', value: 12 },
    { name: 'NO', value: 23 },
    { name: 'H2S', value: 24 }
  ];

  return (
    <div className="card-station">
      <div className="card-header">
        Bach Khoa Station
      </div>
      <Divider />
      <div className="card-body">
        <div className='row-card'>
          <div id='number'>

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



