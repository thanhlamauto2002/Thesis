
import { Divider } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import './CardHG.css'
import { PieChart } from '@mui/x-charts/PieChart'

const CardHG = () => {
  return (
    <div className="card-station">
      <div className="card-header">
        Hau Giang Station
      </div>
      <Divider />
      <div className="card-body">
        <div className='row-card'>
          <div id='number' className="barchart-container">

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
export default CardHG



