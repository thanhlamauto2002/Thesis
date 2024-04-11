
import { Divider } from '@mui/material'
import './CardHG.css'
import TempGauge from '~/components/TempGauge'
import PressComponent from './PressComponent';
const CardHG = ({ temp, press }) => {
  return (
    <div className="card-station">
      <div className="card-header">
        Hau Giang Station
      </div>
      <Divider />
      <div className="card-body">
        < TempGauge Temp={temp} />
        < PressComponent Press={press} />
      </div>
    </div>
  )
}
export default CardHG



