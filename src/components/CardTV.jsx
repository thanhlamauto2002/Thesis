
import { Divider } from '@mui/material'
import TempGauge from '~/components/TempGauge'
import PressComponent from './GaugeO2';
import Typography from '@mui/material/Typography'

const CardTV = ({ data3, isExceedTV, isExceed90TV }) => {
  const getStatusClass = (status) => {
    if (status === 'Error') {
      return 'error';
    } else if (status === 'Calib') {
      return 'calib';
    } else if (status === 'Normal') {
      return 'normal';
    } else {
      return ''; // Trường hợp mặc định, bạn có thể thay đổi thành lớp CSS mặc định hoặc xử lý khác
    }
  };
  const getColor = (gas, gas90) => {
    if (gas) {
      return 'red-dashboard';
    } else if (gas90) {
      return 'orange-dashboard ';
    } else {
      return 'green-dashboard ';
    }
  };
  const colorCO = getColor(isExceedTV.CO, isExceed90TV.CO)
  const colorNO = getColor(isExceedTV.NO, isExceed90TV.NO)
  const colorSO2 = getColor(isExceedTV.SO2, isExceed90TV.SO2)
  const colorDust = getColor(isExceedTV.Dust, isExceed90TV.Dust)

  const statusClass1 = getStatusClass(data3.StatusTemp);
  const statusClass2 = getStatusClass(data3.StatusDust);
  const statusClass3 = getStatusClass(data3.StatusCO);
  const statusClass4 = getStatusClass(data3.StatusNO);
  const statusClass5 = getStatusClass(data3.StatusSO2);
  const statusClass6 = getStatusClass(data3.StatusO2);
  return (
    <div className="card-station">
      <div className="card-header">
        Tra Vinh Station <label>{data3.Date}</label>
      </div>
      <Divider />
      <div className="card-body">
        <div className='gaugeTemp'>
          < TempGauge Temp={data3.Temperature} />
          <Typography variant="h6" className={statusClass1} style={{ fontSize: '1.09rem', transform: 'translate(0px, -10px)' }}>Signal Status: {data3.StatusTemp}</Typography>
        </div>
        <div className='gaugeO2'>
          < PressComponent O2={data3.O2} />
          <Typography variant="h6" className={statusClass6} style={{ fontSize: '1.09rem', transform: 'translate(0px, -10px)' }}>Signal Status: {data3.StatusO2}</Typography>
        </div>
        <div className='infoAir'>
          <Typography variant="h5" style={{ fontWeight: 'bolder', color: 'black' }}>CO</Typography>
          <Typography className={colorCO} variant="h5" style={{ fontSize: '1.8rem', fontWeight: 'bolder' }}>{data3.CO}</Typography>
          <Typography variant="h6" style={{ fontSize: '1.09rem', color: 'black' }}>mg/Nm3</Typography>
          <Typography variant="h6" className={statusClass3} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data3.StatusCO}</Typography>

        </div>
        <div className='infoAir'>
          <Typography variant="h5" style={{ fontWeight: 'bolder', color: 'black' }}>NO</Typography>
          <Typography className={colorNO} variant="h5" style={{ fontSize: '1.8rem', fontWeight: 'bolder' }}>{data3.NO}</Typography>
          <Typography variant="h6" style={{ fontSize: '1.09rem', color: 'black' }}>mg/Nm3</Typography>
          <Typography variant="h6" className={statusClass4} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data3.StatusNO}</Typography>

        </div>
        <div className='infoAir'>
          <Typography variant="h5" style={{ fontWeight: 'bolder', color: 'black' }}>SO2</Typography>
          <Typography className={colorSO2} variant="h5" style={{ fontSize: '1.8rem', fontWeight: 'bolder' }}>{data3.SO2}</Typography>
          <Typography variant="h6" style={{ fontSize: '1.09rem', color: 'black' }}>mg/Nm3</Typography>
          <Typography variant="h6" className={statusClass5} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data3.StatusSO2}</Typography>

        </div>
        <div className='infoAir'>
          <Typography variant="h5" style={{ fontWeight: 'bolder', color: 'black' }}>Dust</Typography>
          <Typography className={colorDust} variant="h5" style={{ fontSize: '1.8rem', fontWeight: 'bolder' }}>{data3.Dust}</Typography>
          <Typography variant="h6" style={{ fontSize: '1.09rem', color: 'black' }}>mg/Nm3</Typography>
          <Typography variant="h6" className={statusClass2} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data3.StatusDust}</Typography>

        </div>
      </div>
    </div>
  )
}
export default CardTV



