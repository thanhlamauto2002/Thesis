
import { Divider } from '@mui/material'


const CardStationComponent = () => {
  return (
    <div className="card-station">
      <div className="card-header">
        Stations
      </div>
      <Divider />
      <div className="card-body">
        <div className='row-card'>
          <div id='number'>
            <h3>3</h3>
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
export default CardStationComponent



