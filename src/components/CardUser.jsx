
import { Divider } from '@mui/material'


const CardUserComponent = () => {
  return (
    <div className="card-station">
      <div className="card-header">
        Users
      </div>
      <Divider />
      <div className="card-body">
        <div className='row-card'>
          <div id='number' >
          </div>
          <div id='image'>
            <img
              alt="Plants"
              height="70"
              width="80"
              src="https://cdn.fogwing.net/sfactory/images/user_settings.svg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default CardUserComponent



