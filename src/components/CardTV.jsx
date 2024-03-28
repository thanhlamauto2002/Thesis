
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



