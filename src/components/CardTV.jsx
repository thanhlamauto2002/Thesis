
import { Divider } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'
import TempGauge from '~/components/TempGauge'
import PressComponent from './PressComponent';

const CardTV = ({ temp, press }) => {
  return (
    <div className="card-station">
      <div className="card-header">
        Tra Vinh Station
      </div>
      <Divider />
      <div className="card-body">
        < TempGauge Temp={temp} />
        < PressComponent Press={press} />
      </div>
    </div>
  )
}
export default CardTV



