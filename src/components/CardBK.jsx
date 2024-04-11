
import { Divider } from '@mui/material'
import TempGauge from '~/components/TempGauge'
import PressComponent from './PressComponent';
const CardBK = ({ temp, press }) => {

  return (
    <div className="card-station">
      <div className="card-header">
        Bach Khoa Station
      </div>
      <Divider />
      <div className="card-body">
        < TempGauge Temp={temp} />
        < PressComponent Press={press} />


      </div>
    </div>
  )
}
export default CardBK



