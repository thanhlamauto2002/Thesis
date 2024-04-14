
import { Divider } from '@mui/material'
import './CardHG.css'
import TempGauge from '~/components/TempGauge'
import PressComponent from './PressComponent';
import GaugeCo from './GaugeCo';
import GaugeNo from './GaugeNo';
import GaugeSo2 from './GaugeSo2';
import GaugeO2 from './GaugeO2';
import Typography from '@mui/material/Typography'

const CardHG = ({ data2 }) => {
  return (
    <div className="card-station">
      <div className="card-header">
        Hau Giang Station
      </div>
      <Divider />
      <div className="card-body">
        <div className='card-box'>
          < TempGauge Temp={data2.Temperature} />
          <Typography variant="h6" style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data2.StatusTemp}</Typography> {/* Hiển thị tên của biểu đồ */}
        </div>
        <div>
          < PressComponent Dust={data2.Dust} />
          <Typography variant="h6" style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data2.StatusDust}</Typography> {/* Hiển thị tên của biểu đồ */}

        </div>
        <div>
          <GaugeCo valueCo={data2.CO} />
          <Typography variant="h6" style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data2.StatusCO}</Typography> {/* Hiển thị tên của biểu đồ */}

        </div>
        <div>
          <GaugeNo valueNo={data2.NO} />
          <Typography variant="h6" style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data2.StatusNO} </Typography> {/* Hiển thị tên của biểu đồ */}
        </div>
        <div>
          <GaugeSo2 valueSo2={data2.SO2} />
          <Typography variant="h6" style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data2.StatusSO2}</Typography> {/* Hiển thị tên của biểu đồ */}
        </div>
        <div>
          <GaugeO2 valueO2={data2.O2} />
          <Typography variant="h6" style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data2.StatusO2}</Typography> {/* Hiển thị tên của biểu đồ */}
        </div>
      </div>
    </div >
  )
}
export default CardHG



