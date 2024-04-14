
import { Divider } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'
import TempGauge from '~/components/TempGauge'
import PressComponent from './PressComponent';
import GaugeCo from './GaugeCo';
import GaugeNo from './GaugeNo';
import GaugeSo2 from './GaugeSo2';
import GaugeO2 from './GaugeO2';
import Typography from '@mui/material/Typography'

const CardTV = ({ data3 }) => {
  return (
    <div className="card-station">
      <div className="card-header">
        Tra Vinh Station
      </div>
      <Divider />
      <div className="card-body">
        <div >
          < TempGauge Temp={data3.Temperature} />
          <Typography variant="h6" style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data3.StatusTemp}</Typography> {/* Hiển thị tên của biểu đồ */}
        </div>
        <div>
          < PressComponent Dust={data3.Dust} />
          <Typography variant="h6" style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data3.StatusDust}</Typography> {/* Hiển thị tên của biểu đồ */}

        </div>
        <div>
          <GaugeCo valueCo={data3.CO} />
          <Typography variant="h6" style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data3.StatusCO}</Typography> {/* Hiển thị tên của biểu đồ */}

        </div>
        <div>
          <GaugeNo valueNo={data3.NO} />
          <Typography variant="h6" style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data3.StatusNO} </Typography> {/* Hiển thị tên của biểu đồ */}
        </div>
        <div>
          <GaugeSo2 valueSo2={data3.SO2} />
          <Typography variant="h6" style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data3.StatusSO2}</Typography> {/* Hiển thị tên của biểu đồ */}
        </div>
        <div>
          <GaugeO2 valueO2={data3.O2} />
          <Typography variant="h6" style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data3.StatusO2}</Typography> {/* Hiển thị tên của biểu đồ */}
        </div>
      </div>
    </div>
  )
}
export default CardTV



